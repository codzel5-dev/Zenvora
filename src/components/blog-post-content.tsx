'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft, Share2, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BlogCard } from '@/components/blog/blog-card';

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
  imageUrl: string;
}

export function BlogPostContent() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = React.useState<BlogPostData | null>(null);
  const [relatedPosts, setRelatedPosts] = React.useState<RelatedPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!slug) return;
    fetchPost();
    fetchRelated();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError('Post not found.');
        } else {
          setError('Failed to load post.');
        }
        return;
      }
      const data = await response.json();
      setPost(data);
    } catch {
      setError('Failed to load post.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async () => {
    try {
      const response = await fetch('/api/blog?limit=4');
      if (response.ok) {
        const data = await response.json();
        const filtered = (data.posts || []).filter((p: RelatedPost) => p.slug !== slug);
        setRelatedPosts(filtered.slice(0, 3));
      }
    } catch {
      // silently fail
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post?.title, url });
      } catch {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/4" />
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="aspect-[16/9] bg-muted rounded-xl" />
          <Separator />
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-4 bg-muted rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {error || 'Post not found'}
        </h1>
        <Link href="/blog" className="text-emerald-600 dark:text-emerald-400 hover:underline">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      {/* Article header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          {post.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-4">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          {post.updatedAt !== post.createdAt && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              Updated{' '}
              {new Date(post.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="gap-1.5 text-muted-foreground"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </header>

      {/* Featured Image */}
      {post.imageUrl && (
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-8 bg-muted">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}

      <Separator className="mb-8" />

      {/* Article content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {post.content.split('\n').map((paragraph, index) => {
          if (!paragraph.trim()) return <br key={index} />;
          if (paragraph.startsWith('## ')) {
            return <h2 key={index} className="text-xl font-semibold mt-8 mb-4 text-foreground">{paragraph.replace('## ', '')}</h2>;
          }
          if (paragraph.startsWith('### ')) {
            return <h3 key={index} className="text-lg font-semibold mt-6 mb-3 text-foreground">{paragraph.replace('### ', '')}</h3>;
          }
          if (paragraph.startsWith('- ')) {
            return <li key={index} className="text-muted-foreground ml-6">{paragraph.replace('- ', '')}</li>;
          }
          return <p key={index} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>;
        })}
      </div>

      {/* Share */}
      <Separator className="my-10" />
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Found this article helpful?</p>
        <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5">
          <Share2 className="h-4 w-4" />
          Share this article
        </Button>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <BlogCard
                key={relatedPost.id}
                title={relatedPost.title}
                slug={relatedPost.slug}
                excerpt={relatedPost.excerpt}
                createdAt={relatedPost.createdAt}
                imageUrl={relatedPost.imageUrl}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
