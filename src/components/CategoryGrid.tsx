"use client";

import React from "react";
import {
  HiOutlineSquares2X2,
  HiOutlineHome,
  HiOutlineBriefcase,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import { FaLaptop, FaGlasses, FaClock, FaHeadphones, FaShirt } from "react-icons/fa6";
import { useCart } from "../context/CartContext";

export const CategoryGrid: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useCart();

  const categories = [
    {
      id: "Electronics",
      name: "Electronics",
      icon: <FaLaptop className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />,
    },
    {
      id: "Accessories",
      name: "Accessories",
      icon: <FaGlasses className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />,
    },
    {
      id: "Smartwatch",
      name: "Smartwatch",
      icon: <FaClock className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />,
    },
    {
      id: "Audio",
      name: "Audio",
      icon: <FaHeadphones className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />,
    },
    {
      id: "Home",
      name: "Home",
      icon: <HiOutlineHome className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />,
    },
    {
      id: "Lifestyle",
      name: "Lifestyle",
      icon: <HiOutlineBriefcase className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />,
    },
    {
      id: "Fashion",
      name: "Fashion",
      icon: <FaShirt className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400" />,
    },
    {
      id: "All",
      name: "More",
      icon: <HiOutlineSquares2X2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />,
    },
  ];

  const handleSelect = (catId: string) => {
    setSelectedCategory(catId);
    const catalog = document.getElementById("product-catalog");
    if (catalog) {
      catalog.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="categories" className="py-4 sm:py-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3.5 sm:mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
            Categories
          </h2>
          <span className="text-xs bg-zinc-800 text-zinc-400 font-semibold px-2.5 py-0.5 rounded-full hidden sm:inline">
            8 Collections
          </span>
        </div>

        <button
          onClick={() => handleSelect("All")}
          className="text-blue-500 hover:text-blue-400 font-semibold text-xs sm:text-sm flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <HiOutlineChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Categories 4-column Grid for Mobile (matching attached image) */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3 lg:gap-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer group ${
                isSelected
                  ? "bg-blue-600/15 border-blue-500 shadow-lg shadow-blue-500/10 text-white scale-[1.03]"
                  : "bg-zinc-900/80 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : "bg-zinc-800/90 border border-zinc-700/50"
                }`}
              >
                {cat.icon}
              </div>
              <span className="text-[11px] sm:text-xs font-semibold leading-tight truncate w-full text-center">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
