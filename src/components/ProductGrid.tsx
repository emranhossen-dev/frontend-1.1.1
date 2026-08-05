"use client";

import React, { useState } from "react";
import { ProductCard } from "./ProductCard";
import { PRODUCTS_DATA, ExtendedProduct } from "../data/products";
import { CustomizerPreviewModal } from "./CustomizerPreviewModal";

interface ProductGridProps {
  selectedCategory: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ selectedCategory }) => {
  const [activeCustomizerProduct, setActiveCustomizerProduct] = useState<ExtendedProduct | null>(null);

  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="products" className="py-12 sm:py-16 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              PRINTABLE CATALOG
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Personalized Gifts & Custom Prints
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Showing {filteredProducts.length} items for "{selectedCategory}"
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenCustomizer={(prod) => setActiveCustomizerProduct(prod)}
            />
          ))}
        </div>
      </div>

      {/* Live Customizer Preview Modal */}
      {activeCustomizerProduct && (
        <CustomizerPreviewModal
          product={activeCustomizerProduct}
          onClose={() => setActiveCustomizerProduct(null)}
        />
      )}
    </section>
  );
};
