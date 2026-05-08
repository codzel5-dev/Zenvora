import Link from 'next/link';
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
}

export function BlogCard({ title, slug, excerpt, createdAt }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <Card className="h-full transition-all hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700">
        <CardHeader>
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
