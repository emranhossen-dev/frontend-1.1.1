'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import BottomNavBar from '@/components/BottomNavBar';
import CartDrawer from '@/components/CartDrawer';
import SearchModal from '@/components/SearchModal';

import {
  defaultStoreConfig,
  defaultHeroBanner,
  defaultCategories,
  defaultProducts,
} from '@/config/storeConfig';
import { Product, CartItem } from '@/types/store';

export default function Home() {
  // Store Config (Can be fetched dynamically from Admin Panel / API)
  const [storeConfig] = useState(defaultStoreConfig);
  const [heroBanner] = useState(defaultHeroBanner);
  const [categories] = useState(defaultCategories);
  const [products] = useState(defaultProducts);

  // Interactive UI State
  const [activeTab, setActiveTab] = useState('home');
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1']);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: defaultProducts[0], quantity: 1 },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cart Handlers
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

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist Handler
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 font-sans text-gray-900 dark:text-gray-100 flex flex-col selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Top Header */}
      <Header
        siteName={storeConfig.name}
        cartCount={totalCartCount}
        onOpenMenu={() => console.log('Open Menu')}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="flex-1 w-full pb-20 sm:pb-12">
        {/* Editorial Hero Section */}
        <HeroSection banner={heroBanner} />

        {/* Shop By Category Section */}
        <CategoryGrid
          categories={categories}
          onSelectCategory={(cat) => console.log('Selected Category:', cat)}
        />

        {/* Featured Products Section */}
        <FeaturedProducts
          products={products}
          currency={storeConfig.currency}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        wishlistCount={wishlistIds.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCategories={() => {
          const catElem = document.getElementById('categories');
          if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={storeConfig.currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => alert('Proceeding to Checkout Flow!')}
      />

      {/* Quick Search Overlay Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        currency={storeConfig.currency}
        onSelectProduct={(product) => handleAddToCart(product)}
      />
    </div>
  );
}
