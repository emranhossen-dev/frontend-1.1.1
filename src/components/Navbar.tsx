"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-violet-600 flex items-center justify-center font-black text-white shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V6a2 2 0 10-2 2h2zm0 13-4-4m4 4 4-4M4 6h16v13H4V6z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-white via-zinc-100 to-amber-200 bg-clip-text text-transparent leading-none">
                GIFT <span className="text-rose-400">&</span> PRINT
              </span>
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase leading-tight">
                Custom Hub
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 font-medium text-sm text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/#categories" className="hover:text-white transition-colors">
            Gift Categories
          </Link>
          <Link href="/#products" className="hover:text-white transition-colors">
            Custom Catalog
          </Link>
          <Link href="/cart" className="hover:text-white transition-colors">
            Cart ({totalItems})
          </Link>
          {user && (
            <Link href="/account" className="hover:text-white transition-colors flex items-center gap-1.5">
              Dashboard
              <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/20">
                ACTIVE
              </span>
            </Link>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Auth Button or User Profile Dropdown */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/account"
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white transition-colors flex items-center gap-2 text-xs font-semibold"
              >
                <div className="w-6 h-6 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold text-[10px]">
                  {user.displayName?.[0] || user.email?.[0] || "U"}
                </div>
                <span className="hidden lg:inline max-w-[100px] truncate">{user.displayName || user.email}</span>
              </Link>
              <button
                onClick={() => logout()}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-rose-500/10 border border-zinc-800 hover:border-rose-500/30 text-zinc-400 hover:text-rose-400 text-xs transition-colors"
                title="Sign Out"
              >
                Exit
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all"
            >
              Sign In
            </Link>
          )}

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
            aria-label="Shopping Cart Drawer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-rose-500/40 animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 py-4 space-y-3 text-sm">
          <Link href="/" className="block text-white font-medium" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/#categories" className="block text-zinc-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
            Categories
          </Link>
          <Link href="/cart" className="block text-zinc-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
            Cart Page ({totalItems})
          </Link>
          <Link href="/checkout" className="block text-zinc-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
            Checkout
          </Link>
          {user ? (
            <Link href="/account" className="block text-indigo-400 font-semibold" onClick={() => setMobileMenuOpen(false)}>
              Customer Dashboard
            </Link>
          ) : (
            <Link href="/login" className="block text-indigo-400 font-semibold" onClick={() => setMobileMenuOpen(false)}>
              Sign In / Register
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
