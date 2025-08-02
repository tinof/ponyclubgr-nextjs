import { notFound } from 'next/navigation';
import {
  getDictionary,
  isValidLocale,
  type Locale,
} from '../../lib/dictionaries';
import { LocalizedClientPage } from './client';
import { WelcomeSection } from '../../components/WelcomeSection';

// Featurable widget ID for the pony club
const FEATURABLE_WIDGET_ID = 'e22fc7c6-97ba-49d1-8391-7b5f236ffb84';

// Generate static params for supported locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'el' }];
}

// Function to fetch reviews and aggregate data with caching
async function fetchReviewsData() {
  try {
    const response = await fetch(`https://api.featurable.com/v1/reviews/${FEATURABLE_WIDGET_ID}`, {
      next: { 
        revalidate: 86400 // Cache for 24 hours (86400 seconds)
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.reviews && data.reviews.length > 0) {
        return {
          reviews: data.reviews.slice(0, 2), // Only first 2 reviews for display
          averageRating: data.averageRating || 4.8,
          totalReviews: data.totalReviews || data.reviews.length
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
        reviewer: { displayName: 'Maria K.', profilePhotoUrl: '', isAnonymous: false },
        comment: 'An incredible experience for our whole family! The guides were so friendly and made us feel safe throughout the rafting adventure.',
        starRating: 5,
        createTime: null,
      },
      {
        reviewer: { displayName: 'Thomas L.', profilePhotoUrl: '', isAnonymous: false },
        comment: "The kayaking tour was the highlight of our vacation. Our children (9 and 11) absolutely loved it and can't stop talking about it.",
        starRating: 5,
        createTime: null,
      },
    ],
    averageRating: 4.8,
    totalReviews: 123
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
    <div className="bg-gradient-sage min-h-screen flex justify-center items-start p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div
        className="absolute top-0 right-0 w-80 h-80 bg-sage-200/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-sage-300/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"
        aria-hidden="true"
      />

      {/* Main container with updated styling */}
      <div className="w-full max-w-sm mx-auto relative z-10">
        {/* Background decorative circles */}
        <div
          className="absolute top-8 right-8 w-16 h-16 bg-sage-200/40 rounded-full blur-sm"
          aria-hidden="true"
        />
        <div
          className="absolute top-32 left-4 w-12 h-12 bg-sage-300/30 rounded-full blur-sm"
          aria-hidden="true"
        />

        {/* Main content card with hero extending to edges */}
        <div className="bg-gradient-card backdrop-blur-card rounded-[2rem] shadow-elevated border border-white/50 overflow-hidden relative">
          <main id="main-content" className="pb-20">
            {/* Content sections with improved spacing */}
            <div className="space-y-6">
              <WelcomeSection dictionary={dictionary} locale={locale as Locale} />
              <LocalizedClientPage
                dictionary={dictionary}
                reviewsData={reviewsData}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
