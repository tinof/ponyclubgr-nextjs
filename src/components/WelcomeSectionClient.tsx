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
      <div className="bg-white p-2 rounded-full shadow-soft border border-gray-100">
        <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
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
      <div className="bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full shadow-elevated border border-white/50 flex items-center justify-center hover:bg-white/95 transition-all duration-300">
        <Image
          src="/images/logo.png"
          alt={dictionary.header.logoAlt}
          width={100}
          height={32}
          className="h-7 w-auto object-contain"
          priority
        />
      </div>

      {/* Language — right side */}
      <div className="flex flex-col items-end gap-2">
        <LanguageSelector currentLocale={locale} />
      </div>
    </div>
  );
}
