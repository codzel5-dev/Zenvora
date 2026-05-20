import type { Metadata } from 'next';
import { PromptsListContent } from '@/components/prompts-list-content';

export const metadata: Metadata = {
  title: 'Free AI Prompts — ChatGPT, Midjourney & More',
  description: 'Browse curated AI prompts for ChatGPT, Midjourney, Stable Diffusion, and more. Copy and use instantly to boost your productivity and creativity. Free on Zenvoora.',
  openGraph: {
    title: 'Free AI Prompts | Zenvoora',
    description: 'Curated AI prompts for ChatGPT, Midjourney, and more. Copy and use instantly.',
  },
};

export default function PromptsPage() {
  return <PromptsListContent />;
}
