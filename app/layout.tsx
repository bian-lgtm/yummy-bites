import type { Metadata } from 'next';
import { Fredoka } from 'next/font/google';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import MetaPixel from '@/components/MetaPixel';
import './globals.css';

const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-fredoka', weight: ['300','400','500','600','700'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Yummy Bites — Makanan Sehat untuk Si Kecil',
  description: 'Makanan utama dan selingan premium untuk bayi dan balita. Bahan alami, organik, tanpa pengawet. Tersedia di Shopee, Tokopedia, TikTok Shop & Lazada.',
  openGraph: {
    title: 'Yummy Bites — Makanan Sehat untuk Si Kecil',
    description: 'Makanan utama dan selingan premium untuk bayi dan balita.',
    type: 'website',
    images: ['https://yummybites.com/res/images/yummy-bites.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={fredoka.variable}>
      <body>
        <GoogleAnalytics />
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
