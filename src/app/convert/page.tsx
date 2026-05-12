'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  FileSearch,
  Upload,
  ArrowRight,
  Check,
  AlertCircle,
  Loader2,
  Download,
  RefreshCw,
  X,
  File,
  Image as ImageIcon,
  FileText,
  Video,
  Music,
  Archive,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdBanner } from '@/components/ads/ad-banner';

interface ConversionState {
  step: 'select' | 'upload' | 'converting' | 'done' | 'error';
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  outputFormat: string;
  jobId: string | null;
  percent: number;
  downloadUrl: string | null;
  outputFilename: string | null;
  error: string | null;
  availableFormats: string[];
}

const initialState: ConversionState = {
  step: 'select',
  fileUrl: '',
  fileName: '',
  fileSize: 0,
  mimeType: '',
  outputFormat: '',
  jobId: null,
  percent: 0,
  downloadUrl: null,
  outputFilename: null,
  error: null,
  availableFormats: [],
};

export default function ConvertPage() {
  return (
    <React.Suspense fallback={<ConvertLoading />}>
      <ConvertPageContent />
    </React.Suspense>
  );
}

function ConvertLoading() {
  return (
    <div className="flex items-center justify-center py-32">
      <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
    </div>
  );
}

function ConvertPageContent() {
  const searchParams = useSearchParams();
  const [state, setState] = React.useState<ConversionState>(initialState);
  const [dragOver, setDragOver] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [quota, setQuota] = React.useState<{ total: number; used: number; limit: number } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const pollIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const pollStartTimeRef = React.useRef<number>(0);
  const pollErrorCountRef = React.useRef<number>(0);
  const [prefilled, setPrefilled] = React.useState(false);

  // Fetch quota on mount + handle URL params
  React.useEffect(() => {
    fetch('/api/convert')
      .then(r => r.json())
      .then(data => setQuota(data.quota))
      .catch(() => {});
  }, []);

  // Handle URL params (from file page)
  React.useEffect(() => {
    if (prefilled) return;
    const fileUrl = searchParams.get('fileUrl');
    const mimeType = searchParams.get('mimeType');
    const fileName = searchParams.get('fileName');

    if (fileUrl && mimeType && fileName) {
      setPrefilled(true);
      // Get available formats
      fetch(`/api/convert?mimeType=${encodeURIComponent(mimeType)}`)
        .then(r => r.json())
        .then(formatsData => {
          setState(prev => ({
            ...prev,
            step: 'select',
            fileUrl,
            fileName,
            fileSize: 0,
            mimeType,
            availableFormats: formatsData.availableFormats || [],
            outputFormat: formatsData.availableFormats?.[0] || '',
          }));
        })
        .catch(() => {});
    }
  }, [searchParams, prefilled]);

  // Cleanup polling on unmount
  React.useEffect(() => {
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, []);

  // Handle file selection
  const handleFileSelect = async (file: File) => {
    setUploading(true);
    setState({ ...initialState, step: 'upload' });

    try {
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json().catch(() => ({ error: 'Upload failed' }));
        throw new Error(err.error || 'Upload failed');
      }

      const uploadData = await uploadRes.json();

      // Debug: log upload response to verify fileUrl
      console.log('[Convert Page] Upload response:', {
        fileUrl: uploadData.fileUrl,
        id: uploadData.id,
        mimeType: uploadData.mimeType,
      });

      const resolvedFileUrl = uploadData.fileUrl || uploadData.file?.url || uploadData.url || '';

      if (!resolvedFileUrl) {
        throw new Error('Upload succeeded but file URL was not returned. Please try again.');
      }

      // Get available formats for this MIME type
      const formatsRes = await fetch(`/api/convert?mimeType=${encodeURIComponent(file.type)}`);
      const formatsData = await formatsRes.json();

      setState(prev => ({
        ...prev,
        step: 'select',
        fileUrl: resolvedFileUrl,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        availableFormats: formatsData.availableFormats || [],
        outputFormat: formatsData.availableFormats?.[0] || '',
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        step: 'error',
        error: error instanceof Error ? error.message : 'Upload failed',
      }));
    } finally {
      setUploading(false);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  // Start conversion
  const startConversion = async () => {
    if (!state.fileUrl || !state.outputFormat) {
      setState(prev => ({
        ...prev,
        step: 'error',
        error: !state.fileUrl
          ? 'File URL is missing. Please re-upload the file and try again.'
          : 'Please select an output format first.',
      }));
      return;
    }

    setState(prev => ({ ...prev, step: 'converting', percent: 0, error: null }));

    try {
      const res = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileUrl: state.fileUrl,
          mimeType: state.mimeType,
          fileName: state.fileName,
          outputFormat: state.outputFormat,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Conversion failed to start');
      }

      // Validate that we got a valid job ID from the API
      if (!data.jobId) {
        throw new Error('Conversion job was not created properly. No job ID returned from server.');
      }

      const jobId = data.jobId;
      setState(prev => ({ ...prev, jobId }));
      pollStartTimeRef.current = Date.now();
      pollErrorCountRef.current = 0;

      // Poll our local DB for status (updated by CloudConvert webhook).
      // Since this reads from our own database, it's very fast (no CloudConvert API call).
      // We poll every 1.5s for near-instant feedback.
      pollIntervalRef.current = setInterval(async () => {
        try {
          // Timeout after 3 minutes
          if (Date.now() - pollStartTimeRef.current > 180000) {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            setState(prev => ({
              ...prev,
              step: 'error',
              error: 'Conversion timed out. Please try again.',
            }));
            return;
          }

          const statusRes = await fetch(`/api/convert/status/${jobId}`);

          if (!statusRes.ok) {
            pollErrorCountRef.current += 1;
            if (pollErrorCountRef.current >= 8) {
              throw new Error('Too many failed status checks. The conversion may have failed.');
            }
            return;
          }

          // Reset error count on successful poll
          pollErrorCountRef.current = 0;

          const statusData = await statusRes.json();

          if (statusData.status === 'finished' && statusData.downloadUrl) {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            setState(prev => ({
              ...prev,
              step: 'done',
              percent: 100,
              downloadUrl: statusData.downloadUrl,
              outputFilename: statusData.outputFilename,
            }));
          } else if (statusData.status === 'error') {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            setState(prev => ({
              ...prev,
              step: 'error',
              error: statusData.error || 'Conversion failed',
            }));
          } else if (statusData.status === 'processing') {
            setState(prev => ({
              ...prev,
              percent: typeof statusData.percent === 'number' && statusData.percent > 0
                ? statusData.percent
                : Math.min(prev.percent + 5, 90),
            }));
          } else {
            // Still waiting — slow progress animation
            setState(prev => ({
              ...prev,
              percent: Math.min(prev.percent + 2, 20),
            }));
          }
        } catch (pollError) {
          pollErrorCountRef.current += 1;
          if (pollErrorCountRef.current >= 8) {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            setState(prev => ({
              ...prev,
              step: 'error',
              error: pollError instanceof Error ? pollError.message : 'Failed to check conversion status',
            }));
          } else {
            console.warn('[Convert] Status poll error:', pollError);
          }
        }
      }, 1500);
    } catch (error) {
      setState(prev => ({
        ...prev,
        step: 'error',
        error: error instanceof Error ? error.message : 'Conversion failed',
      }));
    }
  };

  // Reset
  const reset = () => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    setState(initialState);
  };

  // File size formatter
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-transparent to-orange-50/50 dark:from-amber-950/30 dark:via-transparent dark:to-orange-950/20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
              <FileSearch className="h-7 w-7 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">File Converter</h1>
              <p className="text-muted-foreground mt-1">Convert files between formats instantly</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mt-3 leading-relaxed">
            Upload any file and convert it to a different format. We support image conversions, document transformations,
            video/audio transcoding, and more. Powered by CloudConvert — fast, secure, and free.
          </p>
          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <Badge variant="secondary" className="text-sm px-3 py-1">200+ Formats</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">Free Conversion</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">No Sign-up</Badge>
            {quota && (
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {quota.total} conversions left today
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <AdBanner />
      </div>

      {/* Main Converter Area */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: Upload / Select File */}
        {(state.step === 'select' || state.step === 'upload') && (
          <Card className="border-2 border-dashed border-border hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
            <CardContent className="p-8">
              {/* No file uploaded — show upload area */}
              {!state.fileName && !uploading && (
                <div
                  className={`text-center py-12 transition-colors ${dragOver ? 'bg-amber-50 dark:bg-amber-950/20 rounded-xl' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Upload a file to convert</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop a file here, or click to browse
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Choose File
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-4">
                    Supported: Images, Documents, Videos, Audio, Archives — up to 100MB
                  </p>
                </div>
              )}

              {/* Uploading state */}
              {uploading && (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 text-amber-500 mx-auto mb-4 animate-spin" />
                  <h3 className="text-lg font-semibold mb-2">Uploading your file...</h3>
                  <p className="text-muted-foreground">Please wait while we upload your file</p>
                </div>
              )}

              {/* File uploaded — show conversion options */}
              {state.fileName && !uploading && (
                <div className="space-y-6">
                  {/* File Info */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
                    <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
                      <File className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{state.fileName}</p>
                      <p className="text-sm text-muted-foreground">
                        {state.mimeType} • {state.fileSize > 0 ? formatSize(state.fileSize) : 'Remote file'}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={reset} className="flex-shrink-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Available formats */}
                  {state.availableFormats.length > 0 ? (
                    <div>
                      <label className="block text-sm font-semibold mb-3">
                        Convert to:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {state.availableFormats.map(fmt => (
                          <button
                            key={fmt}
                            onClick={() => setState(prev => ({ ...prev, outputFormat: fmt }))}
                            className={`px-4 py-2.5 text-sm font-medium rounded-lg border transition-all ${
                              state.outputFormat === fmt
                                ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                                : 'bg-background border-border hover:border-amber-300 dark:hover:border-amber-700 text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            .{fmt.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <p className="text-sm font-medium text-red-700 dark:text-red-400">
                          Conversion is not supported for this file type ({state.mimeType})
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Convert Button */}
                  {state.availableFormats.length > 0 && state.outputFormat && (
                    <Button
                      onClick={startConversion}
                      className="w-full h-12 text-base bg-amber-600 hover:bg-amber-700 text-white gap-2"
                    >
                      <Sparkles className="h-5 w-5" />
                      Convert to {state.outputFormat.toUpperCase()}
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Converting */}
        {state.step === 'converting' && (
          <Card className="border-amber-300 dark:border-amber-700">
            <CardContent className="p-8">
              <div className="text-center py-8">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-amber-200 dark:border-amber-800" />
                  <div className="absolute inset-0 rounded-full border-4 border-amber-600 dark:border-amber-400 border-t-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                      {Math.min(Math.round(state.percent), 95)}%
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">Converting your file...</h3>
                <p className="text-muted-foreground mb-1">
                  {state.fileName} → {state.outputFormat.toUpperCase()}
                </p>
                <p className="text-sm text-muted-foreground">
                  This may take a moment depending on the file size and format
                </p>

                {/* Progress bar */}
                <div className="mt-6 w-full max-w-sm mx-auto">
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-600 dark:bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(state.percent, 95)}%` }}
                    />
                  </div>
                </div>

                <Button variant="ghost" onClick={reset} className="mt-6 text-muted-foreground">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Done */}
        {state.step === 'done' && state.downloadUrl && (
          <Card className="border-green-300 dark:border-green-700">
            <CardContent className="p-8">
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-400">
                  Conversion Complete!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your file has been successfully converted
                </p>

                {/* Conversion summary */}
                <div className="max-w-sm mx-auto p-4 rounded-xl bg-muted/50 border border-border/50 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">From:</span>
                    <span className="font-medium">{state.fileName}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 mx-auto my-2 text-muted-foreground" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">To:</span>
                    <span className="font-medium">{state.outputFilename || `converted.${state.outputFormat}`}</span>
                  </div>
                </div>

                {/* Download button */}
                <a
                  href={state.downloadUrl}
                  download={state.outputFilename || `converted.${state.outputFormat}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 h-12 text-base px-8">
                    <Download className="h-5 w-5" />
                    Download {state.outputFormat.toUpperCase()} File
                  </Button>
                </a>

                <div className="mt-4">
                  <Button variant="outline" onClick={reset} className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Convert Another File
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {state.step === 'error' && state.error && (
          <Card className="border-red-300 dark:border-red-700">
            <CardContent className="p-8">
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-red-700 dark:text-red-400">
                  Conversion Failed
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {state.error}
                </p>

                <Button variant="outline" onClick={reset} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Supported Formats Section */}
      <section className="bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Supported <span className="text-amber-600 dark:text-amber-400">Formats</span>
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Convert between 200+ file formats across images, documents, videos, audio, and more
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Images */}
            <Card className="hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                    <ImageIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-semibold">Images</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['PNG', 'JPG', 'WebP', 'GIF', 'BMP', 'TIFF', 'SVG', 'ICO', 'PDF'].map(f => (
                    <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Convert between image formats, resize, compress, and optimize
                </p>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold">Documents</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['PDF', 'DOCX', 'XLSX', 'PPTX', 'TXT', 'HTML', 'CSV', 'RTF', 'ODT'].map(f => (
                    <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Transform documents between Office formats, PDF, and more
                </p>
              </CardContent>
            </Card>

            {/* Video */}
            <Card className="hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                    <Video className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold">Video</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['MP4', 'WebM', 'AVI', 'MOV', 'MKV', 'GIF', 'MP3', 'WAV'].map(f => (
                    <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Transcode video files, extract audio, create GIFs from video
                </p>
              </CardContent>
            </Card>

            {/* Audio */}
            <Card className="hover:border-pink-300 dark:hover:border-pink-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center">
                    <Music className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h3 className="font-semibold">Audio</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['MP3', 'WAV', 'OGG', 'FLAC', 'AAC', 'WMA'].map(f => (
                    <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Convert audio between formats, adjust bitrate and quality
                </p>
              </CardContent>
            </Card>

            {/* Archives */}
            <Card className="hover:border-yellow-300 dark:hover:border-yellow-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center">
                    <Archive className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="font-semibold">Archives</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['ZIP', 'TAR', 'GZ', '7Z', 'RAR'].map(f => (
                    <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Convert between archive formats, compress and decompress
                </p>
              </CardContent>
            </Card>

            {/* AI Powered */}
            <Card className="hover:border-amber-300 dark:hover:border-amber-700 transition-colors border-dashed">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-semibold">AI-Powered</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  After conversion, use our AI analysis to automatically generate summaries,
                  tags, and insights for your converted files.
                </p>
                <Link href="/">
                  <Button variant="outline" size="sm" className="mt-3 gap-1.5">
                    Try AI Analysis
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
