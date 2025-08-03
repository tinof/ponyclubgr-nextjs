'use client';

import dynamic from 'next/dynamic';
import type { Dictionary, Locale } from '../../lib/dictionaries';

// Lazily load components that are below the fold or non-critical
const PackageCards = dynamic(
  () =>
    import('../../components/PackageCards').then((mod) => ({
      default: mod.PackageCards,
    })),
  {
    loading: () => (
      <div className="px-3">
        <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-premium border border-white/40 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    ),
    ssr: false, // Disable SSR for this component since it's client-interactive
  },
);

const WhyChooseUs = dynamic(
  () =>
    import('../../components/WhyChooseUs').then((mod) => ({
      default: mod.WhyChooseUs,
    })),
  {
    loading: () => (
      <div className="px-4 mt-8">
        <div className="bg-white rounded-2xl shadow-card p-5 border border-white/60 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-4">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    ),
    ssr: false,
  },
);

const GuestReviews = dynamic(
  () =>
    import('../../components/GuestReviews').then((mod) => ({
      default: mod.GuestReviews,
    })),
  {
    loading: () => (
      <div className="px-4 mt-8 mb-20">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-card p-4 border border-white/60 animate-pulse">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    ),
    ssr: false,
  },
);

const BottomNav = dynamic(
  () =>
    import('../../components/BottomNav').then((mod) => ({
      default: mod.BottomNav,
    })),
  {
    ssr: false,
  },
);

interface Reviewer {
  displayName: string;
  profilePhotoUrl: string;
  isAnonymous: boolean;
}

interface Review {
  id?: string;
  reviewer?: Reviewer;
  comment: string;
  starRating: number;
  createTime: string | null;
}

interface ReviewsData {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

interface LocalizedClientPageProps {
  locale: Locale;
  dictionary: Dictionary;
  reviewsData: ReviewsData;
}

export function LocalizedClientPage({
  dictionary,
  reviewsData,
  locale,
}: LocalizedClientPageProps) {
  return (
    <>
      <PackageCards dictionary={dictionary} />
      <WhyChooseUs dictionary={dictionary} />
      <GuestReviews dictionary={dictionary} reviewsData={reviewsData} />
      <BottomNav dictionary={dictionary} locale={locale} />
    </>
  );
}
