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
      tagline: "NEXT-GEN AUDIO PRECISION",
      title: "Immerse in Studio Precision Sound",
      subtitle: "Active Noise Cancelling, 60-Hour Battery, and Beryllium Spatial Drivers.",
      accent: "from-indigo-400 via-purple-400 to-emerald-400",
    },
    {
      product: PRODUCTS_DATA[1],
      tagline: "FLAGSHIP SMART WEARABLE",
      title: "Elevate Your Health & Fitness Tech",
      subtitle: "Ultra-bright AMOLED display, ECG monitoring, and 50m water resistance.",
      accent: "from-emerald-400 via-teal-400 to-indigo-400",
    },
    {
      product: PRODUCTS_DATA[2],
      tagline: "ULTIMATE GAMING SETUP",
      title: "Tactile Precision Mechanical Feel",
      subtitle: "75% Hot-Swappable RGB mechanical deck with sound-dampening gasket mount.",
      accent: "from-purple-400 via-pink-400 to-indigo-400",
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

  const handleBuyNow = (product: typeof activeSlide.product) => {
    addToCart(product);
    router.push("/checkout");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 py-12 md:py-20 border-b border-zinc-800">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 md:w-96 h-80 md:h-96 bg-indigo-600/15 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[420px]">
          
          {/* Left Content */}
          <div className="space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              {activeSlide.tagline}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {activeSlide.title.split(" ").slice(0, -2).join(" ")}{" "}
              <span className={`bg-gradient-to-r ${activeSlide.accent} bg-clip-text text-transparent`}>
                {activeSlide.title.split(" ").slice(-2).join(" ")}
              </span>
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 font-normal">
              {activeSlide.subtitle}
            </p>

            {/* Price & Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-white">${activeSlide.product.price}</span>
                {activeSlide.product.originalPrice && (
                  <span className="text-base font-medium text-zinc-500 line-through">
                    ${activeSlide.product.originalPrice}
                  </span>
                )}
                {activeSlide.product.badge && (
                  <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-md">
                    {activeSlide.product.badge}
                  </span>
                )}
              </div>

              {/* Action Buttons: Buy Now & Add to Cart */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleBuyNow(activeSlide.product)}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all"
                >
                  ⚡ Buy Now
                </button>
                <button
                  onClick={() => addToCart(activeSlide.product)}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Link to Details */}
            <div className="pt-2">
              <Link
                href={`/products/${activeSlide.product.id}`}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1 group"
              >
                View Full Product Specifications
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Right Product Image Slide */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-sm md:max-w-md aspect-square rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/60 p-4 shadow-2xl group">
              <Image
                src={activeSlide.product.image}
                alt={activeSlide.product.name}
                fill
                priority
                className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-indigo-600 text-white font-bold text-xs shadow-md">
                FEATURED SLIDE {currentSlide + 1} / {slides.length}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 p-2.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors shadow-lg z-20"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 p-2.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors shadow-lg z-20"
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
                currentSlide === idx ? "w-8 bg-indigo-500" : "w-2 bg-zinc-700 hover:bg-zinc-500"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
