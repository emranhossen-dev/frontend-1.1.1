'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroBanner } from '@/types/store';

interface HeroSectionProps {
  banner?: HeroBanner;
  onCtaClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ banner }) => {
  const slides = [
    {
      badge: banner?.badge || 'New Collection 2026',
      title: banner?.title || "Find something you'll love",
      subtitle: banner?.subtitle || 'Curated minimalist essentials, premium electronics & handcrafted luxury lifestyle products.',
      imageUrl: banner?.imageUrl || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
      ctaPrimaryText: banner?.ctaPrimaryText || 'Shop Collection',
      ctaPrimaryLink: banner?.ctaPrimaryLink || '/products',
      ctaSecondaryText: banner?.ctaSecondaryText || 'Explore Categories',
      ctaSecondaryLink: banner?.ctaSecondaryLink || '/products',
    },
    {
      badge: 'Limited Flash Deals',
      title: 'Up to 50% Off Electronics & Gadgets',
      subtitle: 'Discover high-performance wireless audio, smartwatches & modern gadgets.',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop',
      ctaPrimaryText: 'Shop Collection',
      ctaPrimaryLink: '/products',
      ctaSecondaryText: 'Explore Categories',
      ctaSecondaryLink: '/products',
    },
    {
      badge: 'Premium Lifestyle Essentials',
      title: 'Elevate Your Everyday Style',
      subtitle: 'Handcrafted luxury accessories, minimalist apparel & premium home decor.',
      imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
      ctaPrimaryText: 'Shop Collection',
      ctaPrimaryLink: '/products',
      ctaSecondaryText: 'Explore Categories',
      ctaSecondaryLink: '/products',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play carousel slider every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[520px] sm:h-[600px] bg-slate-950 overflow-hidden group select-none">
      {/* Slide Images */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-[4000ms] ease-out"
          />
          {/* Subtle Dark Gradient Overlay for Maximum Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        </div>
      ))}

      {/* Slide Content Overlay */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-12 sm:pb-16">
        <div className="max-w-xl space-y-4">
          {/* Badge Pill */}
          <div className="inline-flex items-center bg-[#FF6B00] text-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
            {slides[currentSlide].badge}
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
            {slides[currentSlide].title}
          </h2>

          {/* Subtitle */}
          <p className="text-gray-200 text-sm sm:text-base font-medium line-clamp-2 max-w-md">
            {slides[currentSlide].subtitle}
          </p>

          {/* Action Buttons styled with Logo Brand Colors (#FF6B00 & #0F396F) */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
            <Link
              href={slides[currentSlide].ctaPrimaryLink}
              className="btn-shimmer w-full sm:w-auto px-8 h-12 bg-[#FF6B00] hover:bg-[#E56000] text-white font-extrabold text-sm rounded-xl flex items-center justify-center transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              {slides[currentSlide].ctaPrimaryText}
            </Link>

            <Link
              href={slides[currentSlide].ctaSecondaryLink}
              className="btn-shimmer w-full sm:w-auto px-8 h-12 bg-[#0F396F] hover:bg-[#164685] text-white font-bold text-sm rounded-xl flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {slides[currentSlide].ctaSecondaryText}
            </Link>
          </div>
        </div>
      </div>

      {/* Prev / Next Navigation Chevron Buttons */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md transition-all opacity-80 hover:opacity-100 active:scale-90 cursor-pointer hidden sm:flex"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md transition-all opacity-80 hover:opacity-100 active:scale-90 cursor-pointer hidden sm:flex"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Navigation Pagination Dots */}
      <div className="absolute bottom-4 left-0 w-full z-30 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              currentSlide === idx ? 'bg-[#FF6B00] w-8' : 'bg-white/40 hover:bg-white/70 w-2.5'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
