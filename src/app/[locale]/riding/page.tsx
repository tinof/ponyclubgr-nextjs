import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BottomNav } from '../../../components/BottomNav';
import { RidingClientPage } from '../../../components/RidingClientPage';
import { WelcomeSectionClient } from '../../../components/WelcomeSectionClient';
import {
  getDictionary,
  isValidLocale,
  type Locale,
} from '../../../lib/dictionaries';

// Generate static params for supported locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'el' }];
}

// Generate metadata for the riding page
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
    title: `Horse Riding Adventures - ${dictionary.header.logoAlt}`,
    description:
      'Discover the beauty of Acheron River on horseback. Family-friendly horse riding tours with experienced guides and gentle horses.',
    openGraph: {
      title: `Horse Riding Adventures - ${dictionary.header.logoAlt}`,
      description:
        'Discover the beauty of Acheron River on horseback. Family-friendly horse riding tours with experienced guides and gentle horses.',
      images: ['/images/riding-og.jpg'],
    },
  };
}

export default async function RidingPage({
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
    <div className="bg-gradient-sage min-h-screen relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-80 h-80 md:w-[40rem] md:h-[40rem] bg-sage-200/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 md:w-[48rem] md:h-[48rem] bg-sage-300/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <main id="main-content" className="pb-20 lg:pb-8">
          <div className="relative h-96 sm:h-[28rem] lg:h-[36rem] xl:h-[40rem] overflow-hidden">
            <Image
              src="/images/HorsebackRiders_Aqua_Natural_RiverScene.jpg"
              alt="Horse Riding Adventure along Acheron River"
              fill={true}
              className="object-cover"
              priority={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

            <div className="absolute top-4 left-4 z-20 lg:hidden">
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

            <div className="lg:hidden">
              <WelcomeSectionClient
                dictionary={dictionary}
                locale={locale as Locale}
              />
            </div>

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">
              <div className="text-white max-w-md lg:max-w-2xl">
                <h1 className="text-2xl lg:text-4xl font-bold mb-4 drop-shadow-sm">
                  Horse Riding Adventures
                </h1>
                <p className="text-lg lg:text-xl leading-relaxed drop-shadow-sm font-medium">
                  Explore the scenic beauty of Acheron River on horseback.
                  Gentle horses and experienced guides ensure a memorable
                  experience for all ages.
                </p>
              </div>
            </div>

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

          <div className="max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto">
            <RidingClientPage dictionary={dictionary} />
          </div>
        </main>
      </div>

      <div className="lg:hidden">
        <BottomNav dictionary={dictionary} locale={locale as Locale} />
      </div>
    </div>
  );
}
