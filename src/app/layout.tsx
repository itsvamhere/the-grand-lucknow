import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { SITE_CONFIG } from '@/data/siteConfig';
import { UIStateProvider } from '@/lib/useSurfaceTheme';
import { Header } from '@/components/Header';
import { MobileMenu } from '@/components/MobileMenu';
import { ScrollTopButton } from '@/components/ScrollTopButton';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    'The Grand Lucknow: 5 expansive lawns and indoor banquet halls, 64 on-site luxury rooms and family suites on Raibareli Road, Bindaua, Lucknow.',
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#14120E',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-header-theme="dark" className={inter.variable}>
      <body>
        <UIStateProvider>
          <a href="#main-content" className="skip-link visually-hidden">
            Skip to main content
          </a>
          <Header />
          <MobileMenu />
          <main id="main-content" tabIndex={-1} className="min-h-screen w-full">
            {children}
          </main>
          <ScrollTopButton />
        </UIStateProvider>
      </body>
    </html>
  );
}
