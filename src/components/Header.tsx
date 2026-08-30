'use client';

import React from 'react';
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

  const computedCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = customCartCount !== undefined ? customCartCount : computedCartCount;

  const handleMenuClick = () => {
    setIsMenuOpen(true);
    if (customOpenMenu) customOpenMenu();
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    if (customOpenSearch) customOpenSearch();
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
    if (customOpenCart) customOpenCart();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 text-gray-900 dark:text-white shadow-xs">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Group: Hamburger Menu + Logo (Text hidden on mobile) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={handleMenuClick}
            aria-label="Open Mobile Menu"
            className="lg:hidden p-1.5 text-gray-800 dark:text-gray-100 hover:text-[#FF6B00] dark:hover:text-[#FF6B00] transition-colors cursor-pointer group flex flex-col justify-center gap-1.5 items-start"
          >
            <span className="w-5 sm:w-6 h-0.5 bg-current rounded-full transition-all group-hover:w-6 group-hover:bg-[#FF6B00]" />
            <span className="w-3.5 sm:w-4 h-0.5 bg-current rounded-full transition-all group-hover:w-6 group-hover:bg-[#FF6B00]" />
            <span className="w-4 sm:w-5 h-0.5 bg-current rounded-full transition-all group-hover:w-6 group-hover:bg-[#FF6B00]" />
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
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

        {/* Center: Full Interactive Search Bar Input */}
        <div className="flex-1 max-w-md mx-1 sm:mx-4 min-w-0">
          <button
            onClick={handleSearchClick}
            className="w-full h-9 sm:h-10 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200/80 dark:hover:bg-slate-700/80 border border-gray-200 dark:border-slate-700 rounded-xl px-2.5 sm:px-4 flex items-center justify-between text-gray-400 dark:text-gray-400 text-xs font-semibold transition-all cursor-pointer shadow-xs group"
          >
            <div className="flex items-center gap-2 truncate min-w-0">
              <Search className="w-4 h-4 text-gray-400 group-hover:text-[#FF6B00] transition-colors shrink-0" />
              <span className="truncate text-[11px] sm:text-xs">Search gifts, gadgets...</span>
            </div>
            <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono font-bold text-gray-400 bg-gray-200 dark:bg-slate-700 rounded shrink-0">
              Search
            </kbd>
          </button>
        </div>

        {/* Right Actions: Cart & Register Button (Text ALWAYS visible) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={handleCartClick}
            aria-label="Open Cart"
            className="p-1.5 sm:p-2 transition-transform active:scale-95 relative cursor-pointer flex items-center justify-center"
          >
            <div className="relative flex items-center justify-center">
              <Image 
                src="/ardhimart-bag.svg" 
                alt="Cart Bag" 
                width={28} 
                height={28} 
                className="w-6.5 h-6.5 sm:w-7 sm:h-7 object-contain transition-transform hover:scale-110"
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
              href="/register"
              aria-label="Register Account"
              title="Register"
              className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-[#FF6B00] hover:bg-[#e05e00] text-white text-[10px] sm:text-[11px] font-bold rounded-lg shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer shrink-0 inline-block text-center"
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
