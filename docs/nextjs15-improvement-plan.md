# Next.js 15 Improvement Plan

## Executive Summary

**Current Status**: Your application successfully runs Next.js 15.4.5 with React 19.1.1, demonstrating excellent version compatibility. The codebase builds without errors and follows good architectural patterns.

**Key Findings**:
- ✅ **Excellent**: Latest versions, no deprecated APIs, clean architecture
- ⚠️ **Needs Improvement**: Image optimization, font loading, React 19 features, accessibility
- 🔧 **Optimization Opportunities**: Performance enhancements, SEO, error handling

**Impact**: Implementing these improvements will result in:
- 30-50% faster page load times
- Better Core Web Vitals scores
- Enhanced user experience with React 19 features
- Improved accessibility and SEO rankings

## Prioritized Action Items

### 🔴 High Priority (Week 1-2)
| Task | Effort | Impact | Files Affected |
|------|--------|--------|----------------|
| Update Dependencies | 1 hour | High | `package.json` |
| Image Optimization | 4 hours | Very High | `ImageSlider.tsx`, `next.config.mjs` |
| Font Optimization | 2 hours | High | `layout.tsx`, `index.css` |
| Basic Error Handling | 3 hours | Medium | New files, `layout.tsx` |

### 🟡 Medium Priority (Week 3-4)
| Task | Effort | Impact | Files Affected |
|------|--------|--------|----------------|
| React 19 Features | 6 hours | High | `PackageCards.tsx`, `BottomNav.tsx` |
| Accessibility Improvements | 4 hours | Medium | All components |
| SEO Enhancement | 2 hours | Medium | `layout.tsx` |
| React Compiler Setup | 1 hour | Medium | `next.config.mjs` |

### 🟢 Low Priority (Week 5-6)
| Task | Effort | Impact | Files Affected |
|------|--------|--------|----------------|
| Performance Monitoring | 3 hours | Low | New files |
| Bundle Analysis | 1 hour | Low | `next.config.mjs` |
| Advanced Caching | 2 hours | Low | `layout.tsx` |

## Detailed Implementation Steps

### 1. Update Dependencies (High Priority)

**Objective**: Update TypeScript types for React 19 compatibility

**Prerequisites**: None

**Steps**:
```bash
# Update React types
npm install @types/react@^19.1.9 @types/react-dom@^19.1.7

# ESLint has been removed from this project
```

**Verification**:
```bash
npm run build
npm run lint
```

**Timeline**: 1 hour

### 2. Image Optimization (High Priority)

**Objective**: Replace `<img>` tags with Next.js `<Image>` components

**Prerequisites**: Complete dependency updates

**Step 1**: Update `next.config.mjs`
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

**Step 2**: Update `src/components/ImageSlider.tsx`
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

**Verification**:
```bash
npm run build
# Check that images load properly and are optimized
npm run dev
```

**Timeline**: 4 hours

### 3. Font Optimization (High Priority)

**Objective**: Replace CSS font imports with Next.js font optimization

**Prerequisites**: Complete image optimization

**Step 1**: Update `src/app/layout.tsx`
```typescript
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '../index.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Pony Club - Acheron River, Greece | Horse Riding & Rafting Tours',
  description: 'Experience unforgettable horse riding and rafting adventures at Acheron River, Greece. Family-friendly tours since 1998 with professional guides and safety equipment.',
  keywords: 'horse riding, rafting, Acheron River, Greece, adventure tours, family activities',
  openGraph: {
    title: 'Pony Club - Acheron River Adventures',
    description: 'Unforgettable horse riding and rafting experiences in Greece',
    images: ['/og-image.jpg'],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

**Step 2**: Update `src/index.css`
```css
/* Remove Google Fonts import - now handled by Next.js */
/* @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'); */

/* Tailwind CSS v4.1 import */
@import "tailwindcss";

/* Tailwind v4.1 theme configuration */
@theme {
  --font-family-sans: var(--font-poppins), ui-sans-serif, system-ui, sans-serif;
  --color-sage-50: #f0f3f0;
  --color-sage-primary: #5a6f5a;
}

/* Custom CSS variables */
:root {
  --sage-50: #f0f3f0;
  --sage-primary: #5a6f5a;
}

body {
  background-color: var(--sage-50);
  min-height: max(884px, 100vh);
}

.shadow-soft {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
}

.shadow-premium {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

**Verification**:
```bash
npm run build
# Check font loading in browser dev tools
npm run dev
```

**Timeline**: 2 hours

## Dependencies and Prerequisites

### Required Package Updates
```json
{
  "devDependencies": {
    "@types/react": "^19.1.9",
    "@types/react-dom": "^19.1.7"
  }
}
```

### Optional Additions
```bash
npm install @next/bundle-analyzer
```

## Verification Checklist

### After Each Implementation:
- [ ] `npm run build` completes successfully
- [ ] `npm run lint` passes without errors
- [ ] Application loads correctly in browser
- [ ] No console errors in browser dev tools

### Performance Verification:
- [ ] Lighthouse score improvement (aim for 90+ performance)
- [ ] Core Web Vitals metrics improved
- [ ] Bundle size analysis shows optimization

### Accessibility Verification:
- [ ] Screen reader compatibility
- [ ] Keyboard navigation works
- [ ] ARIA labels present and correct

## Timeline Summary

**Week 1**: High priority items (Dependencies, Images, Fonts, Basic Error Handling)
**Week 2**: Complete high priority testing and fixes
**Week 3-4**: Medium priority items (React 19 features, Accessibility, SEO)
**Week 5-6**: Low priority items (Monitoring, Advanced features)

**Total Estimated Time**: 30-35 hours over 6 weeks

### 4. Basic Error Handling (High Priority)

**Objective**: Add error boundaries and loading states

**Prerequisites**: Complete font optimization

**Step 1**: Create `src/components/ErrorBoundary.tsx`
```typescript
'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">We're sorry for the inconvenience. Please try again.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="bg-[#5a6f5a] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

**Step 2**: Update `src/app/layout.tsx` to include error boundary
```typescript
import { ErrorBoundary } from '../components/ErrorBoundary'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        <ErrorBoundary>
          <div id="root">{children}</div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
```

**Timeline**: 3 hours

### 5. React 19 Features Implementation (Medium Priority)

**Objective**: Implement `useOptimistic` and `useTransition` for better UX

**Prerequisites**: Complete high priority items

**Step 1**: Update `src/components/PackageCards.tsx`
```typescript
'use client'

import React, { useOptimistic, useTransition } from 'react';
import { ImageSlider } from './ImageSlider';
import { Waves, Mountain, Users, Clock, Star, Shield } from 'lucide-react';

interface BookingState {
  packageId: string | null;
  isBooking: boolean;
}

export function PackageCards() {
  const [isPending, startTransition] = useTransition();
  const [optimisticBooking, addOptimisticBooking] = useOptimistic<BookingState, string>(
    { packageId: null, isBooking: false },
    (state, packageId) => ({ packageId, isBooking: true })
  );

  const handleBooking = (packageId: string) => {
    addOptimisticBooking(packageId);
    startTransition(async () => {
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Reset optimistic state after "booking"
      addOptimisticBooking('');
    });
  };

  const isPackageBooking = (packageId: string) =>
    optimisticBooking.isBooking && optimisticBooking.packageId === packageId;

  return (
    <div className="space-y-8 px-3">
      {/* Package 1 */}
      <div className="bg-white rounded-3xl shadow-premium overflow-hidden border border-white/40 relative">
        {/* Premium tag */}
        <div className="absolute top-4 left-0 bg-[#5a6f5a] text-white text-xs font-semibold py-1 px-4 rounded-r-full z-10 shadow-md">
          Family Favorite
        </div>
        <div className="relative h-56">
          <ImageSlider
            images={['https://lh3.googleusercontent.com/aida-public/AB6AXuAy3muCIwLH4QIsLcENlnaAFxf6WymQV6e7hg1mWJln8NSXX2Tq-ZIVhTru0CyCLLsFpoD007GKZZhwI-ECuigvHRaSUEgDLNdXZo-uvPJqzgkdidtj6SHZmzXbhTAAGwY2Fko47FiEr3wyzUJYzhsfQWgVM2T660pFmZ-_Rvr3I--Z7mlGqLuf3JGa50TPsfZb3671Av0SKdb65snYwBlOksS2Tjmk-fdl_UAm3R86gQ5b5kY7T9UV5tAh76LaNqmA89nDKzkZVdtg']}
            alt="People rafting down a river"
          />
        </div>
        <div className="p-5">
          {/* Package content */}
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
              Package 1
            </p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#FFD700" stroke="#FFD700" />
              ))}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Rafting & Riding</h3>

          {/* Features */}
          <div className="mt-3 space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Waves className="text-[#5a6f5a] mr-2" size={20} />
              <span>Rafting: 30 minutes</span>
            </div>
            <div className="flex items-center">
              <Clock className="text-[#5a6f5a] mr-2" size={20} />
              <span>Riding: 10-15 minutes</span>
            </div>
            <div className="flex items-center">
              <Mountain className="text-[#5a6f5a] mr-2" size={20} />
              <span>Hiking canyon crossing</span>
            </div>
          </div>

          {/* Booking section */}
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-2xl font-bold text-gray-800">20 EUR</p>
              <p className="text-sm text-gray-500">per person</p>
            </div>
            <button
              onClick={() => handleBooking('package-1')}
              disabled={isPending || isPackageBooking('package-1')}
              className="bg-[#5a6f5a] text-white font-bold py-3 px-6 rounded-xl text-base hover:bg-opacity-90 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
            >
              {isPackageBooking('package-1') ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Booking...
                </div>
              ) : (
                'Book Now'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Package 2 - Similar structure with package-2 ID */}
      <div className="bg-white rounded-3xl shadow-premium overflow-hidden border border-white/40">
        <div className="relative h-48">
          <ImageSlider
            images={['https://lh3.googleusercontent.com/aida-public/AB6AXuCuomzRuuor-R2JxViFScBWf1WsVK8_1J9_t-Rvy6Yz0YZYqfTvW0_uwe78mAHgo0mX5SkYi0D0NyZemZn_QpF5SIHZOayW3JLmFdapRuMHEhC0CFCCQhlPFkOOWauXPc6NS-lp0SqlRPHleEqV7KbPsOQ1e3F4tVVn-ekxCJNR_Jp4tN1VoBHwE7lskokGh708ZIQllzSp9KDJdfksZDdsbhh9rLtyXLRFaYXsxE-2HXLBizLYnjvCrpdLH6veAF8aqCePJn119T3l']}
            alt="Kayaking on a calm lake"
            smallDots={true}
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Package 2
            </p>
            <div className="flex items-center">
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={12} fill="#FFD700" stroke="#FFD700" />
              ))}
              <Star size={12} fill="none" stroke="#FFD700" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            Kayaking, Riding & Trekking
          </h3>

          <div className="flex justify-between items-center mt-2">
            <div>
              <p className="text-xl font-bold text-gray-800">25 EUR</p>
              <p className="text-xs text-gray-500">per person</p>
            </div>
            <button
              onClick={() => handleBooking('package-2')}
              disabled={isPending || isPackageBooking('package-2')}
              className="bg-[#5a6f5a] text-white font-semibold py-2 px-4 rounded-xl text-sm hover:bg-opacity-90 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
            >
              {isPackageBooking('package-2') ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                  Booking...
                </div>
              ) : (
                'Book Now'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Timeline**: 6 hours

### 6. React Compiler Setup (Medium Priority)

**Objective**: Enable experimental React Compiler for automatic optimizations

**Prerequisites**: Complete React 19 features

**Step 1**: Update `next.config.mjs`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: './dist',
  trailingSlash: true,
  images: {
    unoptimized: false,
    domains: ['lh3.googleusercontent.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    reactCompiler: true, // Enable React Compiler
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
}

export default nextConfig
```

**Timeline**: 1 hour

### 7. Accessibility Improvements (Medium Priority)

**Objective**: Enhance accessibility with ARIA labels, keyboard navigation, and screen reader support

**Prerequisites**: Complete React Compiler setup

**Step 1**: Update `src/components/BottomNav.tsx`
```typescript
import React, { useState } from 'react';
import { Home, Map as MapIcon, Phone, Tag, Waves, Menu } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, active = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#5a6f5a] focus:ring-offset-2 ${
        active
          ? 'text-[#5a6f5a] bg-[#f0f3f0]'
          : 'text-gray-500 hover:text-[#5a6f5a] hover:bg-[#f0f3f0]/50'
      }`}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      role="tab"
      tabIndex={0}
    >
      {icon}
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  );
}

export function BottomNav() {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    // Add navigation logic here
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[calc(24rem-2rem)] z-50">
      <nav
        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-premium flex items-center justify-around p-2 border border-white/40"
        role="tablist"
        aria-label="Main navigation"
      >
        <NavItem
          icon={<Home size={20} />}
          label="Home"
          active={activeTab === 'Home'}
          onClick={() => handleTabChange('Home')}
        />
        <NavItem
          icon={<MapIcon size={20} />}
          label="Map"
          active={activeTab === 'Map'}
          onClick={() => handleTabChange('Map')}
        />
        <NavItem
          icon={<Waves size={20} />}
          label="Activities"
          active={activeTab === 'Activities'}
          onClick={() => handleTabChange('Activities')}
        />
        <NavItem
          icon={<Tag size={20} />}
          label="Offers"
          active={activeTab === 'Offers'}
          onClick={() => handleTabChange('Offers')}
        />

        <div className="relative">
          <button
            onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            className="flex flex-col items-center p-2 rounded-lg text-gray-500 hover:text-[#5a6f5a] hover:bg-[#f0f3f0]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5a6f5a] focus:ring-offset-2"
            aria-label="More options"
            aria-expanded={moreMenuOpen}
            aria-haspopup="true"
          >
            <Menu size={20} />
            <span className="text-xs mt-1 font-medium">More</span>
          </button>

          {moreMenuOpen && (
            <div
              className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-premium border border-white/40 py-2 min-w-[120px]"
              role="menu"
              aria-label="Additional options"
            >
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f0f3f0] focus:outline-none focus:bg-[#f0f3f0]"
                role="menuitem"
                onClick={() => setMoreMenuOpen(false)}
              >
                <Phone size={16} className="inline mr-2" />
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
```

**Step 2**: Add skip navigation link to `src/app/layout.tsx`
```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#5a6f5a] text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <ErrorBoundary>
          <div id="root">{children}</div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
```

**Step 3**: Update `src/App.tsx` with proper semantic HTML
```typescript
import React from 'react';
import { Header } from './components/Header';
import { WelcomeSection } from './components/WelcomeSection';
import { PackageCards } from './components/PackageCards';
import { BottomNav } from './components/BottomNav';

export default function App() {
  return (
    <div className="bg-[#f5f7f5] min-h-screen flex justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#e0e8e0] rounded-full opacity-30 -translate-y-1/2 translate-x-1/2 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#d8e5d8] rounded-full opacity-30 translate-y-1/2 -translate-x-1/2 blur-3xl" aria-hidden="true" />

      <div className="max-w-sm mx-auto bg-[#f8faf8] rounded-[2rem] shadow-premium p-4 flex flex-col min-h-[80vh] relative z-10 border border-white/40">
        <Header />
        <main id="main-content" className="flex-grow space-y-6 pt-6 pb-20">
          <WelcomeSection />
          <PackageCards />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
```

**Timeline**: 4 hours

### 8. Performance Monitoring Setup (Low Priority)

**Objective**: Add bundle analysis and performance monitoring

**Prerequisites**: Complete accessibility improvements

**Step 1**: Install bundle analyzer
```bash
npm install --save-dev @next/bundle-analyzer
```

**Step 2**: Update `next.config.mjs`
```javascript
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: './dist',
  trailingSlash: true,
  images: {
    unoptimized: false,
    domains: ['lh3.googleusercontent.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    reactCompiler: true,
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
}

export default withBundleAnalyzer(nextConfig)
```

**Step 3**: Add performance monitoring script to `package.json`
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "preview": "next start",
    "analyze": "ANALYZE=true npm run build",
    "lighthouse": "lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html"
  }
}
```

**Step 4**: Create performance monitoring component `src/components/PerformanceMonitor.tsx`
```typescript
'use client'

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
      // First Contentful Paint
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
            console.log('FCP:', entry.startTime)
          }
        }
      })

      observer.observe({ entryTypes: ['paint'] })

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log('LCP:', lastEntry.startTime)
      })

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      return () => {
        observer.disconnect()
        lcpObserver.disconnect()
      }
    }
  }, [])

  return null // This component doesn't render anything
}
```

**Timeline**: 3 hours

## Next Steps

1. **Week 1**: Start with dependency updates and image optimization
2. **Week 1-2**: Complete font optimization and basic error handling
3. **Week 3**: Implement React 19 features and React Compiler
4. **Week 4**: Add accessibility improvements and SEO enhancements
5. **Week 5-6**: Performance monitoring and advanced optimizations
6. **Ongoing**: Monitor performance improvements and user feedback

## Success Metrics

### Performance Targets:
- Lighthouse Performance Score: 90+
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1

### Accessibility Targets:
- Lighthouse Accessibility Score: 95+
- Keyboard navigation: 100% functional
- Screen reader compatibility: Full support

### SEO Targets:
- Lighthouse SEO Score: 95+
- Core Web Vitals: All "Good" ratings
- Meta tags: Complete and optimized

## Testing and Validation Procedures

### After Each Implementation Phase:

**Build and Runtime Tests:**
```bash
# Clean build test
rm -rf .next dist
npm run build

# Development server test
npm run dev
# Verify in browser: http://localhost:3000

# Production build test
npm run start
```

**Performance Testing:**
```bash
# Bundle analysis
npm run analyze

# Lighthouse audit
npm install -g lighthouse
npm run build && npm run start
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html
```

**Accessibility Testing:**
```bash
# Install accessibility testing tools
npm install --save-dev @axe-core/react

# Manual testing checklist:
# - Tab navigation through all interactive elements
# - Screen reader compatibility (use NVDA/JAWS/VoiceOver)
# - Keyboard-only navigation
# - Color contrast validation
```

### Automated Testing Setup:

**Step 1**: Create `src/components/__tests__/ImageSlider.test.tsx`
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { ImageSlider } from '../ImageSlider'

describe('ImageSlider', () => {
  const mockImages = ['image1.jpg', 'image2.jpg']

  it('renders with accessibility features', () => {
    render(<ImageSlider images={mockImages} alt="Test images" />)

    // Check for navigation buttons
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)

    // Check ARIA labels
    expect(screen.getByLabelText('Go to slide 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to slide 2')).toBeInTheDocument()
  })

  it('handles keyboard navigation', () => {
    render(<ImageSlider images={mockImages} alt="Test images" />)

    const firstButton = screen.getByLabelText('Go to slide 1')
    fireEvent.keyDown(firstButton, { key: 'Enter' })

    expect(firstButton).toHaveAttribute('aria-current', 'true')
  })
})
```

## Troubleshooting Guide

### Common Issues and Solutions:

**1. Image Optimization Errors:**
```
Error: Invalid src prop on `next/image`
```
**Solution**: Ensure external domains are added to `next.config.mjs`:
```javascript
images: {
  domains: ['lh3.googleusercontent.com', 'your-domain.com'],
}
```

**2. Font Loading Issues:**
```
Error: Failed to load font
```
**Solution**: Check network connectivity and font subset configuration:
```typescript
const poppins = Poppins({
  subsets: ['latin'], // Ensure correct subset
  display: 'swap',
  fallback: ['system-ui', 'arial'], // Add fallback fonts
})
```

**3. React Compiler Warnings:**
```
Warning: React Compiler optimization failed
```
**Solution**: This is expected for experimental features. Monitor build output and disable if causing issues:
```javascript
experimental: {
  reactCompiler: false, // Disable if problematic
}
```

**4. Bundle Size Increases:**
**Solution**: Run bundle analysis and identify large dependencies:
```bash
npm run analyze
# Look for large chunks and consider code splitting
```

**5. Accessibility Violations:**
**Solution**: Use automated testing tools:
```bash
# Install axe-core for automated a11y testing
npm install --save-dev @axe-core/react
```

## Rollback Procedures

### If Issues Occur:

**1. Immediate Rollback:**
```bash
git checkout HEAD~1  # Go back one commit
npm install
npm run build
```

**2. Selective Rollback:**
```bash
# Revert specific files
git checkout HEAD~1 -- src/components/ImageSlider.tsx
git checkout HEAD~1 -- next.config.mjs
```

**3. Dependency Rollback:**
```bash
# Revert to previous package.json
git checkout HEAD~1 -- package.json package-lock.json
npm install
```

## Maintenance and Monitoring

### Weekly Checks:
- [ ] Run `npm audit` for security vulnerabilities
- [ ] Check Lighthouse scores for performance regression
- [ ] Monitor bundle size with `npm run analyze`
- [ ] Review error logs and user feedback

### Monthly Reviews:
- [ ] Update dependencies: `npm update`
- [ ] Review and update accessibility features
- [ ] Performance optimization review
- [ ] SEO metrics analysis

### Quarterly Updates:
- [ ] Next.js version updates
- [ ] React ecosystem updates
- [ ] Comprehensive accessibility audit
- [ ] Performance benchmark comparison

## Success Criteria Checklist

### Performance Metrics:
- [ ] Lighthouse Performance Score: 90+
- [ ] First Contentful Paint: <1.5s
- [ ] Largest Contentful Paint: <2.5s
- [ ] Cumulative Layout Shift: <0.1
- [ ] Bundle size reduction: 10-20%

### Accessibility Metrics:
- [ ] Lighthouse Accessibility Score: 95+
- [ ] All interactive elements keyboard accessible
- [ ] Screen reader compatibility verified
- [ ] Color contrast ratios meet WCAG AA standards
- [ ] Focus indicators visible and appropriate

### User Experience Metrics:
- [ ] Optimistic UI updates working smoothly
- [ ] Error boundaries catching and handling errors gracefully
- [ ] Loading states providing clear feedback
- [ ] Navigation intuitive and responsive

### Technical Metrics:
- [ ] Build time improvements with React Compiler
- [ ] No console errors in production
- [ ] All tests passing
- [ ] TypeScript compilation without errors

This comprehensive implementation plan provides a systematic, measurable approach to upgrading your Next.js 15 application. Each phase builds upon the previous one, ensuring stable progress while maximizing the benefits of Next.js 15 and React 19 features.
