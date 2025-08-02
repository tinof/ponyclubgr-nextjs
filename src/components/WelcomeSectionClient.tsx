'use client';

import dynamic from 'next/dynamic';
import type { Dictionary, Locale } from '../lib/dictionaries';

// Dynamically import client components to reduce initial bundle size
const LanguageSelector = dynamic(() => import('./LanguageSelector').then(mod => ({ default: mod.LanguageSelector })), {
  ssr: false,
  loading: () => (
    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-soft border border-white/40">
      <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
    </div>
  )
});

const WeatherWidget = dynamic(() => import('./WeatherWidget').then(mod => ({ default: mod.WeatherWidget })), {
  ssr: false,
  loading: () => (
    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-soft border border-white/40 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
          <div className="w-8 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="w-12 h-3 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
});

interface WelcomeSectionClientProps {
  dictionary: Dictionary;
  locale: Locale;
}

export function WelcomeSectionClient({ dictionary, locale }: WelcomeSectionClientProps) {
  return (
    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
      {/* Weather Widget and Language Selector */}
      <div className="relative z-10 flex flex-col items-end space-y-3 ml-auto">
        <WeatherWidget dictionary={dictionary} />
        <div className="mr-1">
          <LanguageSelector currentLocale={locale} />
        </div>
      </div>
    </div>
  );
}
