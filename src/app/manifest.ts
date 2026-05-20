import type { Metadata } from 'next';
import { NextResponse } from 'next/server';

export default function manifest() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenvoora.vercel.app';

  return {
    name: 'Zenvoora — Free File Upload & Sharing',
    short_name: 'Zenvoora',
    description: 'Upload and share files instantly. Free, fast, and secure file hosting with no registration required.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#059669',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
