import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { uploadFile } from '@/lib/services/lmfiles.service';
import { headers } from 'next/headers';

const MAX_FILE_SIZE = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '104857600', 10);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds the ${Math.round(MAX_FILE_SIZE / 1024 / 1024)}MB limit.` },
        { status: 400 }
      );
    }

    // Upload to lmfiles.com
    const uploadResult = await uploadFile(file);

    // Get client IP
    const headersList = await headers();
    const uploaderIp = headersList.get('x-forwarded-for')?.split(',')[0]?.trim()
      || headersList.get('x-real-ip')
      || 'unknown';

    // Save file metadata to database
    const savedFile = await db.uploadedFile.create({
      data: {
        fileName: file.name,
        originalName: file.name,
        fileUrl: uploadResult.url,
        fileSize: file.size,
        mimeType: file.type || 'application/octet-stream',
        uploaderIp,
        lmfilesId: uploadResult.fileId,
      },
    });

    // Build public file URL
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenvoora.vercel.app';
    const publicUrl = `${siteUrl}/file/${savedFile.id}`;

    return NextResponse.json({
      id: savedFile.id,
      fileName: savedFile.fileName,
      fileUrl: savedFile.fileUrl,
      publicUrl,
      fileSize: savedFile.fileSize,
      mimeType: savedFile.mimeType,
      createdAt: savedFile.createdAt.toISOString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed.' },
      { status: 500 }
    );
  }
}
