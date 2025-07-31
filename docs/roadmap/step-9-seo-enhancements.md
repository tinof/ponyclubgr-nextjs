# Step 9: SEO Enhancements (Low Priority)

## Objective
Improve Search Engine Optimization (SEO) by adding structured data (JSON-LD) and generating dynamic metadata. This helps search engines better understand the content of your pages, which can lead to improved search rankings and richer search results.


## Task Details
**Effort**: 2 hours
**Impact**: Medium
**Files to be modified**:
- `src/app/layout.tsx`
- `src/components/PackageCards.tsx` (for demonstration)

## Implementation Steps

### Step 9.1: Add Structured Data (JSON-LD)

Create a component to inject a `<script>` tag with JSON-LD structured data into the page. This example describes a tourism package, which is relevant to the application.

**File**: `src/app/layout.tsx` (add this to the `<body>` or `<head>`)
```typescript
// In RootLayout component
// ...
import { ErrorBoundary } from '../components/ErrorBoundary'

const poppins = Poppins({
  // ...
})

export const metadata: Metadata = {
  // ...
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Pony Club - Rafting & Riding Adventure',
  description: 'Experience unforgettable horse riding and rafting adventures at Acheron River, Greece.',
  image: 'https://www.ponyclubacheron.com/og-image.jpg', // Replace with your actual domain
  brand: {
    '@type': 'Brand',
    name: 'Pony Club Acheron',
  },
  offers: {
    '@type': 'Offer',
    url: 'https://www.ponyclubacheron.com/', // Replace with your actual domain
    priceCurrency: 'EUR',
    price: '20',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '88',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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

### Step 9.2: Dynamic Metadata Generation

For individual package pages (if they existed), you would use the `generateMetadata` function to create unique titles and descriptions. To simulate this, we can imagine a dynamic page structure.

**Example for a dynamic page `src/app/packages/[slug]/page.tsx`:**
```typescript
import { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

// This function would fetch package data based on the slug
async function getPackageData(slug: string) {
  // In a real app, you'd fetch this from a database or CMS
  return {
    title: `Package: ${slug.charAt(0).toUpperCase() + slug.slice(1)}`,
    description: `Details for our amazing ${slug} package.`,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPackageData(params.slug);
  return {
    title: data.title,
    description: data.description,
  };
}

export default function PackagePage({ params }: Props) {
  return <div>Details for package: {params.slug}</div>;
}
```
*Note: This step is illustrative. Since the project is a single-page app, the primary benefit comes from the JSON-LD in `layout.tsx`.*

## Verification
1.  **Build and run the application.**
2.  **Check Structured Data**: Use Google's [Rich Results Test](https://search.google.com/test/rich-results) to validate the URL of your running application. It should detect the "Product" structured data.
3.  **Check Metadata**: View the page source in the browser and confirm that the `<title>` and `<meta name="description">` tags are correctly rendered.

## Rollback Procedure
If issues arise, revert the changes to the modified files:
```bash
git checkout HEAD~1 -- src/app/layout.tsx
