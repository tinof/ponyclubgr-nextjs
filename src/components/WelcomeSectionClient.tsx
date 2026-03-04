'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import type { Dictionary, Locale } from '../lib/dictionaries';

// Dynamically import client components to reduce initial bundle size
const LanguageSelector = dynamic(
  () =>
    import('./LanguageSelector').then((mod) => ({
      default: mod.LanguageSelector,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white/15 backdrop-blur-md p-2 rounded-xl border border-white/20">
        <div className="w-7 h-7 bg-white/20 rounded animate-pulse" />
      </div>
    ),
  },
);

const WeatherWidget = dynamic(
  () =>
    import('./WeatherWidget').then((mod) => ({ default: mod.WeatherWidget })),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white/15 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-white/20 rounded" />
          <div className="w-10 h-3 bg-white/20 rounded" />
        </div>
      </div>
    ),
  },
);

interface WelcomeSectionClientProps {
  dictionary: Dictionary;
  locale: Locale;
}

export function WelcomeSectionClient({
  dictionary,
  locale,
}: WelcomeSectionClientProps) {
  return (
    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
      {/* Logo — left side */}
      <div className="bg-white/90 backdrop-blur-sm p-2.5 rounded-2xl shadow-soft border border-white/40">
        <Image
          src="/images/logo.png"
          alt={dictionary.header.logoAlt}
          width={120}
          height={40}
          className="h-9 w-auto"
          priority
        />
      </div>

      {/* Weather + Language — right side */}
      <div className="flex flex-col items-end gap-2">
        <WeatherWidget dictionary={dictionary} />
        <LanguageSelector currentLocale={locale} />
      </div>
    </div>
  );
}
