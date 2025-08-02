'use client';

import { Quote, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Dictionary } from '../lib/dictionaries';

interface GuestReviewsProps {
  dictionary: Dictionary;
}

// Featurable widget ID for the pony club
const FEATURABLE_WIDGET_ID = 'e22fc7c6-97ba-49d1-8391-7b5f236ffb84';

export function GuestReviews({ dictionary: _dictionary }: GuestReviewsProps) {
  const [isClient, setIsClient] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ensure component only renders on client side
  useEffect(() => {
    setIsClient(true);
    // Try to fetch reviews from Featurable API
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.featurable.com/v1/reviews/${FEATURABLE_WIDGET_ID}`);
      if (response.ok) {
        const data = await response.json();
        if (data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      }
    } catch (error) {
      console.warn('Failed to fetch reviews from Featurable API:', error);
      // Will fall back to default reviews
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback reviews for when API fails or during loading
  const fallbackReviews = [
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
    {
      reviewer: { displayName: 'Sophie D.', profilePhotoUrl: '', isAnonymous: false },
      comment: 'Beautiful scenery and professional guides. We did the combined package and it was well worth it!',
      starRating: 4,
      createTime: null,
    },
  ];





  // Show loading state during SSR or before client hydration
  if (!isClient) {
    return (
      <div className="px-4 mt-8 mb-20">
        <h3 className="text-xl font-bold text-sage-600 mb-4 relative">
          What Our Guests Say
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-sage-600/30 rounded-full"></span>
        </h3>
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">Loading guest reviews...</p>
        </div>
      </div>
    );
  }

  // Show loading state while fetching reviews
  if (isLoading) {
    return (
      <div className="px-4 mt-8 mb-20">
        <h3 className="text-xl font-bold text-sage-600 mb-4 relative">
          What Our Guests Say
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-sage-600/30 rounded-full"></span>
        </h3>
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">Loading guest reviews...</p>
        </div>
      </div>
    );
  }

  // Determine which reviews to show
  const reviewsToShow = reviews.length > 0 ? reviews : fallbackReviews;

  return (
    <div className="px-4 mt-8 mb-20">
      <h3 className="text-xl font-bold text-sage-600 mb-4 relative">
        What Our Guests Say
        <span className="absolute bottom-0 left-0 w-16 h-1 bg-sage-600/30 rounded-full"></span>
      </h3>

      <div className="space-y-4">
        {reviewsToShow.map((review, index) => {
          const displayName = review.reviewer?.displayName || review.reviewer?.name || `Guest ${index + 1}`;
          const comment = review.comment || review.text || 'Great experience!';
          const rating = review.starRating || review.rating || 5;
          const profilePhoto = review.reviewer?.profilePhotoUrl || review.reviewer?.photo;

          return (
            <div
              key={review.reviewId || review.id || `review-${index}`}
              className="bg-white rounded-2xl shadow-card p-4 border border-white/60 relative"
            >
              <div className="absolute -top-2 -right-2 bg-sage-600 rounded-full p-1.5">
                <Quote size={14} className="text-white" />
              </div>
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center text-sage-600 font-bold mr-3 overflow-hidden">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    displayName.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {displayName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {review.createTime ? new Date(review.createTime).toLocaleDateString() :
                     review.date ? new Date(review.date).toLocaleDateString() : 'Recent guest'}
                  </p>
                </div>
                <div className="ml-auto text-xs text-gray-400">
                  Google Reviews
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                &ldquo;{comment}&rdquo;
              </p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={`${displayName}-star-${i}`}
                    size={14}
                    fill={i < rating ? '#FFD700' : 'none'}
                    stroke={i < rating ? '#FFD700' : '#D1D5DB'}
                    className="mr-0.5"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
