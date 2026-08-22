'use client';

import React from 'react';
import { HeroBanner } from '@/types/store';

interface HeroSectionProps {
  banner: HeroBanner;
  onCtaClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ banner, onCtaClick }) => {
  return (
    <section className="relative w-full h-[540px] sm:h-[620px] bg-slate-900 overflow-hidden animate-fade-in-up">
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={banner.imageUrl}
          alt={banner.title}
          className="w-full h-full object-cover object-center opacity-85 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-12 sm:pb-16">
        <div className="max-w-xl">
          {/* Badge Pill */}
          <div className="inline-flex items-center bg-white/90 backdrop-blur-md text-black px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            {banner.badge}
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3 leading-tight drop-shadow-md">
            {banner.title}
          </h2>

          {/* Subtitle */}
          <p className="text-gray-200 text-sm sm:text-base mb-6 font-medium line-clamp-2 max-w-md">
            {banner.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={banner.ctaPrimaryLink}
              onClick={onCtaClick}
              className="w-full sm:w-auto px-8 h-12 bg-white text-black font-semibold text-sm rounded-lg flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all shadow-lg"
            >
              {banner.ctaPrimaryText}
            </a>

            <a
              href={banner.ctaSecondaryLink}
              className="w-full sm:w-auto px-8 h-12 bg-white/15 backdrop-blur-md border border-white/30 text-white font-semibold text-sm rounded-lg flex items-center justify-center hover:bg-white/25 active:scale-95 transition-all"
            >
              {banner.ctaSecondaryText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
