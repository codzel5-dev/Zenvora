import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { uploadFile } from '@/lib/services/lmfiles.service';
import { validateFile, formatFileSize } from '@/lib/services/file-validation.service';
import { checkRateLimit } from '@/lib/services/rate-limit.service';

function getCategoryFromMime(mimeType: string): string {
  if (mimeType.startsWith('image/')) return 'images';
  if (mimeType.startsWith('video/')) return 'videos';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType === 'application/pdf') return 'documents';
  if (mimeType.startsWith('text/')) return 'text';
  if (
    mimeType.includes('word') ||
    mimeType.includes('document') ||
    mimeType.includes('excel') ||
    mimeType.includes('spreadsheet') ||
    mimeType.includes('powerpoint') ||
    mimeType.includes('presentation')
  ) return 'documents';
  return 'general';
}

function generateDescriptionFromFilename(fileName: string): string {
  // Remove extension and clean up
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
  // Replace underscores and hyphens with spaces
  const cleaned = nameWithoutExt
    .replace(/[_-]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase split
    .trim();
  // Capitalize first letter
  const capitalized = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  return `File: ${capitalized}`;
}

function triggerAIAnalysis(fileId: string, fileUrl: string, mimeType: string) {
  // Fire-and-forget AI analysis - use correct URL for both dev and production
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  const apiUrl = `${siteUrl}/api/ai/analyze`;

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileId, fileUrl, mimeType }),
  }).catch((err) => {
    console.error('Background AI analysis failed:', err);
  });
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Rate limit check
    const rateLimit = checkRateLimit(ip, 'upload', 10, 60 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Maximum 10 uploads per hour.',
          resetAt: new Date(rateLimit.resetTime).toISOString(),
        },
        { status: 429 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided. Please select a file to upload.' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Upload to lmfiles
    const result = await uploadFile(file);

    // Generate a safe filename
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');

    // Auto-detect category
    const category = getCategoryFromMime(file.type || 'application/octet-stream');

    // Generate description from filename
    const description = generateDescriptionFromFilename(file.name);

    // Store metadata in database
    const uploadedFile = await db.uploadedFile.create({
      data: {
        fileName: safeName,
        originalName: file.name,
        fileUrl: result.url,
        fileSize: file.size,
        mimeType: file.type || 'application/octet-stream',
        uploaderIp: ip,
        lmfilesId: result.fileId,
        category,
        description,
      },
    });

    // Trigger AI analysis in the background (fire and forget)
    if (process.env.YEPAPI_KEY) {
      triggerAIAnalysis(uploadedFile.id, result.url, uploadedFile.mimeType);
    }

    return NextResponse.json(
      {
        id: uploadedFile.id,
        fileName: uploadedFile.fileName,
        originalName: uploadedFile.originalName,
        fileUrl: uploadedFile.fileUrl,
        fileSize: uploadedFile.fileSize,
        fileSizeFormatted: formatFileSize(uploadedFile.fileSize),
        mimeType: uploadedFile.mimeType,
        category: uploadedFile.category,
        description: uploadedFile.description,
        createdAt: uploadedFile.createdAt.toISOString(),
        remainingUploads: rateLimit.remaining,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed. Please try again later.' },
      { status: 500 }
    );
  }
}
