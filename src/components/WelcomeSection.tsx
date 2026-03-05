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
        className="w-full h-[70vh] sm:h-[60vh] md:h-[32rem] lg:h-[40rem] xl:h-[44rem]"
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
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 z-10 w-full font-sans">
          <div className="text-white w-full max-w-[90%] sm:max-w-xl lg:max-w-4xl flex flex-col items-center gap-5 sm:gap-6 bg-black/15 backdrop-blur-md border border-white/20 p-6 sm:p-10 lg:p-12 rounded-[2.5rem] shadow-2xl">
            {/* Est. badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 shadow-sm">
              <span className="text-white text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-widest uppercase drop-shadow-sm">
                Est. 1998
              </span>
            </div>

            {/* Location caption */}
            <div className="flex items-center gap-3 sm:gap-4 w-full justify-center">
              <span
                className="block flex-1 sm:flex-none sm:w-16 h-px bg-white/60"
                aria-hidden="true"
              />
              <p className="text-white text-[10px] sm:text-sm lg:text-base font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase shrink-0 drop-shadow-sm px-2">
                {dictionary.header.location}
              </p>
              <span
                className="block flex-1 sm:flex-none sm:w-16 h-px bg-white/60"
                aria-hidden="true"
              />
            </div>

            {/* Main description */}
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-[2.5rem] leading-[1.6] md:leading-relaxed lg:leading-[1.4] font-semibold text-white mt-2 max-w-full drop-shadow-md">
              {dictionary.welcome.description}
            </h1>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-24 sm:bottom-32 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
          <ChevronDown
            size={36}
            className="text-white/80 animate-scroll-hint"
            aria-label="Scroll down"
          />
        </div>

        {/* Curved Bottom Transition — taller for more drama */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-36 overflow-hidden pointer-events-none z-0">
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="w-full h-full text-sage-50/95"
            style={{ transform: 'translateY(1px)' }}
            role="img"
            aria-label="Decorative curved transition"
          >
            <path
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,170.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </MuxVideoBackground>

      {/* Welcome Section - Wide modern overlapping card */}
      <div className="px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto -mt-20 sm:-mt-28 lg:-mt-36 pb-24 font-sans">
        <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_20px_50px_-15px_rgba(42,57,42,0.1)] border border-white overflow-hidden group">
          <div className="flex flex-col lg:flex-row">
            {/* Left Content / Text */}
            <div className="p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-center flex-1">
              <div className="inline-flex items-center gap-4 mb-8">
                <span className="w-12 h-[2px] bg-sage-primary"></span>
                <span className="text-sage-primary font-bold tracking-[0.2em] uppercase text-sm">
                  Our Story
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8">
                {dictionary.welcome.title}
              </h2>

              <div className="space-y-6 sm:space-y-8 text-gray-600">
                <p className="text-xl sm:text-2xl font-medium text-sage-800 leading-relaxed font-serif">
                  "{dictionary.welcome.intro}"
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                  {dictionary.welcome.history}
                </p>
                <div className="pt-6 sm:pt-8 mt-2">
                  <p className="font-semibold text-white bg-sage-primary inline-block px-6 py-3 rounded-full text-sm sm:text-base cursor-pointer hover:bg-sage-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    {dictionary.welcome.callToAction}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content / Features Grid */}
            <div className="bg-gradient-to-br from-sage-50 to-sage-100/50 p-8 sm:p-12 lg:p-16 xl:p-20 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-white/80 w-full lg:w-[45%] xl:w-[40%] shrink-0">
              <div className="w-full max-w-sm flex flex-col gap-4 sm:gap-6">
                {/* Feature 1 */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-white/60 flex items-center gap-5 hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 bg-sage-primary text-white rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-inner">
                    <Image
                      src="/images/figma-assets/shield-icon.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="filter brightness-0 invert"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg sm:text-xl">
                      {dictionary.welcome.features.safety}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 font-medium">
                      Professional standard
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-white/60 flex items-center gap-5 hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 bg-sage-primary text-white rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-inner">
                    <Image
                      src="/images/figma-assets/users-icon-1.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="filter brightness-0 invert"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg sm:text-xl">
                      {dictionary.welcome.features.family}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 font-medium">
                      For all ages
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-white/60 flex items-center gap-5 hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 bg-sage-primary text-white rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-inner">
                    <Image
                      src="/images/figma-assets/heart-icon.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="filter brightness-0 invert"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg sm:text-xl">
                      {dictionary.welcome.features.memorable}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 font-medium">
                      Unique experiences
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
