'use client';

import { Backpack, Calendar, Camera, Clock, MapPin, Users } from 'lucide-react';
import type { Dictionary } from '../lib/dictionaries';

interface TrekkingClientPageProps {
  dictionary: Dictionary;
}

export function TrekkingClientPage({ dictionary }: TrekkingClientPageProps) {
  const t = dictionary.trekking;

  return (
    <div className="px-4 sm:px-6 py-6">
      <div className="space-y-8">
        {/* Main Introduction Section */}
        <div className="bg-white rounded-2xl shadow-card p-6 border border-white/60">
          <h2 className="text-2xl font-bold text-sage-primary mb-4">
            {t.pageTitle}
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>{t.intro}</p>
            <p className="font-medium text-sage-primary">{t.readyText}</p>
          </div>
        </div>

        {/* Trekking Routes Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-sage-primary px-2">
            {t.routesTitle}
          </h3>

          {/* Route 1 */}
          <div className="bg-white rounded-2xl shadow-card p-6 border border-white/60">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-800">
                {t.routes.route1.title}
              </h4>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {t.difficulty.easy}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={16} className="mr-2 text-sage-primary" />
                <span>{t.routes.route1.duration}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={16} className="mr-2 text-sage-primary" />
                <span>{t.yearRound}</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t.routes.route1.description}
            </p>
          </div>

          {/* Route 2 */}
          <div className="bg-white rounded-2xl shadow-card p-6 border border-white/60">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-800">
                {t.routes.route2.title}
              </h4>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                {t.difficulty.moderate}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={16} className="mr-2 text-sage-primary" />
                <span>{t.routes.route2.duration}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={16} className="mr-2 text-sage-primary" />
                <span>{t.springToAutumn}</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t.routes.route2.description}
            </p>
          </div>

          {/* Route 3 */}
          <div className="bg-white rounded-2xl shadow-card p-6 border border-white/60">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-800">
                {t.routes.route3.title}
              </h4>
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                {t.difficulty.challenging}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={16} className="mr-2 text-sage-primary" />
                <span>{t.routes.route3.duration}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={16} className="mr-2 text-sage-primary" />
                <span>{t.springAutumn}</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t.routes.route3.description}
            </p>
          </div>
        </div>

        {/* Details & Requirements Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-sage-primary px-2">
            {t.detailsTitle}
          </h3>

          {/* What to Expect */}
          <div className="bg-white rounded-2xl shadow-card p-6 border border-white/60">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <MapPin size={20} className="mr-2 text-sage-primary" />
              {t.whatToExpect.title}
            </h4>
            <div className="space-y-3">
              {(
                [
                  {
                    icon: <Users size={16} className="text-sage-primary" />,
                    key: 'guidedTreks',
                  },
                  {
                    icon: <MapPin size={16} className="text-sage-primary" />,
                    key: 'safetyEquipment',
                  },
                  {
                    icon: <Users size={16} className="text-sage-primary" />,
                    key: 'smallGroups',
                  },
                  {
                    icon: <Camera size={16} className="text-sage-primary" />,
                    key: 'photography',
                  },
                ] as const
              ).map(({ icon, key }) => (
                <div key={key} className="flex items-start space-x-3">
                  <div className="bg-sage-50 p-2 rounded-full flex-shrink-0 mt-0.5">
                    {icon}
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">
                      {t.whatToExpect[key].title}
                    </span>
                    <span className="text-gray-700 ml-1">
                      {t.whatToExpect[key].description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What to Bring */}
          <div className="bg-white rounded-2xl shadow-card p-6 border border-white/60">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Backpack size={20} className="mr-2 text-sage-primary" />
              {t.whatToBring.title}
            </h4>
            <div className="space-y-3">
              {t.whatToBring.items.map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-sage-primary rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
