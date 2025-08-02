'use client';

import { useState, useCallback } from 'react';
import type { Dictionary } from '../lib/dictionaries';

interface BokunButtonProps {
  experienceId: string;
  buttonId: string;
  dictionary: Dictionary;
  className?: string;
}

// Global flag to ensure script is only loaded once
let isBokunScriptLoaded = false;
let isBokunScriptLoading = false;

export function BokunButton({
  experienceId,
  buttonId,
  dictionary,
  className = "bg-sage-primary text-white font-bold py-3 px-6 rounded-xl text-base hover:bg-sage-700 transition shadow-md min-w-[120px] h-12"
}: BokunButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

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
      script.src = 'https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c078b762-6f7f-474f-8edb-bdd1bdb7d12a';
      script.async = true;
      script.id = 'bokun-loader';

      script.onload = () => {
        isBokunScriptLoaded = true;
        isBokunScriptLoading = false;
        console.log('✅ Bokun script loaded successfully');
        resolve();
      };

      script.onerror = () => {
        isBokunScriptLoading = false;
        console.error('❌ Failed to load Bokun script');
        reject(new Error('Failed to load Bokun script'));
      };

      // Remove any existing script first
      const existingScript = document.getElementById('bokun-loader');
      if (existingScript) {
        existingScript.remove();
      }

      document.head.appendChild(script);
    });
  }, []);

  const handleBookingClick = useCallback(async () => {
    setIsLoading(true);

    try {
      await loadBokunScript();
      
      // Small delay to ensure Bokun widgets are fully initialized
      setTimeout(() => {
        // Check if BokunWidgets is available and trigger the widget
        if (typeof window !== 'undefined' && (window as any).BokunWidgets) {
          // The button should automatically work once the script is loaded
          // since it has the correct class and data attributes
          console.log('✅ Bokun widgets ready');
        }
        setIsLoading(false);
      }, 100);
    } catch (error) {
      console.error('Failed to load Bokun booking system:', error);
      setIsLoading(false);
      // You could show an error message to the user here
    }
  }, [loadBokunScript]);

  return (
    <button
      type="button"
      className={`bokunButton ${className} ${isLoading ? 'opacity-75 cursor-wait' : ''}`}
      id={buttonId}
      data-src={`https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/${experienceId}?partialView=1`}
      data-testid="widget-book-button"
      onClick={handleBookingClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg 
            className="animate-spin h-4 w-4" 
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {dictionary.common.loading || 'Loading...'}
        </span>
      ) : (
        dictionary.common.bookNow
      )}
    </button>
  );
}
