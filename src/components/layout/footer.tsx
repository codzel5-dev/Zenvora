import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  product: [
    { href: '/', label: 'Upload' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  explore: [
    { href: '/templates', label: 'Templates' },
    { href: '/ebooks', label: 'E-Books' },
    { href: '/design', label: 'Design Assets' },
    { href: '/prompts', label: 'AI Prompts' },
    { href: '/scripts', label: 'Scripts' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <Image src="/logo.png" alt="Zenvoora" width={32} height={32} className="rounded-lg transition-transform group-hover:scale-105" />
              <span className="text-lg font-bold tracking-tight">
                Zen<span className="text-emerald-600 dark:text-emerald-400">voora</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Free, fast, and secure file upload and sharing service. Upload any file and share it with a simple link.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Product</h3>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Explore</h3>
            <ul className="space-y-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Supported File Types</h3>
            <p className="text-sm text-muted-foreground">
              Images, videos, audio, documents, PDFs, spreadsheets, presentations, and archives up to 100MB.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Zenvoora. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Free file sharing — no registration required.
          </p>
        </div>
      </div>
    </footer>
  );
}
