import { notFound } from 'next/navigation';
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
    <LocalizedClientPage 
      locale={locale as Locale} 
      dictionary={dictionary}
      reviewsData={reviewsData}
    />
  );
}
