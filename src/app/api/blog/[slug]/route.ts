import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod/v4';

const blogPostUpdateSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title is too long').optional(),
  content: z.string().min(50, 'Content must be at least 50 characters').optional(),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters').max(500, 'Excerpt is too long').optional(),
  published: z.boolean().optional(),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await db.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error('Get blog post error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post.' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const result = blogPostUpdateSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || 'Invalid input.' },
        { status: 400 }
      );
    }

    const existing = await db.blogPost.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Blog post not found.' },
        { status: 404 }
      );
    }

    const post = await db.blogPost.update({
      where: { slug },
      data: result.data,
    });

    return NextResponse.json({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error('Update blog post error:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const existing = await db.blogPost.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Blog post not found.' },
        { status: 404 }
      );
    }

    await db.blogPost.delete({ where: { slug } });

    return NextResponse.json({ message: 'Blog post deleted successfully.' });
  } catch (error) {
    console.error('Delete blog post error:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post.' },
      { status: 500 }
    );
  }
}
