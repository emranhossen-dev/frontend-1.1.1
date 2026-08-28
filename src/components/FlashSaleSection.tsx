'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { Flame, Clock, ShoppingCart } from 'lucide-react';
import { ProductCard, ProductSkeletonCard } from '@/components/ProductCard';

export const FlashSaleSection: React.FC = () => {
  const { products, isLoading } = useStore();

  // Daily 5:00 PM (17:00) Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(17, 0, 0, 0); // 5:00 PM local time

      if (now.getTime() >= target.getTime()) {
        // If past 5:00 PM today, target 5:00 PM tomorrow
        target.setDate(target.getDate() + 1);
      }

      const diffMs = target.getTime() - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.slice(0, 6);

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      {/* Header with Title & Live Daily 5 PM Countdown Timer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400 rounded-xl">
            <Flame className="w-6 h-6 fill-red-500 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Flash Deals of the Day
            </h3>
            <p className="text-xs text-gray-500 font-medium">Limited time offers at special discounted prices</p>
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

      {/* Products Grid or Skeleton Loader - 6 Cards per row on Desktop */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <ProductSkeletonCard key={n} />
          ))}
        </div>
      ) : flashProducts.length === 0 ? (
        <div className="py-12 text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white">No Flash Sale Products Available</h4>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {flashProducts.map((prod, idx) => (
            <ProductCard
              key={prod.id}
              product={prod}
              showStockBar={true}
              stockSoldPercent={85 - idx * 10}
              stockLeftCount={idx + 2}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FlashSaleSection;
