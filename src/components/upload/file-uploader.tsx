'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadResult {
  id: string;
  fileName: string;
  fileUrl: string;
  publicUrl: string;
  fileSize: number;
  mimeType: string;
}

export function FileUploader() {
  const router = useRouter();
  const [dragActive, setDragActive] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [analyzing, setAnalyzing] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState<UploadResult | null>(null);
  const [error, setError] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    if (file.size > 104857600) {
      setError('File size exceeds 100MB limit');
      return;
    }

    setUploading(true);
    setError('');
    setUploadedFile(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Upload failed' }));
        throw new Error(data.error || 'Upload failed');
      }

      const data: UploadResult = await response.json();
      setUploadedFile(data);

      // Auto-trigger AI analysis in the background
      setAnalyzing(true);
      try {
        await fetch('/api/ai/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileId: data.id,
            fileUrl: data.fileUrl,
            mimeType: data.mimeType,
          }),
        });
      } catch {
        // AI analysis can fail silently - user can retry on file page
      } finally {
        setAnalyzing(false);
      }

      // Redirect to file page after short delay
      setTimeout(() => {
        router.push(`/file/${data.id}`);
      }, 1500);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleUpload(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpload(e.target.files);
  };

  // Upload success state - show progress then redirect
  if (uploadedFile) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="border-2 border-emerald-500/50 rounded-2xl p-8 text-center bg-emerald-500/5">
          <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
          <p className="text-lg font-semibold mb-2">Upload Complete!</p>
          <p className="text-sm text-muted-foreground mb-4">{uploadedFile.fileName}</p>

          {analyzing ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 text-purple-500 animate-spin" />
              <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                AI is analyzing your file...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                Redirecting to file page...
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/file/${uploadedFile.id}`)}
              >
                View File Page
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-colors cursor-pointer ${
          dragActive
            ? 'border-emerald-500 bg-emerald-500/5'
            : 'border-muted-foreground/25 hover:border-emerald-500/50 hover:bg-muted/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
        />
        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-medium mb-1">
          {uploading ? 'Uploading...' : 'Drag & drop your file here'}
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          or click to browse — up to 100MB
        </p>
        {uploading && (
          <div className="w-48 h-2 bg-muted rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        )}
        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
}
