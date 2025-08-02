'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import type { Dictionary } from '../lib/dictionaries';
import { ImageSlider } from './ImageSlider';

interface PackageCardsProps {
  dictionary: Dictionary;
}

export function PackageCards({ dictionary }: PackageCardsProps) {
  // Debug: Check if Bokun script is loaded
  useEffect(() => {
    const checkBokunScript = () => {
      if (
        typeof window !== 'undefined' &&
        (window as unknown as { BokunWidgets?: unknown }).BokunWidgets
      ) {
        console.log('✅ Bokun script loaded successfully');
      } else {
        console.log('⏳ Bokun script not yet loaded, retrying...');
        setTimeout(checkBokunScript, 1000);
      }
    };
    checkBokunScript();
  }, []);
  return (
    <div className="space-y-6 px-4">
      {/* Package 1 - Premium Card */}
      <div className="bg-white rounded-3xl shadow-card border border-white/60 overflow-hidden relative">
        {/* Premium tag */}
        <div className="absolute top-4 left-0 bg-sage-primary text-white text-xs font-semibold py-2 px-4 rounded-r-full z-10 shadow-md">
          {dictionary.packages.raftingRiding.tag}
        </div>

        {/* Image section with dots indicator */}
        <div className="relative">
          <div className="relative h-56">
            <ImageSlider
              images={[
                '/images/packages/Package1/rafting.jpeg',
                '/images/packages/Package1/horse_girl.jpg',
                '/images/packages/Package1/river_girl.jpg',
              ]}
              alt="Rafting and horse riding activities"
            />
          </div>

          {/* Dots indicator overlay */}
          <div className="absolute bottom-4 right-4 flex gap-1">
            <div className="w-2 h-2 bg-white rounded-full" />
            <div className="w-2 h-2 bg-white/50 rounded-full" />
            <div className="w-2 h-2 bg-white/50 rounded-full" />
          </div>
        </div>

        <div className="p-6">
          {/* Header with package info and rating */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-1">
                Package 1
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Image
                    key={star}
                    src="/images/figma-assets/star-rating-1.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="text-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Title and family-friendly badge */}
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {dictionary.packages.raftingRiding.title}
          </h3>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Image
                src="/images/figma-assets/users-icon-1.svg"
                alt=""
                width={16}
                height={16}
                className="text-sage-600"
              />
              <span className="text-sm text-sage-600 font-medium">
                {dictionary.packages.raftingRiding.ageRequirement}
              </span>
            </div>
          </div>

          {/* Activity details */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Image
                src="/images/figma-assets/clock-icon-1.svg"
                alt=""
                width={16}
                height={16}
              />
              <span>
                {dictionary.packages.raftingRiding.activities.rafting}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Image
                src="/images/figma-assets/horse-icon-1.svg"
                alt=""
                width={16}
                height={16}
              />
              <span>{dictionary.packages.raftingRiding.activities.riding}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Image
                src="/images/figma-assets/hiking-icon.svg"
                alt=""
                width={16}
                height={16}
              />
              <span>{dictionary.packages.raftingRiding.activities.hiking}</span>
            </div>
          </div>

          {/* Safety note */}
          <div className="p-3 bg-sage-50 rounded-xl flex items-center gap-2 mb-4">
            <Image
              src="/images/figma-assets/safety-icon.svg"
              alt=""
              width={16}
              height={16}
              className="text-sage-600"
            />
            <p className="text-xs text-gray-700">
              {dictionary.packages.raftingRiding.safetyNote}
            </p>
          </div>

          {/* Price and booking */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {dictionary.packages.raftingRiding.price}
              </p>
              <p className="text-sm text-gray-500">
                {dictionary.common.perPerson}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="bokunButton bg-sage-primary text-white font-bold py-3 px-6 rounded-xl text-base hover:bg-sage-700 transition shadow-md min-w-[120px] h-12"
                id="bokun_c652cb51_18f7_4f87_bb88_8f74b68be5f4"
                data-src="https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020598?partialView=1"
                data-testid="widget-book-button"
              >
                {dictionary.common.bookNow}
              </button>
              <Image
                src="/images/bokun-logo@0.5x.png"
                alt="Bokun booking system"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Package 2 - Standard Card */}
      <div className="bg-white rounded-3xl shadow-card border border-white/60 overflow-hidden">
        <div className="relative">
          <div className="relative h-56">
            <ImageSlider
              images={[
                '/images/packages/Package2/kayak.jpg',
                '/images/packages/Package2/grouponriver.jpg',
                '/images/packages/Package2/riding.jpg',
                '/images/packages/Package2/riding2.jpg',
              ]}
              alt="Kayaking, group activities and horse riding"
              smallDots={true}
            />
          </div>

          {/* Dots indicator overlay */}
          <div className="absolute bottom-4 right-4 flex gap-1">
            <div className="w-2 h-2 bg-white rounded-full" />
            <div className="w-2 h-2 bg-white/50 rounded-full" />
            <div className="w-2 h-2 bg-white/50 rounded-full" />
            <div className="w-2 h-2 bg-white/50 rounded-full" />
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-1">
                Package 2
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <Image
                    key={star}
                    src="/images/figma-assets/star-rating-1.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="text-yellow-400"
                  />
                ))}
                <Image
                  src="/images/figma-assets/star-rating-1.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="text-gray-300"
                />
              </div>
            </div>
          </div>
          {/* Title and family-friendly badge */}
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {dictionary.packages.kayakingRidingTrekking.title}
          </h3>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Image
                src="/images/figma-assets/users-icon-1.svg"
                alt=""
                width={16}
                height={16}
                className="text-sage-600"
              />
              <span className="text-sm text-sage-600 font-medium">
                {dictionary.packages.kayakingRidingTrekking.ageRequirement}
              </span>
            </div>
          </div>

          {/* Activity details */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Image
                src="/images/figma-assets/clock-icon-1.svg"
                alt=""
                width={16}
                height={16}
              />
              <span>
                {dictionary.packages.kayakingRidingTrekking.activities.kayak}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Image
                src="/images/figma-assets/horse-icon-1.svg"
                alt=""
                width={16}
                height={16}
              />
              <span>
                {dictionary.packages.kayakingRidingTrekking.activities.riding}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Image
                src="/images/figma-assets/hiking-icon.svg"
                alt=""
                width={16}
                height={16}
              />
              <span>
                {dictionary.packages.kayakingRidingTrekking.activities.trekking}
              </span>
            </div>
          </div>

          {/* Safety note */}
          <div className="p-3 bg-sage-50 rounded-xl flex items-center gap-2 mb-4">
            <Image
              src="/images/figma-assets/safety-icon.svg"
              alt=""
              width={16}
              height={16}
              className="text-sage-600"
            />
            <p className="text-xs text-gray-700">
              {dictionary.packages.kayakingRidingTrekking.safetyNote}
            </p>
          </div>

          {/* Price and booking */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {dictionary.packages.kayakingRidingTrekking.price}
              </p>
              <p className="text-sm text-gray-500">
                {dictionary.common.perPerson}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="bokunButton bg-sage-primary text-white font-bold py-3 px-6 rounded-xl text-base hover:bg-sage-700 transition shadow-md min-w-[120px] h-12"
                id="bokun_19c157f7_4229_42ed_a5a0_fc53d0e76b6d"
                data-src="https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020569?partialView=1"
                data-testid="widget-book-button"
              >
                {dictionary.common.bookNow}
              </button>
              <Image
                src="/images/bokun-logo@0.5x.png"
                alt="Bokun booking system"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
