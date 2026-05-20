import type { Metadata } from 'next';
import { ScriptsListContent } from '@/components/scripts-list-content';

export const metadata: Metadata = {
  title: 'Free Scripts & Code — Python, JavaScript, TypeScript & Bash | Zenvoora',
  description: 'Access 41+ free scripts and code snippets for Python, JavaScript, TypeScript, and Bash. Automation, web scraping, DevOps, security, data processing, and more. Copy and use instantly on Zenvoora.',
  openGraph: {
    title: 'Free Scripts & Code | Zenvoora',
    description: '41+ free scripts for automation, scraping, DevOps, security, and more.',
  },
};

export default function ScriptsPage() {
  return <ScriptsListContent />;
}
