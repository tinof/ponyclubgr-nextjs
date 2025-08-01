import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: string[];
  alt: string;
  smallDots?: boolean;
}

export function ImageSlider({
  images,
  alt,
  smallDots = false
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<any>(null);
  const autoPlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Navigation functions
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [images.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [images.length, isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, isTransitioning]);

  // Auto-play introduction animation
  const startIntroAnimation = useCallback(() => {
    if (hasPlayedIntro || images.length <= 1) return;

    let currentSlide = 0;
    const playNextSlide = () => {
      if (currentSlide < images.length) {
        setCurrentIndex(currentSlide);
        currentSlide++;
        autoPlayTimeoutRef.current = setTimeout(playNextSlide, 800);
      } else {
        // Return to first slide and mark intro as complete
        setCurrentIndex(0);
        setHasPlayedIntro(true);
      }
    };

    playNextSlide();
  }, [images.length, hasPlayedIntro]);

  // Intersection Observer for auto-play trigger
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayedIntro) {
            startIntroAnimation();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [startIntroAnimation, hasPlayedIntro]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />

      {/* Main image with transition */}
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={images[currentIndex]}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isTransitioning ? 'opacity-75' : 'opacity-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          priority={currentIndex === 0}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rj5m4xVvEH1Toi/8AdvdPZK7l3JvS39v/2Q=="
        />
      </div>

      {/* Navigation arrows - only show after intro animation */}
      {hasPlayedIntro && images.length > 1 && (
        <>
          {/* Left arrow */}
          <button
            type="button"
            onClick={goToPrevious}
            disabled={isTransitioning}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/20 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={goToNext}
            disabled={isTransitioning}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/20 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}
      {/* Dot navigation */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            className={`${smallDots ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            } transition-all duration-200 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/20 ${
              isTransitioning ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
            onClick={() => goToSlide(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(index);
              }
            }}
            disabled={isTransitioning}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
            tabIndex={0}
          />
        ))}
        {/* Decorative dots */}
        <div className={`${smallDots ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full bg-white/50`} />
        <div className={`${smallDots ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full bg-white/50`} />
      </div>
    </div>
  );
}