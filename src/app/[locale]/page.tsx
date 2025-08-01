import { notFound } from 'next/navigation';
import {
  getDictionary,
  isValidLocale,
  type Locale,
} from '../../lib/dictionaries';
import { LocalizedClientPage } from './client';

// Generate static params for supported locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'el' }];
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale and redirect to 404 if invalid
  if (!isValidLocale(locale as Locale)) {
    notFound();
  }

  // Get dictionary for server-side rendering
  const dictionary = await getDictionary(locale as Locale);

  return (
    <LocalizedClientPage locale={locale as Locale} dictionary={dictionary} />
  );
}
