'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloudUpload,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  LayoutTemplate,
  BookOpen,
  Palette,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const exploreLinks = [
  { href: '/templates', label: 'Templates', icon: LayoutTemplate, color: 'text-emerald-500' },
  { href: '/ebooks', label: 'E-Books', icon: BookOpen, color: 'text-red-500' },
  { href: '/design', label: 'Design Assets', icon: Palette, color: 'text-purple-500' },
  { href: '/prompts', label: 'AI Prompts', icon: Sparkles, color: 'text-amber-500' },
  { href: '/scripts', label: 'Scripts', icon: Terminal, color: 'text-sky-500' },
];

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [exploreOpen, setExploreOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const exploreRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => setMounted(true), []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (exploreRef.current && !exploreRef.current.contains(event.target as Node)) {
        setExploreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isExploreActive = exploreLinks.some(
    (link) => pathname === link.href
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/logo.png" alt="Zenvoora" width={36} height={36} className="rounded-lg transition-transform group-hover:scale-105" />
          <span className="text-xl font-bold tracking-tight">
            Zen<span className="text-emerald-600 dark:text-emerald-400">voora</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute inset-0 bg-emerald-50 dark:bg-emerald-950/50 rounded-md -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {/* Explore Dropdown */}
          <div ref={exploreRef} className="relative">
            <button
              onClick={() => setExploreOpen(!exploreOpen)}
              className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
                isExploreActive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Explore
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${exploreOpen ? 'rotate-180' : ''}`} />
              {isExploreActive && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute inset-0 bg-emerald-50 dark:bg-emerald-950/50 rounded-md -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>

            <AnimatePresence>
              {exploreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-border/60 bg-background/95 backdrop-blur-lg shadow-lg overflow-hidden"
                >
                  <div className="p-1.5">
                    {exploreLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setExploreOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                          }`}
                        >
                          <link.icon className={`h-4 w-4 ${link.color}`} />
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Upload shortcut button */}
          <Link href="/" className="hidden sm:flex">
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
            >
              <CloudUpload className="h-4 w-4" />
              Upload
            </Button>
          </Link>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="h-9 w-9"
          >
            {mounted ? (
              theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )
            ) : (
              <Sun className="h-4 w-4 opacity-0" />
            )}
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg"
          >
            <nav className="flex flex-col py-4 px-4" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Explore section in mobile */}
              <div className="mt-2 pt-2 border-t border-border/40">
                <p className="px-4 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Explore</p>
                {exploreLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <link.icon className={`h-4 w-4 ${link.color}`} />
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="mt-2 sm:hidden">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5">
                  <CloudUpload className="h-4 w-4" />
                  Upload File
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
