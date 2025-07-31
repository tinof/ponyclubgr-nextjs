import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import '../index.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Pony Club - Acheron River, Greece | Horse Riding & Rafting Tours',
  description: 'Experience unforgettable horse riding and rafting adventures at Acheron River, Greece. Family-friendly tours since 1998 with professional guides and safety equipment.',
  keywords: 'horse riding, rafting, Acheron River, Greece, adventure tours, family activities',
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
    images: ['/images/og-image-ponyclub.jpg'],
    locale: 'en_US',
    type: 'website',
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
        <Script
          src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c078b762-6f7f-474f-8edb-bdd1bdb7d12a"
          strategy="afterInteractive"
          id="bokun-loader"
        />
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
