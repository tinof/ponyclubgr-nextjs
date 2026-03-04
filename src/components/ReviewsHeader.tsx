'use client';

import { Star } from 'lucide-react';
import type { Dictionary } from '../lib/dictionaries';

interface ReviewsHeaderProps {
  averageRating?: number;
  totalReviews?: number;
  dictionary: Dictionary;
}

export function ReviewsHeader({
  averageRating = 4.8,
  totalReviews = 123,
  dictionary,
}: ReviewsHeaderProps) {
  return (
    <div className="mb-6">
      {/* Title */}
      <h3 className="text-xl font-bold text-sage-600 mb-4 relative">
        {dictionary.reviews.title}
        <span className="absolute bottom-0 left-0 w-16 h-1 bg-sage-600/30 rounded-full"></span>
      </h3>

      {/* Google Reviews only */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-white/60 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Google Logo */}
          <div className="flex items-center space-x-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="text-blue-500"
              role="img"
              aria-label="Google Reviews"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700">Google</span>
          </div>

          {/* Rating and Stars */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {averageRating}
            </span>
            <div className="flex items-center space-x-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={`google-star-${i + 1}`}
                  size={16}
                  fill={i < Math.floor(averageRating) ? '#FFD700' : 'none'}
                  stroke={i < Math.floor(averageRating) ? '#FFD700' : '#D1D5DB'}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Review Count */}
        <div className="text-sm text-gray-500">
          {totalReviews} {dictionary.reviews.reviewsLabel}
        </div>
      </div>
    </div>
  );
}
