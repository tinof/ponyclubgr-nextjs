import 'server-only';

// Define the supported locales
export type Locale = 'en' | 'el';

// Define the dictionary structure
export interface Dictionary {
  common: {
    loading: string;
    error: string;
    retry: string;
    bookNow: string;
    perPerson: string;
    skipToMainContent: string;
  };
  header: {
    logoAlt: string;
    location: string;
  };
  welcome: {
    description: string;
    title: string;
    intro: string;
    history: string;
    callToAction: string;
    features: {
      safety: string;
      family: string;
      memorable: string;
    };
  };
  packages: {
    raftingRiding: {
      title: string;
      tag: string;
      integration: string;
      ageRequirement: string;
      activities: {
        rafting: string;
        riding: string;
        hiking: string;
      };
      safetyNote: string;
      price: string;
    };
    kayakingRidingTrekking: {
      title: string;
      integration: string;
      ageRequirement: string;
      activities: {
        kayak: string;
        riding: string;
        trekking: string;
      };
      safetyNote: string;
      price: string;
    };
  };
  navigation: {
    home: string;
    map: string;
    activities: string;
    offers: string;
    more: string;
    contactUs: string;
    familyPackages: string;
    safetyInfo: string;
    bookFamilyExperience: string;
  };
  weather: {
    unavailable: string;
    location: string;
    details: {
      feelsLike: string;
      humidity: string;
      index: string;
      cloudCover: string;
      pressure: string;
    };
  };
  metadata: {
    title: string;
    description: string;
    keywords: string;
    openGraph: {
      title: string;
      description: string;
      imageAlt: string;
    };
    twitter: {
      title: string;
      description: string;
    };
  };
  manifest: {
    name: string;
    shortName: string;
    description: string;
  };
  jsonLd: {
    name: string;
    description: string;
    brandName: string;
  };
}

// Dictionary cache to avoid repeated file reads
const dictionaries: Record<Locale, Dictionary | null> = {
  en: null,
  el: null,
};

// Function to get dictionary for a specific locale
export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  // Return cached dictionary if available
  if (dictionaries[locale]) {
    return dictionaries[locale]!;
  }

  try {
    // Dynamically import the dictionary file
    const dictionary = await import(`../dictionaries/${locale}.json`);

    // Cache the dictionary
    dictionaries[locale] = dictionary.default as Dictionary;

    return dictionary.default as Dictionary;
  } catch (error) {
    console.error(`Failed to load dictionary for locale: ${locale}`, error);

    // Fallback to English if the requested locale fails to load
    if (locale !== 'en') {
      return getDictionary('en');
    }

    // If even English fails, throw an error
    throw new Error(`Failed to load dictionary for locale: ${locale}`);
  }
};

// Utility function to get nested translation value
export const getNestedTranslation = (
  dictionary: Dictionary,
  path: string,
): string => {
  const keys = path.split('.');
  let value: unknown = dictionary;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      console.warn(`Translation key not found: ${path}`);
      return path; // Return the path as fallback
    }
  }

  return typeof value === 'string' ? value : path;
};

// Helper function to validate locale
export const isValidLocale = (locale: string): locale is Locale => {
  return ['en', 'el'].includes(locale);
};

// Helper function to get default locale
export const getDefaultLocale = (): Locale => 'en';

// Helper function to get all supported locales
export const getSupportedLocales = (): Locale[] => ['en', 'el'];
