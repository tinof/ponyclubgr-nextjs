'use client';

import { Check, Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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
      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-soft border border-white/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-[#5a6f5a]" />
            <span className="text-sm font-medium text-gray-700">Language</span>
          </div>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-soft border border-white/40 hover:shadow-premium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5a6f5a] focus:ring-opacity-50"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-[#5a6f5a]" />
            <span className="text-sm font-medium text-gray-700">Language</span>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className="text-lg"
              role="img"
              aria-label={currentLanguage.name}
            >
              {currentLanguage.flag}
            </span>
            <span className="text-sm font-medium text-gray-800">
              {currentLanguage.code.toUpperCase()}
            </span>
            <svg
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
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
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-premium border border-white/40 z-20 overflow-hidden"
            role="listbox"
            aria-label="Language options"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between ${
                  language.code === currentLocale ? 'bg-[#f0f3f0]' : ''
                }`}
                role="option"
                aria-selected={language.code === currentLocale}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className="text-lg"
                    role="img"
                    aria-label={language.name}
                  >
                    {language.flag}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      {language.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {language.code.toUpperCase()}
                    </div>
                  </div>
                </div>
                {language.code === currentLocale && (
                  <Check className="h-4 w-4 text-[#5a6f5a]" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
