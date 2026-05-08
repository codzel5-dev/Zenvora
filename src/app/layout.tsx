import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
    default: 'FileVault — Free File Upload & Sharing Service',
    template: '%s | FileVault',
  },
  description:
    'Upload and share files instantly with FileVault. Free, fast, and secure file hosting. No registration required. Share images, videos, documents, and more.',
  keywords: [
    'file upload',
    'file sharing',
    'free file hosting',
    'share files online',
    'cloud storage',
    'file transfer',
    'send files',
    'upload files free',
    'FileVault',
  ],
  authors: [{ name: 'FileVault' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'FileVault — Free File Upload & Sharing Service',
    description:
      'Upload and share files instantly. Free, fast, and secure file hosting with no registration required.',
    url: 'https://filevault.app',
    siteName: 'FileVault',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FileVault — Free File Upload & Sharing Service',
    description:
      'Upload and share files instantly. Free, fast, and secure file hosting.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
