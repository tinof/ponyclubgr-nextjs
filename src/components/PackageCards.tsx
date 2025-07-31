'use client'

import React, { useEffect } from 'react';
import { ImageSlider } from './ImageSlider';
import { Waves, Mountain, Users, Clock, Star, Shield } from 'lucide-react';

export function PackageCards() {

  // Debug: Check if Bokun script is loaded
  useEffect(() => {
    const checkBokunScript = () => {
      if (typeof window !== 'undefined' && (window as unknown as { BokunWidgets?: unknown }).BokunWidgets) {
        console.log('✅ Bokun script loaded successfully');
      } else {
        console.log('⏳ Bokun script not yet loaded, retrying...');
        setTimeout(checkBokunScript, 1000);
      }
    };
    checkBokunScript();
  }, []);
  return <div className="space-y-8 px-3">
      {/* Package 1 - Bokun Integration */}
      <div className="bg-white rounded-3xl shadow-premium overflow-hidden border border-white/40 relative">
        {/* Premium tag */}
        <div className="absolute top-4 left-0 bg-[#5a6f5a] text-white text-xs font-semibold py-1 px-4 rounded-r-full z-10 shadow-md">
          Family Favorite
        </div>
        <div className="relative h-56">
          <ImageSlider images={['https://lh3.googleusercontent.com/aida-public/AB6AXuAy3muCIwLH4QIsLcENlnaAFxf6WymQV6e7hg1mWJln8NSXX2Tq-ZIVhTru0CyCLLsFpoD007GKZZhwI-ECuigvHRaSUEgDLNdXZo-uvPJqzgkdidtj6SHZmzXbhTAAGwY2Fko47FiEr3wyzUJYzhsfQWgVM2T660pFmZ-_Rvr3I--Z7mlGqLuf3JGa50TPsfZb3671Av0SKdb65snYwBlOksS2Tjmk-fdl_UAm3R86gQ5b5kY7T9UV5tAh76LaNqmA89nDKzkZVdtg']} alt="People rafting down a river" />
        </div>
        <div className="p-5">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
              Package 1
            </p>
            <div className="flex items-center">
              <Star size={14} fill="#FFD700" stroke="#FFD700" />
              <Star size={14} fill="#FFD700" stroke="#FFD700" />
              <Star size={14} fill="#FFD700" stroke="#FFD700" />
              <Star size={14} fill="#FFD700" stroke="#FFD700" />
              <Star size={14} fill="#FFD700" stroke="#FFD700" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Rafting & Riding</h3>
          <div className="flex items-center mt-1 mb-2">
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              Bokun Integration
            </div>
          </div>
          <div className="flex items-center mt-1 mb-3">
            <Users size={16} className="text-[#5a6f5a]" />
            <span className="text-xs text-[#5a6f5a] font-medium ml-1">
              Perfect for families with children 8+
            </span>
          </div>
          <div className="mt-3 space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Waves className="text-[#5a6f5a] mr-2" size={20} />
              <span>Rafting: 30 minutes</span>
            </div>
            <div className="flex items-center">
              <Clock className="text-[#5a6f5a] mr-2" size={20} />
              <span>Riding: 10-15 minutes</span>
            </div>
            <div className="flex items-center">
              <Mountain className="text-[#5a6f5a] mr-2" size={20} />
              <span>Hiking canyon crossing</span>
            </div>
          </div>
          <div className="mt-3 p-3 bg-[#f0f3f0] rounded-xl flex items-center">
            <Shield size={18} className="text-[#5a6f5a] mr-2" />
            <p className="text-xs text-gray-700">
              All safety equipment provided. Professional guides for all ages.
            </p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-2xl font-bold text-gray-800">20 EUR</p>
              <p className="text-sm text-gray-500">per person</p>
            </div>
            <button
              className="bokunButton bg-[#5a6f5a] text-white font-bold py-3 px-6 rounded-xl text-base hover:bg-opacity-90 transition shadow-md min-w-[120px]"
              id="bokun_c652cb51_18f7_4f87_bb88_8f74b68be5f4"
              data-src="https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020598?partialView=1"
              data-testid="widget-book-button"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      {/* Package 2 - Bokun Integration */}
      <div className="bg-white rounded-3xl shadow-premium overflow-hidden border border-white/40">
        <div className="relative h-48">
          <ImageSlider images={['https://lh3.googleusercontent.com/aida-public/AB6AXuCuomzRuuor-R2JxViFScBWf1WsVK8_1J9_t-Rvy6Yz0YZYqfTvW0_uwe78mAHgo0mX5SkYi0D0NyZemZn_QpF5SIHZOayW3JLmFdapRuMHEhC0CFCCQhlPFkOOWauXPc6NS-lp0SqlRPHleEqV7KbPsOQ1e3F4tVVn-ekxCJNR_Jp4tN1VoBHwE7lskokGh708ZIQllzSp9KDJdfksZDdsbhh9rLtyXLRFaYXsxE-2HXLBizLYnjvCrpdLH6veAF8aqCePJn119T3l']} alt="Kayaking on a calm lake" smallDots={true} />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Package 2
            </p>
            <div className="flex items-center">
              <Star size={12} fill="#FFD700" stroke="#FFD700" />
              <Star size={12} fill="#FFD700" stroke="#FFD700" />
              <Star size={12} fill="#FFD700" stroke="#FFD700" />
              <Star size={12} fill="#FFD700" stroke="#FFD700" />
              <Star size={12} fill="none" stroke="#FFD700" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            Kayaking, Riding & Trekking
          </h3>
          <div className="flex items-center mt-1 mb-2">
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              Bokun Integration
            </div>
          </div>
          <div className="flex items-center mt-1 mb-2">
            <Users size={14} className="text-[#5a6f5a]" />
            <span className="text-xs text-[#5a6f5a] font-medium ml-1">
              Great for families with children 10+
            </span>
          </div>
          <div className="mt-2 space-y-1 text-xs text-gray-600">
            <div className="flex items-center">
              <Waves className="text-[#5a6f5a] mr-2" size={16} />
              <span>Kayak: 30 minutes</span>
            </div>
            <div className="flex items-center">
              <Clock className="text-[#5a6f5a] mr-2" size={16} />
              <span>Riding: 10-15 minutes</span>
            </div>
            <div className="flex items-center">
              <Mountain className="text-[#5a6f5a] mr-2" size={16} />
              <span>Hiking canyon crossing</span>
            </div>
          </div>
          <div className="mt-2 p-2 bg-[#f0f3f0] rounded-lg flex items-center">
            <Shield size={14} className="text-[#5a6f5a] mr-2" />
            <p className="text-xs text-gray-700">
              Safety equipment & guides included
            </p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p className="text-xl font-bold text-gray-800">25 EUR</p>
              <p className="text-xs text-gray-500">per person</p>
            </div>
            <button
              className="bokunButton bg-[#5a6f5a] text-white font-semibold py-2 px-4 rounded-xl text-sm hover:bg-opacity-90 transition shadow-md min-w-[100px]"
              id="bokun_19c157f7_4229_42ed_a5a0_fc53d0e76b6d"
              data-src="https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience/1020569?partialView=1"
              data-testid="widget-book-button"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>;
}