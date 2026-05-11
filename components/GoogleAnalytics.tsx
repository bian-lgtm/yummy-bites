'use client';
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { page_path: window.location.pathname });
      `}</Script>
    </>
  );
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) window.gtag('event', name, params);
}

declare global {
  interface Window { gtag: (...args: unknown[]) => void; dataLayer: unknown[]; }
}
