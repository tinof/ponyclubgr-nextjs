'use client';

import { Star } from 'lucide-react';

interface ReviewsHeaderProps {
  averageRating?: number;
  totalReviews?: number;
}

export function ReviewsHeader({ 
  averageRating = 4.8, 
  totalReviews = 123 
}: ReviewsHeaderProps) {
  return (
    <div className="mb-6">
      {/* Title */}
      <h3 className="text-xl font-bold text-sage-600 mb-4 relative">
        What Our Guests Say
        <span className="absolute bottom-0 left-0 w-16 h-1 bg-sage-600/30 rounded-full"></span>
      </h3>

      {/* Rating Sources Grid */}
      <div className="grid grid-cols-1 gap-3">
        {/* Google Reviews */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-white/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Google Logo */}
            <div className="flex items-center space-x-2">
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-blue-500">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </div>
            
            {/* Rating and Stars */}
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">{averageRating}</span>
              <div className="flex items-center space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={`google-star-${i}`}
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
            {totalReviews} reviews
          </div>
        </div>

        {/* Facebook Placeholder */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-white/60 flex items-center justify-between opacity-50">
          <div className="flex items-center space-x-3">
            {/* Facebook Logo */}
            <div className="flex items-center space-x-2">
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-blue-600">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Facebook</span>
            </div>
            
            {/* Rating and Stars Placeholder */}
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">4.7</span>
              <div className="flex items-center space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={`facebook-star-${i}`}
                    size={16}
                    fill={i < 4 ? '#FFD700' : 'none'}
                    stroke={i < 4 ? '#FFD700' : '#D1D5DB'}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Review Count Placeholder */}
          <div className="text-sm text-gray-500">
            89 reviews
          </div>
        </div>

        {/* TripAdvisor Placeholder */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-white/60 flex items-center justify-between opacity-50">
          <div className="flex items-center space-x-3">
            {/* TripAdvisor Logo */}
            <div className="flex items-center space-x-2">
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-green-600">
                <circle fill="#00AF87" cx="12" cy="12" r="11"/>
                <path fill="white" d="M8.5 10.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm7 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z"/>
                <path fill="white" d="M12 7c-3.3 0-6 2.7-6 6 0 .6.1 1.1.2 1.6l5.8-5.8 5.8 5.8c.1-.5.2-1 .2-1.6 0-3.3-2.7-6-6-6z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">TripAdvisor</span>
            </div>
            
            {/* Rating and Stars Placeholder */}
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">4.9</span>
              <div className="flex items-center space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={`tripadvisor-star-${i}`}
                    size={16}
                    fill={i < 5 ? '#FFD700' : 'none'}
                    stroke={i < 5 ? '#FFD700' : '#D1D5DB'}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Review Count Placeholder */}
          <div className="text-sm text-gray-500">
            67 reviews
          </div>
        </div>
      </div>
    </div>
  );
}
