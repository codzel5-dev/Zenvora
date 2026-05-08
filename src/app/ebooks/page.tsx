import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { CategoryContent } from '@/components/file/category-content';

export const metadata: Metadata = {
  title: 'Free E-Books',
  description:
    'Download free e-books, PDFs, and digital publications. Browse our growing library of free reading materials on Zenvoora.',
  openGraph: {
    title: 'Free E-Books | Zenvoora',
    description:
      'Download free e-books, PDFs, and digital publications.',
  },
};

export default function EbooksPage() {
  return (
    <CategoryContent
      title="E-Books"
      subtitle="Free digital books & PDFs"
      description="Explore our library of free e-books and digital publications. From tech guides and tutorials to fiction and reference materials — download and read instantly."
      category="documents"
      icon={<BookOpen className="h-6 w-6 text-red-500 dark:text-red-400" />}
      heroGradient="bg-gradient-to-br from-red-50 via-transparent to-red-50/50 dark:from-red-950/30 dark:via-transparent dark:to-red-950/20"
    />
  );
}
