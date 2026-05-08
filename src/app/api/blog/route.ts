import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod/v4';

const blogPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title is too long'),
  slug: z.string().min(3, 'Slug must be at least 3 characters').max(200, 'Slug is too long').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters').max(500, 'Excerpt is too long'),
  published: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const publishedOnly = searchParams.get('published') !== 'false';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const search = searchParams.get('search') || '';
    const skip = (page - 1) * limit;

    const where = {
      ...(publishedOnly ? { published: true } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search } },
              { excerpt: { contains: search } },
            ],
          }
        : {}),
    };

    const [posts, total] = await Promise.all([
      db.blogPost.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          imageUrl: true,
          published: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      db.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      posts: posts.map((post) => ({
        ...post,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('List blog posts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = blogPostSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || 'Invalid input.' },
        { status: 400 }
      );
    }

    const { title, slug, content, excerpt, published } = result.data;

    // Check if slug already exists
    const existing = await db.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: 'A blog post with this slug already exists.' },
        { status: 409 }
      );
    }

    const post = await db.blogPost.create({
      data: { title, slug, content, excerpt, published },
    });

    return NextResponse.json(
      {
        ...post,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create blog post error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post.' },
      { status: 500 }
    );
  }
}
