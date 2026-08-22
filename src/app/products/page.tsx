'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNavBar from '@/components/BottomNavBar';
import { useStore } from '@/context/StoreContext';
import {
  ChevronRight,
  SlidersHorizontal,
  ArrowUpDown,
  Heart,
  Plus,
  Star,
  X,
  Check,
} from 'lucide-react';

export default function AllProductsPage() {
  const {
    products,
    storeConfig,
    categories,
    wishlistIds,
    toggleWishlist,
    addToCart,
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // Filter & Sort Logic
  const filteredProducts = products
    .filter((prod) => {
      const matchCategory =
        selectedCategory === 'All' ||
        prod.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchPrice = prod.price <= maxPrice;
      return matchCategory && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-4 pb-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-semibold">All Products</span>
        </nav>

        {/* Page Header */}
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            All Products & Collections
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Category Pills Bar */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-3">
          {['All', ...categories.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sticky Filter & Sort Control Bar */}
        <div className="sticky top-16 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-y border-gray-200/80 dark:border-slate-800 -mx-4 px-4 py-2.5 flex items-center justify-between gap-3 mb-6">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter {selectedCategory !== 'All' ? `(${selectedCategory})` : ''}
          </button>

          <button
            onClick={() =>
              setSortBy((prev) =>
                prev === 'featured'
                  ? 'price-low'
                  : prev === 'price-low'
                  ? 'price-high'
                  : prev === 'price-high'
                  ? 'rating'
                  : 'featured'
              )
            }
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
          >
            <ArrowUpDown className="w-4 h-4" />
            Sort ({sortBy === 'featured' ? 'Featured' : sortBy === 'price-low' ? 'Low → High' : sortBy === 'price-high' ? 'High → Low' : 'Top Rated'})
          </button>
        </div>

        {/* Products 2-Column Mobile Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <p className="text-gray-500 text-sm font-semibold">No products found matching filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setMaxPrice(20000);
                setSortBy('featured');
              }}
              className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold text-xs rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((prod) => {
              const isWishlisted = wishlistIds.includes(prod.id);

              return (
                <article key={prod.id} className="group flex flex-col">
                  <div className="relative aspect-[3/4] bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-xl overflow-hidden mb-2.5 transition-all group-hover:shadow-md">
                    <Link href={`/products/${prod.id}`}>
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Badge */}
                    {prod.badge && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 dark:bg-white/90 text-white dark:text-black font-bold text-[10px] uppercase rounded">
                        {prod.badge}
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      aria-label="Wishlist"
                      className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>

                    {/* Quick Add Button */}
                    <button
                      onClick={() => addToCart(prod)}
                      aria-label="Add to Cart"
                      className="absolute bottom-2 right-2 p-2 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Link href={`/products/${prod.id}`}>
                      <h3 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white truncate hover:underline">
                        {prod.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{prod.rating.toFixed(1)}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                        {storeConfig.currency}
                        {prod.price.toLocaleString()}
                      </span>
                      {prod.comparePrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {storeConfig.currency}
                          {prod.comparePrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* Filter Modal / Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div
            onClick={() => setIsFilterOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="relative w-full max-w-xs bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between p-6 space-y-6 z-10 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-4">
                <h3 className="font-extrabold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" /> Filter Products
                </h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Category
                </label>
                <div className="space-y-1">
                  {['All', ...categories.map((c) => c.name)].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                        selectedCategory.toLowerCase() === cat.toLowerCase()
                          ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                          : 'hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory.toLowerCase() === cat.toLowerCase() && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price Filter Slider */}
              <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-slate-800">
                <div className="flex justify-between text-xs font-bold">
                  <span className="uppercase text-gray-400">Max Price</span>
                  <span className="text-gray-900 dark:text-white">
                    {storeConfig.currency}
                    {maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-black dark:accent-white cursor-pointer"
                />
              </div>

              {/* Sort By Selection */}
              <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-slate-800">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-3 text-xs font-bold text-gray-900 dark:text-white outline-none"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Apply & Reset Action Buttons */}
            <div className="pt-4 border-t border-gray-200 dark:border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setMaxPrice(20000);
                  setSortBy('featured');
                }}
                className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 font-bold text-xs rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 py-3 bg-black dark:bg-white text-white dark:text-black font-bold text-xs rounded-xl"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Footer */}
      <Footer />

      {/* Sticky Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
}
