'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X, Shield } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'zenvoora_cookie_consent';

type ConsentStatus = 'accepted' | 'rejected' | null;

export function CookieConsent() {
  const [visible, setVisible] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    // Check if user has already made a choice
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;
    if (!stored) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
    setDismissed(true);

    // Enable ad personalization
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: 'ca-pub-2436864326098458',
        enable_page_level_ads: true,
      });
    } catch {
      // AdSense not loaded yet, will be handled by existing ad components
    }

    // Enable Google Analytics
    try {
      // @ts-expect-error gtag is injected by the GA script
      if (typeof window.gtag === 'function') {
        // @ts-expect-error gtag is injected by the GA script
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        });
      }
    } catch {
      // GA not loaded yet
    }
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setVisible(false);
    setDismissed(true);

    // Disable ad personalization but allow non-personalized ads
    try {
      // @ts-expect-error gtag is injected by the GA script
      if (typeof window.gtag === 'function') {
        // @ts-expect-error gtag is injected by the GA script
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        });
      }
    } catch {
      // GA not loaded yet
    }
  };

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 animate-in slide-in-from-bottom-10 duration-500">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl">
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="hidden sm:flex w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 items-center justify-center flex-shrink-0">
              <Cookie className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Cookie className="h-4 w-4 text-emerald-600 dark:text-emerald-400 sm:hidden" />
                  We value your privacy
                </h3>
                <button
                  onClick={handleDismiss}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your experience, serve relevant ads, and analyze traffic.
                This includes Google AdSense for advertising and Google Analytics for site usage insights.
                You can choose to accept or decline non-essential cookies.{' '}
                <a href="/privacy" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                  Learn more in our Privacy Policy
                </a>.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Button
                  onClick={handleAccept}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 text-sm"
                >
                  <Shield className="h-4 w-4" />
                  Accept All Cookies
                </Button>
                <Button
                  onClick={handleReject}
                  variant="outline"
                  className="text-sm"
                >
                  Decline Non-Essential
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
