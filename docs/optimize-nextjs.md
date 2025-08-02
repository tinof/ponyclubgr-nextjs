#### Easy Ways to Optimize Page Speed in Next.js

#### 1\. Optimize Images with Next.js <Image> Component

In our regular HTML, we have added any image like below snippet,

Copy Code

`1<img src="image.png" alt="Image" />`

We have to manually optimize below things,

-   Image is responisive based on the screen sizes
-   Optimize image with any third party toll or library
-   As the image is about to enter on viewport lazy load them.

Large images may slow down websites. Next.js provides an optimized <Image> component that,

-   Lazy loads images (loads them only when needed)
-   Automatically converts them to modern formats like WebP
-   Resizes images for different screen sizes

Use this instead of regular <img> tags:

Copy Code

`1import Image from "next/image"; 2 3<Image 4 src="/example.png" 5 width={400} 6 height={400} 7 alt="Example Image" 8 priority 9/>`

Use priority={true} for images above the fold (visible when the page first loads).

#### 2\. Use Static Site Generation (SSG) for Faster Loading

If your page doesn’t change frequently then pre-render it at the build time using SSG. This makes it load quickly without waiting for a server response.

Example of SSG in Next.js:

Copy Code

`1export async function getStaticProps() { 2 const res = await fetch("https://api.example.com/data"); 3 const data = await res.json(); 4 5 return { props: { data } }; 6}`

✔ It is best for blogs, landing pages and marketing webistes.

#### 3\. Enable Incremental Static Regeneration (ISR) for Updated Content

If your content changes frequently, but you still want the speed of SSG, use ISR. This updates static pages without rebuilding the entire website.

Lets check this by an xample of ISR,

Copy Code

`1export async function getStaticProps() { 2 const res = await fetch("https://api.example.com/data"); 3 const data = await res.json(); 4 5 return { props: { data }, revalidate: 60 }; // Updates every 60 sec 6}`

✔ It is perfect for news sites, blogs, and product pages.

#### 4\. Load JavaScript Only When Needed

Too much javascript may slow down a website. Next.js allows lazy loading, which means scripts load only when required.

**Lazy load large components:**

Copy Code

`1import dynamic from 'next/dynamic'; 2 3const HeavyComponent = dynamic(() => import('../components/HeavyComponent'), { ssr: false });`

This speeds up initial page load.

**Lazy load third-party scripts like Google Analytics:**

Copy Code

`1import Script from "next/script"; 2 3<Script 4 src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXX-X" 5 strategy="lazyOnload" 6/>`

✔ It reduces unnecessary network requests.

#### 5\. Reduce Unused CSS and JavaScript

For Tailwind users, use PurgeCSS to remove unused styles.

Copy Code

`1module.exports = { 2 purge: ['./pages/**/*.js', './components/**/*.js'], 3};`

**Analyze your JavaScript bundle with Webpack Bundle Analyzer:**

Copy Code

`1npm install --save-dev @next/bundle-analyzer`

Add below code-snippet to next.config.js,

Copy Code

`1const withBundleAnalyzer = require('@next/bundle-analyzer')({ 2 enabled: process.env.ANALYZE === 'true', 3}); 4 5module.exports = withBundleAnalyzer({});`

Then run,

Copy Code

`1ANALYZE=true next build`

#### 6\. Use a CDN (Content Delivery Network) for Faster Loading

A CDN stores your website files on multiple servers worldwide, so users can load them from the nearest location.

**Deploy on Vercel (best CDN for Next.js):**

Copy Code

`1vercel deploy`

✔ Global content distribution

✔ Automatic performance optimizations

#### 7\. Optimize Fonts for Faster Rendering

Fonts can slow down page load times, so use **Next.js Google Fonts Optimization** instead of manually importing fonts.

next/font will automatically optimize your fonts including custom fonts and remove external network requests for improved privacy and performance.

Lets get started by importaing the font you would like to use from next/font/google  
as a function. Nextjs recommended using [variable fonts](https://fonts.google.com/variablefonts) for the best performance and flexibility.

To use the fonts in all your pages, add it to \_app.js file under /pages,

Copy Code

`1import { Inter } from 'next/font/google' 2 3// If loading a variable font, you don't need to specify the font weight 4const inter = Inter({ subsets: ['latin'] }) 5 6export default function MyApp({ Component, pageProps }) { 7 return ( 8 <main className={inter.className}> 9 <Component {...pageProps} /> 10 </main> 11 ) 12}`

If you cant use a variable font, you will need to specify a weight,

Copy Code

`1import { Roboto } from 'next/font/google' 2 3const roboto = Roboto({ 4 weight: '400', 5 subsets: ['latin'], 6}) 7 8export default function MyApp({ Component, pageProps }) { 9 return ( 10 <main className={roboto.className}> 11 <Component {...pageProps} /> 12 </main> 13 ) 14}`

You can specify multiple weights and or styles by using an array,

Copy Code

`1const roboto = Roboto({ 2 weight: ['400', '700'], 3 style: ['normal', 'italic'], 4 subsets: ['latin'], 5 display: 'swap', 6})`

**Tip :** Its a good practise to use **(\_)** for font names with multiple words. Just like **Roboto Mono** will be importaed as **Roboto\_Mono**.

You can also use the font without a wrapper and classname by adding it inside the <head/> just like below at pages/\_app.js,

Copy Code

``1import { Inter } from 'next/font/google' 2 3const inter = Inter({ subsets: ['latin'] }) 4 5export default function MyApp({ Component, pageProps }) { 6 return ( 7 <> 8 <style jsx global>{` 9 html { 10 font-family: ${inter.style.fontFamily}; 11 } 12 `}</style> 13 <Component {...pageProps} /> 14 </> 15 ) 16}``

✔ Reduces render-blocking resources

✔ Improves Core Web Vitals

#### Conclusion

By following above steps, your Next.js website will load faster, rank better on google, and improve user experience.

✅ Optimize images with Next.js <Image> component

✅ Use Static Site Generation (SSG) for fast-loading pages

✅ Implement ISR to update content without full rebuilds

✅ Lazy load JavaScript and third-party scripts

✅ Minify CSS and remove unused JavaScript

✅ Deploy on Vercel for best performance

A fast website keeps users happy, improves SEO, and boosts conversions. Try out these optimizations today and watch your page speed score improve.

'''

# Optimizing Next.js 15 App Router with template.tsx and CustomProviders

[#nextjs](https://dev.to/t/nextjs) [#react](https://dev.to/t/react) [#typescript](https://dev.to/t/typescript) [#webdev](https://dev.to/t/webdev)

In modern web development, **Server-Side Rendering (SSR)** and **Search Engine Optimization (SEO)** are essential for creating fast, discoverable applications. Next.js has long been celebrated for its ability to handle both efficiently. With Next.js 15 and its new App Router, the framework now enables you to clearly separate **server components** from **client components**. One elegant solution to manage this separation while still supporting robust client-side interactivity is to use a dedicated `template.tsx` file that wraps a centralized `CustomProviders` component in a Suspense fallback. This approach makes it easy to integrate multiple providers—such as Redux, react-query, and various UI libraries—without compromising SSR or SEO.

# [](https://dev.to/anggakswr/optimizing-nextjs-15-app-router-with-templatetsx-and-customproviders-2e09#in-this-article-we-will-cover)In this article, we will cover:

-   **An overview of the Next.js 15 App Router** and the distinction between server and client components.
-   **How to create a centralized CustomProviders component** to encapsulate all client-side providers.
-   **Wrapping CustomProviders in a Suspense component** within `template.tsx` to manage loading states gracefully.
-   **Best practices for integrating client-side providers** without affecting SSR and SEO.

* * *

# [](https://dev.to/anggakswr/optimizing-nextjs-15-app-router-with-templatetsx-and-customproviders-2e09#nextjs-15-app-router-merging-server-and-client-components)Next.js 15 App Router: Merging Server and Client Components

Next.js 15 introduces a new modular approach using the `app/` directory, where components are by default treated as server components. This ensures that your pages are rendered on the server, providing fast load times and optimal SEO. However, not every part of your application can rely solely on SSR. Interactive features such as state management, data fetching (using libraries like `react-query`), and dynamic UI elements require client-side logic.

To enable client-side features, you mark specific components with the `"use client"` directive. This tells Next.js to treat those components as client components, enabling the use of browser-specific APIs and interactive functionality.

* * *

# [](https://dev.to/anggakswr/optimizing-nextjs-15-app-router-with-templatetsx-and-customproviders-2e09#centralizing-clientside-logic-with-customproviders)Centralizing Client-Side Logic with CustomProviders

Rather than scattering individual providers throughout your application, a more maintainable approach is to create a single component called `CustomProviders`. This component can encapsulate multiple providers (e.g., Redux for state management, `react-query` for data fetching, and any UI-specific context providers). This centralized approach makes your codebase cleaner and easier to maintain.

Here’s how you might define the `CustomProviders` component:  

    // components/CustomProviders.tsx
    'use client';
    
    import React from 'react';
    import { Provider as ReduxProvider } from 'react-redux';
    import { store } from '../store';
    import { QueryClient, QueryClientProvider } from 'react-query';
    // Import any additional providers, e.g., a theme provider from your UI library
    import { ThemeProvider } from 'your-ui-library';
    
    const queryClient = new QueryClient();
    
    interface CustomProvidersProps {
      children: React.ReactNode;
    }
    
    export default function CustomProviders({ children }: CustomProvidersProps) {
      return (
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class">
              {children}
            </ThemeProvider>
          </QueryClientProvider>
        </ReduxProvider>
      );
    }
    

Enter fullscreen mode Exit fullscreen mode

In this example:

-   **ReduxProvider**: Integrates Redux for global state management.
-   **QueryClientProvider**: Provides react-query’s QueryClient instance for managing asynchronous data.
-   **ThemeProvider**: Demonstrates how to include a UI-related provider (replace with your actual UI library provider as needed).

* * *

# [](https://dev.to/anggakswr/optimizing-nextjs-15-app-router-with-templatetsx-and-customproviders-2e09#wrapping-customproviders-with-suspense-in-templatetsx)Wrapping CustomProviders with Suspense in template.tsx

To gracefully handle loading states (for example, if any of the providers have asynchronous initialization logic), it is a good idea to wrap `CustomProviders` within a `Suspense` component. This can be done inside your `template.tsx` file:  

    // app/template.tsx
    import React, { Suspense } from 'react';
    import CustomProviders from '../components/CustomProviders';
    
    export default function Template({ children }: { children: React.ReactNode }) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <CustomProviders>
            {children}
          </CustomProviders>
        </Suspense>
      );
    }
    

Enter fullscreen mode Exit fullscreen mode

In this setup:

-   **"use client" directive**: Ensures that `template.tsx` and its children are treated as client components.
-   **`<Suspense>` component**: Wraps `CustomProviders`, providing a fallback UI (here, a simple "Loading..." div) during lazy loading or asynchronous initialization.
-   **Centralized client-side interactivity**: This structure centralizes all client-side interactivity within `CustomProviders`, ensuring that pages that don’t need these features can still be server-rendered efficiently.

* * *

# [](https://dev.to/anggakswr/optimizing-nextjs-15-app-router-with-templatetsx-and-customproviders-2e09#best-practices-when-using-customproviders-and-templatetsx)Best Practices When Using CustomProviders and template.tsx

-   **Isolate Client Providers**: Keep only the providers and UI components that require client-side behavior within `CustomProviders`. This ensures that the server-rendered parts of your application remain unaffected.
-   **Modularize Providers**: As your application grows, consider breaking down providers into smaller sub-components or modules within `CustomProviders` for easier maintenance.
-   **Monitor Performance**: As you integrate more client-side logic, keep an eye on bundle size and overall performance to maintain a smooth user experience.
-   **Handle Suspense Gracefully**: Choose appropriate fallback content for `Suspense` to provide clear feedback to users during asynchronous operations.

* * *

# [](https://dev.to/anggakswr/optimizing-nextjs-15-app-router-with-templatetsx-and-customproviders-2e09#conclusion)Conclusion

Using a centralized `CustomProviders` component inside `template.tsx` is an elegant and maintainable way to integrate multiple client-only providers—such as Redux, `react-query`, and UI libraries—into your Next.js 15 application. By wrapping `CustomProviders` in a `Suspense` component, you can manage loading states effectively while ensuring that SSR and SEO remain intact. This approach provides a clear separation of concerns, ensuring that interactive client-side features do not compromise the performance and search engine visibility of your application.

Happy coding, and may your Next.js projects be both interactive and SEO-friendly!

'''

## JavaScript Bundle Optimization

1.  **Implement code splitting** with dynamic imports:

// Instead of regular import  
import HeavyComponent from '../components/HeavyComponent';  
  
// Use dynamic import  
import dynamic from 'next/dynamic';  
const HeavyComponent = dynamic(() => import('../components/HeavyComponent'), {  
  loading: () => <p>Loading...</p>,  
  ssr: false // Set to false if the component doesn't need server-side rendering  
});

**2\. Use selective imports** instead of entire libraries:

// Instead of: import \_ from 'lodash';  
import map from 'lodash/map';

**3\. Analyze your bundle** with `@next/bundle-analyzer` to identify large dependencies.

Use tools like `@next/bundle-analyzer` to visualize your bundle size and identify opportunities for optimization:

// next.config.js  
const withBundleAnalyzer \= require('@next/bundle-analyzer')({  
  enabled: process.env.ANALYZE === 'true',  
});  
  
module.exports = withBundleAnalyzer({  
  // your Next.js config  
});

and then run

ANALYZE\=true npm run build

## Image Optimization

1.  **Use Next.js Image Component**

The built-in `next/image` component automatically optimizes images, serving them in modern formats like WebP when supported by the browser and resizing them appropriately:

import Image from 'next/image';  
  
function MyComponent() {  
  return (  
    <Image  
      src="/my-image.jpg"  
      alt="My optimized image"  
      width={500}  
      height={300}  
      placeholder="blur"  
      blurDataURL="data:image/jpeg;base64,..."  
      priority={false}  
    />  
  );  
}

The `priority` attribute should be set to `true` for above-the-fold images to improve Largest Contentful Paint (LCP) metrics.

**2\. Configure Image Optimization**

module.exports \= {  
  images: {  
    deviceSizes: \[640, 750, 828, 1080, 1200, 1920, 2048, 3840\],  
    imageSizes: \[16, 32, 48, 64, 96, 128, 256, 384\],  
    domains: \['example.com'\], // Allowed external domains  
    formats: \['image/webp'\],  
    minimumCacheTTL: 60,  
  },  
}

## Data Fetching Optimization

1.  **Implement Incremental Static Regeneration (ISR)** for fast loads with fresh content:

// pages/products/\[id\].js  
export async function getStaticProps({ params }) {  const product = await fetchProduct(params.id);    return {    props: { product },    revalidate: 60, // Regenerate page after 60 seconds  };  
}export async function getStaticPaths() {  const popularProducts = await fetchPopularProducts();    return {    paths: popularProducts.map(product => ({      params: { id: product.id.toString() }  
    })),    fallback: 'blocking' // Generate additional pages on-demand  };  
}

**2\. Use SWR for client-side data fetching** with smart caching.

SWR (Stale-While-Revalidate) provides a smart caching strategy for client-side data fetching:

import useSWR from 'swr';  
  
function Profile() {  
  const { data, error } = useSWR('/api/user', fetcher, {  
    revalidateOnFocus: false,  
    dedupingInterval: 60000,  
  });  
  
  if (error) return <div>Failed to load</div>;  
  if (!data) return <div>Loading...</div>;  
    
  return <div>Hello {data.name}!</div>;  
}

## Component Optimization

1.  **Prevent unnecessary re-renders** with `React.memo` for pure components.
2.  **Virtualize long lists** to render only visible items

<VirtualList  
  height\={500}  
  itemCount\={items.length}  
  itemSize\={50}  
  width\={300}  
\>  
  {({ index, style }) => <div style\={style}\>{items\[index\]}</div\>}  
</VirtualList\>

## State Management Optimization

1.  **Use Context Selectively**

React Context is powerful but can cause unnecessary re-renders. Split your context into smaller, more focused pieces

2\. **Implement State Normalization**

For complex state shapes, normalize your data to prevent deep nesting and improve update performance:

// Instead of nested state  
const initialState \= {  
  users: {  
    user1: {  
      id: 'user1',  
      name: 'John',  
      posts: \[  
        { id: 'post1', title: 'Hello', comments: \[...\] }  
      \]  
    }  
  }  
};  
  
// Use normalized state  
const normalizedState \= {  
  users: {  
    byId: {  
      'user1': { id: 'user1', name: 'John', postIds: \['post1'\] }  
    },  
    allIds: \['user1'\]  
  },  
  posts: {  
    byId: {  
      'post1': { id: 'post1', title: 'Hello', authorId: 'user1', commentIds: \['comment1'\] }  
    },  
    allIds: \['post1'\]  
  },  
  comments: {  
    byId: {  
      'comment1': { id: 'comment1', content: 'Great post!', postId: 'post1' }  
    },  
    allIds: \['comment1'\]  
  }  
};

## Font and CSS Optimization

1.  **PurgeCSS for Unused CSS Elimination**

// next.config.js  
const withPurgeCss \= require('next-purgecss');  
  
module.exports = withPurgeCss({  
  purgeCssPaths: \['pages/\*\*/\*', 'components/\*\*/\*'\],  
  // other Next.js config  
});

**2\. Implement CSS Modules** for component-scoped styles.

## Third-Party Libraries

1.  **Regularly audit dependencies** and replace heavy libraries with lighter alternatives.
2.  **Consider using Preact** in production for smaller React alternative.

## Server-Side Optimization

1.  **Implement caching** for API routes and database queries.

// app/api/data/route.js  
export const revalidate = 60; // Revalidate every 60 seconds  
  
export async function GET() {  
  const data = await fetchData();  
  return Response.json(data);  
}

**2\. Use Edge Runtime** for compute-heavy functions closer to users.

Deploy compute-heavy functions closer to your users:

// app/edge/route.js  
export const runtime = 'edge';  
  
export async function GET(request) {  
  const data = await processData(request);  
  return Response.json(data);  
}

## Deployment Optimization

1.  **Deploy to a CDN** like Vercel or Cloudflare for edge caching.
2.  **Enable HTTP/2 or HTTP/3** for more efficient connections.

## Monitoring Performance

1.  **Track Core Web Vitals** using Next.js’s built-in reporting.
2.  **Implement Real User Monitoring** to understand actual user experiences.

// pages/\_app.js  
import { Analytics } from '@vercel/analytics/react';  
  
function MyApp({ Component, pageProps }) {  
  return (  
    <>  
      <Component {...pageProps} />  
      <Analytics />  
    </>  
  );  
}  
  
export default MyApp;

## SEO Optimization

1.  **Optimize metadata** for each page using Next.js’s Head component or metadata API.
2.  **Focus on Core Web Vitals metrics** (LCP, FID, CLS) that affect search rankings.

-   **LCP (Largest Contentful Paint)**: Optimize by preloading critical resources, using PRPL pattern (Push, Render, Pre-cache, Lazy load), and optimizing server response time.
-   **FID (First Input Delay)**: Reduce by breaking up long tasks, minimizing JavaScript execution time, and optimizing event handlers.
-   **CLS (Cumulative Layout Shift)**: Prevent by specifying image dimensions, reserving space for ads and embeds, and avoiding inserting content above existing content.

## Security Optimization

1.  **Implement Content Security Policy** and other security headers

// next.config.js  
async headers() {  
  return \[  
    {  
      source: '/(.\*)',  
      headers: \[  
        { key: 'Content-Security-Policy', value: '...' },  
      \],  
    },  
  \];  
}



