'use client';

import dynamic from 'next/dynamic';
import type { Dictionary } from '../lib/dictionaries';

// Lazy load the BokunProductPage component with skeleton fallback
const BokunProductPage = dynamic(
  () =>
    import('./BokunProductPage').then((mod) => ({
      default: mod.BokunProductPage,
    })),
  {
    ssr: false, // Client-side only for performance
    loading: () => (
      <div className="min-h-[800px] w-full bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="mb-6">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="mb-6">
          <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
          <div className="flex gap-2">
            <div className="h-16 w-16 bg-gray-200 rounded"></div>
            <div className="h-16 w-16 bg-gray-200 rounded"></div>
            <div className="h-16 w-16 bg-gray-200 rounded"></div>
            <div className="h-16 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="space-y-4 mb-6">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-12 bg-sage-200 rounded w-full"></div>
        </div>
      </div>
    ),
  },
);

interface RaftingClientPageProps {
  dictionary: Dictionary;
}

export function RaftingClientPage({ dictionary }: RaftingClientPageProps) {
  return (
    <div className="px-4 sm:px-6 py-6">
      <BokunProductPage
        experienceId="1020611"
        dictionary={dictionary}
        className="w-full"
      />
    </div>
  );
}
