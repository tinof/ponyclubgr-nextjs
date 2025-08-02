import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';
import '../../index.css';
import { StagewiseClient } from '../../components/StagewiseClient';
import { notFound } from 'next/navigation';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import {
  getDictionary,
  isValidLocale,
  type Locale,
} from '../../lib/dictionaries';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

// Generate metadata dynamically based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Validate locale
  if (!isValidLocale(locale as Locale)) {
    return {};
  }

  const dictionary = await getDictionary(locale as Locale);

  return {
    metadataBase: new globalThis.URL('https://www.ponyclubacheron.com'),
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    keywords: dictionary.metadata.keywords,
    authors: [{ name: 'Pony Club Acheron' }],
    creator: 'Pony Club Acheron',
    publisher: 'Pony Club Acheron',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    openGraph: {
      title: dictionary.metadata.openGraph.title,
      description: dictionary.metadata.openGraph.description,
      url: `https://www.ponyclubacheron.com/${locale}`,
      siteName: 'Pony Club Acheron',
      images: [
        {
          url: '/images/og-image-ponyclub.jpg',
          width: 1200,
          height: 630,
          alt: dictionary.metadata.openGraph.imageAlt,
        },
      ],
      locale: locale === 'el' ? 'el_GR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dictionary.metadata.twitter.title,
      description: dictionary.metadata.twitter.description,
      images: ['/images/og-image-ponyclub.jpg'],
    },
    verification: {
      google: 'your-google-site-verification-code', // Replace with actual verification code
    },
    alternates: {
      canonical: `https://www.ponyclubacheron.com/${locale}`,
      languages: {
        en: 'https://www.ponyclubacheron.com/en',
        el: 'https://www.ponyclubacheron.com/el',
        'x-default': 'https://www.ponyclubacheron.com/en',
      },
    },
  };
}

// Generate static params for supported locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'el' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale and redirect to 404 if invalid
  if (!isValidLocale(locale as Locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as Locale);

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: dictionary.jsonLd.name,
    description: dictionary.jsonLd.description,
    image: 'https://www.ponyclubacheron.com/images/og-image-ponyclub.jpg',
    brand: {
      '@type': 'Brand',
      name: dictionary.jsonLd.brandName,
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.ponyclubacheron.com/${locale}`,
      priceCurrency: 'EUR',
      price: '20',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '88',
    },
  };

  return (
    <html lang={locale as Locale} className={poppins.variable}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#5a6f5a] text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-white"
        >
          {dictionary.common.skipToMainContent}
        </a>
        <Script
          src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c078b762-6f7f-474f-8edb-bdd1bdb7d12a"
          strategy="afterInteractive"
          id="bokun-loader"
        />
        <ErrorBoundary>
          <div id="root">{children}</div>
          <StagewiseClient />
        </ErrorBoundary>
      </body>
    </html>
  );
}
