import type { Metadata } from 'next';
import { BlogListContent } from '@/components/blog-list-content';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read tips, guides, and updates about file sharing, online security, and getting the most out of Zenvoora.',
  openGraph: {
    title: 'Blog — Zenvoora',
    description:
      'Tips, guides, and updates about file sharing, online security, and getting the most out of Zenvoora.',
  },
};

export default function BlogPage() {
  return <BlogListContent />;
}
