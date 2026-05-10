import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { uploadFile } from '@/lib/services/lmfiles.service';
import { validateFile, formatFileSize } from '@/lib/services/file-validation.service';

/**
 * POST /api/upload
 * Upload a file, store it via lmfiles.com, and save metadata to the database.
 *
 * Accepts: multipart/form-data with a "file" field
 * Returns: { file: { id, fileName, url, size, mimeType, category, createdAt } }
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided. Please select a file to upload.' },
        { status: 400 }
      );
    }

    // Validate the file
    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Determine category from MIME type
    let category = 'general';
    if (file.type.startsWith('image/')) category = 'image';
    else if (file.type.startsWith('video/')) category = 'video';
    else if (file.type.startsWith('audio/')) category = 'audio';
    else if (file.type === 'application/pdf') category = 'document';
    else if (file.type.includes('word') || file.type.includes('document') || file.type.startsWith('text/')) category = 'document';
    else if (file.type.includes('zip') || file.type.includes('rar') || file.type.includes('7z') || file.type.includes('tar') || file.type.includes('gzip')) category = 'archive';
    else if (file.type.includes('excel') || file.type.includes('spreadsheet')) category = 'spreadsheet';
    else if (file.type.includes('powerpoint') || file.type.includes('presentation')) category = 'presentation';

    // Get client IP (best effort)
    const uploaderIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Upload to lmfiles.com
    let fileUrl = '';
    let lmfilesId = '';

    try {
      const uploadResult = await uploadFile(file);
      fileUrl = uploadResult.url;
      lmfilesId = uploadResult.fileId;
    } catch (uploadError) {
      console.error('lmfiles upload error:', uploadError);
      return NextResponse.json(
        { error: 'File upload failed. Could not store the file. Please try again.' },
        { status: 500 }
      );
    }

    // Generate a safe file name for storage
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const ext = file.name.includes('.') ? file.name.substring(file.name.lastIndexOf('.')) : '';
    const storedFileName = `${timestamp}_${randomSuffix}${ext}`;

    // Save metadata to database
    const savedFile = await db.uploadedFile.create({
      data: {
        fileName: storedFileName,
        originalName: file.name,
        fileUrl,
        fileSize: file.size,
        mimeType: file.type || 'application/octet-stream',
        uploaderIp,
        lmfilesId,
        category,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    console.log(`[Upload] File saved: ${savedFile.id} — ${file.name} (${formatFileSize(file.size)})`);

    return NextResponse.json({
      file: {
        id: savedFile.id,
        fileName: savedFile.originalName,
        url: savedFile.fileUrl,
        size: savedFile.fileSize,
        mimeType: savedFile.mimeType,
        category: savedFile.category,
        createdAt: savedFile.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('[Upload API] Error:', error);
    return NextResponse.json(
      { error: 'Upload failed. An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
