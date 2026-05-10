import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/convert/status/[jobId]
 * 
 * Check the status of a conversion job.
 * Reads from our database (updated by CloudConvert webhook) — no CloudConvert API call needed.
 * This is fast and reliable since it's just a local DB read.
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

    // Return the current status from our DB
    // The webhook updates this record, so no CloudConvert API call is needed
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
