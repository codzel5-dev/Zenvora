import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { formatFileSize } from '@/lib/services/file-validation.service';
import { FilePreviewClient } from './file-preview-client';

interface FilePageProps {
  params: Promise<{ id: string }>;
}

async function getFile(id: string) {
  try {
    const file = await db.uploadedFile.findUnique({
      where: { id },
    });
    return file;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: FilePageProps): Promise<Metadata> {
  const { id } = await params;
  const file = await getFile(id);

  if (!file) {
    return {
      title: 'File Not Found',
      description: 'The requested file could not be found.',
    };
  }

  const isImage = file.mimeType.startsWith('image/');
  const title = file.originalName || file.fileName;
  const description = file.aiSummary || file.description || `${title} - ${formatFileSize(file.fileSize)} ${file.mimeType} file shared via Zenvoora`;

  return {
    title: `${title} | Zenvoora`,
    description,
    openGraph: {
      title: `${title} | Zenvoora`,
      description,
      type: 'article',
      ...(isImage ? { images: [{ url: file.thumbnailUrl || file.fileUrl, alt: title }] } : {}),
      url: `https://zenvoora.netlify.app/file/${id}`,
      siteName: 'Zenvoora',
    },
    twitter: {
      card: isImage ? 'summary_large_image' : 'summary',
      title: `${title} | Zenvoora`,
      description,
      ...(isImage ? { images: [file.thumbnailUrl || file.fileUrl] } : {}),
    },
  };
}

export default async function FilePage({ params }: FilePageProps) {
  const { id } = await params;
  const file = await getFile(id);

  if (!file) {
    notFound();
  }

  const fileData = {
    id: file.id,
    fileName: file.fileName,
    originalName: file.originalName,
    fileUrl: file.fileUrl,
    fileSize: file.fileSize,
    fileSizeFormatted: formatFileSize(file.fileSize),
    mimeType: file.mimeType,
    createdAt: file.createdAt.toISOString(),
    expiresAt: file.expiresAt?.toISOString() || null,
    downloadCount: file.downloadCount,
    description: file.description,
    tags: file.tags,
    category: file.category,
    aiSummary: file.aiSummary,
    thumbnailUrl: file.thumbnailUrl,
  };

  return <FilePreviewClient file={fileData} />;
}
