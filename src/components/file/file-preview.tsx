'use client';

import * as React from 'react';
import {
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  File,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilePreviewProps {
  fileUrl: string;
  mimeType: string;
  fileName: string;
}

function isImageMime(mime: string) {
  return mime.startsWith('image/');
}

function isVideoMime(mime: string) {
  return mime.startsWith('video/');
}

function isAudioMime(mime: string) {
  return mime.startsWith('audio/');
}

function isPdfMime(mime: string) {
  return mime === 'application/pdf';
}

function isTextMime(mime: string) {
  if (mime.startsWith('text/')) return true;
  const textTypes = [
    'application/json',
    'application/xml',
    'application/javascript',
    'application/x-javascript',
    'application/typescript',
  ];
  return textTypes.includes(mime);
}

const codeExtensions = ['.js', '.jsx', '.ts', '.tsx', '.py', '.rb', '.go', '.rs', '.java', '.c', '.cpp', '.h', '.html', '.css', '.scss', '.less', '.json', '.xml', '.yaml', '.yml', '.toml', '.md', '.csv', '.sh', '.bash', '.sql', '.graphql', '.vue', '.svelte'];

function isCodeFile(fileName: string, mimeType: string) {
  if (mimeType.startsWith('text/') || mimeType.includes('javascript') || mimeType.includes('typescript') || mimeType === 'application/json' || mimeType === 'application/xml') {
    return true;
  }
  const ext = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  return codeExtensions.includes(ext);
}

export function FilePreview({ fileUrl, mimeType, fileName }: FilePreviewProps) {
  const [zoom, setZoom] = React.useState(1);
  const [textContent, setTextContent] = React.useState<string | null>(null);
  const [textLoading, setTextLoading] = React.useState(false);

  // Fetch text content for text/code files
  React.useEffect(() => {
    if (isTextMime(mimeType) || isCodeFile(fileName, mimeType)) {
      setTextLoading(true);
      fetch(fileUrl)
        .then((res) => res.text())
        .then((text) => {
          setTextContent(text);
          setTextLoading(false);
        })
        .catch(() => {
          setTextContent('Failed to load file content.');
          setTextLoading(false);
        });
    }
  }, [fileUrl, mimeType, fileName]);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const resetZoom = () => setZoom(1);

  // Image Preview
  if (isImageMime(mimeType)) {
    return (
      <div className="relative group">
        {/* Zoom controls */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="icon" className="h-8 w-8" onClick={zoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8" onClick={resetZoom}>
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8" onClick={zoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-center bg-muted/30 rounded-lg overflow-auto max-h-[70vh]">
          <img
            src={fileUrl}
            alt={fileName}
            className="max-w-full object-contain transition-transform duration-200"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
          />
        </div>
      </div>
    );
  }

  // Video Preview
  if (isVideoMime(mimeType)) {
    return (
      <div className="rounded-lg overflow-hidden bg-black">
        <video
          controls
          className="w-full max-h-[70vh]"
          preload="metadata"
        >
          <source src={fileUrl} type={mimeType} />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Audio Preview
  if (isAudioMime(mimeType)) {
    return (
      <div className="bg-muted/30 rounded-lg p-6 sm:p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-emerald-500/20 flex items-center justify-center">
            <Music className="h-10 w-10 text-purple-500" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold truncate max-w-md">{fileName}</h3>
            <p className="text-sm text-muted-foreground mt-1">Audio File</p>
          </div>
          {/* Simple waveform visualization */}
          <div className="flex items-center gap-0.5 h-12">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-emerald-500/60 rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 80 + 20}%`,
                  animationDelay: `${i * 50}ms`,
                }}
              />
            ))}
          </div>
          <audio controls className="w-full max-w-md">
            <source src={fileUrl} type={mimeType} />
            Your browser does not support the audio tag.
          </audio>
        </div>
      </div>
    );
  }

  // PDF Preview
  if (isPdfMime(mimeType)) {
    return (
      <div className="rounded-lg overflow-hidden bg-muted/30">
        <iframe
          src={fileUrl}
          className="w-full border-0"
          style={{ height: '70vh' }}
          title={`PDF Preview: ${fileName}`}
        />
      </div>
    );
  }

  // Text/Code Preview
  if (isTextMime(mimeType) || isCodeFile(fileName, mimeType)) {
    if (textLoading) {
      return (
        <div className="rounded-lg bg-muted/30 p-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileText className="h-5 w-5 animate-pulse" />
            <span className="text-sm">Loading content...</span>
          </div>
        </div>
      );
    }

    if (textContent !== null) {
      const lines = textContent.split('\n');
      const lineCount = lines.length;
      const lineNumberWidth = String(lineCount).length;

      return (
        <div className="rounded-lg overflow-hidden bg-zinc-950 text-zinc-100">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border-b border-zinc-800">
            <FileText className="h-4 w-4 text-zinc-400" />
            <span className="text-xs text-zinc-400 font-mono">{fileName}</span>
            <span className="text-xs text-zinc-500 ml-auto">{lineCount} lines</span>
          </div>
          <div className="overflow-auto max-h-[70vh] p-4">
            <pre className="text-sm font-mono leading-relaxed">
              <code>
                {lines.map((line, i) => (
                  <div key={i} className="flex">
                    <span
                      className="select-none text-zinc-600 pr-4 text-right flex-shrink-0"
                      style={{ minWidth: `${lineNumberWidth + 2}ch` }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-zinc-200">{line}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      );
    }
  }

  // Fallback - unsupported preview
  return (
    <div className="rounded-lg bg-muted/30 p-8 sm:p-12 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <File className="h-8 w-8 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{fileName}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Preview not available for this file type ({mimeType})
          </p>
        </div>
        <a
          href={fileUrl}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
        >
          <ImageIcon className="h-4 w-4" />
          Download to View
        </a>
      </div>
    </div>
  );
}
