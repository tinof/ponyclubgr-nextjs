'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Locale } from '../lib/dictionaries';

interface LanguageSelectorProps {
  currentLocale: Locale;
}

const languages = [
  { code: 'en' as Locale, name: 'English', flag: '🇬🇧' },
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
      <div className="bg-white/80 backdrop-blur-md p-2 rounded-full shadow-elevated border border-white/50 h-[3.25rem] w-[3.25rem] flex items-center justify-center">
        <div className="w-8 h-8 bg-sage-200/50 rounded-full animate-pulse"></div>
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
        className="bg-white/80 backdrop-blur-md p-2 rounded-full shadow-elevated border border-white/50 hover:bg-white/95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 h-[3.25rem] w-[3.25rem] flex items-center justify-center text-center group"
        aria-label={`Select language - Current: ${currentLanguage.name}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span
          className="text-2xl leading-none group-hover:scale-110 transition-transform duration-300"
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
            className="absolute top-full right-0 mt-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-elevated border border-white/50 z-20 overflow-hidden min-w-[4.5rem] flex flex-col gap-1 p-1.5"
            role="listbox"
            aria-label="Language options"
          >
            {languages.map((language) => (
              <button
                type="button"
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full p-2.5 hover:bg-white/60 rounded-xl transition-all duration-200 flex items-center justify-center ${
                  language.code === currentLocale
                    ? 'bg-white shadow-sm font-medium'
                    : ''
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
