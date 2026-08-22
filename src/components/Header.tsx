'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, ShoppingBag, Search } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface HeaderProps {
  siteName?: string;
  cartCount?: number;
  onOpenMenu?: () => void;
  onOpenCart?: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  siteName,
  cartCount: customCartCount,
  onOpenMenu: customOpenMenu,
  onOpenCart: customOpenCart,
  onOpenSearch: customOpenSearch,
}) => {
  const {
    storeConfig,
    cartItems,
    setIsCartOpen,
    setIsSearchOpen,
    setIsMenuOpen,
  } = useStore();

  const computedCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = customCartCount !== undefined ? customCartCount : computedCartCount;
  const brandName = siteName || storeConfig.name;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Mobile Hamburger Menu Trigger */}
        <button
          onClick={customOpenMenu || (() => setIsMenuOpen(true))}
          aria-label="Open Mobile Menu"
          className="p-2 -ml-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Center: Dynamic Brand Name (Links to Home) */}
        <Link
          href="/"
          className="font-extrabold text-xl sm:text-2xl tracking-tight text-gray-900 dark:text-white uppercase hover:opacity-80 transition-opacity"
        >
          {brandName}
        </Link>

        {/* Right Actions: Search & Cart */}
        <div className="flex items-center gap-1">
          <button
            onClick={customOpenSearch || (() => setIsSearchOpen(true))}
            aria-label="Search"
            className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={customOpenCart || (() => setIsCartOpen(true))}
            aria-label="Open Cart"
            className="p-2 -mr-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 relative cursor-pointer"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-black dark:bg-white text-white dark:text-black font-extrabold text-xs rounded-full flex items-center justify-center animate-scale-in shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
