import type { Metadata } from 'next';
import { ScriptsListContent } from '@/components/scripts-list-content';

export const metadata: Metadata = {
  title: 'Free Scripts & Code — Python, JavaScript & More',
  description: 'Access free scripts and code snippets for Python, JavaScript, TypeScript, and Bash. Copy and use in your projects instantly. Automation tools and utilities on Zenvoora.',
  openGraph: {
    title: 'Free Scripts & Code | Zenvoora',
    description: 'Free scripts and code snippets for Python, JavaScript, TypeScript, and Bash.',
  },
};

export default function ScriptsPage() {
  return <ScriptsListContent />;
}
