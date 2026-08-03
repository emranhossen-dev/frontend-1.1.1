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
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              N
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              NEXUS<span className="text-indigo-400">STORE</span>
            </span>
          </Link>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/#categories" className="hover:text-white transition-colors">
            Categories
          </Link>
          <Link href="/cart" className="hover:text-white transition-colors">
            Cart Page
          </Link>
          <Link href="/checkout" className="hover:text-white transition-colors">
            Checkout
          </Link>
          {user && (
            <Link href="/account" className="hover:text-white transition-colors flex items-center gap-1.5">
              Dashboard
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
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
                <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
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
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all"
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
              <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-indigo-600/40 animate-pulse">
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
