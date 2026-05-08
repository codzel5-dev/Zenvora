import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { formatFileSize } from '@/lib/services/file-validation.service';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const category = searchParams.get('category') || undefined;
    const mimeType = searchParams.get('mimeType') || undefined;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.UploadedFileWhereInput = {};
    if (category && category !== 'general') {
      where.category = category;
    }
    if (mimeType) {
      where.mimeType = { startsWith: mimeType };
    }

    const [files, total] = await Promise.all([
      db.uploadedFile.findMany({
        where,
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
          description: true,
          tags: true,
          category: true,
          aiSummary: true,
          thumbnailUrl: true,
        },
      }),
      db.uploadedFile.count({ where }),
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
