import { Calendar, CheckCircle, Shield } from 'lucide-react';
import type { Dictionary } from '../lib/dictionaries';

interface WhyChooseUsProps {
  dictionary: Dictionary;
}

export function WhyChooseUs({ dictionary: _dictionary }: WhyChooseUsProps) {
  return (
    <div className="px-4 mt-8">
      <div className="bg-white rounded-2xl shadow-card p-5 border border-white/60">
        <h3 className="text-xl font-bold text-sage-600 mb-4 relative">
          Why Choose Pony Club?
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-sage-600/30 rounded-full"></span>
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-sage-50 p-2 rounded-full flex-shrink-0">
              <Shield size={18} className="text-sage-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800 text-sm">
                Licensed & Insured Since 1998
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                Perfect safety record with thousands of satisfied guests
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-sage-50 p-2 rounded-full flex-shrink-0">
              <CheckCircle size={18} className="text-sage-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800 text-sm">
                Expert Local Guides
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                Knowledgeable guides who know every corner of Acheron River
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-sage-50 p-2 rounded-full flex-shrink-0">
              <Calendar size={18} className="text-sage-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800 text-sm">
                Flexible Scheduling
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                Tours running daily from 9 AM to 6 PM to fit your itinerary
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
