'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  const brandName = siteName || storeConfig.name || 'ArdhiMart';

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
    <header className="sticky top-0 z-40 w-full bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 text-zinc-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Left Group: Hamburger Icon -> Logo Image -> Brand Name */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={handleMenuClick}
            aria-label="Open Mobile Menu"
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all active:scale-95 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            title="ArdhiMart"
          >
            {/* Crisp Light Background Pill for 100% Sharp Logo Contrast */}
            <div className="bg-white px-2.5 py-1 rounded-xl shadow-xs border border-gray-100 flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="ArdhiMart Logo"
                width={140}
                height={36}
                priority
                className="h-7 sm:h-9 w-auto object-contain"
              />
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#FF6B00] transition-colors">
              {brandName}
            </span>
          </Link>
        </div>

        {/* Right Actions: Search & Cart */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSearchClick}
            aria-label="Search"
            className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={handleCartClick}
            aria-label="Open Cart"
            className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 rounded-xl transition-all active:scale-95 relative cursor-pointer flex items-center gap-1.5"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#FF6B00]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF6B00] text-white font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-bold text-white">Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
