import { ChevronDown } from 'lucide-react';
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
    <div className="relative">
      {/* Full-bleed Hero Video — edge to edge at all sizes */}
      <MuxVideoBackground
        playbackId="tj7rc9I9w5wOyuk0079M3dMMW8stwyzSRBkBt01Bpnyt8"
        fallbackImage="/images/hero-image.webp"
        fallbackImageAlt="Acheron River Adventure"
        className="min-h-[55vh] max-h-[80vh] aspect-[9/16] sm:aspect-[16/10] md:aspect-auto md:h-[32rem] lg:h-[40rem] xl:h-[44rem]"
        priority={true}
      >
        {/* Layered gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-sage-900/70 via-sage-900/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-sage-900/20 via-transparent to-transparent" />

        {/* Floating decorative circles */}
        <div
          aria-hidden="true"
          className="absolute top-[15%] right-[8%] w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-white/5 border border-white/10 animate-float pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-[35%] left-[5%] w-32 h-32 lg:w-44 lg:h-44 rounded-full bg-white/5 border border-white/10 animate-float-delayed pointer-events-none"
        />

        {/* Client-side interactive components — hidden on desktop */}
        <div className="lg:hidden">
          <WelcomeSectionClient dictionary={dictionary} locale={locale} />
        </div>

        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">
          <div className="text-white max-w-md lg:max-w-2xl flex flex-col items-center gap-4">
            {/* Est. badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-4 py-1.5">
              <span className="text-white/90 text-xs font-semibold tracking-widest uppercase">
                Est. 1998
              </span>
            </div>

            {/* Location caption */}
            <div className="flex items-center gap-2">
              <span className="block w-8 h-px bg-white/50" aria-hidden="true" />
              <p className="text-white/70 text-xs font-semibold tracking-[0.2em] uppercase">
                {dictionary.header.location}
              </p>
              <span className="block w-8 h-px bg-white/50" aria-hidden="true" />
            </div>

            {/* Main description */}
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-medium [text-shadow:0_2px_12px_rgba(0,0,0,0.4)]">
              {dictionary.welcome.description}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
          <ChevronDown
            size={28}
            className="text-white animate-scroll-hint"
            aria-label="Scroll down"
          />
        </div>

        {/* Curved Bottom Transition — taller for more drama */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full"
            role="img"
            aria-label="Decorative curved transition"
          >
            <path
              d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z"
              fill="rgb(247, 250, 248)"
            />
          </svg>
        </div>
      </MuxVideoBackground>

      {/* Welcome card — constrained width, deeper overlap, glassmorphic */}
      <div className="px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto">
        <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-elevated border border-white/50 overflow-hidden">
          <div className="p-6 lg:p-8">
            <div className="bg-gradient-to-br from-sage-primary via-sage-600 to-sage-700 rounded-2xl p-5 lg:p-6 text-white relative overflow-hidden">
              {/* Decorative circles inside card */}
              <div
                aria-hidden="true"
                className="absolute top-3 right-4 w-8 h-8 bg-white/20 rounded-full"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-4 left-3 w-16 h-16 bg-white/10 rounded-full"
              />

              <h3 className="text-lg lg:text-xl font-bold mb-3">
                {dictionary.welcome.title}
              </h3>

              <div className="space-y-3 text-sm lg:text-base leading-relaxed text-white/90 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
                <p>{dictionary.welcome.intro}</p>
                <p>{dictionary.welcome.history}</p>
                <p className="font-medium text-white lg:col-span-2">
                  {dictionary.welcome.callToAction}
                </p>
              </div>

              {/* Feature highlights */}
              <div className="mt-5 grid grid-cols-3 gap-3 lg:gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/20 ring-2 ring-white/10 p-2.5 rounded-full mb-2">
                    <Image
                      src="/images/figma-assets/shield-icon.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="filter brightness-0 invert"
                    />
                  </div>
                  <span className="text-xs lg:text-sm text-white/90">
                    {dictionary.welcome.features.safety}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/20 ring-2 ring-white/10 p-2.5 rounded-full mb-2">
                    <Image
                      src="/images/figma-assets/users-icon-1.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="filter brightness-0 invert"
                    />
                  </div>
                  <span className="text-xs lg:text-sm text-white/90">
                    {dictionary.welcome.features.family}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/20 ring-2 ring-white/10 p-2.5 rounded-full mb-2">
                    <Image
                      src="/images/figma-assets/heart-icon.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="filter brightness-0 invert"
                    />
                  </div>
                  <span className="text-xs lg:text-sm text-white/90">
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
