'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { Heart, Star, ShoppingCart } from 'lucide-react';

interface FeaturedProductsProps {
  products?: Product[];
  title?: string;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products: customProducts,
  title = 'Featured Products',
}) => {
  const {
    products: defaultProds,
    storeConfig,
    wishlistIds,
    toggleWishlist,
    addToCart,
  } = useStore();

  const productsList = customProducts || defaultProds;

  return (
    <section className="py-6 pb-16 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {productsList.map((prod) => {
          const isWishlisted = wishlistIds.includes(prod.id);

          return (
            <div
              key={prod.id}
              className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-2.5 sm:p-3 border border-gray-200/80 dark:border-slate-800 hover:shadow-lg transition-all duration-300"
            >
              {/* Product Thumbnail Container */}
              <div className="relative w-full aspect-[3/4] bg-gray-50 dark:bg-slate-800 rounded-xl overflow-hidden mb-3">
                <Link href={`/products/${prod.id}`}>
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Badge Tag */}
                {prod.badge && (
                  <div className="absolute top-2 left-2 bg-black/80 dark:bg-white/90 text-white dark:text-black text-[10px] uppercase font-extrabold px-2 py-0.5 rounded shadow-xs">
                    {prod.badge}
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(prod.id);
                  }}
                  aria-label="Add to wishlist"
                  className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors shadow-xs active:scale-90 cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Title & Category */}
              <Link href={`/products/${prod.id}`}>
                <h4 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-1 hover:underline">
                  {prod.title}
                </h4>
              </Link>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-1 mb-2">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                  {prod.rating.toFixed(1)} {prod.reviewsCount ? `(${prod.reviewsCount})` : ''}
                </span>
              </div>

              {/* Price & Add to Cart Action */}
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-slate-800">
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
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;
