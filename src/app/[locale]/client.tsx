'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { WelcomeSection } from '../../components/WelcomeSection'
import { LanguageSelector } from '../../components/LanguageSelector'
import type { Dictionary, Locale } from '../../lib/dictionaries'

// Lazily load components that are below the fold or non-critical
const PackageCards = dynamic(() => import('../../components/PackageCards').then(mod => ({ default: mod.PackageCards })), {
  loading: () => <div className="px-3"><div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-premium border border-white/40 animate-pulse"><div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div><div className="h-3 bg-gray-200 rounded w-1/2"></div></div></div>,
  ssr: false // Disable SSR for this component since it's client-interactive
})

const WhyChooseUs = dynamic(() => import('../../components/WhyChooseUs').then(mod => ({ default: mod.WhyChooseUs })), {
  loading: () => <div className="px-4 mt-8"><div className="bg-white rounded-2xl shadow-card p-5 border border-white/60 animate-pulse"><div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div><div className="space-y-4"><div className="h-3 bg-gray-200 rounded w-3/4"></div><div className="h-3 bg-gray-200 rounded w-2/3"></div></div></div></div>,
  ssr: false
})

const GuestReviews = dynamic(() => import('../../components/GuestReviews').then(mod => ({ default: mod.GuestReviews })), {
  loading: () => <div className="px-4 mt-8 mb-20"><div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div><div className="space-y-4"><div className="bg-white rounded-2xl shadow-card p-4 border border-white/60 animate-pulse"><div className="h-3 bg-gray-200 rounded w-3/4"></div></div></div></div>,
  ssr: false
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
    <div className="bg-gradient-sage min-h-screen flex justify-center items-start p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sage-200/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sage-300/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" aria-hidden="true" />

      {/* Main container with updated styling */}
      <div className="w-full max-w-sm mx-auto relative z-10">
        {/* Background decorative circles */}
        <div className="absolute top-8 right-8 w-16 h-16 bg-sage-200/40 rounded-full blur-sm" aria-hidden="true" />
        <div className="absolute top-32 left-4 w-12 h-12 bg-sage-300/30 rounded-full blur-sm" aria-hidden="true" />

        {/* Main content card with hero extending to edges */}
        <div className="bg-gradient-card backdrop-blur-card rounded-[2rem] shadow-elevated border border-white/50 overflow-hidden relative">
          {/* Language Selector - positioned over hero */}
          <div className="absolute top-20 left-4 z-30">
            <LanguageSelector currentLocale={locale} />
          </div>

          <main id="main-content" className="pb-20">
            {/* Content sections with improved spacing */}
            <div className="space-y-6">
              <WelcomeSection dictionary={dictionary} />
              <PackageCards dictionary={dictionary} />
              <WhyChooseUs dictionary={dictionary} />
              <GuestReviews dictionary={dictionary} />
            </div>
          </main>

          <BottomNav dictionary={dictionary} />
        </div>
      </div>
    </div>
  )
}
