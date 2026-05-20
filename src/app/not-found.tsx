import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-6">
        <FileQuestion className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
        Page Not Found
      </h1>
      <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
        Sorry, the page you are looking for does not exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
            Go to Homepage
          </Button>
        </Link>
        <Link href="/blog">
          <Button variant="outline" className="gap-2">
            Read Our Blog
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline" className="gap-2">
            Contact Us
          </Button>
        </Link>
      </div>
    </div>
  );
}
