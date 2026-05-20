import type { Metadata } from 'next';
import EbooksListContent from '@/components/ebooks-list-content';

export const metadata: Metadata = {
  title: 'Free E-Books — Download Digital Books & PDFs | Zenvoora',
  description: 'Download 60+ free e-books and PDFs on AI, programming, digital marketing, cybersecurity, cloud computing, data science, business, design, and more. Expand your knowledge with our curated digital library on Zenvoora.',
  openGraph: {
    title: 'Free E-Books | Zenvoora',
    description: 'Download 60+ free e-books on AI, programming, marketing, cybersecurity, and more.',
  },
};

export default function EbooksPage() {
  return <EbooksListContent />;
}
