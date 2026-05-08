'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { BlogCard } from '@/components/blog/blog-card';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export function BlogListContent() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (searchQuery?: string) => {
    try {
      const params = new URLSearchParams({ published: 'true' });
      if (searchQuery) params.set('search', searchQuery);
      const response = await fetch(`/api/blog?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchPosts(search);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          The FileVault{' '}
          <span className="text-emerald-600 dark:text-emerald-400">Blog</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Expert guides on cloud storage, file sharing, and data security. Stay informed with the latest trends and best practices.
        </p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </form>

      {/* Blog Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-xl border bg-card overflow-hidden">
              <div className="aspect-[16/9] bg-muted" />
              <div className="p-6">
                <div className="h-3 bg-muted rounded w-1/4 mb-3" />
                <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-full mb-1" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            {search
              ? `No articles found matching "${search}".`
              : 'No blog posts published yet. Check back soon!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              createdAt={post.createdAt}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
