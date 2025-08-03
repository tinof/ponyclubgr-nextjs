'use client';

import { Backpack, Calendar, Camera, Clock, MapPin, Users } from 'lucide-react';
import type { Dictionary } from '../lib/dictionaries';

interface TrekkingClientPageProps {
  dictionary: Dictionary;
}

export function TrekkingClientPage({
  dictionary: _dictionary,
}: TrekkingClientPageProps) {
  return (
    <div className="px-4 sm:px-6 py-6">
      <div className="space-y-8">
        {/* Main Introduction Section */}
        <div className="bg-white rounded-2xl shadow-card p-6 border border-white/60">
          <h2 className="text-2xl font-bold text-sage-primary mb-4">
            Trekking the Legendary Acheron
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The mythical springs of the Acheron River, near the village of
              Glyki, invite exploration year-round. Deeply rooted in antiquity
              as one of the rivers leading to the underworld, Acheron today
              offers unparalleled natural beauty instead of passage to Hades!
              Access is easy: you can park your vehicle right next to the
              entrance of the springs area in Glyki. The best part? Parking and
              entry are completely free, inviting you to discover its wonders.
            </p>
            <p className="font-medium text-sage-primary">
              Ready for exploration? Check out some of the best trekking routes
              to experience the magic of Acheron:
            </p>
          </div>
        </div>

        {/* Trekking Routes Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-sage-primary px-2">
            Trekking Routes
          </h3>

          {/* Route 1: Glyki Springs Walk */}
          <div className="bg-white rounded-2xl shadow-card p-6 border border-white/60">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-800">
                1. Glyki Springs Walk
              </h4>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Easy
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={16} className="mr-2 text-sage-primary" />
                <span>15 min – 1 hour</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={16} className="mr-2 text-sage-primary" />
                <span>Year-round</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Perfect for families or those wanting a gentle introduction to
              Acheron's beauty. The path follows the river under the cool shade
              of plane trees. Marvel at the impressive springs where
              crystal-clear, yet cool water bubbles directly from the earth. An
              ideal spot for relaxation and – why not? – dipping your feet in
              the legendary waters!
            </p>
          </div>

          {/* Route 2: Acheron Gorge Trail */}
          <div className="bg-white rounded-2xl shadow-card p-6 border border-white/60">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-800">
                2. Acheron Gorge Trail
              </h4>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                Moderate
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={16} className="mr-2 text-sage-primary" />
                <span>2-3 hours</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={16} className="mr-2 text-sage-primary" />
                <span>Spring to Autumn</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              A more adventurous route that takes you deeper into the Acheron
              gorge. Walk along the river, cross small bridges, and discover
              hidden pools with crystal-clear waters. The trail offers stunning
              gorge views and photo opportunities that will remain
              unforgettable.
            </p>
          </div>

          {/* Route 3: Ancient Paths Exploration */}
          <div className="bg-white rounded-2xl shadow-card p-6 border border-white/60">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-800">
                3. Ancient Paths Exploration
              </h4>
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                Challenging
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={16} className="mr-2 text-sage-primary" />
                <span>4-5 hours</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={16} className="mr-2 text-sage-primary" />
                <span>Spring and Autumn</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              For more experienced hikers, this trail follows the ancient paths
              used by ancient Greeks. You'll pass ruins of ancient temples,
              traverse dense forests, and reach isolated peaks with panoramic
              views of the region. A truly mystical experience combining
              history, nature, and adventure.
            </p>
          </div>
        </div>

        {/* Details & Requirements Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-sage-primary px-2">
            Details &amp; Requirements
          </h3>

          {/* What to Expect */}
          <div className="bg-white rounded-2xl shadow-card p-6 border border-white/60">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <MapPin size={20} className="mr-2 text-sage-primary" />
              What to Expect
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-sage-50 p-2 rounded-full flex-shrink-0 mt-0.5">
                  <Users size={16} className="text-sage-primary" />
                </div>
                <div>
                  <span className="font-medium text-gray-800">
                    Guided Treks:
                  </span>
                  <span className="text-gray-700 ml-1">
                    Experienced local guides who know every trail and story
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-sage-50 p-2 rounded-full flex-shrink-0 mt-0.5">
                  <MapPin size={16} className="text-sage-primary" />
                </div>
                <div>
                  <span className="font-medium text-gray-800">
                    Safety Equipment:
                  </span>
                  <span className="text-gray-700 ml-1">
                    All necessary safety equipment provided
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-sage-50 p-2 rounded-full flex-shrink-0 mt-0.5">
                  <Users size={16} className="text-sage-primary" />
                </div>
                <div>
                  <span className="font-medium text-gray-800">
                    Small Groups:
                  </span>
                  <span className="text-gray-700 ml-1">
                    Maximum 8 people per group for personal experience
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-sage-50 p-2 rounded-full flex-shrink-0 mt-0.5">
                  <Camera size={16} className="text-sage-primary" />
                </div>
                <div>
                  <span className="font-medium text-gray-800">
                    Photography:
                  </span>
                  <span className="text-gray-700 ml-1">
                    Professional photos of your experience
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* What to Bring */}
          <div className="bg-white rounded-2xl shadow-card p-6 border border-white/60">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Backpack size={20} className="mr-2 text-sage-primary" />
              What to Bring
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-sage-primary rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">Comfortable hiking shoes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-sage-primary rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">Hat and sunscreen</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-sage-primary rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">Water and light snacks</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-sage-primary rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">Camera</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
