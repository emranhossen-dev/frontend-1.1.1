"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { PRODUCTS_DATA } from "../data/products";

export const HeroCarousel: React.FC = () => {
  const { addToCart } = useCart();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      product: PRODUCTS_DATA[0],
      tagline: "MAGIC HEAT REVEAL MUGS",
      title: "Turn Coffee Moments into Magic Memories",
      subtitle: "Personalized photo & name reveal ceramic mug. Hot drink unveils your custom picture HD photo print.",
      accent: "from-amber-400 via-rose-400 to-pink-500",
    },
    {
      product: PRODUCTS_DATA[1],
      tagline: "CUSTOM EMBROIDERED APPAREL",
      title: "Wear Your Custom Story & Initials",
      subtitle: "Heavyweight 350 GSM organic fleece hoodie customized with high-density embroidered thread on chest.",
      accent: "from-rose-400 via-pink-400 to-amber-300",
    },
    {
      product: PRODUCTS_DATA[3],
      tagline: "3D ACRYLIC ILLUSION LAMPS",
      title: "Illuminate Special Names & Photos",
      subtitle: "Custom laser-engraved optical acrylic light with solid wooden LED base & 7 RGB color modes.",
      accent: "from-violet-400 via-purple-400 to-rose-400",
    },
  ];

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeSlide = slides[currentSlide];

  const handleCustomizeNow = (product: typeof activeSlide.product) => {
    router.push(`/products/${product.id}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 py-12 md:py-20 border-b border-zinc-800">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/15 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[420px]">
          
          {/* Left Content */}
          <div className="space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              {activeSlide.tagline}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {activeSlide.title.split(" ").slice(0, -2).join(" ")}{" "}
              <span className={`bg-gradient-to-r ${activeSlide.accent} bg-clip-text text-transparent`}>
                {activeSlide.title.split(" ").slice(-2).join(" ")}
              </span>
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {activeSlide.subtitle}
            </p>

            {/* Price & Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-white">${activeSlide.product.price}</span>
                {activeSlide.product.originalPrice && (
                  <span className="text-base font-medium text-zinc-500 line-through">
                    ${activeSlide.product.originalPrice}
                  </span>
                )}
                {activeSlide.product.badge && (
                  <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold rounded-lg uppercase tracking-wide">
                    {activeSlide.product.badge}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleCustomizeNow(activeSlide.product)}
                  className="flex-1 sm:flex-none px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-sm shadow-xl shadow-rose-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Customize Now
                </button>
                <button
                  onClick={() => addToCart(activeSlide.product)}
                  className="flex-1 sm:flex-none px-5 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white font-semibold text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  Add Quick Cart
                </button>
              </div>
            </div>

            {/* Link to Details */}
            <div className="pt-2">
              <Link
                href={`/products/${activeSlide.product.id}`}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold inline-flex items-center gap-1.5 group"
              >
                Explore Live Personalizer & Printing Options
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Right Product Image Slide */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-sm md:max-w-md aspect-square rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/80 p-3 shadow-2xl group">
              <Image
                src={activeSlide.product.image}
                alt={activeSlide.product.name}
                fill
                priority
                className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-white font-bold text-[11px] shadow-md tracking-wider">
                FEATURED GIFT {currentSlide + 1} / {slides.length}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 p-3 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors shadow-xl z-20"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 p-3 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors shadow-xl z-20"
              aria-label="Next slide"
            >
              →
            </button>
          </div>

        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? "w-8 bg-rose-500" : "w-2 bg-zinc-800 hover:bg-zinc-600"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
