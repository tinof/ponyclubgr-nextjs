import React from 'react';
import { Heart, Shield, Users } from 'lucide-react';
export function WelcomeSection() {
  return <>
      <div className="px-3 relative">
        {/* Decorative element */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#5a6f5a]/20 rounded-tl-lg"></div>
        <p className="text-gray-600 text-base leading-relaxed">
          Explore the mythical Acheron River with our unique horse riding and
          rafting tours. An unforgettable adventure awaits in the heart of
          Greece.
        </p>
      </div>
      <div className="px-3 space-y-4">
        <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-premium border border-white/40 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#f0f3f0]/50 rounded-full"></div>
          <h2 className="text-xl font-bold text-[#5a6f5a] mb-3 relative z-10">
            Welcome to Pony Club
          </h2>
          <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
            <p>
              Welcome to Pony Club at the Acheron River, where adventure meets
              nature.
            </p>
            <p>
              Since 1998, we've offered unforgettable horse riding and rafting
              experiences for families and adventurers. Explore our farm with 8
              horses and our rafting base, guided by experts who prioritize
              safety and respect for the environment.
            </p>
            <p className="font-medium text-gray-800">
              Join us for rafting, riding, kayaking, and trekking at Acheron
              River in Glyki, Greece.
            </p>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center text-center p-2">
              <div className="bg-[#f0f3f0] p-2 rounded-full">
                <Shield size={16} className="text-[#5a6f5a]" />
              </div>
              <span className="text-xs mt-1 text-gray-700">Safety First</span>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <div className="bg-[#f0f3f0] p-2 rounded-full">
                <Users size={16} className="text-[#5a6f5a]" />
              </div>
              <span className="text-xs mt-1 text-gray-700">
                Family Friendly
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <div className="bg-[#f0f3f0] p-2 rounded-full">
                <Heart size={16} className="text-[#5a6f5a]" />
              </div>
              <span className="text-xs mt-1 text-gray-700">Memorable</span>
            </div>
          </div>
        </div>
      </div>
    </>;
}