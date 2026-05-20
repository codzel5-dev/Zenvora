import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Upload, ArrowRight, Star, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdBanner } from '@/components/ads/ad-banner';

export const metadata: Metadata = {
  title: 'Free E-Books — Download Digital Books & PDFs',
  description: 'Download free e-books and PDFs on cloud computing, AI, cybersecurity, marketing, and more. Expand your knowledge with our curated digital library on Zenvoora.',
  openGraph: {
    title: 'Free E-Books | Zenvoora',
    description: 'Download free e-books and PDFs on cloud computing, AI, cybersecurity, and more.',
  },
};

const ebooks = [
  {
    title: 'Cloud Storage Mastery: The Complete Guide',
    description: 'Everything you need to know about cloud storage — from choosing the right provider to advanced data management, security best practices, and cost optimization strategies for businesses of all sizes.',
    image: '/resources/ebooks/cloud-storage-guide.png',
    tags: ['Cloud', 'Storage', 'AWS', 'Data Management'],
    pages: 186,
    level: 'Intermediate',
  },
  {
    title: 'AI for Beginners: Understanding Artificial Intelligence',
    description: 'A beginner-friendly introduction to artificial intelligence covering machine learning, neural networks, natural language processing, and practical applications in everyday life and business.',
    image: '/resources/ebooks/ai-beginners.png',
    tags: ['AI', 'Machine Learning', 'Neural Networks', 'Beginner'],
    pages: 224,
    level: 'Beginner',
  },
  {
    title: 'Digital Marketing Playbook 2025',
    description: 'Comprehensive guide to modern digital marketing including SEO, content marketing, social media strategy, email campaigns, paid advertising, and analytics-driven decision making.',
    image: '/resources/ebooks/digital-marketing.png',
    tags: ['Marketing', 'SEO', 'Social Media', 'Analytics'],
    pages: 312,
    level: 'Intermediate',
  },
  {
    title: 'Cybersecurity Essentials: Protect Your Digital Life',
    description: 'Practical cybersecurity guide covering threat identification, password management, encryption, safe browsing, phishing prevention, and building a security-first mindset for individuals and teams.',
    image: '/resources/ebooks/cybersecurity.png',
    tags: ['Security', 'Privacy', 'Encryption', 'Hacking'],
    pages: 198,
    level: 'Beginner',
  },
  {
    title: 'Productivity Hacks for Remote Workers',
    description: 'Science-backed strategies for maximizing productivity while working from home. Covers time management, workspace optimization, communication tools, and maintaining work-life balance.',
    image: '/resources/ebooks/remote-productivity.png',
    tags: ['Productivity', 'Remote Work', 'Time Management', 'Self-Help'],
    pages: 156,
    level: 'Beginner',
  },
];

function getLevelColor(level: string) {
  if (level === 'Beginner') return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400';
  if (level === 'Intermediate') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400';
  return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400';
}

export default function EbooksPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-transparent to-orange-50/50 dark:from-red-950/30 dark:via-transparent dark:to-orange-950/20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
              <BookOpen className="h-7 w-7 text-red-500 dark:text-red-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Free E-Books</h1>
              <p className="text-muted-foreground mt-1">Expand your knowledge with our digital library</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mt-3 leading-relaxed">
            Explore our curated collection of free e-books and digital publications. From technology guides and business strategy to productivity and security — browse, upload, and share PDFs instantly.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Badge variant="secondary" className="text-sm px-3 py-1">{ebooks.length} E-Books</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">Free to Access</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">PDF Format</Badge>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <AdBanner />
      </div>

      {/* E-Books Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ebooks.map((ebook) => (
            <Card key={ebook.title} className="group overflow-hidden hover:shadow-xl hover:border-red-300 dark:hover:border-red-700 transition-all duration-300">
              {/* Book Cover */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-muted">
                <Image
                  src={ebook.image}
                  alt={ebook.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Level Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className={`text-xs font-medium border-0 ${getLevelColor(ebook.level)}`}>
                    {ebook.level}
                  </Badge>
                </div>
                {/* Page count */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs">
                  <FileText className="h-3 w-3" />
                  {ebook.pages} pages
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="text-base font-semibold group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors mb-2 line-clamp-2">
                  {ebook.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                  {ebook.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {ebook.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link href="/" className="w-full block">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white gap-2" size="sm">
                    <Upload className="h-4 w-4" />
                    Upload & Share E-Book
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-8">
          <h3 className="text-xl font-bold mb-2">Have an e-book to share?</h3>
          <p className="text-sm text-muted-foreground mb-4">Upload your publications and share knowledge with the Zenvoora community</p>
          <Link href="/">
            <Button className="gap-2 bg-red-600 hover:bg-red-700 text-white">
              <Upload className="h-4 w-4" />
              Upload an E-Book
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
