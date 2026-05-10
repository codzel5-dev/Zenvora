import { MetadataRoute } from 'next';
import { db } from '@/lib/db';

const BASE_URL = 'https://zenvoora.vercel.app';

// Revalidate every 1 hour
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages - always available
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/convert`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/templates`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ebooks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/design`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Dynamic blog pages - with timeout protection
  try {
    const blogPosts = await Promise.race([
      db.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
        orderBy: { createdAt: 'desc' },
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('DB timeout')), 5000)
      ),
    ]);

    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    staticPages.push(...blogPages);
  } catch {
    // If DB is unavailable or timeout, just skip dynamic pages
  }

  // Dynamic file pages - with timeout protection
  try {
    const files = await Promise.race([
      db.uploadedFile.findMany({
        select: { id: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 500,
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('DB timeout')), 5000)
      ),
    ]);

    const filePages: MetadataRoute.Sitemap = files.map((file) => ({
      url: `${BASE_URL}/file/${file.id}`,
      lastModified: file.createdAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    staticPages.push(...filePages);
  } catch {
    // If DB is unavailable or timeout, just skip dynamic pages
  }

  return staticPages;
}
