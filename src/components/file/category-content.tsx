'use client';

import * as React from 'react';
import { FileCard } from '@/components/file/file-card';
import { File, Loader2 } from 'lucide-react';
import { AdBanner } from '@/components/ads/ad-banner';

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
  description?: string;
  tags?: string;
  category?: string;
  aiSummary?: string;
  thumbnailUrl?: string;
}

interface CategoryContentProps {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  heroGradient: string;
}

export function CategoryContent({
  title,
  subtitle,
  description,
  category,
  icon,
  heroGradient,
}: CategoryContentProps) {
  const [files, setFiles] = React.useState<FileItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    fetchFiles(1);
  }, [category]);

  const fetchFiles = async (p: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/files?page=${p}&limit=12&category=${category}`);
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setPage(p);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className={`relative overflow-hidden ${heroGradient}`}>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 dark:bg-black/20 flex items-center justify-center backdrop-blur-sm">
              {icon}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
              <p className="text-muted-foreground mt-1">{subtitle}</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mt-3 leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <AdBanner />
      </div>

      {/* Files Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <span className="ml-3 text-muted-foreground">Loading files...</span>
          </div>
        ) : files.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {files.map((file) => (
                <FileCard
                  key={file.id}
                  id={file.id}
                  fileName={file.fileName}
                  originalName={file.originalName}
                  fileUrl={file.fileUrl}
                  fileSize={file.fileSize}
                  mimeType={file.mimeType}
                  createdAt={file.createdAt}
                  downloadCount={file.downloadCount}
                  thumbnailUrl={file.thumbnailUrl || undefined}
                  tags={file.tags || undefined}
                  category={file.category || undefined}
                  description={file.description || undefined}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => fetchFiles(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm rounded-md border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => fetchFiles(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 text-sm rounded-md border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <File className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" />
            <h3 className="text-lg font-semibold mb-2">No files yet</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              There are no {title.toLowerCase()} uploaded yet. Be the first to contribute!
            </p>
            <a
              href="/"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              Upload a File
            </a>
          </div>
        )}
      </section>
    </>
  );
}
