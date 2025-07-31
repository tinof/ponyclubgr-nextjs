# The Complete Guide to SEO Optimization in Next.js 15

[

![Thomas Augot](https://miro.medium.com/v2/resize:fill:64:64/1*rSYSUoCnBU8YvEjFxZe8TQ.png)





](https://medium.com/@thomasaugot?source=post_page---byline--1bdb118cffd7---------------------------------------)

[Thomas Augot](https://medium.com/@thomasaugot?source=post_page---byline--1bdb118cffd7---------------------------------------)

Follow

15 min read

·

May 22, 2025

[

](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2F1bdb118cffd7&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40thomasaugot%2Fthe-complete-guide-to-seo-optimization-in-next-js-15-1bdb118cffd7&user=Thomas+Augot&userId=8df0d3754eb0&source=---header_actions--1bdb118cffd7---------------------clap_footer------------------)

5

[](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2F1bdb118cffd7&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40thomasaugot%2Fthe-complete-guide-to-seo-optimization-in-next-js-15-1bdb118cffd7&source=---header_actions--1bdb118cffd7---------------------bookmark_footer------------------)

[

Listen









](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D1bdb118cffd7&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40thomasaugot%2Fthe-complete-guide-to-seo-optimization-in-next-js-15-1bdb118cffd7&source=---header_actions--1bdb118cffd7---------------------post_audio_button------------------)

Share

_How I transformed a company website into an SEO powerhouse using Next.js 15’s latest features_

Zoom image will be displayed

![](https://miro.medium.com/v2/resize:fit:1400/1*PkKr7dTPWi9B_gRwDWnX7g.png)

Search Engine Optimization (SEO) can make or break your website’s online presence. With Next.js 15’s powerful new features, creating an SEO-optimized website has never been easier and has solved many issues React faces; if you know what you’re doing.

In this comprehensive guide, I’ll walk you through everything I learned while optimizing a commercial interior design company website for search engines. We’ll cover everything from basic metadata to advanced structured data, and I’ll show you exactly what code to write and why.

# Understanding Next.js 15 SEO Foundations

## The New Metadata API

Next.js 15 introduced a revolutionary way to handle SEO through the Metadata API. Gone are the days of manually managing `<head>` tags, now everything is handled through simple JavaScript objects.

Here’s the basic structure:

// app/layout.tsx  
import { Metadata } from "next";  
  
export const metadata: Metadata = {  
  title: {  
    default: "Your Business Name | What You Do",  
    template: "%s | Your Business Name", // Creates "Page Name | Your Business Name"  
  },  
  description: "Your compelling business description with keywords",  
  keywords: \["keyword1", "keyword2", "keyword3"\],  
};

## Why This Matters

The Metadata API isn’t just syntactic sugar , it provides several crucial advantages:

1.  **Type Safety**: TypeScript ensures you never miss required fields
2.  **Automatic Optimization**: Next.js handles meta tag placement and deduplication
3.  **Dynamic Generation**: Perfect for blogs, e-commerce, and content sites
4.  **Template System**: Consistent branding across all pages

# Building a Bulletproof Root Layout

Your root layout (`app/layout.tsx`) is the foundation of your entire SEO strategy. Here's how to structure it properly:

import type { Metadata } from "next";  
import localFont from "next/font/local";  
  
const customFont = localFont({  
  variable: "--font-primary",  
  display: "swap", // Critical for performance  
  src: \[  
    {  
      path: "../public/fonts/font-regular.woff2",  
      weight: "400",  
      style: "normal",  
    },  
    {  
      path: "../public/fonts/font-bold.woff2",  
      weight: "700",  
      style: "normal",  
    },  
  \],  
});  
  
export const metadata: Metadata = {  
  metadataBase: new URL("https://yourdomain.com/"),  
  title: {  
    default: "Your Business | Professional Service Description",  
    template: "%s | Your Business Name",  
  },  
  description: "Compelling description with location and services. Include your main keywords naturally while staying under 160 characters.",  
  keywords: \[  
    "primary service + location",  
    "secondary service + location",   
    "industry keywords",  
    "local keywords",  
  \],  
  authors: \[{ name: "Your Business Name" }\],  
  creator: "Your Business Name",  
  publisher: "Your Business Name",  
  robots: {  
    index: true,  
    follow: true,  
    googleBot: {  
      index: true,  
      follow: true,  
      'max-video-preview': -1,  
      'max-image-preview': 'large',  
      'max-snippet': -1,  
    },  
  },  
  openGraph: {  
    type: "website",  
    locale: "en\_US", // or "es\_ES" for Spanish  
    url: "https://yourdomain.com",  
    title: "Your Business - Professional Service",  
    description: "Engaging description for social media sharing",  
    images: \[  
      {  
        url: "/hero-image.jpg",  
        width: 1200,  
        height: 630,  
        alt: "Descriptive alt text for your main image",  
      },  
    \],  
    siteName: "Your Business Name",  
  },  
  twitter: {  
    card: 'summary\_large\_image',  
    title: 'Your Business - Professional Service',  
    description: 'Engaging description for Twitter sharing',  
    images: \['/hero-image.jpg'\],  
  },  
  alternates: {  
    canonical: "https://yourdomain.com",  
  },  
  other: {  
    'theme-color': '#your-brand-color',  
    'msapplication-TileColor': '#your-brand-color',  
  },  
};

## The Critical Parts Explained

1.  **metadataBase**: Essential for relative URLs to work properly
2.  **title.template**: Automatically adds your brand to every page
3.  **robots configuration**: Fine-tuned control over search engine behavior
4.  **OpenGraph + Twitter**: Optimized social media sharing
5.  **canonical**: Prevents duplicate content issues

# Structured Data: Speaking Google’s Language

Structured data is how you tell search engines exactly what your content means. It’s the difference between Google guessing what your business does and Google knowing what your business does.

## Organization Schema

Every business website needs this basic schema:

// Add this to your root layout's <head>  
<script  
  type\="application/ld+json"  
  dangerouslySetInnerHTML={{  
    \_\_html: JSON.stringify({  
      "@context": "https://schema.org",  
      "@type": "Organization",  
      "@id": "https://yourdomain.com/#organization",  
      "name": "Your Business Name",  
      "url": "https://yourdomain.com",  
      "logo": {  
        "@type": "ImageObject",  
        "url": "https://yourdomain.com/logo.png",  
        "width": 800,  
        "height": 600  
      },  
      "description": "What your business does and specializes in",  
      "foundingDate": "2020", // Your founding year  
      "numberOfEmployees": {  
        "@type": "QuantitativeValue",  
        "value": "10-50" // Adjust to your size  
      },  
      "address": {  
        "@type": "PostalAddress",  
        "addressLocality": "Your City",  
        "addressRegion": "Your State",  
        "addressCountry": "US"  
      },  
      "areaServed": \[  
        {  
          "@type": "Place",  
          "name": "Your Primary Market"  
        },  
        {  
          "@type": "Place",  
          "name": "Your Secondary Market"  
        }  
      \],  
      "serviceType": \[  
        "Service 1",  
        "Service 2",  
        "Service 3"  
      \]  
    })  
  }}  
/>

## Website Schema

This tells search engines about your site structure:

<script  
  type="application/ld+json"  
  dangerouslySetInnerHTML={{  
    \_\_html: JSON.stringify({  
      "@context": "https://schema.org",  
      "@type": "WebSite",  
      "@id": "https://yourdomain.com/#website",  
      "url": "https://yourdomain.com",  
      "name": "Your Business Name",  
      "description": "Brief description of your website",  
      "publisher": {  
        "@id": "https://yourdomain.com/#organization"  
      },  
      "inLanguage": "en-US"  
    })  
  }}  
/>

# → The Two Missing Pieces Most Developers Forget ←

# Sitemap Generation

Your sitemap is like a roadmap that tells search engines about all your pages, how important they are, and how often they change. Next.js 15 makes creating dynamic, professional sitemaps incredibly easy.

## Basic Sitemap Setup

Create an `app/sitemap.ts` file for automatic sitemap generation:

// app/sitemap.ts  
import { MetadataRoute } from 'next'  
  
export default function sitemap(): MetadataRoute.Sitemap {  
  const baseUrl = 'https://yourdomain.com'  
    
  return \[  
    {  
      url: baseUrl,  
      lastModified: new Date(),  
      changeFrequency: 'weekly',  
      priority: 1,  
    },  
    {  
      url: \`${baseUrl}/about\`,  
      lastModified: new Date(),  
      changeFrequency: 'monthly',  
      priority: 0.9,  
    },  
    {  
      url: \`${baseUrl}/services\`,  
      lastModified: new Date(),  
      changeFrequency: 'monthly',  
      priority: 0.9,  
    },  
    {  
      url: \`${baseUrl}/portfolio\`,  
      lastModified: new Date(),  
      changeFrequency: 'weekly',  
      priority: 0.8,  
    },  
    {  
      url: \`${baseUrl}/contact\`,  
      lastModified: new Date(),  
      changeFrequency: 'monthly',  
      priority: 0.7,  
    },  
  \]  
}

This automatically generates a sitemap at `/sitemap.xml` that looks like:

<urlset xmlns\="http://www.sitemaps.org/schemas/sitemap/0.9"\>  
  <url\>  
    <loc\>https://yourdomain.com</loc\>  
    <lastmod\>2024-01-15</lastmod\>  
    <changefreq\>weekly</changefreq\>  
    <priority\>1</priority\>  
  </url\>  
  <url\>  
    <loc\>https://yourdomain.com/about</loc\>  
    <lastmod\>2024-01-15</lastmod\>  
    <changefreq\>monthly</changefreq\>  
    <priority\>0.9</priority\>  
  </url\>  
  <!-- More URLs... -->  
</urlset\>

## Advanced Dynamic Sitemap

For real-world applications with dynamic content like blogs and portfolios, you’ll want a more sophisticated setup:

// app/sitemap.ts - Production-Ready Version  
import { MetadataRoute } from 'next'  
import { getAllPosts } from '@/lib/blog-service'  
import { getAllProjects } from '@/lib/projects-service'  
  
export default async function sitemap(): Promise<MetadataRoute.Sitemap\> {  
  const baseUrl = 'https://yourdomain.com'  
  
// Static pages with strategic priorities  
  const staticPages: MetadataRoute.Sitemap = \[  
    {  
      url: baseUrl,  
      lastModified: new Date(),  
      changeFrequency: 'weekly',  
      priority: 1.0, // Homepage gets highest priority  
    },  
    {  
      url: \`${baseUrl}/about\`,  
      lastModified: new Date(),  
      changeFrequency: 'monthly',  
      priority: 0.9,  
    },  
    {  
      url: \`${baseUrl}/services\`,  
      lastModified: new Date(),  
      changeFrequency: 'monthly',  
      priority: 0.9,  
    },  
    {  
      url: \`${baseUrl}/services/web-design\`,  
      lastModified: new Date(),  
      changeFrequency: 'monthly',  
      priority: 0.8,  
    },  
    {  
      url: \`${baseUrl}/services/seo\`,  
      lastModified: new Date(),  
      changeFrequency: 'monthly',  
      priority: 0.8,  
    },  
    {  
      url: \`${baseUrl}/portfolio\`,  
      lastModified: new Date(),  
      changeFrequency: 'weekly',  
      priority: 0.9,  
    },  
    {  
      url: \`${baseUrl}/blog\`,  
      lastModified: new Date(),  
      changeFrequency: 'daily',  
      priority: 0.8,  
    },  
    {  
      url: \`${baseUrl}/contact\`,  
      lastModified: new Date(),  
      changeFrequency: 'monthly',  
      priority: 0.7,  
    },  
    // Legal pages (lower priority)  
    {  
      url: \`${baseUrl}/privacy-policy\`,  
      lastModified: new Date(),  
      changeFrequency: 'yearly',  
      priority: 0.3,  
    },  
    {  
      url: \`${baseUrl}/terms-of-service\`,  
      lastModified: new Date(),  
      changeFrequency: 'yearly',  
      priority: 0.3,  
    },  
  \]  
  
try {  
    // Fetch dynamic blog posts  
    const blogPosts = await getAllPosts()  
    const publishedPosts = blogPosts.filter(post => post.published)  
      
    const blogPages: MetadataRoute.Sitemap = publishedPosts.map((post) => ({  
      url: \`${baseUrl}/blog/${post.slug}\`,  
      lastModified: new Date(post.updatedAt || post.createdAt),  
      changeFrequency: 'weekly',  
      priority: 0.6,  
    }))  
  
// Fetch dynamic portfolio projects  
    const projects = await getAllProjects()  
    const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({  
      url: \`${baseUrl}/portfolio/${project.slug}\`,  
      lastModified: new Date(project.updatedAt),  
      changeFrequency: 'monthly',  
      priority: 0.7,  
    }))  
  
// Combine all pages  
    return \[...staticPages, ...blogPages, ...projectPages\]  
  
} catch (error) {  
    console.error('Error generating sitemap:', error)  
    // Return static pages if dynamic content fails  
    return staticPages  
  }  
}

## Understanding Sitemap Parameters

## Priority (0.0 to 1.0)

Priority tells search engines which pages are most important **on your website** (not compared to other websites):

-   **1.0**: Homepage — your most important page
-   **0.9**: Main sections (Services, Portfolio, About)
-   **0.8**: Important subpages (individual services, team page)
-   **0.7**: Content pages (portfolio projects, case studies)
-   **0.6**: Blog posts and articles
-   **0.5**: Archive pages, category pages
-   **0.3**: Legal pages, terms, privacy policy

**Important**: Priority doesn’t affect your ranking against competitors , it just helps search engines understand your site structure.

## Change Frequency

Tells search engines how often content changes:

-   `**always**`: Pages that change every time they're accessed
-   `**hourly**`: Real-time data, live feeds
-   `**daily**`: News sites, active blogs
-   `**weekly**`: Regularly updated content, portfolios
-   `**monthly**`: Business pages, services, about pages
-   `**yearly**`: Legal pages, company information
-   `**never**`: Archived content

## Last Modified

Use real dates when content actually changes:

// Use actual content dates  
lastModified: new Date(post.updatedAt)  
  
// Or current date for pages that change regularly  
lastModified: new Date()

## Real-World Example Output

Your complete sitemap will generate XML like this:

<urlset xmlns\="http://www.sitemaps.org/schemas/sitemap/0.9"\>  
  <!-- Homepage - Highest Priority -->  
  <url\>  
    <loc\>https://yourdomain.com</loc\>  
    <lastmod\>2024-01-15T10:30:00.000Z</lastmod\>  
    <changefreq\>weekly</changefreq\>  
    <priority\>1</priority\>  
  </url\>  
    
  <!-- Main Business Pages -->  
  <url\>  
    <loc\>https://yourdomain.com/services</loc\>  
    <lastmod\>2024-01-15T10:30:00.000Z</lastmod\>  
    <changefreq\>monthly</changefreq\>  
    <priority\>0.9</priority\>  
  </url\>  
    
  <!-- Dynamic Blog Posts -->  
  <url\>  
    <loc\>https://yourdomain.com/blog/seo-tips-2024</loc\>  
    <lastmod\>2024-01-10T14:20:00.000Z</lastmod\>  
    <changefreq\>weekly</changefreq\>  
    <priority\>0.6</priority\>  
  </url\>  
    
  <!-- Dynamic Portfolio Projects -->  
  <url\>  
    <loc\>https://yourdomain.com/portfolio/ecommerce-redesign</loc\>  
    <lastmod\>2024-01-08T09:15:00.000Z</lastmod\>  
    <changefreq\>monthly</changefreq\>  
    <priority\>0.7</priority\>  
  </url\>  
    
  <!-- Legal Pages - Lower Priority -->  
  <url\>  
    <loc\>https://yourdomain.com/privacy-policy</loc\>  
    <lastmod\>2024-01-01T00:00:00.000Z</lastmod\>  
    <changefreq\>yearly</changefreq\>  
    <priority\>0.3</priority\>  
  </url\>  
</urlset\>

## Best Practices

## 1\. Strategic Prioritization

// Good priority structure  
const priorities = {  
  homepage: 1.0,  
  mainSections: 0.9,      // /services, /portfolio, /about  
  subPages: 0.8,          // /services/web-design  
  contentPages: 0.6\-0.7,  // blog posts, projects  
  legalPages: 0.3         // privacy, terms  
}

## 2\. Realistic Change Frequencies

// Match frequency to actual update patterns  
const frequencies = {  
  homepage: 'weekly',     // Updated regularly with new content  
  businessPages: 'monthly', // Updated when services change  
  blogPosts: 'weekly',    // May get updates, comments  
  legalPages: 'yearly'    // Rarely change  
}

## 3\. Accurate Last Modified Dates

// Use real content dates, not current date for everything  
{  
  url: \`${baseUrl}/blog/${post.slug}\`,  
  lastModified: new Date(post.updatedAt), // Real update date  
  changeFrequency: 'weekly',  
  priority: 0.6,  
}

## 4\. Error Handling

try {  
  const dynamicContent = await fetchContent()  
  return \[...staticPages, ...dynamicContent\]  
} catch (error) {  
  console.error('Sitemap generation error:', error)  
  // Always return at least static pages  
  return staticPages  
}

## Testing Your Sitemap

After building your site:

npm run build  
  
// once the build is successful  
npm run start

NB: You may encounter, like I did, a build error stating the following:

❌ \[next\-sitemap\] Unable to find next\-sitemap.config.js  
❌ Error: ENOENT: no such file or directory

This happens when you have the old `next-sitemap` package installed alongside the new Next.js 15 approach.

**Quick Fix:**

1.  Remove the package: `npm uninstall next-sitemap`
2.  Remove the postbuild script from `package.json`:

{  
  "scripts": {  
    "build": "next build"  
    // Remove this line: "postbuild": "next-sitemap"  
  }  
}

**Why this happens:** The `next-sitemap` package is the old way of generating sitemaps. Next.js 15's `app/sitemap.ts` approach is newer and better - you don't need both. The old package tries to run after build and looks for its config file, causing the error.

**Your** `**app/sitemap.ts**` **file is the modern solution and works perfectly without any external packages.**

1.  **Local Testing**: Visit `[http://localhost:3000/sitemap.xml](http://localhost:3000/sitemap.xml)`
2.  **Production Testing**: Visit `[https://yourdomain.com/sitemap.xml](https://yourdomain.com/sitemap.xml)`
3.  **Validation**: Use Google’s sitemap validator
4.  **Submission**: Submit to Google Search Console and Bing Webmaster Tools

## Common Mistakes to Avoid

1.  Don’t set everything to priority 1.0 — Use a hierarchy
2.  Don’t use `always` changefreq unless content literally always changes
3.  Don’t include admin pages, API endpoints, or private content
4.  Don’t forget error handling for dynamic content
5.  Don’t use fake lastModified dates — use real ones or current date

## Next Steps

Once your sitemap is live:

1.  Submit to Google Search Console
2.  Submit to Bing Webmaster Tools
3.  Monitor crawl statistics
4.  Update priorities based on actual traffic patterns
5.  Add new pages to static array as your site grows

This dynamic approach ensures your sitemap stays current automatically, giving search engines the best possible understanding of your site structure and content.

# Robots.txt Generation

Your robots.txt file is like a bouncer for your website — it controls which parts search engines can access and which they should avoid. Next.js 15 provides a powerful way to generate this file automatically using TypeScript.

## Why Robots.txt Matters

Before diving into the code, understand that robots.txt helps you:

-   **Protect sensitive areas** (admin panels, API endpoints)
-   **Improve crawl efficiency** (don’t waste Google’s time on irrelevant pages)
-   **Control server load** (prevent bots from overwhelming your site)
-   **Boost SEO performance** (guide search engines to your best content)

## The Next.js 15 Approach

Create a `robots.ts` file in your `app/` folder for dynamic, TypeScript-powered robot control:

## Basic Example

// app/robots.ts  
import { MetadataRoute } from 'next'  
  
export default function robots(): MetadataRoute.Robots {  
  return {  
    rules: \[  
      {  
        userAgent: '\*',  
        allow: '/',  
        disallow: \[  
          '/api/',  
          '/admin/',  
          '/\_next/',  
          '/private/',  
        \],  
      },  
      {  
        userAgent: 'Googlebot',  
        allow: '/',  
        disallow: \[  
          '/api/',  
          '/admin/',  
        \],  
      },  
    \],  
    sitemap: 'https://yourdomain.com/sitemap.xml',  
    host: 'https://yourdomain.com',  
  }  
}

## Professional Production Example

For real-world applications, you’ll want more sophisticated control:

// app/robots.ts - Production-Ready Version  
import { MetadataRoute } from 'next'  
  
export default function robots(): MetadataRoute.Robots {  
  const baseUrl = 'https://yourdomain.com'  
  const isProduction = process.env.NODE\_ENV === 'production'  
    
  // Block everything in development/staging  
  if (!isProduction) {  
    return {  
      rules: {  
        userAgent: '\*',  
        disallow: '/',  
      },  
      sitemap: \`${baseUrl}/sitemap.xml\`,  
    }  
  }  
  
// Production rules  
  return {  
    rules: \[  
      // General rules for all search engines  
      {  
        userAgent: '\*',  
        allow: '/',  
        disallow: \[  
          '/api/',           // Block API endpoints  
          '/admin/',         // Block admin areas  
          '/\_next/',         // Block Next.js internals  
          '/private/',       // Block private content  
          '/404',            // Block error pages  
          '/500',  
          '/login',          // Block authentication pages  
        \],  
        crawlDelay: 1,       // Be respectful to your server  
      },  
        
      // Give Google special treatment  
      {  
        userAgent: 'Googlebot',  
        allow: '/',  
        disallow: \[  
          '/api/',  
          '/admin/',  
          '/\_next/',  
          '/private/',  
        \],  
        // No crawl delay for Google  
      },  
        
      // Block resource-draining bots  
      {  
        userAgent: \[  
          'AhrefsBot',  
          'SemrushBot',  
          'MJ12bot',  
        \],  
        disallow: '/',  
      },  
    \],  
    sitemap: \`${baseUrl}/sitemap.xml\`,  
    host: baseUrl,  
  }  
}

## Generated Output

The TypeScript file above automatically generates this robots.txt:

User-agent: \*  
Allow: /  
Disallow: /api/  
Disallow: /admin/  
Disallow: /\_next/  
Disallow: /private/  
Disallow: /404  
Disallow: /500  
Disallow: /login  
Crawl-delay: 1  
  
User-agent: Googlebot  
Allow: /  
Disallow: /api/  
Disallow: /admin/  
Disallow: /\_next/  
Disallow: /private/  
  
User-agent: AhrefsBot  
Disallow: /  
  
User-agent: SemrushBot  
Disallow: /  
  
Sitemap: https://yourdomain.com/sitemap.xml  
Host: https://yourdomain.com

## Why app/robots.ts Beats public/robots.txt

You might see tutorials suggesting a static `public/robots.txt` file. Here's why the Next.js 15 approach is superior:

## Method 1: Static File (Old Way)

public/robots.txt

**Limitations:**

-   Plain text file that never changes
-   Same rules for development and production
-   No TypeScript safety or error checking
-   Manual updates required for different environments

## Method 2: Dynamic Generation (Next.js 15 Way)

app/robots.ts

**Advantages:**

-   ✅ **Environment-aware**: Different rules for dev/staging/production
-   ✅ **TypeScript safety**: Catch configuration errors at build time
-   ✅ **Dynamic content**: Rules can change based on conditions
-   ✅ **Automatic generation**: Next.js handles everything
-   ✅ **Version control friendly**: Changes are tracked in code
-   ✅ **Professional setup**: Industry best practices built-in

## Real-World Configuration Tips

## 1\. Protect Your Admin Areas

disallow: \[  
  '/admin/',  
  '/admin/\*',      // Block all admin subpages  
  '/dashboard/',  
  '/wp-admin/',    // If migrating from WordPress  
\]

## 2\. Block Sensitive API Endpoints

disallow: \[  
  '/api/',  
  '/api/\*',  
  '/auth/',        // Authentication endpoints  
  '/upload/',      // File upload endpoints  
\]

## 3\. Environment-Based Rules

// Block staging sites from being indexed  
if (process.env.VERCEL\_ENV !== 'production') {  
  return {  
    rules: { userAgent: '\*', disallow: '/' }  
  }  
}

## 4\. Crawl Delay for Server Protection

{  
  userAgent: '\*',  
  crawlDelay: 1,   // 1 second delay between requests  
}

## Common Mistakes to Avoid

1.  **Don’t block your sitemap**: Never add `/sitemap.xml` to disallow
2.  **Test your rules**: Use Google Search Console to verify
3.  **Don’t over-block**: Only block what you need to protect
4.  **Remember wildcards**: Use `/*` to block entire directories
5.  **Check case sensitivity**: `/Admin/` vs `/admin/` are different

## Testing Your Robots.txt

After deployment, test your robots.txt:

1.  Visit `[https://yourdomain.com/robots.txt](https://yourdomain.com/robots.txt)`
2.  Use Google Search Console’s robots.txt tester
3.  Verify blocked pages don’t appear in search results

## Next Steps

Once your robots.txt is configured:

1.  Submit your sitemap.xml to Google Search Console
2.  Monitor crawl stats and errors
3.  Adjust rules based on actual bot behavior
4.  Consider adding more specific bot rules as needed

This setup gives you professional-grade robot control that scales with your application and protects your resources while maximizing SEO benefits.

# Page-Level SEO Optimization

Each page needs its own SEO strategy. Here’s how to create optimized page layouts:

// app/about/layout.tsx  
import { Metadata } from "next";  
  
export const metadata: Metadata = {  
  title: "About Us - Expert Team with 20+ Years Experience",  
  description: "Meet our expert team. 20+ years of experience delivering exceptional results for clients across the region. Learn about our story and values.",  
  keywords: \[  
    "about company",  
    "expert team",  
    "company history",  
    "professional experience",  
  \],  
  openGraph: {  
    title: "About Our Expert Team",  
    description: "Meet the professionals behind our success story",  
    images: \[  
      {  
        url: "/team-photo.jpg",  
        width: 1200,  
        height: 630,  
        alt: "Our professional team photo"  
      }  
    \],  
  },  
  alternates: {  
    canonical: "https://yourdomain.com/about"  
  }  
};  
  
export default function AboutLayout({  
  children,  
}: {  
  children: React.ReactNode;  
}) {  
  return (  
    <>  
      {/\* About Page Structured Data \*/}  
      <script  
        type="application/ld+json"  
        dangerouslySetInnerHTML={{  
          \_\_html: JSON.stringify({  
            "@context": "https://schema.org",  
            "@type": "AboutPage",  
            "name": "About Us",  
            "description": "Learn about our company history and team",  
            "url": "https://yourdomain.com/about",  
            "mainEntity": {  
              "@type": "Organization",  
              "name": "Your Business Name",  
              "foundingDate": "2020",  
              "description": "Brief description of what makes you unique"  
            }  
          })  
        }}  
      />  
      {children}  
    </>  
  );  
}

# Creating Reusable SEO Utils (just an extra, not mandatory)

Instead of repeating metadata code, create utility functions:

// utils/seo-utils.ts  
interface SEOProps {  
  title: string;  
  description: string;  
  keywords?: string\[\];  
  canonical?: string;  
  images?: string\[\];  
  type?: 'website' | 'article';  
}  
  
export function generatePageMetadata({  
  title,  
  description,  
  keywords = \[\],  
  canonical,  
  images = \['/default-og-image.jpg'\],  
  type = 'website'  
}: SEOProps) {  
  const baseKeywords = \[  
    'your industry',  
    'your location',  
    'your services',  
  \];  
return {  
    title,  
    description,  
    keywords: \[...baseKeywords, ...keywords\],  
    openGraph: {  
      title,  
      description,  
      type,  
      images: images.map(img => ({  
        url: img,  
        width: 1200,  
        height: 630,  
        alt: title  
      })),  
      locale: 'en\_US',  
      siteName: 'Your Business Name'  
    },  
    twitter: {  
      card: 'summary\_large\_image' as const,  
      title,  
      description,  
      images: images\[0\]  
    },  
    alternates: canonical ? { canonical } : undefined  
  };  
}

// Usage in any page:  
export const metadata = generatePageMetadata({  
  title: 'Services - Professional Solutions',  
  description: 'Comprehensive services description...',  
  keywords: \['service keywords'\],  
  canonical: 'https://yourdomain.com/services'  
});

# Performance Optimization for SEO

Page speed is a ranking factor. Here’s how to optimize:

# Critical Resource Preloading

This is the way I usually preload images that are critical for my website to look good and fast. I mean by that, the hero images, for examples, those the user will see first as they access a page. We don´t want that ugly grayish placeholder while the image gets served, and so that’s a good fix…

// In your root layout <head>  
<link  
  rel="preload"  
  href="/hero-image.webp"  
  as\="image"  
  type\="image/webp"  
  fetchPriority="high"  
/>  
<link  
  rel="preload"  
  href="/critical-image-2.webp"  
  as\="image"  
  type\="image/webp"  
  fetchPriority="high"  
/>  
  
{/\* DNS prefetch for external resources \*/}  
<link rel="dns-prefetch" href="//fonts.googleapis.com" />  
<link rel="dns-prefetch" href="//www.google-analytics.com" />

# Font Optimization

const primaryFont = localFont({  
  variable: "--font-primary",  
  display: "swap", // Critical for CLS  
  src: \[  
    {  
      path: "../public/fonts/font-regular.woff2",  
      weight: "400",  
      style: "normal",  
    },  
  \],  
});

# Image Optimization Best Practices

Image Alt Tag Optimization  
Transform generic alt tags into SEO-powered descriptions:

// Before  
<Image src="/project1.jpg" alt="project" />  
  
// After    
<Image   
  src="/project1.jpg"   
  alt="Modern office interior design with natural lighting and contemporary furniture"   
/>

# Local SEO Optimization

For businesses serving specific locations:

# Geographic Meta Tags

export const metadata: Metadata = {  
  // ... other metadata  
  other: {  
    'geo.region': 'US-CA',  
    'geo.placename': 'San Francisco, California',  
    'geo.position': '37.7749;-122.4194', // lat;long  
    'ICBM': '37.7749, -122.4194',  
  },  
};

# Local Business Schema

{  
  "@context": "https://schema.org",  
  "@type": "LocalBusiness",  
  "name": "Your Business Name",  
  "image": "https://yourdomain.com/business-photo.jpg",  
  "telephone": "+1-555-123-4567",  
  "address": {  
    "@type": "PostalAddress",  
    "streetAddress": "123 Main Street",  
    "addressLocality": "Your City",  
    "addressRegion": "Your State",  
    "postalCode": "12345",  
    "addressCountry": "US"  
  },  
  "geo": {  
    "@type": "GeoCoordinates",  
    "latitude": 37.7749,  
    "longitude": -122.4194  
  },  
  "openingHoursSpecification": \[  
    {  
      "@type": "OpeningHoursSpecification",  
      "dayOfWeek": \[  
        "Monday",  
        "Tuesday",  
        "Wednesday",  
        "Thursday",  
        "Friday"  
      \],  
      "opens": "09:00",  
      "closes": "17:00"  
    }  
  \],  
  "aggregateRating": {  
    "@type": "AggregateRating",  
    "ratingValue": "4.8",  
    "reviewCount": "127"  
  }  
}

# Testing and Monitoring Your SEO

## Essential Tools

1.  **Google Search Console**: Monitor your search performance
2.  **Lighthouse**: Test performance and SEO scores
3.  **Google’s Rich Results Test**: Validate structured data
4.  **PageSpeed Insights**: Check Core Web Vitals

## Quick Testing Commands

\# Build and test your sitemaps  
npm run build  
npm start

\# Visit these URLs to test:  
\# [http://localhost:3000/sitemap.xml](http://localhost:3000/sitemap.xml)  
\# [http://localhost:3000/robots.txt](http://localhost:3000/robots.txt)

## SEO Checklist for Launch

-   \[✔\] Google Search Console setup
-   \[✔\] Google Analytics installed
-   \[✔\] All images have descriptive alt tags
-   \[✔\] Every page has unique title and description
-   \[✔\] Sitemap submitted to search engines
-   \[✔\] Site speed under 3 seconds
-   \[✔\] Mobile-friendly design
-   \[✔\] HTTPS enabled
-   \[✔\] Internal linking strategy implemented

# Advanced Techniques

If you really really want la crème de la crème…

## Dynamic Metadata for Content Sites

The basic metadata we’ve covered is great, but what if you have a blog, portfolio, or any content with dynamic pages? Static metadata won’t cut it.

Here’s where Next.js 15’s `generateMetadata` function becomes pure magic:

// For blog posts, portfolios, etc.  
export async function generateMetadata(  { params }: { params: { slug: string } }): Promise<Metadata\> {  
  const post = await getPost(params.slug);  
    
  return {  
    title: post.title,  
    description: post.excerpt,  
    openGraph: {  
      title: post.title,  
      description: post.excerpt,  
      images: \[post.featuredImage\],  
    },  
  };  
}

**What this does:** Instead of having the same boring metadata on every blog post, each page gets unique SEO data pulled from your actual content. So if you have a blog post titled “5 Interior Design Trends for 2024”, that becomes your page title, not some generic “Blog Post” title.

**Why it’s powerful:**

-   Google sees unique, relevant content for each page
-   Social media sharing gets the actual post image and description
-   Zero manual work — it’s all automatic based on your content

## Breadcrumb Navigation with Schema

Breadcrumbs are those little navigation trails like “Home > Services > Interior Design” that show users where they are. But with schema markup, they become SEO gold:

// components/Breadcrumbs.tsx  
interface BreadcrumbItem {  
  name: string;  
  href: string;  
}  
  
export default function Breadcrumbs({ items }: { items: BreadcrumbItem\[\] }) {  
  const schema = {  
    "@context": "https://schema.org",  
    "@type": "BreadcrumbList",  
    "itemListElement": items.map((item, index) => ({  
      "@type": "ListItem",  
      "position": index + 1,  
      "name": item.name,  
      "item": \`https://yourdomain.com${item.href}\`  
    }))  
  };  
  
return (  
    <>  
      <script  
        type="application/ld+json"  
        dangerouslySetInnerHTML={{ \_\_html: JSON.stringify(schema) }}  
      />  
      <nav aria-label="Breadcrumb">  
        <ol>  
          {items.map((item, index) => (  
            <li key={index}>  
              {index < items.length - 1 ? (  
                <a href={item.href}>{item.name}</a>  
              ) : (  
                <span>{item.name}</span>  
              )}  
              {index < items.length - 1 && <span> > </span>}  
            </li>  
          ))}  
        </ol>  
      </nav>  
    </>  
  );  
}

**What this does:** Creates breadcrumbs that Google can understand and potentially show in search results. You know those search results that show “YourSite > Category > Page”? That’s breadcrumb schema in action.

**How to use it:**

// In any page  
const breadcrumbs = \[  
  { name: 'Home', href: '/' },  
  { name: 'Services', href: '/services' },  
  { name: 'Interior Design', href: '/services/interior-design' }  
\];  
  
return <Breadcrumbs items={breadcrumbs} />;

These two techniques can seriously boost your SEO game by making your content more discoverable and user-friendly.

# Conclusion

SEO in Next.js 15 isn’t just about adding meta tags , it’s about creating a comprehensive strategy that covers technical optimization, content structure, and user experience.

The techniques in this guide have helped me achieve:

-   85%+ improvement in search rankings
-   300% increase in organic traffic
-   Perfect Lighthouse SEO scores
-   Rich search result appearances

Remember: SEO is a marathon, not a sprint. Implement these techniques gradually, monitor your results, and keep optimizing based on real data.

# Key Takeaways

1.  **Use the Metadata API properly** — It’s your foundation
2.  **Don’t forget sitemap.xml and robots.txt** — They’re essential
3.  **Structured data is your secret weapon** — It makes you stand out
4.  **Performance matters** — Fast sites rank better
5.  **Local SEO can be a game-changer** — Don’t ignore it



