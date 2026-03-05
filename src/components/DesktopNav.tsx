'use client';

import { ChevronDown, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { Dictionary, Locale } from '../lib/dictionaries';

interface DesktopNavProps {
  dictionary: Dictionary;
  locale: Locale;
}

export function DesktopNav({ dictionary, locale }: DesktopNavProps) {
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActivitiesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const activities = [
    {
      href: `/${locale}/rafting`,
      label: dictionary.navigation.activityPages.rafting,
      icon: (
        <Image
          src="/icons/sage_rafting.png"
          alt=""
          width={16}
          height={16}
          className="w-4 h-4 object-contain"
        />
      ),
    },
    {
      href: `/${locale}/riding`,
      label: dictionary.navigation.activityPages.riding,
      icon: (
        <Image
          src="/icons/sage_horse.png"
          alt=""
          width={16}
          height={16}
          className="w-4 h-4 object-contain"
        />
      ),
    },
    {
      href: `/${locale}/kayaking`,
      label: dictionary.navigation.activityPages.kayaking,
      icon: (
        <Image
          src="/icons/sage_kayak.png"
          alt=""
          width={16}
          height={16}
          className="w-4 h-4 object-contain"
        />
      ),
    },
    {
      href: `/${locale}/trekking`,
      label: dictionary.navigation.activityPages.trekking,
      icon: (
        <Image
          src="/icons/sage_trekking.png"
          alt=""
          width={16}
          height={16}
          className="w-4 h-4 object-contain"
        />
      ),
    },
  ];

  return (
    <nav
      className={`hidden lg:flex fixed top-4 left-6 right-6 xl:left-10 xl:right-10 z-50 items-center justify-between px-6 xl:px-8 h-14 rounded-2xl transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-elevated border border-white/40'
          : 'bg-white/5 backdrop-blur-sm border border-white/20'
      }`}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link
        href={`/${locale}`}
        className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-primary rounded-xl"
      >
        <Image
          src="/images/logo.png"
          alt={dictionary.header.logoAlt}
          width={120}
          height={40}
          className={`h-9 w-auto transition-all duration-300 ${scrolled ? '' : 'filter brightness-0 invert'}`}
        />
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-1">
        <NavLink
          href={`/${locale}`}
          label={dictionary.navigation.home}
          active={pathname === `/${locale}` || pathname === '/'}
          scrolled={scrolled}
        />

        {/* Activities dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setActivitiesOpen(!activitiesOpen)}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-primary ${
              activities.some((a) => isActive(a.href))
                ? 'text-sage-primary bg-sage-50'
                : scrolled
                  ? 'text-gray-700 hover:text-sage-primary hover:bg-sage-50'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
            aria-expanded={activitiesOpen}
            aria-haspopup="true"
          >
            {dictionary.navigation.activities}
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${activitiesOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {activitiesOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-elevated border border-white/60 w-52 py-2 z-50">
              {activities.map((activity) => (
                <Link
                  key={activity.href}
                  href={activity.href}
                  onClick={() => setActivitiesOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-sage-50 ${
                    isActive(activity.href)
                      ? 'text-sage-primary bg-sage-50'
                      : 'text-gray-700'
                  }`}
                >
                  <span className="text-sage-primary">{activity.icon}</span>
                  {activity.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <NavLink
          href={`tel:+302651099220`}
          label={dictionary.navigation.contactUs}
          active={false}
          scrolled={scrolled}
          icon={<Phone size={14} />}
          external
        />
      </div>

      {/* Language toggle — simple flag switch */}
      <div className="flex items-center gap-3">
        <Link
          href={pathname.replace(
            `/${locale}`,
            `/${locale === 'en' ? 'el' : 'en'}`,
          )}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-primary ${
            scrolled
              ? 'text-gray-700 hover:text-sage-primary hover:bg-sage-50 border border-gray-200'
              : 'text-white/90 hover:text-white bg-white/10 hover:bg-white/20'
          }`}
          aria-label={`Switch to ${locale === 'en' ? 'Greek' : 'English'}`}
        >
          <span className="text-base" role="img" aria-hidden="true">
            {locale === 'en' ? '🇬🇷' : '🇬🇧'}
          </span>
          <span>{locale === 'en' ? 'ΕΛ' : 'EN'}</span>
        </Link>
      </div>
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  active: boolean;
  scrolled: boolean;
  icon?: React.ReactNode;
  external?: boolean;
}

function NavLink({
  href,
  label,
  active,
  scrolled,
  icon,
  external,
}: NavLinkProps) {
  const className = `flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-primary ${
    active
      ? 'text-sage-primary bg-sage-50'
      : scrolled
        ? 'text-gray-700 hover:text-sage-primary hover:bg-sage-50'
        : 'text-white/90 hover:text-white hover:bg-white/10'
  }`;

  if (external) {
    return (
      <a href={href} className={className}>
        {icon}
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {icon}
      {label}
    </Link>
  );
}
