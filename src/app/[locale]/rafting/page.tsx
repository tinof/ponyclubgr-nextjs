import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  getDictionary,
  isValidLocale,
  type Locale,
} from '../../../lib/dictionaries';
import { WelcomeSectionClient } from '../../../components/WelcomeSectionClient';
import { BottomNav } from '../../../components/BottomNav';

// Generate static params for supported locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'el' }];
}

// Generate metadata for the rafting page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!isValidLocale(locale as Locale)) {
    return {
      title: 'Page Not Found',
    };
  }

  const dictionary = await getDictionary(locale as Locale);
  
  return {
    title: `Rafting Adventures - ${dictionary.header.logoAlt}`,
    description: 'Experience thrilling rafting adventures on the mythical Acheron River. Safe, family-friendly rafting tours with professional guides.',
    openGraph: {
      title: `Rafting Adventures - ${dictionary.header.logoAlt}`,
      description: 'Experience thrilling rafting adventures on the mythical Acheron River. Safe, family-friendly rafting tours with professional guides.',
      images: ['/images/rafting-og.jpg'],
    },
  };
}

export default async function RaftingPage({
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
    <div className="bg-gradient-sage min-h-screen flex justify-center items-start p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div
        className="absolute top-0 right-0 w-80 h-80 bg-sage-200/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-sage-300/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"
        aria-hidden="true"
      />

      {/* Main container with updated styling */}
      <div className="w-full max-w-sm mx-auto relative z-10">
        {/* Background decorative circles */}
        <div
          className="absolute top-8 right-8 w-16 h-16 bg-sage-200/40 rounded-full blur-sm"
          aria-hidden="true"
        />
        <div
          className="absolute top-32 left-4 w-12 h-12 bg-sage-300/30 rounded-full blur-sm"
          aria-hidden="true"
        />

        {/* Main content card with hero extending to edges */}
        <div className="bg-gradient-card backdrop-blur-card rounded-[2rem] shadow-elevated border border-white/50 overflow-hidden relative">
          <main id="main-content" className="pb-20">
            {/* Header Section Only */}
            <div className="relative -mx-4 sm:-mx-6">
              {/* Full-width Hero Image Section */}
              <div className="relative h-96 sm:h-[28rem] md:h-[32rem] overflow-hidden rounded-t-[2rem]">
                <Image
                  src="/images/FamilyRafting_Green_Nature_River.jpg"
                  alt="Rafting Adventure on Acheron River"
                  fill={true}
                  className="object-cover"
                  priority={true}
                />
                {/* Enhanced gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

                {/* Logo Section */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-soft border border-white/40">
                    <Image
                      src="/images/logo.png"
                      alt={dictionary.header.logoAlt}
                      width={140}
                      height={46}
                      className="h-10 w-auto"
                      priority={true}
                    />
                  </div>
                </div>

                {/* Client-side interactive components */}
                <WelcomeSectionClient dictionary={dictionary} locale={locale as Locale} />

                {/* Main Hero Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">
                  {/* Main Hero Text */}
                  <div className="text-white max-w-md">
                    <h1 className="text-2xl font-bold mb-4 drop-shadow-sm">
                      Rafting Adventures
                    </h1>
                    <p className="text-lg leading-relaxed drop-shadow-sm font-medium">
                      Experience the thrill of rafting on the mythical Acheron River. Safe, guided adventures for the whole family.
                    </p>
                  </div>
                </div>

                {/* Curved Bottom Transition */}
                <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
                  <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                    role="img"
                    aria-label="Decorative curved transition"
                  >
                    <path
                      d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z"
                      fill="rgb(245, 247, 245)"
                      className="drop-shadow-sm"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Bottom Navigation */}
        <BottomNav dictionary={dictionary} locale={locale as Locale} />
      </div>
    </div>
  );
}
