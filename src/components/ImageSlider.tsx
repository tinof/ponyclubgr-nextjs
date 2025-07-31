import React, { useState } from 'react';
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
  return <>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10"></div>
      <img src={images[currentIndex]} alt={alt} className="w-full h-full object-cover" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => <div key={index} className={`${smallDots ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`} onClick={() => setCurrentIndex(index)}></div>)}
        {/* Adding extra dots to match the design */}
        <div className={`${smallDots ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full bg-white/50`}></div>
        <div className={`${smallDots ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full bg-white/50`}></div>
      </div>
    </>;
}