import type { Metadata } from 'next';
import { LayoutTemplate } from 'lucide-react';
import { CategoryContent } from '@/components/file/category-content';

export const metadata: Metadata = {
  title: 'Free Templates',
  description:
    'Download free templates for documents, spreadsheets, presentations, and more. Professionally designed templates ready to use — all free on Zenvoora.',
  openGraph: {
    title: 'Free Templates | Zenvoora',
    description:
      'Download free templates for documents, spreadsheets, presentations, and more.',
  },
};

export default function TemplatesPage() {
  return (
    <CategoryContent
      title="Templates"
      subtitle="Free document & design templates"
      description="Browse our collection of professionally designed templates. From business documents and spreadsheets to presentations and resumes — all free to download and use."
      category="documents"
      icon={<LayoutTemplate className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />}
      heroGradient="bg-gradient-to-br from-emerald-50 via-transparent to-emerald-50/50 dark:from-emerald-950/30 dark:via-transparent dark:to-emerald-950/20"
    />
  );
}
