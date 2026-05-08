'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Archive,
  File,
  Table2,
  Presentation,
  Download,
} from 'lucide-react';
import { formatFileSize } from '@/lib/services/file-validation.service';

interface FileCardProps {
  id: string;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
  downloadCount: number;
  thumbnailUrl?: string;
  tags?: string;
  category?: string;
  description?: string;
}

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith('image/')) return <ImageIcon className="h-6 w-6 text-emerald-500" />;
  if (mimeType.startsWith('video/')) return <Video className="h-6 w-6 text-sky-500" />;
  if (mimeType.startsWith('audio/')) return <Music className="h-6 w-6 text-purple-500" />;
  if (mimeType.includes('pdf')) return <FileText className="h-6 w-6 text-red-500" />;
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z'))
    return <Archive className="h-6 w-6 text-orange-500" />;
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet'))
    return <Table2 className="h-6 w-6 text-green-600" />;
  if (mimeType.includes('powerpoint') || mimeType.includes('presentation'))
    return <Presentation className="h-6 w-6 text-amber-600" />;
  if (mimeType.includes('word') || mimeType.includes('document') || mimeType.startsWith('text/'))
    return <FileText className="h-6 w-6 text-blue-600" />;
  return <File className="h-6 w-6 text-muted-foreground" />;
}

function getCategoryBadge(category: string) {
  const colors: Record<string, string> = {
    images: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    videos: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400',
    audio: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
    documents: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    text: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    general: 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-400',
  };
  return colors[category] || colors.general;
}

export function FileCard({
  id,
  originalName,
  fileUrl,
  fileSize,
  mimeType,
  createdAt,
  downloadCount,
  thumbnailUrl,
  tags,
  category,
}: FileCardProps) {
  const isImage = mimeType.startsWith('image/');
  const parsedTags = tags ? tags.split(',').filter(Boolean).slice(0, 3) : [];
  const displayCategory = category || 'general';

  return (
    <Link href={`/file/${id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700">
        {/* Thumbnail / Preview */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
          {isImage && thumbnailUrl ? (
            <Image
              src={thumbnailUrl || fileUrl}
              alt={originalName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : isImage ? (
            <Image
              src={fileUrl}
              alt={originalName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-muted to-muted/50">
              {getFileIcon(mimeType)}
            </div>
          )}
          {/* Category badge */}
          <div className="absolute top-2 left-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${getCategoryBadge(displayCategory)}`}>
              {displayCategory}
            </span>
          </div>
          {/* Download count */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
            <Download className="h-3 w-3" />
            {downloadCount}
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="text-sm font-semibold truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {originalName}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <span>{formatFileSize(fileSize)}</span>
            <span>·</span>
            <span>{mimeType.split('/').pop()?.toUpperCase()}</span>
          </div>
          {parsedTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {parsedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          )}
          <p className="text-[10px] text-muted-foreground mt-2">
            {new Date(createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
