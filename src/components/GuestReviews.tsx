'use client';

import { Quote, Star } from 'lucide-react';
import Image from 'next/image';
import type { Dictionary } from '../lib/dictionaries';
import { ReviewsHeader } from './ReviewsHeader';

interface Reviewer {
  displayName: string;
  profilePhotoUrl: string;
  isAnonymous: boolean;
}

interface Review {
  id?: string;
  reviewer?: Reviewer;
  comment: string;
  starRating: number;
  createTime: string | null;
}

interface ReviewsData {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

interface GuestReviewsProps {
  dictionary: Dictionary;
  reviewsData: ReviewsData;
}

export function GuestReviews({
  dictionary: _dictionary,
  reviewsData,
}: GuestReviewsProps) {
  const { reviews, averageRating, totalReviews } = reviewsData;

  return (
    <div className="px-4 mt-8 mb-20">
      <ReviewsHeader
        averageRating={averageRating}
        totalReviews={totalReviews}
      />

      <div className="space-y-4">
        {reviews.map((review, index) => {
          const displayName =
            review.reviewer?.displayName || `Guest ${index + 1}`;
          const comment = review.comment || 'Great experience!';
          const rating = review.starRating || 5;
          const profilePhoto = review.reviewer?.profilePhotoUrl;

          return (
            <div
              key={
                review.id || `review-${review.comment?.slice(0, 20) || index}`
              }
              className="bg-white rounded-2xl shadow-card p-4 border border-white/60 relative"
            >
              <div className="absolute -top-2 -right-2 bg-sage-600 rounded-full p-1.5">
                <Quote size={14} className="text-white" />
              </div>
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center text-sage-600 font-bold mr-3 overflow-hidden">
                  {profilePhoto ? (
                    <Image
                      src={profilePhoto}
                      alt={displayName}
                      width={40}
                      height={40}
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
                    {review.createTime
                      ? new Date(review.createTime).toLocaleDateString()
                      : 'Recent guest'}
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
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={`star-${i + 1}`}
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
