"use client";

import React from "react";
import { ProductCard } from "./ProductCard";
import { PRODUCTS_DATA } from "../data/products";

interface ProductGridProps {
  selectedCategory: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ selectedCategory }) => {
  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="featured" className="py-12 sm:py-16 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Tech Catalog
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Showing {filteredProducts.length} items for "{selectedCategory}"
            </p>
          </div>
        </div>

        {/* Products Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
