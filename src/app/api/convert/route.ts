import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createConversionJob, getAvailableFormats, CONVERSION_MAP } from '@/lib/services/cloudconvert.service';
import { getRemainingQuota } from '@/lib/services/cloudconvert-keys';

/**
 * POST /api/convert
 * Start a file conversion job
 * 
 * Body: { fileUrl: string, mimeType: string, fileName: string, outputFormat: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileUrl, mimeType, fileName, outputFormat } = body;

    if (!fileUrl || !mimeType || !fileName || !outputFormat) {
      return NextResponse.json(
        { error: 'Missing required fields: fileUrl, mimeType, fileName, outputFormat' },
        { status: 400 }
      );
    }

    // Validate that the conversion is supported
    const availableFormats = getAvailableFormats(mimeType);
    if (availableFormats.length === 0) {
      return NextResponse.json(
        { error: `Conversion is not supported for files of type "${mimeType}".` },
        { status: 400 }
      );
    }

    if (!availableFormats.includes(outputFormat)) {
      return NextResponse.json(
        { error: `Cannot convert "${mimeType}" to "${outputFormat}". Available formats: ${availableFormats.join(', ')}` },
        { status: 400 }
      );
    }

    // Check quota before starting
    const quota = getRemainingQuota();
    if (quota.total <= 0) {
      return NextResponse.json(
        { error: `Daily conversion quota exhausted (${quota.used}/${quota.limit}). Please try again tomorrow.` },
        { status: 429 }
      );
    }

    // Create the conversion job on CloudConvert (with webhook)
    const result = await createConversionJob(fileUrl, mimeType, outputFormat, fileName);

    // Save job to our database so the webhook can update it later
    await db.conversionJob.create({
      data: {
        jobId: result.jobId,
        status: 'waiting',
        percent: 0,
        inputFileName: fileName,
        inputMimeType: mimeType,
        outputFormat,
        fileUrl,
        keyLabel: result.keyLabel,
      },
    });

    console.log(`[Convert API] Job ${result.jobId} created and saved to DB`);

    return NextResponse.json({
      success: true,
      jobId: result.jobId,
      message: 'Conversion job created. CloudConvert will notify our webhook when done.',
    });
  } catch (error) {
    console.error('[Convert API] Error:', error);
    const message = error instanceof Error ? error.message : 'Conversion failed';
    const status = message.includes('quota exhausted') || message.includes('No available') ? 429 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

/**
 * GET /api/convert
 * Get available conversion formats and quota info
 * 
 * Query params: ?mimeType=image/png
 */
export async function GET(request: NextRequest) {
  try {
    const mimeType = request.nextUrl.searchParams.get('mimeType');
    const quota = getRemainingQuota();

    if (mimeType) {
      const availableFormats = getAvailableFormats(mimeType);
      return NextResponse.json({
        mimeType,
        availableFormats,
        supported: availableFormats.length > 0,
        quota,
      });
    }

    // Return all supported conversion mappings and quota
    const supportedTypes = Object.keys(CONVERSION_MAP);
    return NextResponse.json({
      supportedTypes,
      conversionMap: CONVERSION_MAP,
      quota,
    });
  } catch (error) {
    console.error('[Convert API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to get conversion info' },
      { status: 500 }
    );
  }
}
