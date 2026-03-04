import { Calendar, CheckCircle, Shield } from 'lucide-react';
import type { Dictionary } from '../lib/dictionaries';

interface WhyChooseUsProps {
  dictionary: Dictionary;
}

export function WhyChooseUs({ dictionary }: WhyChooseUsProps) {
  return (
    <div className="px-4 md:px-6 mt-8">
      <div className="bg-white rounded-2xl shadow-card p-5 border border-white/60">
        <h3 className="text-xl font-bold text-sage-primary mb-4 relative">
          {dictionary.whyChooseUs.title}
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-sage-primary/30 rounded-full"></span>
        </h3>
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
          <div className="flex items-start space-x-3 md:flex-col md:space-x-0 md:space-y-3">
            <div className="bg-sage-50 p-2 rounded-full flex-shrink-0 md:self-start">
              <Shield size={18} className="text-sage-primary" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800 text-sm">
                {dictionary.whyChooseUs.licensed.title}
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                {dictionary.whyChooseUs.licensed.description}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 md:flex-col md:space-x-0 md:space-y-3">
            <div className="bg-sage-50 p-2 rounded-full flex-shrink-0 md:self-start">
              <CheckCircle size={18} className="text-sage-primary" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800 text-sm">
                {dictionary.whyChooseUs.guides.title}
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                {dictionary.whyChooseUs.guides.description}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 md:flex-col md:space-x-0 md:space-y-3">
            <div className="bg-sage-50 p-2 rounded-full flex-shrink-0 md:self-start">
              <Calendar size={18} className="text-sage-primary" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800 text-sm">
                {dictionary.whyChooseUs.scheduling.title}
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                {dictionary.whyChooseUs.scheduling.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
