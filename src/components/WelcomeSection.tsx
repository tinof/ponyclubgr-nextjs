import Image from 'next/image';
import type { Dictionary, Locale } from '../lib/dictionaries';
import { MuxVideoBackground } from './MuxVideoBackground';
import { WelcomeSectionClient } from './WelcomeSectionClient';

interface WelcomeSectionProps {
  dictionary: Dictionary;
  locale: Locale;
}

export function WelcomeSection({ dictionary, locale }: WelcomeSectionProps) {
  return (
    <div className="relative -mx-4 sm:-mx-6">
      {/* Full-width Hero Video Section */}
      <MuxVideoBackground
        playbackId="tj7rc9I9w5wOyuk0079M3dMMW8stwyzSRBkBt01Bpnyt8"
        fallbackImage="/images/hero-image.webp"
        fallbackImageAlt="Acheron River Adventure"
        className="min-h-[55vh] max-h-[80vh] aspect-[9/16] sm:aspect-[16/10] sm:min-h-[60vh] md:aspect-auto md:h-[32rem] rounded-t-[2rem]"
        priority={true}
      >
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
        <WelcomeSectionClient dictionary={dictionary} locale={locale} />

        {/* Main Hero Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">
          {/* Main Hero Text */}
          <div className="text-white max-w-md">
            <p className="text-lg leading-relaxed drop-shadow-sm font-medium">
              {dictionary.welcome.description}
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
      </MuxVideoBackground>

      {/* Content Section with improved spacing */}
      <div className="px-4 sm:px-6 -mt-4 relative z-10">
        <div className="bg-white rounded-[2rem] shadow-card border border-white/60 overflow-hidden">
          <div className="p-6">
            {/* Welcome Card */}
            <div className="bg-sage-primary rounded-2xl p-5 text-white relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full" />

              <h3 className="text-lg font-bold mb-3">
                {dictionary.welcome.title}
              </h3>

              <div className="space-y-3 text-sm leading-relaxed text-white/90">
                <p>{dictionary.welcome.intro}</p>
                <p>{dictionary.welcome.history}</p>
                <p className="font-medium text-white">
                  {dictionary.welcome.callToAction}
                </p>
              </div>

              {/* Feature highlights */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/20 p-2 rounded-full mb-2">
                    <Image
                      src="/images/figma-assets/shield-icon.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="filter brightness-0 invert"
                    />
                  </div>
                  <span className="text-xs text-white/90">
                    {dictionary.welcome.features.safety}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/20 p-2 rounded-full mb-2">
                    <Image
                      src="/images/figma-assets/users-icon-1.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="filter brightness-0 invert"
                    />
                  </div>
                  <span className="text-xs text-white/90">
                    {dictionary.welcome.features.family}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/20 p-2 rounded-full mb-2">
                    <Image
                      src="/images/figma-assets/heart-icon.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="filter brightness-0 invert"
                    />
                  </div>
                  <span className="text-xs text-white/90">
                    {dictionary.welcome.features.memorable}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
