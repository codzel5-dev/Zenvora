'use client';

import { useEffect } from 'react';

export function AdBanner() {
  useEffect(() => {
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className="w-full flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2436864326098458"
        data-ad-slot="9411320301"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
