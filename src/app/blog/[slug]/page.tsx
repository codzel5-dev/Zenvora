import type { Metadata } from 'next';
import { BlogPostContent } from '@/components/blog-post-content';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenvoora.netlify.app';
    const response = await fetch(`${baseUrl}/api/blog/${slug}`, { next: { revalidate: 3600 } });
    if (response.ok) {
      const post = await response.json();
      return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
          title: post.title,
          description: post.excerpt,
          type: 'article',
          publishedTime: post.createdAt,
          modifiedTime: post.updatedAt,
        },
      };
    }
  } catch {
    // Fall through to default
  }
  return {
    title: 'Blog Post',
    description: 'Read this article on the Zenvoora blog.',
  };
}

export default function BlogPostPage() {
  return <BlogPostContent />;
}
