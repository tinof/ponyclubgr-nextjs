import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

export function ContactAndLocation() {
  return (
    <div className="px-4 md:px-6 mt-8 space-y-6">
      <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-card border border-white/60">
        <h2 className="text-xl font-bold text-sage-primary mb-4 relative">
          Our Location
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-sage-primary/30 rounded-full"></span>
        </h2>
        <div className="rounded-xl overflow-hidden shadow-card mb-4 relative h-48 sm:h-64 w-full">
          {/* We use standard Next.js Image component for optimization */}
          <Image
            alt="Map showing Acheron River, Greece"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1OGtVO8MaDGxf-1-xE5IjTMXckIwzB0uKMtuL0iN5OcYoWErBM-ao5U2N8N00YGzjhjQEvfP0Yra2BYb-aCx2NFiY2gVCc0pin0hW-hhQ_azl43b-qfgIlcMsCrUvEeFbpYBtkrmWYxdFGu4EpATr7Nny7-wT4JizZrFplFeuDf_U7sO8eM2-gr7xYI1RhjHir5BU7ajoObUzcq4gBjWvJptAvILIyJ_EMP62-J5ndDMcuDUqdpesg9QQHsMp-v5_CoLoAkg_ySxx"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-gray-700 text-sm">
          You can find us at Glyki, near the mythical Acheron River. It&apos;s
          an easily accessible spot for a day of adventure.
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-card border border-white/60">
        <h2 className="text-xl font-bold text-sage-primary mb-4 relative">
          Contact Us
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-sage-primary/30 rounded-full"></span>
        </h2>
        <div className="space-y-4 text-gray-700 text-sm">
          <div className="flex items-center space-x-3">
            <div className="bg-sage-50 p-2 rounded-full flex-shrink-0">
              <Phone size={18} className="text-sage-primary" />
            </div>
            <a
              className="hover:text-sage-primary font-medium transition-colors"
              href="tel:+301234567890"
            >
              +30 123 456 7890
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-sage-50 p-2 rounded-full flex-shrink-0">
              <Mail size={18} className="text-sage-primary" />
            </div>
            <a
              className="hover:text-sage-primary font-medium transition-colors"
              href="mailto:contact@ponyclubacheron.gr"
            >
              contact@ponyclubacheron.gr
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-sage-50 p-2 rounded-full flex-shrink-0">
              <MapPin size={18} className="text-sage-primary" />
            </div>
            <p className="font-medium">Glyki, Thesprotia, Greece, 46031</p>
          </div>
        </div>
      </div>
    </div>
  );
}
