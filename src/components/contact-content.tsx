'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { Mail, MessageSquare, Clock, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is the maximum file size I can upload?',
    answer:
      'You can upload files up to 100MB in size. This limit applies per file, and there is no daily or monthly cap on the number of files you can upload (subject to our rate limit of 10 uploads per hour).',
  },
  {
    question: 'What file types are supported?',
    answer:
      'We support most common file types including images (JPG, PNG, GIF, WebP, SVG), videos (MP4, AVI, MOV, WebM), audio (MP3, WAV, OGG, AAC), documents (PDF, DOCX, TXT, RTF), spreadsheets (XLSX, CSV), presentations (PPTX), and archives (ZIP, RAR, 7Z, TAR). For security reasons, we block executable files such as .exe, .bat, .sh, .php, and .js.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'No. Zenvoora is designed to work without any registration. Simply drag and drop your file, get the link, and share it. No email, no password, no verification required.',
  },
  {
    question: 'How long are files stored?',
    answer:
      'Files are stored based on our retention policy. Generally, files remain available as long as they are being accessed. Files that have not been downloaded for an extended period may be removed to free up storage. We do not delete files arbitrarily — you will always have a reasonable window to download.',
  },
  {
    question: 'Is my data private?',
    answer:
      'Yes. We collect only the minimum data necessary to operate the service: your IP address (for rate limiting), file metadata (name, size, type), and timestamps. We do not read, analyze, or sell the contents of your files. Our full privacy policy is available on the Privacy Policy page.',
  },
  {
    question: 'How fast is the upload speed?',
    answer:
      'Upload speed depends on your internet connection, but our infrastructure is optimized for fast transfers. Most files under 10MB upload in under a second. Larger files depend on your connection speed but are typically processed within seconds to minutes.',
  },
];

export function ContactContent() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      toast.success(data.message || 'Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          Get In{' '}
          <span className="text-emerald-600 dark:text-emerald-400">Touch</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a question, suggestion, or issue? We would love to hear from you.
          Our team typically responds within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                Send Us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we will get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength={2}
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={5}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Side Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Response Time</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    We typically respond within 24 hours on business days.
                    For urgent matters, please include &quot;URGENT&quot; in your subject.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    support@zenvoora.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">DMCA & Abuse</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    For copyright or abuse reports, please contact
                    abuse@zenvoora.com with the file URL and details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-16">
        <div className="text-center mb-8">
          <HelpCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mt-2">
            Quick answers to common questions about Zenvoora
          </p>
        </div>

        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-sm font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
