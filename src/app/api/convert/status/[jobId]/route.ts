import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getJobStatusFromCloudConvert } from '@/lib/services/cloudconvert.service';

/**
 * GET /api/convert/status/[jobId]
 * 
 * Check the status of a conversion job.
 * Primary: reads from our database (updated by CloudConvert webhook) — fast!
 * Fallback: if DB status is stale (webhook hasn't updated in 10+ seconds),
 *           directly polls CloudConvert API and updates our DB.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;

    if (!jobId || jobId === 'undefined' || jobId === 'null') {
      return NextResponse.json(
        { error: 'Invalid job ID', status: 'error' },
        { status: 400 }
      );
    }

    // Look up the ConversionJob in our database
    const conversionJob = await db.conversionJob.findUnique({
      where: { jobId },
    });

    if (!conversionJob) {
      return NextResponse.json(
        { error: 'Job not found. It may have expired or was never created.', status: 'error' },
        { status: 404 }
      );
    }

    // If the job is already finished or has an error, return DB data directly
    if (conversionJob.status === 'finished' || conversionJob.status === 'error') {
      return NextResponse.json({
        jobId: conversionJob.jobId,
        status: conversionJob.status,
        percent: conversionJob.percent,
        downloadUrl: conversionJob.downloadUrl,
        outputFilename: conversionJob.outputFilename,
        error: conversionJob.error,
        inputFileName: conversionJob.inputFileName,
        outputFormat: conversionJob.outputFormat,
      });
    }

    // Check if the DB status is stale (webhook hasn't updated in 10+ seconds)
    const updatedAt = conversionJob.updatedAt.getTime();
    const now = Date.now();
    const STALE_THRESHOLD_MS = 10_000; // 10 seconds

    if (now - updatedAt > STALE_THRESHOLD_MS) {
      // DB is stale — poll CloudConvert API directly as fallback
      console.log(`[Convert Status] DB stale for job ${jobId} (last update: ${now - updatedAt}ms ago). Polling CloudConvert API...`);

      const cloudConvertStatus = await getJobStatusFromCloudConvert(jobId);

      if (cloudConvertStatus) {
        // Update our DB with the latest status from CloudConvert
        const updateData: Record<string, unknown> = {
          status: cloudConvertStatus.status,
          percent: cloudConvertStatus.percent,
        };

        if (cloudConvertStatus.downloadUrl) {
          updateData.downloadUrl = cloudConvertStatus.downloadUrl;
        }
        if (cloudConvertStatus.outputFilename) {
          updateData.outputFilename = cloudConvertStatus.outputFilename;
        }
        if (cloudConvertStatus.error) {
          updateData.error = cloudConvertStatus.error;
        }

        await db.conversionJob.update({
          where: { jobId },
          data: updateData,
        });

        console.log(`[Convert Status] Updated job ${jobId} from CloudConvert API: status=${cloudConvertStatus.status}, percent=${cloudConvertStatus.percent}`);

        return NextResponse.json({
          jobId: conversionJob.jobId,
          status: cloudConvertStatus.status,
          percent: cloudConvertStatus.percent,
          downloadUrl: cloudConvertStatus.downloadUrl,
          outputFilename: cloudConvertStatus.outputFilename,
          error: cloudConvertStatus.error,
          inputFileName: conversionJob.inputFileName,
          outputFormat: conversionJob.outputFormat,
        });
      }

      // CloudConvert API also failed — return DB data as-is
      console.warn(`[Convert Status] CloudConvert API fallback also failed for job ${jobId}`);
    }

    // Return the current status from our DB (fresh enough or API fallback failed)
    return NextResponse.json({
      jobId: conversionJob.jobId,
      status: conversionJob.status,
      percent: conversionJob.percent,
      downloadUrl: conversionJob.downloadUrl,
      outputFilename: conversionJob.outputFilename,
      error: conversionJob.error,
      inputFileName: conversionJob.inputFileName,
      outputFormat: conversionJob.outputFormat,
    });
  } catch (error) {
    console.error('[Convert Status API] Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to get job status';
    return NextResponse.json(
      { error: message, status: 'error' },
      { status: 500 }
    );
  }
}
