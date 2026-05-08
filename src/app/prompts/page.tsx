'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Copy, Check, Brain, Code, Image, MessageSquare, Pen, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdBanner } from '@/components/ads/ad-banner';

const prompts = [
  {
    title: 'Professional Email Writer',
    description: 'Generate polished, professional emails for any business scenario — client outreach, follow-ups, negotiations, or team communications. Just describe the context and tone you need.',
    prompt: 'You are a professional business email writer. I will describe a situation, and you will write a clear, polished, and professional email. The email should be concise (under 200 words), have an appropriate subject line, maintain a professional but friendly tone, and include a clear call-to-action. Always proofread for grammar and tone consistency.',
    tags: ['ChatGPT', 'Email', 'Business', 'Writing'],
    category: 'Writing',
    icon: Pen,
    uses: '8.2K',
  },
  {
    title: 'Full-Stack Code Reviewer',
    description: 'Get expert-level code reviews with detailed feedback on architecture, security, performance, and best practices. Supports JavaScript, Python, TypeScript, and more.',
    prompt: 'You are a senior full-stack engineer performing a thorough code review. Analyze the code I provide and give feedback in these categories: 1) Security vulnerabilities, 2) Performance issues, 3) Code quality and readability, 4) Architecture and design patterns, 5) Testing suggestions. Rate severity as Critical/Warning/Info. Provide fixed code snippets for each issue found.',
    tags: ['ChatGPT', 'Code Review', 'Security', 'Best Practices'],
    category: 'Coding',
    icon: Code,
    uses: '12.5K',
  },
  {
    title: 'Midjourney Scene Creator',
    description: 'Create stunning, detailed Midjourney prompts for photorealistic scenes, character portraits, landscapes, and abstract art with optimal parameter settings.',
    prompt: 'You are a Midjourney prompt expert. I will describe a scene or concept, and you will generate 3 detailed Midjourney prompts. Each prompt should: include specific art style references, lighting conditions, camera angles, color palettes, and mood descriptors. Add appropriate parameters like --ar, --v, --style. Format each prompt on a separate line starting with /imagine.',
    tags: ['Midjourney', 'Art', 'Image Generation', 'Creative'],
    category: 'Image',
    icon: Image,
    uses: '15.8K',
  },
  {
    title: 'Technical Documentation Writer',
    description: 'Generate clear, comprehensive technical documentation for APIs, libraries, and software projects with proper formatting, examples, and error handling.',
    prompt: 'You are a technical documentation writer. I will describe a software component, API endpoint, or library, and you will write professional documentation that includes: 1) Overview and purpose, 2) Quick start guide, 3) Detailed API reference with parameters and return types, 4) Code examples in multiple languages, 5) Error handling and edge cases, 6) Best practices. Use Markdown formatting with proper headers and code blocks.',
    tags: ['ChatGPT', 'Documentation', 'API', 'Technical Writing'],
    category: 'Writing',
    icon: Pen,
    uses: '6.9K',
  },
  {
    title: 'Creative Storyteller & Narrative Designer',
    description: 'Craft compelling stories, character backgrounds, plot twists, and narrative arcs for fiction, games, and interactive media with rich world-building.',
    prompt: 'You are a creative storyteller and narrative designer. I will provide a theme, setting, or character concept, and you will create: 1) A compelling hook/opening paragraph, 2) Rich character profiles with motivations and flaws, 3) A three-act plot outline with key turning points, 4) Dialogue samples that reveal character, 5) World-building details that feel organic. Adapt tone and style to the genre specified.',
    tags: ['ChatGPT', 'Story', 'Creative Writing', 'Narrative'],
    category: 'Writing',
    icon: MessageSquare,
    uses: '9.4K',
  },
  {
    title: 'Data Analysis Assistant',
    description: 'Analyze datasets, generate insights, create visualizations, and build predictive models. Perfect for business intelligence and research applications.',
    prompt: 'You are a data analysis expert. I will provide a dataset or describe data, and you will: 1) Identify key patterns and trends, 2) Calculate relevant statistics, 3) Suggest appropriate visualizations, 4) Generate Python/pandas code for analysis, 5) Provide actionable insights and recommendations, 6) Flag potential data quality issues. Always explain your methodology and assumptions clearly.',
    tags: ['ChatGPT', 'Data Science', 'Python', 'Analytics'],
    category: 'Coding',
    icon: Brain,
    uses: '7.1K',
  },
];

const categories = [
  { name: 'All Prompts', active: true },
  { name: 'Writing', active: false },
  { name: 'Coding', active: false },
  { name: 'Image Generation', active: false },
  { name: 'Business', active: false },
  { name: 'Research', active: false },
];

function getCategoryColor(cat: string) {
  const map: Record<string, string> = {
    Writing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    Coding: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400',
    Image: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
  };
  return map[cat] || 'bg-gray-100 text-gray-700';
}

function PromptCard({ prompt }: { prompt: typeof prompts[0] }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <Card className="group hover:shadow-xl hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
              <prompt.icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {prompt.title}
              </h3>
              <Badge className={`text-[10px] ${getCategoryColor(prompt.category)}`}>
                {prompt.category}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Zap className="h-3 w-3" />
            {prompt.uses} uses
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          {prompt.description}
        </p>

        <div className="relative bg-muted/50 rounded-lg p-3 mb-3 border border-border/50">
          <p className="text-xs text-muted-foreground font-mono leading-relaxed line-clamp-3">
            {prompt.prompt}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {prompt.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
              {tag}
            </Badge>
          ))}
        </div>

        <Button
          onClick={handleCopy}
          className={`w-full gap-2 ${copied ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-amber-600 hover:bg-amber-700'} text-white`}
          size="sm"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy Prompt'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function PromptsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-transparent to-yellow-50/50 dark:from-amber-950/30 dark:via-transparent dark:to-yellow-950/20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
              <Sparkles className="h-7 w-7 text-amber-500 dark:text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">AI Prompts</h1>
              <p className="text-muted-foreground mt-1">Curated prompts for popular AI tools</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mt-3 leading-relaxed">
            Browse our curated collection of expertly crafted AI prompts for ChatGPT, Midjourney, Stable Diffusion, and more. Copy and use instantly — boost your productivity and creativity.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Badge variant="secondary" className="text-sm px-3 py-1">{prompts.length} Prompts</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">One-Click Copy</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">Free to Use</Badge>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <AdBanner />
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                cat.active
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-background border-border hover:border-amber-300 dark:hover:border-amber-700 text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {prompts.map((prompt) => (
            <PromptCard key={prompt.title} prompt={prompt} />
          ))}
        </div>
      </section>
    </>
  );
}
