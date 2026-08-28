'use client';

import React from 'react';
import { Product } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { ShoppingCart } from 'lucide-react';
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

  return (
    <section className="py-6 pb-16 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h3>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <ProductSkeletonCard key={n} />
          ))}
        </div>
      ) : productsList.length === 0 ? (
        <div className="py-16 text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white">No products found in database yet</h4>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Use the Admin Panel to publish your first product to Neon PostgreSQL database.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {productsList.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
