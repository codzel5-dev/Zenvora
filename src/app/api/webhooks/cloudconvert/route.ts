import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * POST /api/webhooks/cloudconvert
 * 
 * CloudConvert webhook callback — called automatically when a job's
 * status changes (job.created, job.finished, job.failed).
 * 
 * Per CloudConvert docs: https://cloudconvert.com/docs/api-reference/webhooks
 * 
 * The webhook payload format is:
 * {
 *   "event": "job.finished" | "job.created" | "job.failed",
 *   "job": {
 *     "id": "...",
 *     "tag": "...",
 *     "status": "...",
 *     "created_at": "...",
 *     "started_at": "...",
 *     "ended_at": "...",
 *     "tasks": [
 *       {
 *         "id": "...",
 *         "name": "...",
 *         "operation": "import/url" | "convert" | "export/url",
 *         "status": "waiting" | "processing" | "finished" | "error",
 *         "message": null | "...",
 *         "percent": 0-100,
 *         "result": {
 *           "files": [{ "filename": "...", "url": "..." }]
 *         }
 *       }
 *     ]
 *   }
 * }
 * 
 * Headers:
 *   Content-Type: application/json
 *   CloudConvert-Signature: <HMAC-SHA256 signature>
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();

    // Log the raw payload for debugging
    console.log('[Webhook] Received payload:', JSON.stringify(rawBody).substring(0, 500));

    // CloudConvert webhook payload has "event" and "job" at top level
    const event = rawBody?.event;
    const job = rawBody?.job;

    if (!job?.id) {
      console.warn('[Webhook] Invalid payload — missing job.id');
      return NextResponse.json({ error: 'Invalid payload: missing job.id' }, { status: 400 });
    }

    const cloudconvertJobId = job.id;
    const jobStatus = job.status;

    console.log(`[Webhook] Event: ${event}, Job: ${cloudconvertJobId}, Status: ${jobStatus}`);

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

    if (job.tasks && Array.isArray(job.tasks)) {
      for (const task of job.tasks) {
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

    // Determine our internal status based on the event and job status
    let newStatus = conversionJob.status;

    if (event === 'job.failed') {
      newStatus = 'error';
      if (!errorMessage) {
        errorMessage = 'CloudConvert reported job.failed event';
      }
    } else if (event === 'job.finished') {
      if (downloadUrl) {
        newStatus = 'finished';
      } else {
        // Job finished but no download URL yet — might need to check tasks
        newStatus = 'finished';
        percent = 100;
      }
    } else if (event === 'job.created') {
      newStatus = 'waiting';
    } else {
      // Fallback: use job.status
      if (jobStatus === 'finished') {
        newStatus = 'finished';
      } else if (jobStatus === 'error') {
        newStatus = 'error';
      } else if (jobStatus === 'processing') {
        newStatus = 'processing';
      }
    }

    // Override to error if any task error was found
    if (errorMessage && newStatus !== 'finished') {
      newStatus = 'error';
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
      `[Webhook] Updated job ${cloudconvertJobId}: event=${event}, status=${newStatus}, percent=${percent}` +
      (downloadUrl ? `, downloadUrl=✓` : '') +
      (errorMessage ? `, error=${errorMessage}` : '')
    );

    // Always return 200 to acknowledge receipt (prevents CloudConvert retries)
    return NextResponse.json({ received: true, event, status: newStatus });
  } catch (error) {
    console.error('[Webhook] Error processing CloudConvert webhook:', error);
    // Return 500 so CloudConvert retries the webhook
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
