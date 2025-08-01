# Internationalization

Next.js enables you to configure the routing and rendering of content to support multiple languages. Making your site adaptive to different locales includes translated content (localization) and internationalized routes.

## [Terminology](https://nextjs.org/docs/app/guides/internationalization#terminology)

-   **Locale:** An identifier for a set of language and formatting preferences. This usually includes the preferred language of the user and possibly their geographic region.
    -   `en-US`: English as spoken in the United States
    -   `nl-NL`: Dutch as spoken in the Netherlands
    -   `nl`: Dutch, no specific region

## [Routing Overview](https://nextjs.org/docs/app/guides/internationalization#routing-overview)

It’s recommended to use the user’s language preferences in the browser to select which locale to use. Changing your preferred language will modify the incoming `Accept-Language` header to your application.

For example, using the following libraries, you can look at an incoming `Request` to determine which locale to select, based on the `Headers`, locales you plan to support, and the default locale.

middleware.js

    import { match } from '@formatjs/intl-localematcher'
    import Negotiator from 'negotiator'
     
    let headers = { 'accept-language': 'en-US,en;q=0.5' }
    let languages = new Negotiator({ headers }).languages()
    let locales = ['en-US', 'nl-NL', 'nl']
    let defaultLocale = 'en-US'
     
    match(languages, locales, defaultLocale) // -> 'en-US'

Routing can be internationalized by either the sub-path (`/fr/products`) or domain (`my-site.fr/products`). With this information, you can now redirect the user based on the locale inside [Middleware](https://nextjs.org/docs/app/api-reference/file-conventions/middleware).

middleware.js

    import { NextResponse } from "next/server";
     
    let locales = ['en-US', 'nl-NL', 'nl']
     
    // Get the preferred locale, similar to the above or using a library
    function getLocale(request) { ... }
     
    export function middleware(request) {
      // Check if there is any supported locale in the pathname
      const { pathname } = request.nextUrl
      const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
      )
     
      if (pathnameHasLocale) return
     
      // Redirect if there is no locale
      const locale = getLocale(request)
      request.nextUrl.pathname = `/${locale}${pathname}`
      // e.g. incoming request is /products
      // The new URL is now /en-US/products
      return NextResponse.redirect(request.nextUrl)
    }
     
    export const config = {
      matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/'
      ],
    }

Finally, ensure all special files inside `app/` are nested under `app/[lang]`. This enables the Next.js router to dynamically handle different locales in the route, and forward the `lang` parameter to every layout and page. For example:

app/\[lang\]/page.tsx

TypeScript

JavaScriptTypeScript

    // You now have access to the current locale
    // e.g. /en-US/products -> `lang` is "en-US"
    export default async function Page({
      params,
    }: {
      params: Promise<{ lang: string }>
    }) {
      const { lang } = await params
      return ...
    }

The root layout can also be nested in the new folder (e.g. `app/[lang]/layout.js`).

## [Localization](https://nextjs.org/docs/app/guides/internationalization#localization)

Changing displayed content based on the user’s preferred locale, or localization, is not something specific to Next.js. The patterns described below would work the same with any web application.

Let’s assume we want to support both English and Dutch content inside our application. We might maintain two different “dictionaries”, which are objects that give us a mapping from some key to a localized string. For example:

dictionaries/en.json

    {
      "products": {
        "cart": "Add to Cart"
      }
    }

dictionaries/nl.json

    {
      "products": {
        "cart": "Toevoegen aan Winkelwagen"
      }
    }

We can then create a `getDictionary` function to load the translations for the requested locale:

app/\[lang\]/dictionaries.ts

TypeScript

JavaScriptTypeScript

    import 'server-only'
     
    const dictionaries = {
      en: () => import('./dictionaries/en.json').then((module) => module.default),
      nl: () => import('./dictionaries/nl.json').then((module) => module.default),
    }
     
    export const getDictionary = async (locale: 'en' | 'nl') =>
      dictionaries[locale]()

Given the currently selected language, we can fetch the dictionary inside of a layout or page.

app/\[lang\]/page.tsx

TypeScript

JavaScriptTypeScript

    import { getDictionary } from './dictionaries'
     
    export default async function Page({
      params,
    }: {
      params: Promise<{ lang: 'en' | 'nl' }>
    }) {
      const { lang } = await params
      const dict = await getDictionary(lang) // en
      return <button>{dict.products.cart}</button> // Add to Cart
    }

Because all layouts and pages in the `app/` directory default to [Server Components](https://nextjs.org/docs/app/getting-started/server-and-client-components), we do not need to worry about the size of the translation files affecting our client-side JavaScript bundle size. This code will **only run on the server**, and only the resulting HTML will be sent to the browser.

## [Static Rendering](https://nextjs.org/docs/app/guides/internationalization#static-rendering)

To generate static routes for a given set of locales, we can use `generateStaticParams` with any page or layout. This can be global, for example, in the root layout:

app/\[lang\]/layout.tsx

TypeScript

JavaScriptTypeScript

    export async function generateStaticParams() {
      return [{ lang: 'en-US' }, { lang: 'de' }]
    }
     
    export default async function RootLayout({
      children,
      params,
    }: Readonly<{
      children: React.ReactNode
      params: Promise<{ lang: 'en-US' | 'de' }>
    }>) {
      return (
        <html lang={(await params).lang}>
          <body>{children}</body>
        </html>
      )
    }

'''

Practical example:

# How to Build a Multi-Language Site with i18n in Next.js (2025 Edition)

## Learn how to build a multi-language site with i18n in Next.js using next-i18next. This complete 2025 guide covers setup, translations, SEO…

[![Utsav Desai](https://miro.medium.com/v2/resize:fill:88:88/1*JBgEH7qnwXh3z8DmqM_L1Q.jpeg)

](https://medium.com/@utsavdesai26 "Utsav Desai is a technology enthusiast with an interest in DevOps, App Development, and Web Development.")

[Utsav Desai](https://medium.com/@utsavdesai26 "Utsav Desai is a technology enthusiast with an interest in DevOps, App Development, and Web Development.") [Follow](https://medium.com/@utsavdesai26 "Utsav Desai is a technology enthusiast with an interest in DevOps, App Development, and Web Development.")

a11y-light · June 9, 2025 (Updated: June 9, 2025) · Free: No

#### Learn how to build a multi-language site with i18n in Next.js using `next-i18next`. This complete 2025 guide covers setup, translations, SEO tips, and production-ready best practices.

> _Not a Medium member? No worries — get free access click this_ _**[Friend Link](https://utsavdesai26.medium.com/14ea326a5e67?sk=019b7ad549f714642b3e2b37ee516ddc)**__._

In 2025, localization isn't just a nice-to-have — it's essential. Whether you're launching a SaaS product, an e-commerce store, or a global content platform, delivering your site in multiple languages is a key to growth. As a seasoned Next.js developer, I've built several internationalized apps using Next.js' built-in i18n features, and in this blog, I'll share exactly how to do it — step by step, the right way.

### Why Use i18n in Next.js?

Next.js offers built-in support for internationalized routing and translation integration. By leveraging `next.config.js` and libraries like `next-i18next` or `react-i18next`, you can serve multiple locales with SEO-optimized routes and server-rendered translations.

### Step 1: Enable i18n in `next.config.js`

Start by defining supported locales and the default language.

Copy`// next.config.js module.exports = {   i18n: {     locales: ['en', 'fr', 'de'],     defaultLocale: 'en',   }, };`

This config allows Next.js to handle locale-based routing like `/fr/about`, `/de/contact`, etc.

### Step 2: Install Translation Library

Use `next-i18next` for a production-ready translation setup:

Copy`npm install next-i18next react-i18next i18next`

Create a `next-i18next.config.js` file:

Copy`// next-i18next.config.js module.exports = {   i18n: {     defaultLocale: 'en',     locales: ['en', 'fr', 'de'],   }, };`

Then, update `next.config.js`:

Copy`const { i18n } = require('./next-i18next.config'); module.exports = {   i18n, };`

### Step 3: Create Translation Files

Create folders for each language under `public/locales`:

Copy`/public   /locales     /en       common.json     /fr       common.json     /de       common.json`

Example `common.json`:

Copy`{   "greeting": "Hello World!",   "about": "About Us" }`

### Step 4: Use Translations in Components

Wrap your app with `appWithTranslation` in `_app.js`:

Copy`import { appWithTranslation } from 'next-i18next'; import '../styles/globals.css'; function MyApp({ Component, pageProps }) {   return <Component {...pageProps} />; } export default appWithTranslation(MyApp);`

Use the `useTranslation` hook in pages or components:

Copy`import { useTranslation } from 'next-i18next'; const Home = () => {   const { t } = useTranslation('common');   return <h1>{t('greeting')}</h1>; };`

### Step 5: Dynamic Language Switcher

Create a component to switch languages:

Copy`import { useRouter } from 'next/router'; const LanguageSwitcher = () => {   const router = useRouter();   const changeLanguage = (locale) => {     router.push(router.pathname, router.asPath, { locale });   };   return (     <div>       <button onClick={() => changeLanguage('en')}>EN</button>       <button onClick={() => changeLanguage('fr')}>FR</button>       <button onClick={() => changeLanguage('de')}>DE</button>     </div>   ); };`

### Bonus: SEO for Multi-Language Pages

-   Each locale has its own path (e.g., `/fr/home`) — perfect for Google indexing.
-   Use `next/head` to set `lang`, Open Graph tags, and canonical URLs.

Copy`import Head from 'next/head'; <Head>   <html lang={locale} />   <link rel="alternate" hrefLang="en" href="https://example.com/en" />   <link rel="alternate" hrefLang="fr" href="https://example.com/fr" /> </Head>`

### My Experience Building i18n in Production

I once worked on a fintech dashboard that needed support for English, French, and Arabic. Using `next-i18next`, we handled RTL languages, user-preferred locales, and SEO—all without switching frameworks or building separate apps. The result? 30% traffic increase from international organic search.

**Pro Tips:**

-   Store user language preferences in cookies.
-   Use lazy loading for large translation files.
-   Always test locale-based routing on production URLs.

### Final Thoughts

Building a multi-language site with Next.js in 2025 is easier than ever, thanks to its integrated i18n support and strong ecosystem. By following this guide and applying the steps above, you'll build a global-ready application that's scalable, SEO-friendly, and fast.

If you're serious about international reach — invest in localization. It's not just about translation — it's about performance, usability, and user trust.

