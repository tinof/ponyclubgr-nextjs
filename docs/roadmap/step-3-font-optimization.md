# Step 3: Font Optimization (High Priority)

## Objective
Replace traditional CSS `@import` for Google Fonts with `next/font` to optimize font loading. This improves performance by automatically self-hosting the fonts, reducing network requests and preventing layout shift.

## Prerequisites
- Completion of Step 2 (Image Optimization).

## Task Details
**Effort**: 2 hours
**Impact**: High
**Files to be modified**:
- `src/app/layout.tsx`
- `src/index.css`

## Implementation Steps

### Step 3.1: Update Layout to use `next/font`

Modify `src/app/layout.tsx` to import and configure the `Poppins` font.

**File**: `src/app/layout.tsx`
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

### Step 3.2: Update CSS to Remove Font Import

Edit `src/index.css` to remove the old Google Fonts `@import` and use the new CSS variable for the font family.

**File**: `src/index.css`
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

## Verification
1.  **Build the project:**
    ```bash
    npm run build
    ```
2.  **Run the development server:**
    ```bash
    npm run dev
    ```
3.  **Manual Check**: Open the application in a browser. In the developer tools, inspect the "Network" tab to confirm that fonts are being loaded from your own domain (e.g., `/_next/static/media/...`) instead of `fonts.googleapis.com`. The text should render with the Poppins font.

## Rollback Procedure
If you encounter issues, revert the changes to the modified files:
```bash
git checkout HEAD~1 -- src/app/layout.tsx src/index.css
npm install
