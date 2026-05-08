import type { Metadata } from 'next';
import { Terminal } from 'lucide-react';
import { CategoryContent } from '@/components/file/category-content';

export const metadata: Metadata = {
  title: 'Scripts & Code',
  description:
    'Download free scripts, code snippets, and automation tools. Python, JavaScript, Bash, and more — all free on Zenvoora.',
  openGraph: {
    title: 'Scripts & Code | Zenvoora',
    description:
      'Download free scripts, code snippets, and automation tools.',
  },
};

export default function ScriptsPage() {
  return (
    <CategoryContent
      title="Scripts & Code"
      subtitle="Free code snippets & automation"
      description="Access a collection of free scripts and code snippets. From Python automation and JavaScript utilities to shell scripts and configuration files — download and use in your projects."
      category="text"
      icon={<Terminal className="h-6 w-6 text-sky-500 dark:text-sky-400" />}
      heroGradient="bg-gradient-to-br from-sky-50 via-transparent to-sky-50/50 dark:from-sky-950/30 dark:via-transparent dark:to-sky-950/20"
    />
  );
}
