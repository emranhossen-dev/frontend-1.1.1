'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import BottomNavBar from '@/components/BottomNavBar';
import CartDrawer from '@/components/CartDrawer';
import SearchModal from '@/components/SearchModal';
import { defaultStoreConfig, defaultProducts } from '@/config/storeConfig';
import { Product, CartItem } from '@/types/store';
import { ChevronRight, SlidersHorizontal, ArrowUpDown, Heart, Plus, Star } from 'lucide-react';

export default function AllProductsPage() {
  const [storeConfig] = useState(defaultStoreConfig);
  const [products] = useState<Product[]>(defaultProducts);
  const [activeTab, setActiveTab] = useState('categories');
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1']);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  // Filter products by selected category
  const filteredProducts = products.filter((prod) => {
    if (selectedCategory === 'All') return true;
    return prod.category.toLowerCase() === selectedCategory.toLowerCase();
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        siteName={storeConfig.name}
        cartCount={totalCartCount}
        onOpenMenu={() => console.log('Open Menu')}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-4 pb-24">
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
            All Products
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Showing {filteredProducts.length} of {products.length} results
          </p>
        </div>

        {/* Category Pills Bar */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-3">
          {['All', 'Clothing', 'Electronics', 'Gifts', 'Accessories'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
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
          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors shadow-xs">
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>

          <button
            onClick={() =>
              setSortBy((prev) =>
                prev === 'featured'
                  ? 'price-low'
                  : prev === 'price-low'
                  ? 'price-high'
                  : 'featured'
              )
            }
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors shadow-xs"
          >
            <ArrowUpDown className="w-4 h-4" />
            Sort ({sortBy === 'featured' ? 'Featured' : sortBy === 'price-low' ? 'Price: Low' : 'Price: High'})
          </button>
        </div>

        {/* Products 2-Column Mobile Grid */}
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
                    onClick={() => handleToggleWishlist(prod.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Quick Add Button */}
                  <button
                    onClick={() => handleAddToCart(prod)}
                    className="absolute bottom-2 right-2 p-2 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-md hover:scale-110 active:scale-95 transition-all"
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

        {/* Load More Button */}
        <div className="py-10 flex justify-center">
          <button className="px-8 py-3 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-full font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors shadow-xs">
            Load More Products
          </button>
        </div>
      </main>

      {/* Sticky Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        wishlistCount={wishlistIds.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCategories={() => setSelectedCategory('All')}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={storeConfig.currency}
        onUpdateQuantity={(id, delta) => {
          setCartItems((prev) =>
            prev
              .map((item) =>
                item.product.id === id
                  ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                  : item
              )
              .filter((item) => item.quantity > 0)
          );
        }}
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((i) => i.product.id !== id))}
        onCheckout={() => alert('Proceeding to Checkout!')}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        currency={storeConfig.currency}
        onSelectProduct={(p) => handleAddToCart(p)}
      />
    </div>
  );
}
