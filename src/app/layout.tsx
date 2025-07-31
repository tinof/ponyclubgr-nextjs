import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import '../index.css'
import { ErrorBoundary } from '../components/ErrorBoundary'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new globalThis.URL('https://www.ponyclubacheron.com'),
  title: 'Pony Club - Acheron River, Greece | Horse Riding & Rafting Tours',
  description: 'Experience unforgettable horse riding and rafting adventures at Acheron River, Greece. Family-friendly tours since 1998 with professional guides and safety equipment.',
  keywords: 'horse riding, rafting, Acheron River, Greece, adventure tours, family activities, outdoor activities, nature tours, water sports, equestrian tours',
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
    title: 'Pony Club - Acheron River Adventures',
    description: 'Unforgettable horse riding and rafting experiences in Greece',
    url: 'https://www.ponyclubacheron.com',
    siteName: 'Pony Club Acheron',
    images: [
      {
        url: '/images/og-image-ponyclub.jpg',
        width: 1200,
        height: 630,
        alt: 'Pony Club - Horse riding and rafting adventures at Acheron River, Greece',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pony Club - Acheron River Adventures',
    description: 'Unforgettable horse riding and rafting experiences in Greece',
    images: ['/images/og-image-ponyclub.jpg'],
  },
  verification: {
    google: 'your-google-site-verification-code', // Replace with actual verification code
  },
}

// JSON-LD structured data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Pony Club - Rafting & Riding Adventure',
  description: 'Experience unforgettable horse riding and rafting adventures at Acheron River, Greece.',
  image: 'https://www.ponyclubacheron.com/images/og-image-ponyclub.jpg',
  brand: {
    '@type': 'Brand',
    name: 'Pony Club Acheron',
  },
  offers: {
    '@type': 'Offer',
    url: 'https://www.ponyclubacheron.com/',
    priceCurrency: 'EUR',
    price: '20',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '88',
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#5a6f5a] text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <Script
          src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c078b762-6f7f-474f-8edb-bdd1bdb7d12a"
          strategy="afterInteractive"
          id="bokun-loader"
        />
        <ErrorBoundary>
          <div id="root">{children}</div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
