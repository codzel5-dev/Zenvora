import type { Metadata } from 'next';
import { BlogListContent } from '@/components/blog-list-content';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read tips, guides, and updates about file sharing, online security, and getting the most out of FileVault.',
  openGraph: {
    title: 'Blog — FileVault',
    description:
      'Tips, guides, and updates about file sharing, online security, and getting the most out of FileVault.',
  },
};

export default function BlogPage() {
  return <BlogListContent />;
}
