import type { Metadata } from 'next';
import { Shield, Heart, Zap, Users, Eye, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about FileVault — our mission, values, and why we built a free file sharing service that puts users first.',
  openGraph: {
    title: 'About FileVault',
    description:
      'Learn about FileVault — our mission, values, and why we built a free file sharing service that puts users first.',
  },
};

const values = [
  {
    icon: Shield,
    title: 'Security First',
    description:
      'Every file uploaded to FileVault is scanned for threats. We block dangerous file types and continuously monitor for malicious content. Your safety is non-negotiable.',
  },
  {
    icon: Heart,
    title: 'Free Forever',
    description:
      'We believe file sharing should be free and accessible to everyone. No premium tiers, no hidden costs, no bait-and-switch. FileVault is and will remain 100% free.',
  },
  {
    icon: Zap,
    title: 'Speed Matters',
    description:
      'We invest in fast infrastructure so your uploads complete in seconds and your downloaders never wait. A slow service is a broken service — we take performance seriously.',
  },
  {
    icon: Users,
    title: 'User Focused',
    description:
      'Every decision we make starts with the question: does this make the experience better for our users? No dark patterns, no unnecessary friction, no spam.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description:
      'We are open about how we handle your data, what we store, and how the service works. Our privacy policy is written in plain English, not legalese.',
  },
  {
    icon: Globe,
    title: 'Global Accessibility',
    description:
      'FileVault works in every country, on every device, without restrictions. We optimize for low-bandwidth connections and support all modern browsers.',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          About{' '}
          <span className="text-emerald-600 dark:text-emerald-400">FileVault</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          We built FileVault because file sharing should be simple, fast, and free.
        </p>
      </div>

      {/* Mission Statement */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-muted-foreground">
          <p>
            FileVault exists to solve a simple problem: sharing files online should not be
            complicated. Too many services require accounts, bombard you with ads, limit
            file sizes to tiny amounts, or charge for basic functionality.
          </p>
          <p>
            We set out to build the file sharing service we wanted to use ourselves — one that
            gets out of your way and just works. Drag a file, get a link, share it. That is
            the entire workflow. No sign-up, no waiting, no catches.
          </p>
          <p>
            Behind the simplicity is a robust infrastructure designed for reliability and speed.
            Every file is scanned for security threats. We use globally distributed servers
            to ensure fast uploads and downloads regardless of your location. And we handle
            millions of files every month without breaking a sweat.
          </p>
        </div>
      </section>

      {/* Why We Built This */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Why We Built FileVault</h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-muted-foreground">
          <p>
            Before FileVault, the free file sharing landscape was frustrating. Services
            either required registration, had tiny file size limits, were filled with
            intrusive advertising, or had slow download speeds. We knew there had to be
            a better way.
          </p>
          <p>
            We started FileVault in 2024 with a clear vision: create a file sharing
            service that respects its users. One that is fast, secure, and genuinely
            free. A service where the only thing you need to think about is which file
            to share next.
          </p>
          <p>
            Today, FileVault serves hundreds of thousands of users across 190+ countries.
            Students share project files, professionals collaborate on documents, creators
            distribute their work, and families share memories — all through the same
            simple interface.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <Card key={value.title} className="border-border/50">
              <CardContent className="p-6">
                <div className="rounded-lg bg-emerald-100 dark:bg-emerald-900/40 w-10 h-10 flex items-center justify-center mb-4">
                  <value.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-base font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Note */}
      <section className="mt-16 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-6 sm:p-8">
        <h2 className="text-xl font-bold mb-3 text-emerald-800 dark:text-emerald-300">
          A Note From Our Team
        </h2>
        <p className="text-sm text-emerald-700 dark:text-emerald-400 leading-relaxed">
          We are a small team of engineers and designers who care deeply about building
          products that work well and treat people right. Every feature we add, every line
          of code we write, is in service of making file sharing easier for you. Thank you
          for using FileVault — your trust means everything to us.
        </p>
      </section>
    </div>
  );
}
