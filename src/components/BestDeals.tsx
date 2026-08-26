"use client";

import React from "react";
import { PRODUCTS_DATA } from "../data/products";
import { ProductCard } from "./ProductCard";
import { useCart } from "../context/CartContext";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { FaBolt } from "react-icons/fa6";

export const BestDeals: React.FC = () => {
  const { setSelectedCategory } = useCart();

  const deals = PRODUCTS_DATA.filter((p) => p.isBestDeal || p.discountPercent);

  return (
    <section id="best-deals" className="py-4 sm:py-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5 sm:mb-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <FaBolt className="w-4 h-4 text-amber-400" />
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
            সেরা ডিলসমূহ (Best Deals)
          </h2>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-full">
            ফ্ল্যাশ সেল
          </span>
        </div>

        <button
          onClick={() => {
            setSelectedCategory("All");
            const catalog = document.getElementById("product-catalog");
            if (catalog) {
              catalog.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="text-blue-500 hover:text-blue-400 font-semibold text-xs sm:text-sm flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>সবগুলো দেখুন</span>
          <HiOutlineChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Best Deals Grid - Render identical 2-col (mobile) / 3-col (sm) / 4-col (md+) ProductCard layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {deals.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
