'use client';

import MuxPlayer from '@mux/mux-player-react';
import Image from 'next/image';
import {
  type ComponentRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface MuxVideoBackgroundProps {
  playbackId: string;
  fallbackImage: string;
  fallbackImageAlt: string;
  className?: string;
  children?: React.ReactNode;
  priority?: boolean;
}

export function MuxVideoBackground({
  playbackId,
  fallbackImage,
  fallbackImageAlt,
  className = '',
  children,
  priority = false,
}: MuxVideoBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const muxPlayerRef = useRef<ComponentRef<typeof MuxPlayer>>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const MAX_RETRY_ATTEMPTS = 2;
  const RETRY_DELAY = 2000;

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Intersection Observer for performance optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        // Start loading when component becomes visible
        if (entry.isIntersecting && !videoLoaded && !videoError) {
          setIsLoading(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      // Clear retry timeout on cleanup
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [videoLoaded, videoError]);

  // Handle video load success
  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
    setVideoError(false);
    setIsLoading(false);
    setRetryCount(0);
  }, []);

  // Handle video load error with retry logic
  const handleVideoError = useCallback(
    (error: Event | Error | unknown) => {
      console.warn('Mux video failed to load:', error);
      setIsLoading(false);

      if (retryCount < MAX_RETRY_ATTEMPTS) {
        console.log(
          `Retrying video load (attempt ${retryCount + 1}/${MAX_RETRY_ATTEMPTS})`,
        );
        setRetryCount((prev) => prev + 1);

        // Retry after delay
        retryTimeoutRef.current = setTimeout(() => {
          setVideoError(false);
          setIsLoading(true);
        }, RETRY_DELAY);
      } else {
        console.warn('Max retry attempts reached, falling back to image');
        setVideoError(true);
        setVideoLoaded(false);
      }
    },
    [retryCount],
  );

  // Handle video ready state
  const handleLoadedData = useCallback(() => {
    setVideoLoaded(true);
    setIsLoading(false);
  }, []);

  // Ensure video plays when loaded and visible
  useEffect(() => {
    const currentPlayer = muxPlayerRef.current;
    if (videoLoaded && isIntersecting && currentPlayer) {
      const playPromise = currentPlayer.play();

      if (playPromise !== undefined) {
        playPromise.catch((error: unknown) => {
          // Auto-play was prevented, which is fine for background videos
          console.log('Video autoplay prevented:', error);
        });
      }
    }
  }, [videoLoaded, isIntersecting]);

  const shouldShowVideo =
    !videoError && (isIntersecting || isLoading) && !prefersReducedMotion;
  const showLoadingState =
    isLoading && !videoLoaded && !videoError && !prefersReducedMotion;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Fallback Image - Always rendered for immediate display */}
      <Image
        src={fallbackImage}
        alt={fallbackImageAlt}
        fill={true}
        className={`object-cover transition-opacity duration-500 ${
          videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
        }`}
        priority={priority}
        sizes="100vw"
      />

      {/* Video Player - Only render when intersecting for performance */}
      {shouldShowVideo && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <MuxPlayer
            ref={muxPlayerRef}
            playbackId={playbackId}
            streamType="on-demand"
            autoPlay="muted"
            muted={true}
            loop={true}
            playsInline={true}
            style={
              {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
                '--media-object-fit': 'cover',
              } as React.CSSProperties
            }
            className="mobile-video-scale mux-no-bars"
            onLoadedData={handleLoadedData}
            onCanPlay={handleVideoLoad}
            onError={handleVideoError}
            preload="metadata"
            poster=""
          />
        </div>
      )}

      {/* Loading state overlay */}
      {showLoadingState && (
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center z-5">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {retryCount > 0 && (
              <div className="text-white/70 text-xs">
                Retrying... ({retryCount}/{MAX_RETRY_ATTEMPTS})
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error state overlay (optional - could show a subtle indicator) */}
      {videoError && retryCount >= MAX_RETRY_ATTEMPTS && (
        <div className="absolute top-4 right-4 z-5">
          <div className="bg-black/50 text-white/70 text-xs px-2 py-1 rounded">
            Video unavailable
          </div>
        </div>
      )}

      {/* Children (overlay content) */}
      {children && <div className="absolute inset-0 z-10">{children}</div>}
    </div>
  );
}
