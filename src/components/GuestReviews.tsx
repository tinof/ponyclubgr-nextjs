import React from 'react';
import { Star, Quote } from 'lucide-react';
import type { Dictionary } from '../lib/dictionaries';

interface GuestReviewsProps {
  dictionary: Dictionary;
}

interface Review {
  name: string;
  location: string;
  text: string;
  rating: number;
  source: string;
}

export function GuestReviews(_props: GuestReviewsProps) {
  const reviews: Review[] = [
    {
      name: 'Maria K.',
      location: 'Athens, Greece',
      text: 'An incredible experience for our whole family! The guides were so friendly and made us feel safe throughout the rafting adventure.',
      rating: 5,
      source: 'Google Reviews',
    },
    {
      name: 'Thomas L.',
      location: 'Berlin, Germany',
      text: "The kayaking tour was the highlight of our vacation. Our children (9 and 11) absolutely loved it and can't stop talking about it.",
      rating: 5,
      source: 'TripAdvisor',
    },
    {
      name: 'Sophie D.',
      location: 'Paris, France',
      text: 'Beautiful scenery and professional guides. We did the combined package and it was well worth it!',
      rating: 4,
      source: 'Facebook',
    },
  ];

  return (
    <div className="px-4 mt-8 mb-20">
      <h3 className="text-xl font-bold text-sage-600 mb-4 relative">
        What Our Guests Say
        <span className="absolute bottom-0 left-0 w-16 h-1 bg-sage-600/30 rounded-full"></span>
      </h3>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-card p-4 border border-white/60 relative"
          >
            <div className="absolute -top-2 -right-2 bg-sage-600 rounded-full p-1.5">
              <Quote size={14} className="text-white" />
            </div>
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center text-sage-600 font-bold mr-3">
                {review.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm">
                  {review.name}
                </p>
                <p className="text-xs text-gray-500">{review.location}</p>
              </div>
              <div className="ml-auto text-xs text-gray-400">
                {review.source}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">"{review.text}"</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < review.rating ? '#FFD700' : 'none'}
                  stroke={i < review.rating ? '#FFD700' : '#D1D5DB'}
                  className="mr-0.5"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
