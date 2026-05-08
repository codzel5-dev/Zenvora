import type { Metadata } from 'next';
import { Palette } from 'lucide-react';
import { CategoryContent } from '@/components/file/category-content';

export const metadata: Metadata = {
  title: 'Design Assets',
  description:
    'Download free design assets including images, graphics, icons, and more. High-quality visual resources for your projects on Zenvoora.',
  openGraph: {
    title: 'Design Assets | Zenvoora',
    description:
      'Download free design assets including images, graphics, icons, and more.',
  },
};

export default function DesignPage() {
  return (
    <CategoryContent
      title="Design Assets"
      subtitle="Free images, graphics & visuals"
      description="Discover free design assets for your creative projects. Browse images, icons, illustrations, and other visual resources — all ready to download and use."
      category="images"
      icon={<Palette className="h-6 w-6 text-purple-500 dark:text-purple-400" />}
      heroGradient="bg-gradient-to-br from-purple-50 via-transparent to-purple-50/50 dark:from-purple-950/30 dark:via-transparent dark:to-purple-950/20"
    />
  );
}
