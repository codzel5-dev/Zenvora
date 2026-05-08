import type { Metadata } from 'next';
import { ContactContent } from '@/components/contact-content';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the Zenvoora team. Send us a message, ask a question, or report an issue. We typically respond within 24 hours.',
  openGraph: {
    title: 'Contact Us — Zenvoora',
    description:
      'Get in touch with the Zenvoora team. Send us a message, ask a question, or report an issue.',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
