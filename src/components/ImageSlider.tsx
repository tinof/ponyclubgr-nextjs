import React, { useState } from 'react';
import Image from 'next/image';

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

  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
      <Image
        src={images[currentIndex]}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        priority={currentIndex === 0}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rj5m4xVvEH1Toi/8AdvdPZK7l3JvS39v/2Q=="
      />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            className={`${smallDots ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            } transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/20`}
            onClick={() => setCurrentIndex(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setCurrentIndex(index);
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
            tabIndex={0}
          />
        ))}
        {/* Decorative dots */}
        <div className={`${smallDots ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full bg-white/50`} />
        <div className={`${smallDots ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full bg-white/50`} />
      </div>
    </>
  );
}