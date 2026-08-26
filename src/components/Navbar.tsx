"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  HiOutlineBars3,
  HiOutlineMagnifyingGlass,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiXMark,
} from "react-icons/hi2";
import { FaBagShopping } from "react-icons/fa6";

export const Navbar: React.FC = () => {
  const {
    totalItems,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useCart();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categoriesList = [
    "All",
    "Electronics",
    "Accessories",
    "Smartwatch",
    "Audio",
    "Home",
    "Lifestyle",
    "Fashion",
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 text-zinc-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* 1. Hamburger Icon */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white cursor-pointer shrink-0"
          aria-label="Open Menu"
        >
          {mobileMenuOpen ? <HiXMark className="w-5 h-5" /> : <HiOutlineBars3 className="w-5 h-5" />}
        </button>

        {/* 2. Website Logo ICON ONLY */}
        <Link
          href="/"
          onClick={() => setSelectedCategory("All")}
          className="flex items-center group shrink-0"
          title="websites"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <FaBagShopping className="w-5 h-5 text-white" />
          </div>
        </Link>

        {/* 3. Search Bar (Search Icon on RIGHT) */}
        <div className="flex flex-1 max-w-lg relative mx-1 sm:mx-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পণ্য খুঁজুন (Search products)..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-4 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            
            {/* Search Icon on the Right */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-zinc-400 pointer-events-none">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="pointer-events-auto hover:text-white p-0.5"
                >
                  <HiXMark className="w-4 h-4 text-zinc-400 hover:text-white" />
                </button>
              ) : (
                <HiOutlineMagnifyingGlass className="w-4 h-4 text-zinc-400" />
              )}
            </div>
          </div>
        </div>

        {/* Right Section: 4. Cart Icon (Routes to /cart) & 5. Profile Icon */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* 4. Cart Icon - Navigates to dedicated /cart route */}
          <Link
            href="/cart"
            className="relative p-2 sm:p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            aria-label="Shopping Cart Page"
          >
            <div className="relative">
              <HiOutlineShoppingBag className="w-5 h-5 text-blue-400" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md shadow-blue-500/40 animate-pulse">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden md:inline text-xs font-bold text-white">Cart</span>
          </Link>

          {/* 5. Profile Icon */}
          <Link
            href={user ? "/account" : "/login"}
            className="p-2 sm:p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            aria-label="User Account"
          >
            <HiOutlineUser className="w-5 h-5 text-zinc-300" />
            {user && (
              <span className="hidden md:inline text-xs font-bold text-white max-w-[80px] truncate">
                {user.displayName || user.email}
              </span>
            )}
          </Link>

        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-4 space-y-3 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          <Link
            href="/"
            onClick={() => {
              setSelectedCategory("All");
              setMobileMenuOpen(false);
            }}
            className="block text-white py-1 hover:text-blue-400"
          >
            হোম পেজ (Home)
          </Link>
          <div className="pt-2 border-t border-zinc-800/80">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-2 font-bold">
              ক্যাটাগরিসমূহ (Categories)
            </span>
            <div className="grid grid-cols-2 gap-2">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setMobileMenuOpen(false);
                    const catalog = document.getElementById("product-catalog");
                    if (catalog) catalog.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`text-left py-1.5 px-3 rounded-lg border text-xs ${
                    selectedCategory === cat
                      ? "bg-blue-600 border-blue-500 text-white font-bold"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subcategory Pills Bar (Horizontal Scrollable) */}
      <div className="border-t border-zinc-800/60 bg-zinc-950/60 px-3 sm:px-6 lg:px-8 py-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 max-w-7xl mx-auto min-w-max text-xs font-semibold">
          {categoriesList.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  const catalog = document.getElementById("product-catalog");
                  if (catalog) catalog.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 border-blue-500 text-white shadow-sm font-bold"
                    : "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
