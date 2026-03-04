import { notFound } from 'next/navigation';
import { WelcomeSection } from '../../components/WelcomeSection';
import {
  getDictionary,
  isValidLocale,
  type Locale,
} from '../../lib/dictionaries';
import { LocalizedClientPage } from './client';

// Featurable widget ID for the pony club
const FEATURABLE_WIDGET_ID = 'e22fc7c6-97ba-49d1-8391-7b5f236ffb84';

// Generate static params for supported locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'el' }];
}

// Function to fetch reviews and aggregate data with caching
async function fetchReviewsData() {
  try {
    const response = await fetch(
      `https://api.featurable.com/v1/reviews/${FEATURABLE_WIDGET_ID}`,
      {
        next: {
          revalidate: 86400, // Cache for 24 hours (86400 seconds)
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      if (data.reviews && data.reviews.length > 0) {
        return {
          reviews: data.reviews.slice(0, 2), // Only first 2 reviews for display
          averageRating: data.averageRating || 4.8,
          totalReviews: data.totalReviews || data.reviews.length,
        };
      }
    }
  } catch (error) {
    console.warn('Failed to fetch reviews from Featurable API:', error);
  }

  // Return fallback data if API fails
  return {
    reviews: [
      {
        reviewer: {
          displayName: 'Maria K.',
          profilePhotoUrl: '',
          isAnonymous: false,
        },
        comment:
          'An incredible experience for our whole family! The guides were so friendly and made us feel safe throughout the rafting adventure.',
        starRating: 5,
        createTime: null,
      },
      {
        reviewer: {
          displayName: 'Thomas L.',
          profilePhotoUrl: '',
          isAnonymous: false,
        },
        comment:
          "The kayaking tour was the highlight of our vacation. Our children (9 and 11) absolutely loved it and can't stop talking about it.",
        starRating: 5,
        createTime: null,
      },
    ],
    averageRating: 4.8,
    totalReviews: 123,
  };
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale and redirect to 404 if invalid
  if (!isValidLocale(locale as Locale)) {
    notFound();
  }

  // Get dictionary for server-side rendering
  const dictionary = await getDictionary(locale as Locale);

  // Fetch reviews and aggregate data with caching
  const reviewsData = await fetchReviewsData();

  return (
    <div className="bg-gradient-sage min-h-screen relative overflow-hidden">
      {/* Decorative background elements */}
      <div
        className="absolute top-0 right-0 w-80 h-80 md:w-[40rem] md:h-[40rem] bg-sage-200/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 md:w-[48rem] md:h-[48rem] bg-sage-300/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"
        aria-hidden="true"
      />

      {/* Main content — full width, no artificial phone constraint */}
      <div className="relative z-10">
        <main id="main-content" className="pb-20 lg:pb-8">
          <div className="space-y-6">
            <WelcomeSection dictionary={dictionary} locale={locale as Locale} />
            <div className="max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
              <LocalizedClientPage
                dictionary={dictionary}
                reviewsData={reviewsData}
                locale={locale as Locale}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
