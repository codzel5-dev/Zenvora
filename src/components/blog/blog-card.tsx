import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
  imageUrl?: string;
}

export function BlogCard({ title, slug, excerpt, createdAt, imageUrl }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700">
        {/* Featured Image */}
        {imageUrl && (
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        <CardHeader className="pb-2">
          <p className="text-xs text-muted-foreground">
            {new Date(createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <CardTitle className="text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3">{excerpt}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
