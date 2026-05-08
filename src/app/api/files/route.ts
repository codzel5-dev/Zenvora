import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { formatFileSize } from '@/lib/services/file-validation.service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const skip = (page - 1) * limit;

    const [files, total] = await Promise.all([
      db.uploadedFile.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          fileName: true,
          originalName: true,
          fileUrl: true,
          fileSize: true,
          mimeType: true,
          createdAt: true,
          downloadCount: true,
        },
      }),
      db.uploadedFile.count(),
    ]);

    const formattedFiles = files.map((file) => ({
      ...file,
      fileSizeFormatted: formatFileSize(file.fileSize),
      createdAt: file.createdAt.toISOString(),
    }));

    return NextResponse.json({
      files: formattedFiles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('List files error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch files.' },
      { status: 500 }
    );
  }
}
