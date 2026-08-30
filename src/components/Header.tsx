'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, User } from 'lucide-react';
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
  const router = useRouter();
  const {
    products,
    cartItems,
    setIsCartOpen,
    setIsMenuOpen,
  } = useStore();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const computedCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = customCartCount !== undefined ? customCartCount : computedCartCount;

  // Close live search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(true);
    if (customOpenMenu) customOpenMenu();
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
    if (customOpenCart) customOpenCart();
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsDropdownOpen(false);
    setIsMobileSearchOpen(false);
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  // Live matching suggestions while typing
  const suggestions = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 text-gray-900 dark:text-white shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-1.5 sm:gap-3">
        
        {/* Left Group: Hamburger Menu + Logo + Brand Name Text */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
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
            className="flex items-center gap-1 sm:gap-1.5 group shrink-0"
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
            {/* Brand Name Text: VISIBLE ON ALL SCREENS */}
            <span className="font-extrabold text-base sm:text-xl tracking-tight leading-none">
              <span className="text-[#FF6B00]">Ardhi</span>
              <span className="text-[#0F396F] dark:text-blue-400">Mart</span>
            </span>
          </Link>
        </div>

        {/* Center: Full Interactive Search Bar Input (Desktop View) */}
        <div ref={searchRef} className="hidden md:block flex-1 max-w-md mx-2 min-w-0 relative">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
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
          </form>

          {/* Live Autocomplete Suggestions Dropdown Panel */}
          {isDropdownOpen && searchQuery.trim() !== '' && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in">
              <div className="p-2 space-y-1 max-h-72 overflow-y-auto">
                <div className="px-2 py-1 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-100 dark:border-slate-800 mb-1">
                  <span>Possible Results</span>
                  <span>{suggestions.length} items</span>
                </div>

                {suggestions.length === 0 ? (
                  <div className="p-3 text-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                    No matching products found. Press Enter to view search page.
                  </div>
                ) : (
                  suggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setIsDropdownOpen(false);
                        router.push(`/products/${item.id}`);
                      }}
                      className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-9 h-9 object-cover rounded-md bg-gray-100 dark:bg-slate-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                          {item.title}
                        </h5>
                        <p className="text-[10px] text-gray-400 font-semibold truncate">
                          {item.category}
                        </p>
                      </div>
                      <span className="text-xs font-extrabold text-[#FF6B00] shrink-0">
                        ৳{item.price.toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={handleSearchSubmit}
                className="w-full py-2.5 bg-gray-50 dark:bg-slate-800/80 hover:bg-[#FF6B00] hover:text-white text-[#FF6B00] dark:text-orange-400 dark:hover:text-white font-extrabold text-xs text-center border-t border-gray-100 dark:border-slate-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View all product cards for &quot;{searchQuery}&quot;</span>
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Right Actions: Mobile Search Toggle, Cart & Register/Account Button */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Mobile Search Icon Toggle Button */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            aria-label="Toggle Search Bar"
            className="md:hidden p-1.5 text-gray-700 dark:text-gray-200 hover:text-[#FF6B00] dark:hover:text-[#FF6B00] transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Icon Button */}
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

          {/* Register or Account Button */}
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

      {/* Mobile Expandable Search Bar Panel (Opens Right Under Navbar on Mobile) */}
      {isMobileSearchOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2.5 px-3 shadow-md animate-fade-in relative">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearchSubmit();
                }
              }}
              placeholder="Search gifts, gadgets..."
              className="w-full h-9 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md pl-3 pr-9 text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#FF6B00] dark:focus:border-[#FF6B00] transition-colors"
            />
            <button
              type="submit"
              onClick={handleSearchSubmit}
              aria-label="Search"
              className="absolute right-0 top-0 bottom-0 px-3 text-gray-500 hover:text-[#FF6B00] dark:text-gray-400 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Live Suggestions Dropdown inside Mobile Search Bar */}
          {isDropdownOpen && searchQuery.trim() !== '' && (
            <div className="mt-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="p-2 space-y-1 max-h-60 overflow-y-auto">
                <div className="px-2 py-1 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-100 dark:border-slate-800 mb-1">
                  <span>Possible Results</span>
                  <span>{suggestions.length} items</span>
                </div>

                {suggestions.length === 0 ? (
                  <div className="p-2.5 text-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                    No matching products found.
                  </div>
                ) : (
                  suggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsMobileSearchOpen(false);
                        router.push(`/products/${item.id}`);
                      }}
                      className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-8 h-8 object-cover rounded-md bg-gray-100 dark:bg-slate-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                          {item.title}
                        </h5>
                        <p className="text-[10px] text-gray-400 font-semibold truncate">
                          {item.category}
                        </p>
                      </div>
                      <span className="text-xs font-extrabold text-[#FF6B00] shrink-0">
                        ৳{item.price.toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={(e) => {
                  setIsMobileSearchOpen(false);
                  handleSearchSubmit(e);
                }}
                className="w-full py-2 bg-gray-50 dark:bg-slate-800/80 hover:bg-[#FF6B00] hover:text-white text-[#FF6B00] font-extrabold text-xs text-center border-t border-gray-100 dark:border-slate-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View all product cards for &quot;{searchQuery}&quot;</span>
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
