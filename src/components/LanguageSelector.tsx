'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Locale } from '../lib/dictionaries';

interface LanguageSelectorProps {
  currentLocale: Locale;
}

const languages = [
  { code: 'en' as Locale, name: 'English', flag: '🇺🇸' },
  { code: 'el' as Locale, name: 'Ελληνικά', flag: '🇬🇷' },
];

export function LanguageSelector({ currentLocale }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Ensure component only renders on client to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    // Store preference in localStorage
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('preferred-locale', newLocale);
    }

    // Close dropdown
    setIsOpen(false);

    // Navigate to the new locale
    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath);
  };

  // Don't render on server to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-soft border border-white/40">
        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-soft border border-white/40 hover:shadow-premium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5a6f5a] focus:ring-opacity-50"
        aria-label={`Select language - Current: ${currentLanguage.name}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span
          className="text-2xl block"
          role="img"
          aria-label={currentLanguage.name}
        >
          {currentLanguage.flag}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown */}
          <div
            className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-premium border border-white/40 z-20 overflow-hidden min-w-[4rem]"
            role="listbox"
            aria-label="Language options"
          >
            {languages.map((language) => (
              <button
                type="button"
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full p-3 hover:bg-gray-50 transition-colors duration-150 flex items-center justify-center ${
                  language.code === currentLocale ? 'bg-[#f0f3f0]' : ''
                }`}
                role="option"
                aria-selected={language.code === currentLocale}
                aria-label={language.name}
              >
                <span
                  className="text-2xl"
                  role="img"
                  aria-label={language.name}
                >
                  {language.flag}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
