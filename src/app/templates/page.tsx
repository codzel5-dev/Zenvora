import type { Metadata } from 'next';
import { TemplatesListContent } from '@/components/templates-list-content';

export const metadata: Metadata = {
  title: 'Free Templates — Download Professional Templates',
  description: 'Browse 72+ free professional templates for resumes, invoices, business plans, marketing, project management, and more. Ready-to-use templates for every need on Zenvoora.',
  openGraph: {
    title: 'Free Templates | Zenvoora',
    description: 'Download free professional templates for resumes, invoices, business plans, marketing, and more.',
  },
};

export default function TemplatesPage() {
  return <TemplatesListContent />;
}
