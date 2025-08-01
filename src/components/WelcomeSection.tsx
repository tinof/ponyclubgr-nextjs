import React from 'react';
import { Heart, Shield, Users } from 'lucide-react';
import type { Dictionary } from '../lib/dictionaries';

interface WelcomeSectionProps {
  dictionary: Dictionary
}

export function WelcomeSection({ dictionary }: WelcomeSectionProps) {
  return <>
      <div className="px-3 relative">
        {/* Decorative element */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#5a6f5a]/20 rounded-tl-lg"></div>
        <p className="text-gray-600 text-base leading-relaxed">
          {dictionary.welcome.description}
        </p>
      </div>
      <div className="px-3 space-y-4">
        <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-premium border border-white/40 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#f0f3f0]/50 rounded-full"></div>
          <h2 className="text-xl font-bold text-[#5a6f5a] mb-3 relative z-10">
            {dictionary.welcome.title}
          </h2>
          <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
            <p>
              {dictionary.welcome.intro}
            </p>
            <p>
              {dictionary.welcome.history}
            </p>
            <p className="font-medium text-gray-800">
              {dictionary.welcome.callToAction}
            </p>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center text-center p-2">
              <div className="bg-[#f0f3f0] p-2 rounded-full">
                <Shield size={16} className="text-[#5a6f5a]" />
              </div>
              <span className="text-xs mt-1 text-gray-700">{dictionary.welcome.features.safety}</span>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <div className="bg-[#f0f3f0] p-2 rounded-full">
                <Users size={16} className="text-[#5a6f5a]" />
              </div>
              <span className="text-xs mt-1 text-gray-700">
                {dictionary.welcome.features.family}
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <div className="bg-[#f0f3f0] p-2 rounded-full">
                <Heart size={16} className="text-[#5a6f5a]" />
              </div>
              <span className="text-xs mt-1 text-gray-700">{dictionary.welcome.features.memorable}</span>
            </div>
          </div>
        </div>
      </div>
    </>;
}