import React from 'react';
import Image from 'next/image';
import { WeatherWidget } from './WeatherWidget';
import type { Dictionary } from '../lib/dictionaries';

interface HeaderProps {
  dictionary: Dictionary
}

export function Header({ dictionary }: HeaderProps) {
  return <header className="flex justify-between items-start px-2 pt-4 relative">
      <div className="flex flex-col">
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-soft border border-white/40 mb-1">
          <Image
            src="/images/logo.png"
            alt={dictionary.header.logoAlt}
            width={140}
            height={46}
            className="h-10 w-auto"
            priority
          />
        </div>
        <p className="text-sm text-[#333333] ml-1 opacity-70">{dictionary.header.location}</p>
      </div>

      {/* Weather Widget */}
      <div className="relative z-10">
        <WeatherWidget dictionary={dictionary} />
      </div>

      {/* Decorative element - moved behind weather widget */}
      <div className="absolute top-0 right-0 h-16 w-16 bg-[#F3F8EC] rounded-full -z-10 opacity-70 translate-x-1/4 -translate-y-1/4"></div>
    </header>;
}
