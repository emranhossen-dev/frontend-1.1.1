'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Flame, Clock, ShoppingCart, Star } from 'lucide-react';

export const FlashSaleSection: React.FC = () => {
  const { products, storeConfig, addToCart } = useStore();

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.slice(0, 4);

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      {/* Header with Title & Live Countdown Timer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400 rounded-xl">
            <Flame className="w-6 h-6 fill-red-500 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Flash Deals of the Day
            </h3>
            <p className="text-xs text-gray-500 font-medium">Limited stock available at special prices</p>
          </div>
        </div>

        {/* Timer Pill */}
        <div className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-xl text-xs font-bold shadow-md self-start sm:self-auto">
          <Clock className="w-4 h-4" />
          <span>Ends in:</span>
          <span className="font-mono text-sm tracking-wider">
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {flashProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-2xl p-3 flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div>
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-3 bg-gray-100 dark:bg-slate-800">
                <Link href={`/products/${prod.id}`}>
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="absolute top-2 left-2 bg-red-600 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded">
                  -20% OFF
                </div>
              </div>

              <Link href={`/products/${prod.id}`}>
                <h4 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-1 hover:underline">
                  {prod.title}
                </h4>
              </Link>

              <div className="flex items-center gap-1 mt-1 mb-2">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                  {prod.rating.toFixed(1)}
                </span>
              </div>

              {/* Stock Progress Bar */}
              <div className="my-2 space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-gray-500">
                  <span>Sold: 85%</span>
                  <span className="text-red-500">Only 3 Left!</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-[85%] rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-800 mt-2">
              <div className="flex flex-col">
                <span className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
                  {storeConfig.currency}
                  {prod.price.toLocaleString()}
                </span>
                {prod.comparePrice && (
                  <span className="text-[11px] text-gray-400 line-through">
                    {storeConfig.currency}
                    {prod.comparePrice.toLocaleString()}
                  </span>
                )}
              </div>

              <button
                onClick={() => addToCart(prod)}
                aria-label="Add to Cart"
                className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 active:scale-95 transition-all shadow-xs flex items-center justify-center cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlashSaleSection;
