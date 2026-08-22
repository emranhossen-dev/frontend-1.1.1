'use client';

import React from 'react';
import { Product } from '@/types/store';
import { Heart, Star, ShoppingCart } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  currency: string;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onProductClick?: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onProductClick,
}) => {
  return (
    <section className="py-6 pb-16 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Featured Products
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {products.map((prod) => {
          const isWishlisted = wishlistIds.includes(prod.id);

          return (
            <div
              key={prod.id}
              className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-xl p-2 sm:p-3 border border-gray-200/80 dark:border-slate-800 hover:shadow-lg transition-all duration-300"
            >
              {/* Product Thumbnail Container */}
              <div
                onClick={() => onProductClick && onProductClick(prod)}
                className="relative w-full aspect-[3/4] bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden mb-3 cursor-pointer"
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge Tag */}
                {prod.badge && (
                  <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-sm">
                    {prod.badge}
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(prod.id);
                  }}
                  aria-label="Add to wishlist"
                  className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors shadow-sm active:scale-90"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Title & Category */}
              <h4
                onClick={() => onProductClick && onProductClick(prod)}
                className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-1 cursor-pointer hover:underline"
              >
                {prod.title}
              </h4>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-1 mb-2">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                  {prod.rating.toFixed(1)}
                </span>
              </div>

              {/* Price & Add to Cart Action */}
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-slate-800">
                <div className="flex flex-col">
                  <span className="font-extrabold text-base text-gray-900 dark:text-white">
                    {currency}
                    {prod.price.toLocaleString()}
                  </span>
                  {prod.comparePrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {currency}
                      {prod.comparePrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onAddToCart(prod)}
                  aria-label="Add to Cart"
                  className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 active:scale-95 transition-all shadow-sm flex items-center justify-center"
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
