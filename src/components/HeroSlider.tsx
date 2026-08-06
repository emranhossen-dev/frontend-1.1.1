"use client";

import React, { useState, useEffect } from "react";
import { HERO_SLIDES } from "../data/products";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import { useCart } from "../context/CartContext";

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setSelectedCategory } = useCart();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const handleCta = () => {
    setSelectedCategory(slide.category);
    const catalog = document.getElementById("product-catalog");
    if (catalog) {
      catalog.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6 pb-4 max-w-7xl mx-auto">
      <div className="relative rounded-2xl sm:rounded-3xl bg-zinc-950 border border-zinc-800/80 overflow-hidden shadow-2xl transition-all">
        
        {/* Full Image Background Container */}
        <div className="relative w-full min-h-[280px] sm:min-h-[340px] lg:min-h-[380px] flex items-center overflow-hidden">
          
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-30 sm:opacity-40 filter brightness-75 scale-105"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Dark Navy Blue Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-blue-950/40" />

          {/* Glowing Ambient Radial Blue Aura (matching attached reference image) */}
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />

          {/* Content Overlaid on Background */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center w-full p-6 sm:p-10 lg:p-12 gap-6">
            
            {/* Text Content Left */}
            <div className="md:col-span-7 space-y-3 sm:space-y-4">
              
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-zinc-200 tracking-tight leading-none">
                  Upgrade Your
                </h2>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                  Everyday
                </h1>
              </div>

              <p className="text-zinc-300 text-xs sm:text-sm lg:text-base max-w-md leading-relaxed font-medium">
                {slide.subtitle || "Discover the best tech & lifestyle products."}
              </p>

              <div className="pt-2">
                <button
                  onClick={handleCta}
                  className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-600/40 transition-all hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center justify-center"
                >
                  Shop Now
                </button>
              </div>
            </div>

            {/* Product Image Right (Matching Headphones with blue glow aura from attached image) */}
            <div className="md:col-span-5 relative flex items-center justify-center">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(37,99,235,0.4)] transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

          </div>

          {/* Carousel Navigation Arrows */}
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-zinc-950/60 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 transition-all hidden sm:flex cursor-pointer"
            aria-label="Previous Slide"
          >
            <HiOutlineChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-zinc-950/60 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 transition-all hidden sm:flex cursor-pointer"
            aria-label="Next Slide"
          >
            <HiOutlineChevronRight className="w-4 h-4" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? "w-6 bg-blue-500" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
