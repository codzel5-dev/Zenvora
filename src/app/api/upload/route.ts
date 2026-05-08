import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { uploadFile } from '@/lib/services/lmfiles.service';
import { validateFile, formatFileSize } from '@/lib/services/file-validation.service';
import { checkRateLimit } from '@/lib/services/rate-limit.service';

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Rate limit check
    const rateLimit = checkRateLimit(ip, 'upload', 10, 60 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Maximum 10 uploads per hour.',
          resetAt: new Date(rateLimit.resetTime).toISOString(),
        },
        { status: 429 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided. Please select a file to upload.' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Upload to lmfiles
    const result = await uploadFile(file);

    // Generate a safe filename
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');

    // Store metadata in database
    const uploadedFile = await db.uploadedFile.create({
      data: {
        fileName: safeName,
        originalName: file.name,
        fileUrl: result.url,
        fileSize: file.size,
        mimeType: file.type || 'application/octet-stream',
        uploaderIp: ip,
        lmfilesId: result.fileId,
      },
    });

    return NextResponse.json(
      {
        id: uploadedFile.id,
        fileName: uploadedFile.fileName,
        originalName: uploadedFile.originalName,
        fileUrl: uploadedFile.fileUrl,
        fileSize: uploadedFile.fileSize,
        fileSizeFormatted: formatFileSize(uploadedFile.fileSize),
        mimeType: uploadedFile.mimeType,
        createdAt: uploadedFile.createdAt.toISOString(),
        remainingUploads: rateLimit.remaining,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed. Please try again later.' },
      { status: 500 }
    );
  }
}
