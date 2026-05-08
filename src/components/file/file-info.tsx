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
  RefreshCw,
  Loader2,
  Brain,
  FileText,
  Lightbulb,
  Zap,
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
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiData, setAiData] = React.useState<{
    aiSummary?: string;
    description?: string;
    tags?: string;
  }>({ aiSummary, description, tags });

  const parsedTags = aiData.tags
    ? aiData.tags.split(',').filter(Boolean)
    : tags
    ? tags.split(',').filter(Boolean)
    : [];

  const hasAiData = !!(aiData.aiSummary || aiData.description);

  const handleAIAnalysis = async () => {
    setAiLoading(true);
    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileId: id,
          fileUrl,
          mimeType,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'AI analysis failed');
      }

      const data = await response.json();
      setAiData({
        aiSummary: data.aiSummary || '',
        description: data.description || '',
        tags: data.tags || '',
      });
      toast.success('AI analysis completed! File has been analyzed.');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'AI analysis failed. Please try again.';
      toast.error(message);
    } finally {
      setAiLoading(false);
    }
  };

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

      {/* ====== AI ANALYSIS SECTION - BIG & PROMINENT ====== */}
      <Card className={`border-2 overflow-hidden ${hasAiData ? 'border-emerald-400 dark:border-emerald-600' : 'border-purple-400 dark:border-purple-600'}`}>
        {/* Gradient Header Bar */}
        <div className={`px-4 py-2.5 ${hasAiData
          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-700 dark:to-teal-700'
          : 'bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-700 dark:to-indigo-700'
        }`}>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-white" />
            <span className="text-sm font-bold text-white">AI-Powered Analysis</span>
            {hasAiData && (
              <Badge className="ml-auto text-[10px] bg-white/20 text-white border-white/30 hover:bg-white/30">
                Analyzed
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          {aiLoading ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-4 border-purple-200 dark:border-purple-800" />
                <Loader2 className="h-12 w-12 text-purple-600 dark:text-purple-400 animate-spin absolute inset-0" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold">Analyzing your file...</p>
                <p className="text-xs text-muted-foreground mt-1">AI is generating summary, tags & description</p>
              </div>
            </div>
          ) : hasAiData ? (
            <>
              {/* AI Summary */}
              {aiData.aiSummary && (
                <div className="flex items-start gap-2.5 bg-amber-50 dark:bg-amber-950/30 rounded-lg p-3">
                  <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">AI Summary</p>
                    <p className="text-sm leading-relaxed">{aiData.aiSummary}</p>
                  </div>
                </div>
              )}
              {/* AI Description */}
              {aiData.description && aiData.description !== aiData.aiSummary && (
                <div className="flex items-start gap-2.5 bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3">
                  <FileText className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">Description</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{aiData.description}</p>
                  </div>
                </div>
              )}
              {/* AI Tags */}
              {parsedTags.length > 0 && (
                <div className="flex items-start gap-2.5 bg-purple-50 dark:bg-purple-950/30 rounded-lg p-3">
                  <Tag className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 mb-1.5">Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {parsedTags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                          {tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <Separator className="my-1" />
              {/* BIG Re-analyze Button */}
              <Button
                onClick={handleAIAnalysis}
                className="w-full h-11 text-sm font-semibold gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all"
              >
                <RefreshCw className="h-4 w-4" />
                Re-analyze with AI
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/40 dark:to-indigo-900/40 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-purple-500" />
              </div>
              <div className="text-center">
                <p className="text-base font-semibold">No AI analysis yet</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-[220px] mx-auto">Let our AI generate a summary, description & smart tags for this file</p>
              </div>
              {/* BIG Analyze Button */}
              <Button
                onClick={handleAIAnalysis}
                className="w-full h-12 text-base font-bold gap-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Zap className="h-5 w-5" />
                Analyze with AI
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

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
