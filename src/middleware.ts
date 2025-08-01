import { type NextRequest, NextResponse } from 'next/server';

// Supported locales
const locales = ['en', 'el'];
const defaultLocale = 'en';

// Get locale from pathname
function getLocaleFromPathname(pathname: string): string | null {
  const segments = pathname.split('/');
  const firstSegment = segments[1];

  if (locales.includes(firstSegment)) {
    return firstSegment;
  }

  return null;
}

// Get preferred locale from Accept-Language header
function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');

  if (!acceptLanguage) {
    return defaultLocale;
  }

  // Simple language detection - check if Greek is preferred
  if (acceptLanguage.toLowerCase().includes('el')) {
    return 'el';
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale
  const currentLocale = getLocaleFromPathname(pathname);

  // Skip middleware for API routes, static files, and special Next.js paths
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/icons/') ||
    pathname.startsWith('/dictionaries/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // If no locale in pathname, redirect to preferred locale
  if (!currentLocale) {
    const preferredLocale = getPreferredLocale(request);
    const newUrl = new globalThis.URL(
      `/${preferredLocale}${pathname}`,
      request.url,
    );
    return NextResponse.redirect(newUrl);
  }

  // If locale is present and valid, continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public files (images, icons, etc.)
    '/((?!api|_next/static|_next/image|favicon.ico|images|icons|dictionaries).*)',
  ],
};
