import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { CategoryContent } from '@/components/file/category-content';

export const metadata: Metadata = {
  title: 'AI Prompts',
  description:
    'Download and share AI prompts for ChatGPT, Midjourney, Stable Diffusion, and more. Curated prompt collections on Zenvoora.',
  openGraph: {
    title: 'AI Prompts | Zenvoora',
    description:
      'Download and share AI prompts for ChatGPT, Midjourney, Stable Diffusion, and more.',
  },
};

export default function PromptsPage() {
  return (
    <CategoryContent
      title="AI Prompts"
      subtitle="Curated prompt collections"
      description="Browse and download curated AI prompts for popular tools like ChatGPT, Midjourney, Stable Diffusion, and more. Get the best prompts for text generation, image creation, and coding assistance."
      category="text"
      icon={<Sparkles className="h-6 w-6 text-amber-500 dark:text-amber-400" />}
      heroGradient="bg-gradient-to-br from-amber-50 via-transparent to-amber-50/50 dark:from-amber-950/30 dark:via-transparent dark:to-amber-950/20"
    />
  );
}
