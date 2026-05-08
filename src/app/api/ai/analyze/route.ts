import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const YEPAPI_URL = 'https://api.yepapi.com/v1/ai/chat';

function getAnalysisPrompt(mimeType: string, fileName: string): string {
  if (mimeType.startsWith('image/')) {
    return `Analyze this image file named "${fileName}". Provide:
1. A concise description of what the image contains (2-3 sentences)
2. 3-5 relevant tags separated by commas

Respond in this exact JSON format:
{"description": "your description here", "tags": "tag1, tag2, tag3"}`;
  }

  if (mimeType.startsWith('video/')) {
    return `Analyze this video file named "${fileName}". Based on the filename, provide:
1. A concise description of what the video likely contains (2-3 sentences)
2. 3-5 relevant tags separated by commas

Respond in this exact JSON format:
{"description": "your description here", "tags": "tag1, tag2, tag3"}`;
  }

  if (mimeType.startsWith('audio/')) {
    return `Analyze this audio file named "${fileName}". Based on the filename, provide:
1. A concise description of what the audio likely contains (2-3 sentences)
2. 3-5 relevant tags separated by commas

Respond in this exact JSON format:
{"description": "your description here", "tags": "tag1, tag2, tag3"}`;
  }

  if (mimeType === 'application/pdf') {
    return `Analyze this PDF document named "${fileName}". Based on the filename, provide:
1. A summary of what the PDF document likely contains (2-3 sentences)
2. 3-5 relevant tags separated by commas

Respond in this exact JSON format:
{"description": "your description here", "tags": "tag1, tag2, tag3"}`;
  }

  if (mimeType.startsWith('text/') || mimeType.includes('json') || mimeType.includes('xml') || mimeType.includes('javascript') || mimeType.includes('typescript')) {
    return `Analyze this code/text file named "${fileName}". Based on the filename and extension, provide:
1. A summary of what this file likely contains or its purpose (2-3 sentences)
2. 3-5 relevant keywords/tags separated by commas

Respond in this exact JSON format:
{"description": "your description here", "tags": "tag1, tag2, tag3"}`;
  }

  return `Analyze this file named "${fileName}" (type: ${mimeType}). Provide:
1. A concise description of what the file likely contains (2-3 sentences)
2. 3-5 relevant tags separated by commas

Respond in this exact JSON format:
{"description": "your description here", "tags": "tag1, tag2, tag3"}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileId, fileUrl, mimeType } = body;

    if (!fileId || !mimeType) {
      return NextResponse.json(
        { error: 'fileId and mimeType are required.' },
        { status: 400 }
      );
    }

    // Check if file exists
    const file = await db.uploadedFile.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return NextResponse.json(
        { error: 'File not found.' },
        { status: 404 }
      );
    }

    const apiKey = process.env.YEPAPI_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI analysis is not configured.' },
        { status: 503 }
      );
    }

    // Build messages for YepAPI
    const messages: Array<{ role: string; content: string | Array<{ type: string; text?: string; image_url?: { url: string } }> }> = [];

    if (mimeType.startsWith('image/')) {
      // For images, include the image URL in the message
      messages.push({
        role: 'user',
        content: [
          {
            type: 'text',
            text: getAnalysisPrompt(mimeType, file.originalName),
          },
          {
            type: 'image_url',
            image_url: { url: fileUrl || file.fileUrl },
          },
        ],
      });
    } else {
      // For other files, just use text-based analysis
      messages.push({
        role: 'user',
        content: getAnalysisPrompt(mimeType, file.originalName),
      });
    }

    // Call YepAPI
    const response = await fetch(YEPAPI_URL, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'z-ai/glm-5.1',
        messages,
        maxTokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('YepAPI error:', response.status, errorText);
      return NextResponse.json(
        { error: 'AI analysis failed.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || data.content || data.text || '';

    // Parse the AI response
    let description = '';
    let tags = '';

    try {
      // Try to extract JSON from the response
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        description = parsed.description || '';
        tags = parsed.tags || '';
      }
    } catch {
      // If JSON parsing fails, use the raw response as description
      description = aiContent.substring(0, 300);
    }

    // Update the file record
    await db.uploadedFile.update({
      where: { id: fileId },
      data: {
        aiSummary: description,
        tags: tags || file.tags,
        description: description || file.description,
      },
    });

    return NextResponse.json({
      success: true,
      aiSummary: description,
      tags,
    });
  } catch (error) {
    console.error('AI analysis error:', error);
    return NextResponse.json(
      { error: 'AI analysis failed. Please try again later.' },
      { status: 500 }
    );
  }
}
