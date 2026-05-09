import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/services/lmfiles.service';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const maxSize = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '104857600', 10);
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB.` },
        { status: 400 }
      );
    }

    // Upload to lmfiles
    const result = await uploadFile(file);

    // Get uploader IP
    const forwarded = request.headers.get('x-forwarded-for');
    const uploaderIp = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

    // Categorize by MIME type
    const mime = file.type || 'application/octet-stream';
    let category = 'general';
    if (mime.startsWith('image/')) category = 'image';
    else if (mime.startsWith('video/')) category = 'video';
    else if (mime.startsWith('audio/')) category = 'audio';
    else if (mime.includes('pdf') || mime.includes('document') || mime.includes('spreadsheet') || mime.includes('presentation') || mime.startsWith('text/')) category = 'document';
    else if (mime.includes('zip') || mime.includes('rar') || mime.includes('tar') || mime.includes('compressed')) category = 'archive';

    // Save to database
    const uploadedFile = await db.uploadedFile.create({
      data: {
        fileName: result.fileId,
        originalName: file.name,
        fileUrl: result.url,
        fileSize: file.size,
        mimeType: mime,
        uploaderIp,
        lmfilesId: result.fileId,
        category,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    return NextResponse.json({
      success: true,
      file: {
        id: uploadedFile.id,
        fileName: uploadedFile.originalName,
        url: uploadedFile.fileUrl,
        size: uploadedFile.fileSize,
        mimeType: uploadedFile.mimeType,
        category: uploadedFile.category,
        createdAt: uploadedFile.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('[Upload API] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
