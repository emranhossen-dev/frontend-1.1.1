'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, User, UserPlus } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useAuth } from '@/context/AuthContext';

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
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const computedCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = customCartCount !== undefined ? customCartCount : computedCartCount;

  const handleMenuClick = () => {
    setIsMenuOpen(true);
    if (customOpenMenu) customOpenMenu();
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearchOpen(true);
    if (customOpenSearch) customOpenSearch();
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
    if (customOpenCart) customOpenCart();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 text-gray-900 dark:text-white shadow-xs">
      <div className="max-w-7xl mx-auto px-1.5 sm:px-4 lg:px-6 h-16 flex items-center justify-between gap-1.5 sm:gap-3">
        
        {/* Left Group: Hamburger Menu + Logo (Text hidden on mobile) */}
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          <button
            onClick={handleMenuClick}
            aria-label="Open Mobile Menu"
            className="lg:hidden p-0.5 pr-0 text-gray-800 dark:text-gray-100 hover:text-[#FF6B00] dark:hover:text-[#FF6B00] transition-colors cursor-pointer group flex flex-col justify-center gap-1.5 items-start"
          >
            <span className="w-5 sm:w-6 h-0.5 bg-current rounded-full transition-all group-hover:w-6 group-hover:bg-[#FF6B00]" />
            <span className="w-3.5 sm:w-4 h-0.5 bg-current rounded-full transition-all group-hover:w-6 group-hover:bg-[#FF6B00]" />
            <span className="w-4 sm:w-5 h-0.5 bg-current rounded-full transition-all group-hover:w-6 group-hover:bg-[#FF6B00]" />
          </button>

          <Link
            href="/"
            className="flex items-center gap-1 group shrink-0"
            title="ArdhiMart"
          >
            <Image
              src="/logo.png?v=2"
              alt="ArdhiMart Logo"
              width={120}
              height={30}
              priority
              unoptimized
              className="h-5 sm:h-7 w-auto object-contain transition-transform group-hover:scale-105"
            />
            {/* Brand Name Text: HIDDEN ON MOBILE (hidden sm:inline-block) */}
            <span className="hidden sm:inline-block font-extrabold text-lg sm:text-xl tracking-tight leading-none">
              <span className="text-[#FF6B00]">Ardhi</span>
              <span className="text-[#0F396F] dark:text-blue-400">Mart</span>
            </span>
          </Link>
        </div>

        {/* Center: Full Interactive Search Bar Input with Search Icon on Right (No Cross Button) */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-md mx-0.5 sm:mx-2 min-w-0"
        >
          <div className="relative flex items-center w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearchSubmit();
                }
              }}
              placeholder="Search gifts, gadgets..."
              className="w-full h-8 sm:h-9 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md pl-2.5 pr-8 text-[11px] sm:text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#FF6B00] dark:focus:border-[#FF6B00] transition-colors"
            />
            {/* Search Icon Button on Right Side */}
            <button
              type="submit"
              onClick={handleSearchSubmit}
              aria-label="Search"
              className="absolute right-0 top-0 bottom-0 px-2.5 text-gray-500 hover:text-[#FF6B00] dark:text-gray-400 dark:hover:text-[#FF6B00] flex items-center justify-center transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Right Actions: Cart & Register Button (Text ALWAYS visible) */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={handleCartClick}
            aria-label="Open Cart"
            className="p-1 sm:p-1.5 transition-transform active:scale-95 relative cursor-pointer flex items-center justify-center"
          >
            <div className="relative flex items-center justify-center">
              <Image 
                src="/ardhimart-bag.svg" 
                alt="Cart Bag" 
                width={34} 
                height={34} 
                className="w-8 h-8 sm:w-8.5 sm:h-8.5 object-contain dark:brightness-0 dark:invert transition-transform hover:scale-110"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#FF6B00] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
          </button>

          {/* Register or Account Button (Register text visible on ALL screens) */}
          {user ? (
            <Link
              href="/account"
              aria-label="Profile Account"
              title="My Account"
              className="p-1.5 sm:p-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-gray-200 rounded-lg transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <User className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              <span className="hidden sm:inline text-xs font-bold text-gray-800 dark:text-gray-200">
                {user.displayName ? user.displayName.split(' ')[0] : 'Account'}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              aria-label="Login Account"
              title="Login"
              className="px-2 py-1.5 sm:px-2.5 sm:py-2 h-8 sm:h-9 bg-[#FF6B00] hover:bg-[#e05e00] text-white text-[11px] sm:text-xs font-bold rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0 flex items-center justify-center text-center"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
