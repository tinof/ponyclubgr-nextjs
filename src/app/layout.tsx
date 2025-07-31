import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Poppins } from 'next/font/google'
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
  openGraph: {
    title: 'Pony Club - Acheron River Adventures',
    description: 'Unforgettable horse riding and rafting experiences in Greece',
    images: ['/og-image.jpg'],
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
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
