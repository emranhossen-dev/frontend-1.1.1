"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export const HeroBanner: React.FC = () => {
  const { addToCart } = useCart();

  const heroProduct = {
    id: "hero-headphones-001",
    name: "Nexus Pro Wireless ANC Headphones",
    price: 299,
    originalPrice: 399,
    image: "/images/hero.png",
    category: "Audio",
    rating: 4.9,
    reviewCount: 1280,
    badge: "SAVE $100",
    isNew: true,
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 py-16 lg:py-24 border-b border-zinc-800">
      {/* Background glow ambient circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              Next-Gen Release 2026
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Immerse in <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">Studio Precision</span> Sound
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal">
              Active Noise Cancelling, 60-Hour Battery Life, and Spatial Audio Driver. Engineered for audiophiles and digital creators.
            </p>

            {/* Price & Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-white">$299</span>
                <span className="text-lg font-medium text-zinc-500 line-through">$399</span>
                <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-md">
                  25% OFF
                </span>
              </div>

              <button
                onClick={() => addToCart(heroProduct)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </button>
            </div>

            {/* Value Trust Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-800/80 text-xs text-zinc-400 font-medium">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Free Express Delivery
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                2-Year Warranty
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                30-Day Returns
              </div>
            </div>
          </div>

          {/* Right Product Image Banner */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/60 p-4 shadow-2xl group hover:border-indigo-500/50 transition-colors">
              <Image
                src="/images/hero.png"
                alt="Nexus Pro Wireless Headphones"
                fill
                priority
                className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs shadow-md">
                TOP RATED ★ 4.9
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
