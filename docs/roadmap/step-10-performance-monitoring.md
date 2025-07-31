# Step 10: Performance Monitoring Setup (Low Priority)

## Objective
Integrate tools for performance monitoring and bundle analysis. This will help in understanding the application's performance characteristics, identifying large dependencies, and tracking Core Web Vitals over time.

## Prerequisites
- Completion of Step 9 (SEO Enhancements).

## Task Details
**Effort**: 3 hours
**Impact**: Low
**Files to be modified**:
- `next.config.mjs`
- `package.json`
- `src/components/PerformanceMonitor.tsx` (new file)

## Implementation Steps

### Step 10.1: Install Bundle Analyzer

First, install the `@next/bundle-analyzer` package, which will be used to visualize the size of your JavaScript bundles.

```bash
npm install --save-dev @next/bundle-analyzer
```

### Step 10.2: Configure Bundle Analyzer

Update `next.config.mjs` to wrap the configuration with the bundle analyzer. It will only run when the `ANALYZE` environment variable is set to `true`.

**File**: `next.config.mjs`
```javascript
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... (keep all existing config from previous steps)
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

### Step 10.3: Add Analysis Scripts to `package.json`

Add new scripts to your `package.json` to make it easy to run the bundle analyzer and Lighthouse audits.

**File**: `package.json`
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "preview": "next start",
    "analyze": "ANALYZE=true npm run build",
    "lighthouse": "lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html"
  }
}
```

### Step 10.4: Create a Performance Monitoring Component

Create a new component `src/components/PerformanceMonitor.tsx` to log Core Web Vitals to the console. This is a basic example; in a real-world scenario, you would send this data to an analytics service.

**File**: `src/components/PerformanceMonitor.tsx`
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
*Note: To use this component, you would import it into your `RootLayout`.*

## Verification
1.  **Analyze Bundle**: Run `npm run analyze`. This will build the project and open two new tabs in your browser showing the client and server bundle compositions.
2.  **Run Lighthouse**: Run `npm run build && npm run start`, and in a separate terminal, run `npm run lighthouse`. This will generate a `lighthouse-report.html` file in your project root.
3.  **Check Performance Vitals**: Run the app with `npm run dev` and check the browser console for FCP and LCP logs from the `PerformanceMonitor` component.

## Rollback Procedure
Revert the changes to the modified files and uninstall the new package:
```bash
git checkout HEAD~1 -- next.config.mjs package.json
rm src/components/PerformanceMonitor.tsx
npm uninstall @next/bundle-analyzer
npm install
