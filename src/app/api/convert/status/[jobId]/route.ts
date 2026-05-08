import { NextRequest, NextResponse } from 'next/server';
import { getJobStatus } from '@/lib/services/cloudconvert.service';

/**
 * GET /api/convert/status/[jobId]
 * Check the status of a CloudConvert conversion job
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    const status = await getJobStatus(jobId);

    return NextResponse.json({
      jobId,
      status: status.status,
      percent: status.percent,
      downloadUrl: status.downloadUrl,
      outputFilename: status.outputFilename,
      error: status.error,
    });
  } catch (error) {
    console.error('[Convert Status API] Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to get job status';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
