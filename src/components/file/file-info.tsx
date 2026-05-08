'use client';

import * as React from 'react';
import {
  Download,
  Share2,
  Calendar,
  HardDrive,
  FileType,
  Sparkles,
  Tag,
  Eye,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatFileSize } from '@/lib/services/file-validation.service';
import { toast } from 'sonner';

interface FileInfoProps {
  id: string;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
  downloadCount: number;
  description?: string;
  tags?: string;
  category?: string;
  aiSummary?: string;
}

export function FileInfo({
  id,
  originalName,
  fileUrl,
  fileSize,
  mimeType,
  createdAt,
  downloadCount,
  description,
  tags,
  category,
  aiSummary,
}: FileInfoProps) {
  const [copied, setCopied] = React.useState(false);
  const parsedTags = tags ? tags.split(',').filter(Boolean) : [];

  const handleDownload = async () => {
    try {
      // Increment download count
      await fetch(`/api/files/${id}`, { method: 'PATCH' });
      // Trigger download
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = originalName;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success('Download started!');
    } catch {
      toast.error('Download failed. Please try again.');
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/file/${id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: originalName,
          text: `Check out this file: ${originalName}`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      } catch {
        toast.error('Failed to share. Please copy the URL manually.');
      }
    }
  };

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      images: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
      videos: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400 border-sky-200 dark:border-sky-800',
      audio: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400 border-purple-200 dark:border-purple-800',
      documents: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 border-red-200 dark:border-red-800',
      text: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      general: 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-400 border-gray-200 dark:border-gray-800',
    };
    return colors[cat] || colors.general;
  };

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          onClick={handleDownload}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
        >
          <Download className="h-4 w-4" />
          Download File
        </Button>
        <Button
          variant="outline"
          onClick={handleShare}
          className="flex-1 gap-2"
        >
          {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Share'}
        </Button>
      </div>

      {/* File Details Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">File Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <HardDrive className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Size:</span>
            <span className="font-medium">{formatFileSize(fileSize)}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FileType className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Type:</span>
            <span className="font-medium">{mimeType}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Uploaded:</span>
            <span className="font-medium">
              {new Date(createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Eye className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Downloads:</span>
            <span className="font-medium">{downloadCount}</span>
          </div>
          {category && category !== 'general' && (
            <div className="flex items-center gap-3 text-sm">
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(category)}`}>
                {category}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Description */}
      {description && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tags */}
      {parsedTags.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {parsedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Summary */}
      {aiSummary && (
        <Card className="border-emerald-200 dark:border-emerald-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              AI Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {aiSummary}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Shareable Link */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Copy className="h-4 w-4" />
            Direct Link
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-md border bg-muted/50 px-3 py-2 text-xs font-mono truncate">
              {fileUrl}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(fileUrl);
                  toast.success('Direct link copied!');
                } catch {
                  toast.error('Failed to copy');
                }
              }}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
