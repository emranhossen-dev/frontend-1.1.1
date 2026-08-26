"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineHeart,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import { FaBolt } from "react-icons/fa6";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export const MobileBottomNav: React.FC = () => {
  const {
    totalItems,
    wishlist,
    activeMobileTab,
    setActiveMobileTab,
    setSelectedCategory,
  } = useCart();
  const router = useRouter();

  const handleTabClick = (tabId: string, action?: () => void) => {
    setActiveMobileTab(tabId);
    if (action) {
      action();
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/80 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => {
            handleTabClick("home", () => {
              setSelectedCategory("All");
              router.push("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            activeMobileTab === "home"
              ? "text-blue-500 scale-105"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <HiOutlineHome className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Home</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => {
            handleTabClick("categories", () => {
              router.push("/");
              setTimeout(() => scrollToSection("categories"), 100);
            });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            activeMobileTab === "categories"
              ? "text-blue-500 scale-105"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <HiOutlineSquares2X2 className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Categories</span>
        </button>

        {/* Deals */}
        <button
          onClick={() => {
            handleTabClick("deals", () => {
              router.push("/");
              setTimeout(() => scrollToSection("best-deals"), 100);
            });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            activeMobileTab === "deals"
              ? "text-amber-400 scale-105"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <div className="relative">
            <FaBolt className="w-5 h-5 text-amber-400" />
            <span className="absolute -top-1 -right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          </div>
          <span className="text-[10px] font-semibold mt-1 text-amber-400">Deals</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => {
            handleTabClick("wishlist", () => {
              setSelectedCategory("Wishlist");
              router.push("/");
              setTimeout(() => scrollToSection("product-catalog"), 100);
            });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative cursor-pointer ${
            activeMobileTab === "wishlist"
              ? "text-rose-500 scale-105"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <div className="relative">
            <HiOutlineHeart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-1">Wishlist</span>
        </button>

        {/* Cart - Navigates directly to /cart page */}
        <Link
          href="/cart"
          onClick={() => setActiveMobileTab("cart")}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative cursor-pointer ${
            activeMobileTab === "cart"
              ? "text-blue-500 scale-105"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <div className="relative">
            <HiOutlineShoppingBag className="w-5 h-5 text-blue-400" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md shadow-blue-500/40 animate-pulse">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-1">Cart</span>
        </Link>
      </div>
    </nav>
  );
};
