import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function RootPage() {
  // Get the Accept-Language header to detect user's preferred language
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') || ''

  // Simple language detection - check if Greek is preferred
  const preferredLocale = acceptLanguage.toLowerCase().includes('el') ? 'el' : 'en'

  // Redirect to the appropriate locale
  redirect(`/${preferredLocale}`)
}
