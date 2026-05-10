import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Zenvoora — Free File Upload & Sharing Service',
    template: '%s | Zenvoora',
  },
  description:
    'Upload and share files instantly with Zenvoora. Free, fast, and secure file hosting. No registration required. Share images, videos, documents, and more.',
  keywords: [
    'file upload',
    'file sharing',
    'free file hosting',
    'share files online',
    'cloud storage',
    'file transfer',
    'send files',
    'upload files free',
    'Zenvoora',
  ],
  authors: [{ name: 'Zenvoora' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Zenvoora — Free File Upload & Sharing Service',
    description:
      'Upload and share files instantly. Free, fast, and secure file hosting with no registration required.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://zenvoora.vercel.app',
    siteName: 'Zenvoora',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zenvoora — Free File Upload & Sharing Service',
    description:
      'Upload and share files instantly. Free, fast, and secure file hosting.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'dt1xckxX1HsglwrL2XK6lWxf89yE9i6ruM8csqnCp38',
  },
  other: {
    'google-adsense-account': 'ca-pub-2436864326098458',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Search Console verification - also set via metadata.verification */}
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2436864326098458"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Analytics (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WJK0CNLB4K"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WJK0CNLB4K');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'bg-background text-foreground border-border',
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
