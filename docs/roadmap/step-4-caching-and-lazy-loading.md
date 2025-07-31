# Step 4: Caching and Lazy Loading (High Priority)

## Objective
Implement an explicit caching strategy and selective lazy loading to optimize performance. This addresses Next.js 15's updated caching behavior and ensures that components are only loaded when needed, improving initial page load times.

## Prerequisites
- Completion of Step 3 (Font Optimization).

## Task Details
**Effort**: 3 hours
**Impact**: High
**Files to be modified**:
- `next.config.mjs`
- `src/app/[[...slug]]/page.tsx` (or equivalent entry point)

## Implementation Steps

### Step 4.1: Define an Explicit Caching Strategy

Update `next.config.mjs` to include the `staleTimes` experimental feature. This gives you fine-grained control over how long static and dynamic data is considered fresh.

**File**: `next.config.mjs`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... (keep existing output, distDir, trailingSlash, images config)
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
    staleTimes: {
      dynamic: 30,   // Dynamic content is considered fresh for 30 seconds
      static: 180,  // Static content is considered fresh for 180 seconds
    },
  },
}

export default nextConfig
```

### Step 4.2: Implement Selective Lazy Loading

Modify your main page component to dynamically import components that are not immediately visible or critical for the initial render. This example assumes your main app component is loaded in `src/app/[[...slug]]/page.tsx`.

**File**: `src/app/[[...slug]]/page.tsx`
```typescript
import dynamic from 'next/dynamic'
import { Header } from '@/components/Header'
import { WelcomeSection } from '@/components/WelcomeSection'

// Lazily load components that are below the fold or non-critical
const PackageCards = dynamic(() => import('@/components/PackageCards').then(mod => mod.PackageCards), {
  loading: () => <p>Loading packages...</p>,
  ssr: false // Disable SSR for this component if it's client-interactive
})

const BottomNav = dynamic(() => import('@/components/BottomNav').then(mod => mod.BottomNav), {
  ssr: false
})

export default function HomePage() {
  return (
    <div className="bg-[#f5f7f5] min-h-screen flex justify-center items-center p-4 relative overflow-hidden">
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
*Note: You may need to adjust the import paths (`@/components/...`) to match your project's aliasing configuration (e.g., `../../components/...`).*

## Verification
1.  **Build and run the application.**
2.  **Manual Check**: Open the browser's developer tools. In the "Network" tab, you should see that the JavaScript chunks for `PackageCards` and `BottomNav` are loaded separately after the initial page load.
3.  **Performance Audit**: Run a Lighthouse audit to check for improvements in metrics like Time to Interactive (TTI).

## Rollback Procedure
If issues arise, revert the changes to the modified files:
```bash
git checkout HEAD~1 -- next.config.mjs "src/app/[[...slug]]/page.tsx"
