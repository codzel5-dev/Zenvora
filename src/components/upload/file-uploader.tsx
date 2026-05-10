'use client';

import * as React from 'react';
import { CloudUpload, Loader2, X, Check, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface UploadedFileResult {
  id: string;
  fileName: string;
  url: string;
  size: number;
  mimeType: string;
  category: string;
  createdAt: string;
}

export function FileUploader() {
  const [dragOver, setDragOver] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [result, setResult] = React.useState<UploadedFileResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setProgress(0);
    setError(null);
    setResult(null);

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + Math.random() * 15, 90));
      }, 300);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ error: 'Upload failed' }));
        throw new Error(errData.error || 'Upload failed');
      }

      const data = await response.json();
      setProgress(100);
      setResult(data.file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const copyLink = async () => {
    if (!result) return;
    const link = `${window.location.origin}/file/${result.id}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setProgress(0);
    setUploading(false);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (result && !uploading) {
    const shareLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/file/${result.id}`;
    return (
      <Card className="max-w-2xl mx-auto border-green-300 dark:border-green-700 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-semibold text-green-700 dark:text-green-400">Upload Complete!</p>
              <p className="text-sm text-muted-foreground">{result.fileName} ({formatSize(result.size)})</p>
            </div>
            <Button variant="ghost" size="icon" onClick={reset} className="ml-auto">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border/50">
            <code className="flex-1 text-sm truncate">{shareLink}</code>
            <Button variant="outline" size="sm" onClick={copyLink} className="gap-1.5 shrink-0">
              {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <a href={`/file/${result.id}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
                <ExternalLink className="h-3.5 w-3.5" />
                Open
              </Button>
            </a>
          </div>
          <Button onClick={reset} variant="outline" className="w-full mt-4 gap-2">
            <CloudUpload className="h-4 w-4" />
            Upload Another File
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (uploading) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          <div className="text-center">
            <Loader2 className="h-10 w-10 text-emerald-500 mx-auto mb-4 animate-spin" />
            <p className="font-semibold mb-2">Uploading...</p>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-3 max-w-sm mx-auto">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{Math.round(progress)}%</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto border-red-300 dark:border-red-700">
        <CardContent className="p-6 text-center">
          <p className="text-red-600 dark:text-red-400 font-medium mb-2">Upload Failed</p>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <Button onClick={reset} variant="outline">Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      className={`max-w-2xl mx-auto border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer ${
        dragOver
          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 scale-[1.01]'
          : 'border-border hover:border-emerald-400 dark:hover:border-emerald-600 bg-background/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <CloudUpload className={`h-12 w-12 mx-auto mb-4 transition-colors ${dragOver ? 'text-emerald-500' : 'text-muted-foreground'}`} />
      <p className="text-lg font-semibold mb-1">
        {dragOver ? 'Drop your file here' : 'Drag & drop files here'}
      </p>
      <p className="text-sm text-muted-foreground mb-4">
        or click to browse — up to 100MB
      </p>
      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
        <CloudUpload className="h-4 w-4" />
        Choose File
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}
