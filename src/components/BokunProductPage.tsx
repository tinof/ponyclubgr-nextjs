'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Dictionary } from '../lib/dictionaries';

interface BokunProductPageProps {
  experienceId: string;
  dictionary: Dictionary;
  className?: string;
}

// Global flag to ensure script is only loaded once
let isBokunScriptLoaded = false;
let isBokunScriptLoading = false;

// Skeleton loader component
function BokunWidgetSkeleton() {
  return (
    <div className="min-h-[800px] w-full bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
      {/* Header skeleton */}
      <div className="mb-6">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>

      {/* Image gallery skeleton */}
      <div className="mb-6">
        <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
        <div className="flex gap-2">
          <div className="h-16 w-16 bg-gray-200 rounded"></div>
          <div className="h-16 w-16 bg-gray-200 rounded"></div>
          <div className="h-16 w-16 bg-gray-200 rounded"></div>
          <div className="h-16 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-4 mb-6">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>

      {/* Pricing section skeleton */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      </div>

      {/* Booking form skeleton */}
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-12 bg-sage-200 rounded w-full"></div>
      </div>
    </div>
  );
}

export function BokunProductPage({
  experienceId,
  dictionary,
  className = 'w-full',
}: BokunProductPageProps) {
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const loadBokunScript = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      // If script is already loaded, resolve immediately
      if (isBokunScriptLoaded) {
        resolve();
        return;
      }

      // If script is currently loading, wait for it
      if (isBokunScriptLoading) {
        const checkLoaded = () => {
          if (isBokunScriptLoaded) {
            resolve();
          } else {
            setTimeout(checkLoaded, 100);
          }
        };
        checkLoaded();
        return;
      }

      // Start loading the script
      isBokunScriptLoading = true;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c078b762-6f7f-474f-8edb-bdd1bdb7d12a';
      script.async = true;
      script.id = 'bokun-product-loader';

      script.onload = () => {
        isBokunScriptLoaded = true;
        isBokunScriptLoading = false;
        console.log('✅ Bokun product script loaded successfully');
        resolve();
      };

      script.onerror = () => {
        isBokunScriptLoading = false;
        console.error('❌ Failed to load Bokun product script');
        reject(new Error('Failed to load Bokun product script'));
      };

      // Remove any existing script first
      const existingScript = document.getElementById('bokun-product-loader');
      if (existingScript) {
        existingScript.remove();
      }

      document.head.appendChild(script);
    });
  }, []);

  useEffect(() => {
    let mounted = true;

    const initializeWidget = async () => {
      try {
        await loadBokunScript();

        if (!mounted) return;

        // Wait a bit for the Bokun widgets to initialize
        setTimeout(() => {
          if (mounted) {
            setIsWidgetLoaded(true);
          }
        }, 500);
      } catch (error) {
        console.error('Failed to load Bokun widget:', error);
        if (mounted) {
          setLoadingError(true);
        }
      }
    };

    initializeWidget();

    return () => {
      mounted = false;
    };
  }, [loadBokunScript]);

  if (loadingError) {
    return (
      <div
        className={`${className} min-h-[400px] flex items-center justify-center`}
      >
        <div className="text-center p-8 bg-white rounded-lg border border-red-200">
          <div className="text-red-600 text-lg font-semibold mb-2">
            Booking Temporarily Unavailable
          </div>
          <p className="text-gray-600 mb-4">
            Please try again later or contact us directly.
          </p>
          <a
            href="tel:+302665041722"
            className="inline-block bg-sage-primary text-white px-6 py-2 rounded-lg hover:bg-sage-700 transition"
          >
            {dictionary.navigation.contactUs}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Show skeleton loader while widget is loading */}
      {!isWidgetLoaded && (
        <div className="relative">
          <BokunWidgetSkeleton />
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-primary mx-auto mb-2"></div>
              <p className="text-sage-600 font-medium">
                {dictionary.common.loading || 'Loading...'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bokun widget container */}
      <div
        className={`bokunWidget transition-opacity duration-300 ${
          isWidgetLoaded
            ? 'opacity-100'
            : 'opacity-0 absolute inset-0 pointer-events-none'
        }`}
        data-src={`https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/${experienceId}`}
      />

      {/* Fallback noscript content */}
      <noscript>
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-lg border">
            <p className="text-gray-600 mb-4">
              Please enable JavaScript in your browser to book this experience.
            </p>
            <a
              href="tel:+302665041722"
              className="inline-block bg-sage-primary text-white px-6 py-2 rounded-lg hover:bg-sage-700 transition"
            >
              {dictionary.navigation.contactUs}
            </a>
          </div>
        </div>
      </noscript>
    </div>
  );
}
