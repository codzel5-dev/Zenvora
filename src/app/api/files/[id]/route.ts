import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { deleteFile as deleteFromLmfiles } from '@/lib/services/lmfiles.service';
import { formatFileSize } from '@/lib/services/file-validation.service';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const file = await db.uploadedFile.findUnique({
      where: { id },
    });

    if (!file) {
      return NextResponse.json(
        { error: 'File not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...file,
      fileSizeFormatted: formatFileSize(file.fileSize),
      createdAt: file.createdAt.toISOString(),
      expiresAt: file.expiresAt?.toISOString() || null,
    });
  } catch (error) {
    console.error('Get file error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch file.' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const file = await db.uploadedFile.findUnique({
      where: { id },
    });

    if (!file) {
      return NextResponse.json(
        { error: 'File not found.' },
        { status: 404 }
      );
    }

    // Increment download count
    const updated = await db.uploadedFile.update({
      where: { id },
      data: {
        downloadCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      downloadCount: updated.downloadCount,
    });
  } catch (error) {
    console.error('Patch file error:', error);
    return NextResponse.json(
      { error: 'Failed to update file.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const file = await db.uploadedFile.findUnique({
      where: { id },
    });

    if (!file) {
      return NextResponse.json(
        { error: 'File not found.' },
        { status: 404 }
      );
    }

    // Delete from lmfiles if we have an ID
    if (file.lmfilesId) {
      try {
        await deleteFromLmfiles(file.lmfilesId);
      } catch (err) {
        console.error('Failed to delete from lmfiles:', err);
        // Continue with DB deletion even if lmfiles deletion fails
      }
    }

    // Delete from database
    await db.uploadedFile.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'File deleted successfully.' });
  } catch (error) {
    console.error('Delete file error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file.' },
      { status: 500 }
    );
  }
}
