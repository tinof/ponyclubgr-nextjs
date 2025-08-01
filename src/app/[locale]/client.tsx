'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Header } from '../../components/Header'
import { WelcomeSection } from '../../components/WelcomeSection'
import { LanguageSelector } from '../../components/LanguageSelector'
import type { Dictionary, Locale } from '../../lib/dictionaries'

// Lazily load components that are below the fold or non-critical
const PackageCards = dynamic(() => import('../../components/PackageCards').then(mod => ({ default: mod.PackageCards })), {
  loading: () => <div className="px-3"><div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-premium border border-white/40 animate-pulse"><div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div><div className="h-3 bg-gray-200 rounded w-1/2"></div></div></div>,
  ssr: false // Disable SSR for this component since it's client-interactive
})

const BottomNav = dynamic(() => import('../../components/BottomNav').then(mod => ({ default: mod.BottomNav })), {
  ssr: false
})

interface LocalizedClientPageProps {
  locale: Locale
  dictionary: Dictionary
}

export function LocalizedClientPage({ locale, dictionary }: LocalizedClientPageProps) {
  return (
    <div className="bg-[#f5f7f5] min-h-screen flex justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#e0e8e0] rounded-full opacity-30 -translate-y-1/2 translate-x-1/2 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#d8e5d8] rounded-full opacity-30 translate-y-1/2 -translate-x-1/2 blur-3xl" aria-hidden="true" />

      <div className="max-w-sm mx-auto bg-[#f8faf8] rounded-[2rem] shadow-premium p-4 flex flex-col min-h-[80vh] relative z-10 border border-white/40">
        <Header dictionary={dictionary} />
        <main id="main-content" className="flex-grow space-y-6 pt-6 pb-20">
          {/* Language Selector positioned below weather widget */}
          <div className="px-3">
            <LanguageSelector currentLocale={locale} />
          </div>
          <WelcomeSection dictionary={dictionary} />
          <PackageCards dictionary={dictionary} />
        </main>
        <BottomNav dictionary={dictionary} />
      </div>
    </div>
  )
}
