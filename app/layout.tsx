import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import MetaPixel from '@/components/MetaPixel';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yummy Bites — Snack Enak, Hidup Sehat',
  description:
    'Camilan premium tanpa bahan pengawet. Dibuat dari bahan alami pilihan, cocok untuk kamu yang mau hidup sehat tanpa bosan.',
  openGraph: {
    title: 'Yummy Bites — Snack Enak, Hidup Sehat',
    description: 'Camilan premium tanpa bahan pengawet.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <GoogleAnalytics />
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
