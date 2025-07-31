# Step 2: Image Optimization (High Priority)

## Objective
Replace standard `<img>` tags with the Next.js `<Image>` component to automatically optimize images, improving performance and Core Web Vitals.

## Prerequisites
- Completion of Step 1 (Dependency Updates).

## Task Details
**Effort**: 4 hours
**Impact**: Very High
**Files to be modified**:
- `next.config.mjs`
- `src/components/ImageSlider.tsx`

## Implementation Steps

### Step 2.1: Configure Next.js for Image Optimization

Update `next.config.mjs` to enable image optimization and specify allowed external domains.

**File**: `next.config.mjs`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: './dist',
  trailingSlash: true,
  images: {
    unoptimized: false, // Enable optimization
    domains: ['lh3.googleusercontent.com'], // Add external domains
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },
}

export default nextConfig
```

### Step 2.2: Update the ImageSlider Component

Modify `src/components/ImageSlider.tsx` to use the `next/image` component.

**File**: `src/components/ImageSlider.tsx`
```typescript
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10"></div>
      <Image
        src={images[currentIndex]}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 400px"
        priority={currentIndex === 0}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rj5m4xVvEH1Toi/8AdvdPZK7l3JvS39v/2Q=="
      />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
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
        <div className={`${smallDots ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full bg-white/50`}></div>
        <div className={`${smallDots ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full bg-white/50`}></div>
      </div>
    </>
  );
}
```

## Verification
1.  **Build the project:**
    ```bash
    npm run build
    ```
2.  **Run the development server:**
    ```bash
    npm run dev
    ```
3.  **Manual Check**: Open the application in a browser and verify that images load correctly. Use the browser's developer tools to inspect the network tab and confirm that images are being served in modern formats like `.webp` or `.avif` and are appropriately sized.

## Rollback Procedure
If you encounter issues, revert the changes to the modified files:
```bash
git checkout HEAD~1 -- next.config.mjs src/components/ImageSlider.tsx
npm install
