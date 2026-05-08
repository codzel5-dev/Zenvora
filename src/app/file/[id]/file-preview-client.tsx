'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Sparkles, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilePreview } from '@/components/file/file-preview';
import { FileInfo } from '@/components/file/file-info';
import { FileCard } from '@/components/file/file-card';

interface FileData {
  id: string;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileSize: number;
  fileSizeFormatted: string;
  mimeType: string;
  createdAt: string;
  expiresAt: string | null;
  downloadCount: number;
  description: string;
  tags: string;
  category: string;
  aiSummary: string;
  thumbnailUrl: string;
}

interface FilePreviewClientProps {
  file: FileData;
}

export function FilePreviewClient({ file }: FilePreviewClientProps) {
  const [relatedFiles, setRelatedFiles] = React.useState<FileData[]>([]);
  const [loadingRelated, setLoadingRelated] = React.useState(true);
  const [aiAnalyzed, setAiAnalyzed] = React.useState(!!file.aiSummary);

  React.useEffect(() => {
    fetchRelatedFiles();
  }, [file.id, file.category, file.mimeType]);

  // Listen for AI analysis completion from FileInfo
  React.useEffect(() => {
    const interval = setInterval(async () => {
      if (aiAnalyzed) return;
      try {
        const res = await fetch(`/api/files/${file.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.aiSummary) {
            setAiAnalyzed(true);
          }
        }
      } catch {
        // silently fail
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [file.id, aiAnalyzed]);

  const fetchRelatedFiles = async () => {
    try {
      const categoryParam = file.category && file.category !== 'general' ? `&category=${file.category}` : '';
      const mimeParam = `&mimeType=${file.mimeType.split('/')[0]}`;
      const response = await fetch(`/api/files?limit=6${categoryParam}${mimeParam}`);
      if (response.ok) {
        const data = await response.json();
        const filtered = (data.files || []).filter(
          (f: FileData) => f.id !== file.id
        ).slice(0, 4);
        setRelatedFiles(filtered);
      }
    } catch {
      // Silently fail
    } finally {
      setLoadingRelated(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Back navigation */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* File Name Header with AI Badge */}
      <div className="mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight truncate">
            {file.originalName}
          </h1>
          {aiAnalyzed ? (
            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 gap-1.5">
              <Brain className="h-3 w-3" />
              AI Analyzed
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1.5 text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-700">
              <Sparkles className="h-3 w-3" />
              AI Ready
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
          <span>{file.fileSizeFormatted}</span>
          <span>·</span>
          <span>{file.mimeType}</span>
          <span>·</span>
          <span>{file.downloadCount} downloads</span>
        </div>
      </div>

      {/* Main content - preview + info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview Area - 2/3 width on desktop */}
        <div className="lg:col-span-2">
          <FilePreview
            fileUrl={file.fileUrl}
            mimeType={file.mimeType}
            fileName={file.originalName}
          />
        </div>

        {/* File Info Sidebar - 1/3 width on desktop */}
        <div className="lg:col-span-1">
          <FileInfo
            id={file.id}
            fileName={file.fileName}
            originalName={file.originalName}
            fileUrl={file.fileUrl}
            fileSize={file.fileSize}
            mimeType={file.mimeType}
            createdAt={file.createdAt}
            downloadCount={file.downloadCount}
            description={file.description || undefined}
            tags={file.tags || undefined}
            category={file.category || undefined}
            aiSummary={file.aiSummary || undefined}
          />
        </div>
      </div>

      {/* Related Files */}
      {relatedFiles.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Files</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedFiles.map((related) => (
              <FileCard
                key={related.id}
                id={related.id}
                fileName={related.fileName}
                originalName={related.originalName}
                fileUrl={related.fileUrl}
                fileSize={related.fileSize}
                mimeType={related.mimeType}
                createdAt={related.createdAt}
                downloadCount={related.downloadCount}
                thumbnailUrl={related.thumbnailUrl || undefined}
                tags={related.tags || undefined}
                category={related.category || undefined}
                description={related.description || undefined}
              />
            ))}
          </div>
        </section>
      )}

      {/* No related files message */}
      {!loadingRelated && relatedFiles.length === 0 && (
        <section className="mt-12 text-center py-8 text-muted-foreground">
          <FileText className="h-8 w-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No related files found.</p>
        </section>
      )}
    </div>
  );
}
