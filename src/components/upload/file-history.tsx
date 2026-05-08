'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Archive,
  File,
  Table2,
  Presentation,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CopyButton } from './copy-button';
import { formatFileSize } from '@/lib/services/file-validation.service';

interface FileItem {
  id: string;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileSize: number;
  fileSizeFormatted: string;
  mimeType: string;
  createdAt: string;
  downloadCount: number;
}

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith('image/')) return <ImageIcon className="h-5 w-5 text-emerald-500" />;
  if (mimeType.startsWith('video/')) return <Video className="h-5 w-5 text-blue-500" />;
  if (mimeType.startsWith('audio/')) return <Music className="h-5 w-5 text-purple-500" />;
  if (mimeType.includes('pdf')) return <FileText className="h-5 w-5 text-red-500" />;
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z'))
    return <Archive className="h-5 w-5 text-orange-500" />;
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet'))
    return <Table2 className="h-5 w-5 text-green-600" />;
  if (mimeType.includes('powerpoint') || mimeType.includes('presentation'))
    return <Presentation className="h-5 w-5 text-amber-600" />;
  if (mimeType.includes('word') || mimeType.includes('document') || mimeType.startsWith('text/'))
    return <FileText className="h-5 w-5 text-blue-600" />;
  return <File className="h-5 w-5 text-muted-foreground" />;
}

function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString();
}

export function FileHistory() {
  const [files, setFiles] = React.useState<FileItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/files?limit=10');
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
      }
    } catch {
      // Silently fail for file history
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 bg-muted rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-3 bg-muted rounded w-1/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <File className="h-10 w-10 mx-auto mb-3 opacity-40" />
        <p className="text-sm">No files uploaded yet. Be the first to upload!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <Card key={file.id} className="group hover:shadow-sm transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {getFileIcon(file.mimeType)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.originalName}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span>{file.fileSizeFormatted}</span>
                  <span>·</span>
                  <span>{timeAgo(file.createdAt)}</span>
                  <span>·</span>
                  <span>{file.downloadCount} downloads</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <CopyButton text={file.fileUrl} size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {files.length >= 10 && (
        <div className="text-center pt-2">
          <Link
            href="/about"
            className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            View all uploads →
          </Link>
        </div>
      )}
    </div>
  );
}
