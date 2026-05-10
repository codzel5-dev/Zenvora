import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * POST /api/webhooks/cloudconvert
 * 
 * CloudConvert webhook callback — called automatically when a job's
 * status changes (processing → finished / error).
 * 
 * CloudConvert sends a POST with the full job object wrapped in { data: {...} }
 * including all tasks with their results (download URLs, errors, etc.)
 * 
 * We update our ConversionJob record in the database so the client
 * can read the latest status without polling CloudConvert's API.
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();

    // CloudConvert API v2 wraps the response in { data: {...} }
    const jobData = rawBody?.data || rawBody;

    const cloudconvertJobId = jobData?.id;
    const jobStatus = jobData?.status;

    if (!cloudconvertJobId || !jobStatus) {
      console.warn('[Webhook] Invalid payload — missing job ID or status');
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    console.log(`[Webhook] CloudConvert job ${cloudconvertJobId} → ${jobStatus}`);

    // Find the matching ConversionJob in our database
    const conversionJob = await db.conversionJob.findUnique({
      where: { jobId: cloudconvertJobId },
    });

    if (!conversionJob) {
      console.warn(`[Webhook] No ConversionJob found for CloudConvert job ${cloudconvertJobId}`);
      // Still return 200 so CloudConvert doesn't retry
      return NextResponse.json({ received: true, warning: 'Job not found in DB' });
    }

    // Extract data from tasks
    let downloadUrl: string | null = null;
    let outputFilename: string | null = null;
    let percent = conversionJob.percent;
    let errorMessage: string | null = null;

    if (jobData.tasks && Array.isArray(jobData.tasks)) {
      for (const task of jobData.tasks) {
        // Extract progress from convert task
        if (task.operation === 'convert') {
          if (task.status === 'processing' && typeof task.percent === 'number') {
            percent = Math.min(task.percent, 95); // Cap at 95 until export done
          } else if (task.status === 'finished') {
            percent = 95;
          } else if (task.status === 'error') {
            errorMessage = task.message || 'Conversion task failed';
          }
        }

        // Extract download URL from export task
        if (task.operation === 'export/url' && task.status === 'finished') {
          if (task.result?.files?.[0]) {
            downloadUrl = task.result.files[0].url;
            outputFilename = task.result.files[0].filename;
            percent = 100; // Fully complete
          }
        }

        // Check for import errors
        if (task.operation === 'import/url' && task.status === 'error') {
          errorMessage = task.message || 'Failed to import the file. The URL may be inaccessible.';
        }
      }
    }

    // Map CloudConvert status to our internal status
    let newStatus = conversionJob.status;
    if (jobStatus === 'finished' && downloadUrl) {
      newStatus = 'finished';
    } else if (jobStatus === 'error' || errorMessage) {
      newStatus = 'error';
    } else if (jobStatus === 'processing') {
      newStatus = 'processing';
    }

    // Update the database record
    await db.conversionJob.update({
      where: { jobId: cloudconvertJobId },
      data: {
        status: newStatus,
        percent,
        ...(downloadUrl && { downloadUrl }),
        ...(outputFilename && { outputFilename }),
        ...(errorMessage && { error: errorMessage }),
      },
    });

    console.log(
      `[Webhook] Updated job ${cloudconvertJobId}: status=${newStatus}, percent=${percent}` +
      (downloadUrl ? `, downloadUrl=${downloadUrl.substring(0, 80)}...` : '') +
      (errorMessage ? `, error=${errorMessage}` : '')
    );

    // Always return 200 to acknowledge receipt (prevents CloudConvert retries)
    return NextResponse.json({ received: true, status: newStatus });
  } catch (error) {
    console.error('[Webhook] Error processing CloudConvert webhook:', error);
    // Return 500 so CloudConvert retries the webhook
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
