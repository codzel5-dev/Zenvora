'use client';

import { CloudUpload } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="bg-emerald-600 dark:bg-emerald-700 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Ready to Share Your Files?
        </h2>
        <p className="mt-2 text-emerald-100 max-w-lg mx-auto">
          Join hundreds of thousands of users who trust FileVault for fast, free, and secure file sharing.
        </p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
        >
          <CloudUpload className="h-4 w-4" />
          Start Uploading Now
        </a>
      </div>
    </section>
  );
}
