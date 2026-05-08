import type { Metadata } from 'next';
import {
  CloudUpload,
  Shield,
  Zap,
  Globe,
  Lock,
  Heart,
  Clock,
  Smartphone,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FileUploader } from '@/components/upload/file-uploader';
import { FileHistory } from '@/components/upload/file-history';
import { CtaSection } from '@/components/cta-section';

export const metadata: Metadata = {
  title: 'Free File Upload & Sharing Service',
  description:
    'Upload and share files instantly with FileVault. Free, fast, and secure file hosting. No registration required. Share images, videos, documents, and more up to 100MB.',
  openGraph: {
    title: 'FileVault — Free File Upload & Sharing Service',
    description:
      'Upload and share files instantly. Free, fast, and secure file hosting with no registration required.',
  },
};

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
      'No hidden fees, no premium tiers, no credit card required. FileVault is completely free for everyone, always.',
  },
  {
    icon: Smartphone,
    title: 'Works on Any Device',
    description:
      'Fully responsive design works perfectly on desktop, tablet, and mobile. Upload and share from anywhere.',
  },
];

const stats = [
  { label: 'Files Uploaded', value: '10M+' },
  { label: 'Happy Users', value: '500K+' },
  { label: 'Countries', value: '190+' },
  { label: 'Uptime', value: '99.9%' },
];

export default function HomePage() {
  return (
    <>
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
            <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Drag and drop any file up to 100MB. Get a shareable link in seconds.
              No registration, no hassle, completely free.
            </p>
          </div>

          {/* Upload Component */}
          <FileUploader />

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

      {/* Recent Uploads Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-semibold">Recent Uploads</h2>
          </div>
          <FileHistory />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Why Choose{' '}
              <span className="text-emerald-600 dark:text-emerald-400">FileVault</span>?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              We built FileVault to make file sharing simple, fast, and safe.
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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
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
              icon: Zap,
              title: 'Get Your Link',
              description: 'Your file is uploaded instantly. A unique shareable link is generated automatically — no extra steps needed.',
            },
            {
              step: '3',
              icon: Globe,
              title: 'Share It',
              description: 'Copy the link and share it with anyone. They can download the file directly — no account or sign-up required.',
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
      </section>

      {/* CTA Section */}
      <CtaSection />
    </>
  );
}
