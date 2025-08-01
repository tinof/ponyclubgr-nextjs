'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { Dictionary, Locale } from './dictionaries';

// Client-side dictionary cache
const clientDictionaries: Record<Locale, Dictionary | null> = {
  en: null,
  el: null,
};

// Client-side dictionary loader
const loadClientDictionary = async (locale: Locale): Promise<Dictionary> => {
  // Return cached dictionary if available
  const cachedDictionary = clientDictionaries[locale];
  if (cachedDictionary) {
    return cachedDictionary;
  }

  try {
    // Dynamically import the dictionary file
    const response = await fetch(`/dictionaries/${locale}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch dictionary: ${response.statusText}`);
    }

    const dictionary = (await response.json()) as Dictionary;

    // Cache the dictionary
    clientDictionaries[locale] = dictionary;

    return dictionary;
  } catch (error) {
    console.error(
      `Failed to load client dictionary for locale: ${locale}`,
      error,
    );

    // Fallback to English if the requested locale fails to load
    if (locale !== 'en') {
      return loadClientDictionary('en');
    }

    // If even English fails, return a minimal fallback
    throw new Error(`Failed to load dictionary for locale: ${locale}`);
  }
};

// Custom hook for client-side translations
export const useTranslation = () => {
  const router = useRouter();
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get current locale from router
  const locale = (router.locale || 'en') as Locale;

  // Load dictionary when locale changes
  useEffect(() => {
    const loadDictionary = async () => {
      setIsLoading(true);
      try {
        const dict = await loadClientDictionary(locale);
        setDictionary(dict);
      } catch (error) {
        console.error('Failed to load dictionary:', error);
        // Set a minimal fallback dictionary
        setDictionary({
          common: {
            loading: 'Loading...',
            error: 'Error',
            retry: 'Retry',
            bookNow: 'Book Now',
            perPerson: 'per person',
            skipToMainContent: 'Skip to main content',
          },
          header: { logoAlt: 'Pony Club', location: 'Acheron River, Greece' },
          welcome: {
            description: '',
            title: '',
            intro: '',
            history: '',
            callToAction: '',
            features: { safety: '', family: '', memorable: '' },
          },
          packages: {
            raftingRiding: {
              title: '',
              tag: '',
              integration: '',
              ageRequirement: '',
              activities: { rafting: '', riding: '', hiking: '' },
              safetyNote: '',
              price: '',
            },
            kayakingRidingTrekking: {
              title: '',
              integration: '',
              ageRequirement: '',
              activities: { kayak: '', riding: '', trekking: '' },
              safetyNote: '',
              price: '',
            },
          },
          navigation: {
            home: '',
            map: '',
            activities: '',
            offers: '',
            more: '',
            contactUs: '',
            familyPackages: '',
            safetyInfo: '',
            bookFamilyExperience: '',
          },
          weather: {
            unavailable: '',
            location: '',
            details: {
              feelsLike: '',
              humidity: '',
              index: '',
              cloudCover: '',
              pressure: '',
            },
          },
          metadata: {
            title: '',
            description: '',
            keywords: '',
            openGraph: { title: '', description: '', imageAlt: '' },
            twitter: { title: '', description: '' },
          },
          manifest: { name: '', shortName: '', description: '' },
          jsonLd: { name: '', description: '', brandName: '' },
        } as Dictionary);
      } finally {
        setIsLoading(false);
      }
    };

    loadDictionary();
  }, [locale]);

  // Translation function with nested key support
  const t = (key: string): string => {
    if (!dictionary) return key;

    const keys = key.split('.');
    let value: unknown = dictionary;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return {
    t,
    dictionary,
    locale,
    isLoading,
  };
};

// Language switching utility
export const switchLanguage = (newLocale: Locale) => {
  // Store preference in localStorage
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('preferred-locale', newLocale);
  }

  // Navigate to the new locale
  const currentPath = window.location.pathname;
  const currentSearch = window.location.search;

  // Remove current locale from path if present
  const pathWithoutLocale = currentPath.replace(/^\/(en|el)/, '') || '/';

  // Navigate to new locale
  window.location.href = `/${newLocale}${pathWithoutLocale}${currentSearch}`;
};

// Get stored language preference
export const getStoredLanguagePreference = (): Locale | null => {
  if (typeof window === 'undefined') return null;

  const stored = window.localStorage.getItem('preferred-locale');
  return stored === 'en' || stored === 'el' ? stored : null;
};
