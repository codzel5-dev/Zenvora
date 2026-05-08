import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const YEPAPI_URL = 'https://api.yepapi.com/v1/ai/chat';

function getAnalysisPrompt(mimeType: string, fileName: string): string {
  if (mimeType.startsWith('image/')) {
    return `You are an AI file analyst. Analyze this image file named "${fileName}". Provide:
1. A detailed description of what the image contains (2-3 sentences, be specific about objects, colors, composition, and context)
2. A concise one-sentence AI summary of the image content
3. 5-8 relevant tags separated by commas (be specific and descriptive)

Respond ONLY in this exact JSON format, no other text:
{"description": "your detailed description here", "aiSummary": "your concise summary here", "tags": "tag1, tag2, tag3, tag4, tag5"}`;
  }

  if (mimeType.startsWith('video/')) {
    return `You are an AI file analyst. Analyze this video file named "${fileName}". Based on the filename and any context you can infer, provide:
1. A detailed description of what the video likely contains (2-3 sentences)
2. A concise one-sentence AI summary
3. 5-8 relevant tags separated by commas

Respond ONLY in this exact JSON format, no other text:
{"description": "your detailed description here", "aiSummary": "your concise summary here", "tags": "tag1, tag2, tag3, tag4, tag5"}`;
  }

  if (mimeType.startsWith('audio/')) {
    return `You are an AI file analyst. Analyze this audio file named "${fileName}". Based on the filename and any context you can infer, provide:
1. A detailed description of what the audio likely contains (2-3 sentences)
2. A concise one-sentence AI summary
3. 5-8 relevant tags separated by commas

Respond ONLY in this exact JSON format, no other text:
{"description": "your detailed description here", "aiSummary": "your concise summary here", "tags": "tag1, tag2, tag3, tag4, tag5"}`;
  }

  if (mimeType === 'application/pdf') {
    return `You are an AI document analyst. Analyze this PDF document named "${fileName}". Based on the filename and any context you can infer, provide:
1. A detailed summary of what the PDF document likely contains (2-3 sentences, include likely topics, sections, or data types)
2. A concise one-sentence AI summary
3. 5-8 relevant tags/keywords separated by commas

Respond ONLY in this exact JSON format, no other text:
{"description": "your detailed description here", "aiSummary": "your concise summary here", "tags": "tag1, tag2, tag3, tag4, tag5"}`;
  }

  if (mimeType.startsWith('text/') || mimeType.includes('json') || mimeType.includes('xml') || mimeType.includes('javascript') || mimeType.includes('typescript')) {
    return `You are an AI code and text analyst. Analyze this file named "${fileName}". Based on the filename and extension, provide:
1. A detailed summary of what this file likely contains or its purpose (2-3 sentences, include likely language, framework, or purpose)
2. A concise one-sentence AI summary
3. 5-8 relevant tags/keywords separated by commas (include language, framework, or topic)

Respond ONLY in this exact JSON format, no other text:
{"description": "your detailed description here", "aiSummary": "your concise summary here", "tags": "tag1, tag2, tag3, tag4, tag5"}`;
  }

  // Generic file
  return `You are an AI file analyst. Analyze this file named "${fileName}" (type: ${mimeType}). Based on the filename and type, provide:
1. A detailed description of what the file likely contains (2-3 sentences)
2. A concise one-sentence AI summary
3. 5-8 relevant tags separated by commas

Respond ONLY in this exact JSON format, no other text:
{"description": "your detailed description here", "aiSummary": "your concise summary here", "tags": "tag1, tag2, tag3, tag4, tag5"}`;
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
        { error: 'AI analysis is not configured. YEPAPI_KEY is missing.' },
        { status: 503 }
      );
    }

    // Build messages for YepAPI
    const messages: Array<{ role: string; content: string | Array<{ type: string; text?: string; image_url?: { url: string } }> }> = [];

    if (mimeType.startsWith('image/')) {
      // For images, include the image URL in the message for visual analysis
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

    // Call YepAPI with increased token limit for better responses
    const response = await fetch(YEPAPI_URL, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'z-ai/glm-5.1',
        messages,
        maxTokens: 800,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('YepAPI error:', response.status, errorText);
      return NextResponse.json(
        { error: `AI analysis failed: ${response.status}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || data.content || data.text || '';

    if (!aiContent) {
      return NextResponse.json(
        { error: 'AI returned empty response.' },
        { status: 500 }
      );
    }

    // Parse the AI response
    let description = '';
    let aiSummary = '';
    let tags = '';

    try {
      // Try to extract JSON from the response
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        description = parsed.description || '';
        aiSummary = parsed.aiSummary || parsed.summary || '';
        tags = parsed.tags || '';
      }
    } catch {
      // If JSON parsing fails, use the raw response as description
      description = aiContent.substring(0, 300);
      aiSummary = aiContent.substring(0, 150);
    }

    // If aiSummary is empty but description exists, create a short summary
    if (!aiSummary && description) {
      aiSummary = description.length > 150 ? description.substring(0, 147) + '...' : description;
    }

    // Update the file record with all AI data
    await db.uploadedFile.update({
      where: { id: fileId },
      data: {
        aiSummary: aiSummary || description,
        tags: tags || file.tags,
        description: description || file.description,
      },
    });

    console.log(`AI analysis completed for file: ${file.originalName}`);

    return NextResponse.json({
      success: true,
      aiSummary: aiSummary || description,
      description,
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
