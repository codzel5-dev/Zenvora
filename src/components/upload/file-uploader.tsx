'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloudUpload,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Archive,
  File,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CopyButton } from './copy-button';
import { validateFile, formatFileSize } from '@/lib/services/file-validation.service';

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

interface UploadedFileResult {
  id: string;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileSize: number;
  fileSizeFormatted: string;
  mimeType: string;
  createdAt: string;
  remainingUploads: number;
}

export function FileUploader() {
  const [uploadState, setUploadState] = React.useState<UploadState>('idle');
  const [progress, setProgress] = React.useState(0);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [result, setResult] = React.useState<UploadedFileResult | null>(null);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const reset = () => {
    setUploadState('idle');
    setProgress(0);
    setSelectedFile(null);
    setResult(null);
    setErrorMessage('');
  };

  const handleFileSelect = (file: File) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }
    setSelectedFile(file);
    setUploadState('idle');
    setProgress(0);
    setResult(null);
    setErrorMessage('');
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadState('uploading');
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Simulate progress since fetch doesn't support upload progress natively
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data: UploadedFileResult = await response.json();
      setProgress(100);

      // Small delay for the progress bar to reach 100%
      await new Promise((resolve) => setTimeout(resolve, 300));

      setResult(data);
      setUploadState('success');
      toast.success('File uploaded successfully!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed. Please try again.';
      setErrorMessage(message);
      setUploadState('error');
      toast.error(message);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const getFileIcon = (mime: string) => {
    if (mime.startsWith('image/')) return <ImageIcon className="h-8 w-8 text-emerald-500" />;
    if (mime.startsWith('video/')) return <Video className="h-8 w-8 text-blue-500" />;
    if (mime.startsWith('audio/')) return <Music className="h-8 w-8 text-purple-500" />;
    if (mime.includes('zip') || mime.includes('rar') || mime.includes('7z'))
      return <Archive className="h-8 w-8 text-orange-500" />;
    if (mime.includes('pdf') || mime.includes('document') || mime.includes('text'))
      return <FileText className="h-8 w-8 text-red-500" />;
    return <File className="h-8 w-8 text-muted-foreground" />;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {/* Idle / File Selected State */}
        {(uploadState === 'idle' || uploadState === 'error') && (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
                isDragOver
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 scale-[1.02]'
                  : selectedFile
                  ? 'border-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/10'
                  : 'border-muted-foreground/25 hover:border-emerald-400 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/10'
              }`}
              role="button"
              tabIndex={0}
              aria-label="Upload file by clicking or dragging"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleInputChange}
                aria-hidden="true"
              />

              <div className="flex flex-col items-center gap-4">
                <div className={`rounded-full p-4 transition-colors ${
                  isDragOver
                    ? 'bg-emerald-100 dark:bg-emerald-900/40'
                    : 'bg-muted'
                }`}>
                  <CloudUpload className={`h-10 w-10 ${
                    isDragOver
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-muted-foreground'
                  }`} />
                </div>

                {selectedFile ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      {getFileIcon(selectedFile.type)}
                      <div className="text-left">
                        <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-xs">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Click to change file or upload below
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-base font-medium">
                      Drop your file here, or{' '}
                      <span className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2">
                        browse
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Images, videos, audio, documents, and archives up to 100MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Button */}
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex justify-center"
              >
                <Button
                  onClick={handleUpload}
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 min-w-[200px]"
                >
                  <CloudUpload className="h-5 w-5" />
                  Upload File
                </Button>
              </motion.div>
            )}

            {/* Error Message */}
            {uploadState === 'error' && errorMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 flex items-center gap-2 justify-center text-sm text-destructive"
              >
                <AlertCircle className="h-4 w-4" />
                {errorMessage}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Uploading State */}
        {uploadState === 'uploading' && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border bg-card p-8 sm:p-12 text-center"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="rounded-full p-4 bg-emerald-100 dark:bg-emerald-900/40">
                <Loader2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400 animate-spin" />
              </div>
              <div className="space-y-2 w-full max-w-sm">
                <p className="text-sm font-medium">Uploading {selectedFile?.name}...</p>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground">{Math.round(progress)}%</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Success State */}
        {uploadState === 'success' && result && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border bg-card p-8 sm:p-12"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="rounded-full p-4 bg-emerald-100 dark:bg-emerald-900/40">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-lg font-semibold">Upload Complete!</h3>
                <p className="text-sm text-muted-foreground">
                  {result.originalName} ({result.fileSizeFormatted})
                </p>
              </div>

              {/* Shareable Link */}
              <div className="w-full max-w-md">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Shareable Link
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-md border bg-muted/50 px-3 py-2 text-sm truncate">
                    {result.fileUrl}
                  </div>
                  <CopyButton text={result.fileUrl} />
                </div>
              </div>

              <Button
                variant="outline"
                onClick={reset}
                className="mt-2 gap-2"
              >
                <CloudUpload className="h-4 w-4" />
                Upload Another File
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
