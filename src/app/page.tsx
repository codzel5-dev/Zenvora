import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CloudUpload,
  Shield,
  Zap,
  Globe,
  Lock,
  Heart,
  Smartphone,
  Eye,
  Sparkles,
  ArrowRight,
  Share2,
  FileSearch,
  RefreshCw,
  Image as ImageIcon,
  FileText,
  Video,
  Music,
  Archive,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileUploader } from '@/components/upload/file-uploader';
import { CtaSection } from '@/components/cta-section';
import { AdBanner } from '@/components/ads/ad-banner';

export const metadata: Metadata = {
  title: 'Free File Upload & Sharing Service',
  description:
    'Upload and share files instantly with Zenvoora. Free, fast, and secure file hosting. No registration required. Share images, videos, documents, and more up to 100MB.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Zenvoora — Free File Upload & Sharing Service',
    description:
      'Upload and share files instantly. Free, fast, and secure file hosting with no registration required.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Zenvoora',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://zenvoora.vercel.app',
  description: 'Free file upload and sharing service. Upload files up to 100MB and share them instantly with a unique link.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'File upload up to 100MB',
    'Instant shareable links',
    'No registration required',
    'AI-powered file analysis',
    'File format conversion',
    'Malware scanning',
  ],
};

const workflowSteps = [
  {
    icon: CloudUpload,
    label: 'Upload',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-900/40',
  },
  {
    icon: Eye,
    label: 'Preview',
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-100 dark:bg-sky-900/40',
  },
  {
    icon: FileSearch,
    label: 'Convert',
    href: '/convert',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900/40',
  },
  {
    icon: Sparkles,
    label: 'Analyze',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-900/40',
  },
  {
    icon: Share2,
    label: 'Share',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-100 dark:bg-rose-900/40',
  },
];

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast Uploads',
    description:
      'Upload files instantly with our optimized infrastructure. No waiting, no queues — your files are ready to share in seconds.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description:
      'Every file is scanned for malware. We use industry-standard encryption and never sell your data. Your privacy is our priority.',
  },
  {
    icon: Globe,
    title: 'Share Anywhere',
    description:
      'Get a unique link for every upload. Share it via email, messaging apps, or social media — anyone can download without an account.',
  },
  {
    icon: Lock,
    title: 'No Registration Required',
    description:
      'Start uploading immediately. No sign-up forms, no email verification, no passwords. Just drag, drop, and share.',
  },
  {
    icon: Heart,
    title: '100% Free',
    description:
      'No hidden fees, no premium tiers, no credit card required. Zenvoora is completely free for everyone, always.',
  },
  {
    icon: Smartphone,
    title: 'Works on Any Device',
    description:
      'Fully responsive design works perfectly on desktop, tablet, and mobile. Upload and share from anywhere.',
  },
];

const stats = [
  { label: 'Max File Size', value: '100MB' },
  { label: 'Cost', value: 'Free' },
  { label: 'Global CDN', value: 'Fast' },
  { label: 'Registration', value: 'None' },
];

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-transparent to-emerald-50/50 dark:from-emerald-950/30 dark:via-transparent dark:to-emerald-950/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Upload & Share Files
              <br />
              <span className="text-emerald-600 dark:text-emerald-400">
                Instantly, Freely
              </span>
            </h1>

            {/* Tagline with animated arrows */}
            <div className="mt-5 flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
              {workflowSteps.map((step, index) => (
                <span key={step.label} className="flex items-center gap-1 sm:gap-2">
                  {'href' in step && step.href ? (
                    <Link href={step.href} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-background border border-amber-300 dark:border-amber-700 shadow-sm hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors cursor-pointer">
                      <step.icon className={`h-4 w-4 ${step.color}`} />
                      <span>{step.label}</span>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-background border border-border/60 shadow-sm">
                      <step.icon className={`h-4 w-4 ${step.color}`} />
                      <span>{step.label}</span>
                    </span>
                  )}
                  {index < workflowSteps.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-emerald-500 animate-pulse hidden sm:block" />
                  )}
                </span>
              ))}
            </div>

            <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Drag and drop any file up to 100MB. Get a shareable link in seconds.
              No registration, no hassle, completely free.
            </p>
          </div>

          {/* Upload Component */}
          <FileUploader />

          {/* Ad Banner */}
          <div className="mt-8 max-w-4xl mx-auto">
            <AdBanner />
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Features Section */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              The Complete{' '}
              <span className="text-emerald-600 dark:text-emerald-400">File Platform</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              More than just uploading — Zenvoora gives you a full suite of tools to preview,
              analyze, and share your files with the world.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {workflowSteps.map((step) => (
              <Card
                key={step.label}
                className="border-border/50 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors text-center"
              >
                <CardContent className="p-6 flex flex-col items-center">
                  <div className={`rounded-lg ${step.bg} w-12 h-12 flex items-center justify-center mb-4`}>
                    <step.icon className={`h-6 w-6 ${step.color}`} />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{step.label}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.label === 'Upload' && 'Drag & drop any file type — images, videos, documents, code, and more.'}
                    {step.label === 'Preview' && 'View files directly in your browser — PDFs, images, videos, audio, and code.'}
                    {step.label === 'Convert' && 'Transform files between formats with built-in conversion tools.'}
                    {step.label === 'Analyze' && 'AI-powered summaries, tags, and insights automatically generated.'}
                    {step.label === 'Share' && 'Get a unique link for every file. Share with anyone, no account needed.'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Why Choose{' '}
              <span className="text-emerald-600 dark:text-emerald-400">Zenvoora</span>?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              We built Zenvoora to make file sharing simple, fast, and safe.
              No ads, no tracking, no catches — just a great service you can trust.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border-border/50 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="rounded-lg bg-emerald-100 dark:bg-emerald-900/40 w-10 h-10 flex items-center justify-center mb-4">
                    <feature.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              How It Works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three simple steps to share any file
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '1',
                icon: CloudUpload,
                title: 'Drop Your File',
                description: 'Drag and drop your file onto the upload area, or click to browse your device. We support images, videos, documents, and more.',
              },
              {
                step: '2',
                icon: Sparkles,
                title: 'AI Analyzes It',
                description: 'Our AI automatically generates a summary, extracts tags, and categorizes your file — making it discoverable and informative.',
              },
              {
                step: '3',
                icon: Globe,
                title: 'Share It',
                description: 'Copy the link and share it with anyone. They can preview and download the file directly — no account or sign-up required.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* File Converter Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-amber-50/60 via-transparent to-transparent dark:from-amber-950/20 dark:via-transparent dark:to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 mb-4">
              <RefreshCw className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">200+ Formats Supported</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Free <span className="text-amber-600 dark:text-amber-400">File Converter</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Convert images, documents, videos, audio, and archives between formats instantly.
              No software to install — everything happens in the cloud, fast and secure.
            </p>
          </div>

          {/* Format Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {/* Images */}
            <Card className="border-border/50 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all hover:shadow-md">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-3">
                  <ImageIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold text-sm mb-2">Images</h3>
                <div className="flex flex-wrap gap-1 justify-center">
                  {['PNG', 'JPG', 'WebP', 'GIF', 'SVG', 'BMP'].map(f => (
                    <Badge key={f} variant="secondary" className="text-[10px] px-1.5 py-0.5">{f}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="border-border/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-md">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-sm mb-2">Documents</h3>
                <div className="flex flex-wrap gap-1 justify-center">
                  {['PDF', 'DOCX', 'XLSX', 'PPTX', 'TXT', 'CSV'].map(f => (
                    <Badge key={f} variant="secondary" className="text-[10px] px-1.5 py-0.5">{f}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Video */}
            <Card className="border-border/50 hover:border-purple-300 dark:hover:border-purple-700 transition-all hover:shadow-md">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mx-auto mb-3">
                  <Video className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-sm mb-2">Video</h3>
                <div className="flex flex-wrap gap-1 justify-center">
                  {['MP4', 'WebM', 'AVI', 'MOV', 'MKV', 'GIF'].map(f => (
                    <Badge key={f} variant="secondary" className="text-[10px] px-1.5 py-0.5">{f}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Audio */}
            <Card className="border-border/50 hover:border-pink-300 dark:hover:border-pink-700 transition-all hover:shadow-md">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center mx-auto mb-3">
                  <Music className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="font-semibold text-sm mb-2">Audio</h3>
                <div className="flex flex-wrap gap-1 justify-center">
                  {['MP3', 'WAV', 'OGG', 'FLAC', 'AAC', 'WMA'].map(f => (
                    <Badge key={f} variant="secondary" className="text-[10px] px-1.5 py-0.5">{f}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Archives */}
            <Card className="border-border/50 hover:border-yellow-300 dark:hover:border-yellow-700 transition-all hover:shadow-md">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center mx-auto mb-3">
                  <Archive className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="font-semibold text-sm mb-2">Archives</h3>
                <div className="flex flex-wrap gap-1 justify-center">
                  {['ZIP', 'TAR', 'GZ', '7Z', 'RAR'].map(f => (
                    <Badge key={f} variant="secondary" className="text-[10px] px-1.5 py-0.5">{f}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI-Powered */}
            <Card className="border-border/50 hover:border-amber-300 dark:hover:border-amber-700 transition-all hover:shadow-md">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-semibold text-sm mb-2">AI-Powered</h3>
                <div className="flex flex-wrap gap-1 justify-center">
                  {['Analysis', 'Tags', 'Summary'].map(f => (
                    <Badge key={f} variant="secondary" className="text-[10px] px-1.5 py-0.5">{f}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Card */}
          <div className="max-w-xl mx-auto">
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border-2 border-amber-200 dark:border-amber-800 shadow-lg">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-xl bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center mb-4">
                  <FileSearch className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Convert Files Now</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Upload any file and convert it to a different format in seconds.
                  Free, no sign-up required — just drag, drop, and convert.
                </p>
                <Link href="/convert" className="w-full">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white gap-2 h-12 text-base font-semibold shadow-md">
                    <RefreshCw className="h-5 w-5" />
                    Start Converting
                  </Button>
                </Link>
                <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
                  <span>Free</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span>No Sign-up</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span>200+ Formats</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span>Secure</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </>
  );
}
