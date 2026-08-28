'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Product } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard, ProductSkeletonCard } from '@/components/ProductCard';

interface FeaturedProductsProps {
  products?: Product[];
  title?: string;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products: customProducts,
  title = 'Featured Products',
}) => {
  const { products: defaultProds, isLoading } = useStore();
  const productsList = customProducts || defaultProds;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Group products into 2-row vertical pairs
  const productPairs: [Product, Product?][] = [];
  for (let i = 0; i < productsList.length; i += 2) {
    productPairs.push([productsList[i], productsList[i + 1]]);
  }

  // Auto Slider Left to Right
  useEffect(() => {
    if (isHovered || productPairs.length === 0) return;

    const timer = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [isHovered, productPairs.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 px-4 max-w-7xl mx-auto select-none">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h3>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer shadow-xs"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer shadow-xs"
            aria-label="Next products"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((n) => (
            <ProductSkeletonCard key={n} />
          ))}
        </div>
      ) : productsList.length === 0 ? (
        <div className="py-12 text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white">No products found in database yet</h4>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Use the Admin Panel to publish your first product to Neon PostgreSQL database.
          </p>
        </div>
      ) : (
        /* 2-ROW AUTO-CAROUSEL SLIDER (2 ROWS OF PRODUCTS) */
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="flex overflow-x-auto gap-3 sm:gap-4 snap-x snap-mandatory scroll-smooth no-scrollbar py-1"
        >
          {productPairs.map((pair, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3 sm:gap-4 shrink-0 snap-start w-[calc(50%-0.4rem)] sm:w-[calc(33.33%-0.6rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(16.66%-0.8rem)]"
            >
              {pair[0] && <ProductCard product={pair[0]} />}
              {pair[1] && <ProductCard product={pair[1]} />}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
