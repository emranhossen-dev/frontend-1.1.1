'use client';

import React from 'react';
import { Category } from '@/types/store';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory?: (category: Category) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Shop By Category
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory && onSelectCategory(cat)}
            className="group cursor-pointer flex flex-col items-center"
          >
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 mb-2 relative border border-gray-200 dark:border-slate-700 p-2 transition-all group-hover:shadow-md">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 rounded-lg"
              />
            </div>
            <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-gray-200 transition-colors">
              {cat.name}
            </p>
            {cat.itemCount && (
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {cat.itemCount} Items
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
