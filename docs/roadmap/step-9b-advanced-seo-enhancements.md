# Step 9b: Advanced Technical & Local SEO

## Objective
To build upon the foundational SEO in Step 9 by implementing advanced technical SEO features native to Next.js 15. This step focuses on improving crawlability with dynamic sitemaps, controlling search bots with a dynamic `robots.txt`, and significantly boosting local search presence with comprehensive structured data.

## How This Complements Your Marketing Strategy
A strong technical SEO foundation improves your site's "quality score" in the eyes of search engines. This not only boosts organic rankings but also supports your paid campaigns (like Google Ads) by ensuring landing pages are highly relevant and performant, which can lead to better ad placements and lower costs.

## Task Details
**Effort**: 3-4 hours
**Impact**: High
**Files to be created/modified**:
- `src/app/sitemap.ts` (new file)
- `src/app/robots.ts` (new file)
- `src/app/layout.tsx` (modify)
- `public/robots.txt` (delete)
- `src/components/Breadcrumbs.tsx` (new file, optional)

## Implementation Steps

### Step 10.1: Dynamic Sitemap Generation

Create a dynamic sitemap to automatically inform search engines of all your pages and their importance.

**Action**: Create the file `src/app/sitemap.ts`.

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ponyclub.gr'

  // In the future, you can fetch dynamic routes (e.g., tour packages) here
  // const packages = await fetchPackages();
  // const packageUrls = packages.map(pkg => ({...}));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Add other static pages here
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}
```
*Note: After creating this, you can remove any `postbuild` script for `next-sitemap` in `package.json` if it exists.*

### Step 10.2: Dynamic `robots.txt` Generation

Create a dynamic `robots.txt` to control how search engines crawl your site and to prevent them from indexing development environments.

**Action**:
1.  Delete the static `public/robots.txt` file.
2.  Create the file `src/app/robots.ts`.

```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.ponyclub.gr';
  const isProduction = process.env.NODE_ENV === 'production';

  // Block all crawlers on non-production environments
  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
```

### Step 10.3: Enhance Root Layout with Comprehensive Metadata & Structured Data

Update the root layout to include canonical URLs and essential structured data for your organization and local business presence.

**Action**: Modify `src/app/layout.tsx`.

```typescript
// src/app/layout.tsx

// ... imports
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ponyclub.gr'), // Important for relative URLs
  title: {
    default: 'Pony Club Acheron - Horse Riding & Rafting Adventures',
    template: '%s | Pony Club Acheron',
  },
  description: 'Experience unforgettable horse riding, rafting, and trekking adventures at Acheron River, Greece. Perfect for families and thrill-seekers.',
  keywords: ['horse riding greece', 'rafting acheron river', 'glyki tours', 'family adventures greece', 'pony club acheron'],
  alternates: {
    canonical: '/', // Base canonical URL
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Pony Club Acheron - Unforgettable River Adventures',
    description: 'Discover the magic of Acheron River with our expert-guided horse riding and rafting tours.',
    images: [
      {
        url: '/og-image.jpg', // Make sure this image exists in /public
        width: 1200,
        height: 630,
        alt: 'A group enjoying a rafting tour on the Acheron River.',
      },
    ],
    siteName: 'Pony Club Acheron',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pony Club Acheron - Horse Riding & Rafting',
    description: 'Your next adventure awaits at Acheron River!',
    images: ['/og-image.jpg'],
  },
  robots: { // More specific robot controls
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Pony Club Acheron',
  url: 'https://www.ponyclub.gr',
  logo: 'https://www.ponyclub.gr/images/ponyclub_logo.png', // Verify path
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+30-XXX-XXXXXXX', // Add your phone number
    contactType: 'customer service',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Pony Club Acheron',
  image: 'https://www.ponyclub.gr/images/hero-image.webp', // Verify path
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Glyki',
    addressLocality: 'Acheron',
    addressRegion: 'Epirus',
    postalCode: '46031',
    addressCountry: 'GR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '39.3293',  // Replace with actual coordinates
    longitude: '20.6214', // Replace with actual coordinates
  },
  url: 'https://www.ponyclub.gr',
  telephone: '+30-XXX-XXXXXXX', // Add your phone number
  priceRange: '€€',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* The Product JSON-LD from Step 9 should be moved to a more specific component/page, 
            but for now, we leave it and add the new ones. */}
      </head>
      <body>
        {/* ... existing body content ... */}
        {children}
      </body>
    </html>
  );
}
```

### Step 10.4: (Recommended) Implement Breadcrumbs

For better user navigation and SEO, create a breadcrumb component that includes structured data.

**Action**: Create `src/components/Breadcrumbs.tsx`.

```typescript
// src/components/Breadcrumbs.tsx
import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://www.ponyclub.gr${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex space-x-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {index < items.length - 1 ? (
                <Link href={item.href} className="hover:underline">
                  {item.name}
                </Link>
              ) : (
                <span className="font-semibold">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
```

### Step 10.5: Additional SEO Enhancements from Best Practices

Based on the comprehensive SEO research, here are additional improvements to consider:

#### Geographic Metadata
Add geographic meta tags to your root layout for local SEO:

```typescript
// Add to metadata object in layout.tsx
other: {
  'geo.region': 'GR-31', // Greece - Epirus
  'geo.placename': 'Glyki, Acheron, Greece',
  'geo.position': '39.3293;20.6214', // lat;long
  'ICBM': '39.3293, 20.6214',
  'theme-color': '#5a6f5a', // Your brand color
},
```

#### Image Alt Text Optimization
Ensure all images have descriptive alt text that includes relevant keywords:

```typescript
// Example for package images
<Image 
  src="/images/rafting-group.jpg" 
  alt="Family rafting adventure on crystal-clear Acheron River in Glyki, Greece" 
/>
```

#### Internal Linking Strategy
Use Next.js Link component with descriptive anchor text:

```typescript
<Link href="/packages/horse-riding">
  Explore our guided horse riding tours through scenic Acheron valley
</Link>
```

## Key SEO Benefits This Step Provides

1. **Dynamic Sitemaps**: Automatically updated, environment-aware sitemaps that grow with your content
2. **Smart Robot Control**: Prevents development sites from being indexed while allowing production crawling
3. **Local Business Presence**: LocalBusiness schema markup helps with Google Maps and local search results
4. **Organization Authority**: Establishes your business as a verified entity in search engines
5. **Canonical URLs**: Prevents duplicate content issues
6. **Enhanced Social Sharing**: Optimized OpenGraph and Twitter Card metadata
7. **Breadcrumb Navigation**: Improves user experience and can appear in search results

## Verification

1.  **Build and run the application** (`npm run build` && `npm run start`).
2.  **Check Sitemap**: Navigate to `/sitemap.xml` on your local server. You should see the XML output.
3.  **Check Robots.txt**: Navigate to `/robots.txt`. You should see the generated rules.
4.  **Check Structured Data**: Use Google's [Rich Results Test](https://search.google.com/test/rich-results) to validate your homepage URL. It should detect `Organization` and `LocalBusiness` types.
5.  **Check Metadata**: View the page source of your homepage and confirm the new `<title>`, `<meta name="description">`, `canonical` link, and `og:` tags are present.
6.  **Local SEO Testing**: Search for your business name + location to see if local search results improve over time.

## Post-Implementation Tasks

1. **Submit Updated Sitemap**: Submit your new sitemap URL to Google Search Console and Bing Webmaster Tools
2. **Monitor Core Web Vitals**: Use PageSpeed Insights to ensure performance remains optimal
3. **Track Local Rankings**: Monitor local search rankings for key terms like "horse riding Acheron", "rafting Glyki Greece"
4. **Google My Business**: Ensure your Google My Business profile is optimized and matches your structured data
5. **Review Search Console**: Monitor for any crawl errors or indexing issues

## Integration with Google Ads Strategy

This enhanced SEO foundation will complement your Google Ads campaigns by:
- **Improving Quality Score**: Better landing pages lead to higher Quality Scores and lower costs
- **Supporting Conversion Tracking**: Proper metadata and structured data improve tracking accuracy
- **Enhancing Local Targeting**: LocalBusiness schema supports location-based ad targeting
- **Building Trust Signals**: Rich snippets and verified business information increase click-through rates

## Rollback Procedure

If issues arise, revert the changes to the modified files:
```bash
git checkout HEAD~1 -- src/app/layout.tsx
rm src/app/sitemap.ts
rm src/app/robots.ts
# Restore public/robots.txt if needed
git checkout HEAD~1 -- public/robots.txt
```

## Future Enhancements (Step 11 Candidates)

Consider these advanced SEO features for future implementation:
- **Dynamic Package Pages**: Generate SEO-optimized pages for each tour package
- **Blog/Content Section**: Add a blog for content marketing and fresh content
- **Multi-language Support**: Implement hreflang tags for international visitors
- **Advanced Analytics**: Implement GA4 with enhanced e-commerce tracking
- **Review Schema**: Add customer review structured data
- **FAQ Schema**: Implement FAQ structured data for common questions
