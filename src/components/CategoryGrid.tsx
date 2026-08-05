"use client";

import React from "react";

interface CategoryGridProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = [
    { id: "All", name: "All Gifts & Prints", count: "8 Collections", icon: "🎁" },
    { id: "Mugs & Drinkware", name: "Mugs & Drinkware", count: "2 Items", icon: "☕" },
    { id: "Custom Apparel", name: "Custom Apparel", count: "1 Item", icon: "👕" },
    { id: "Photo Frames", name: "Photo Frames & Canvas", count: "2 Items", icon: "🖼️" },
    { id: "Acrylic Lights", name: "3D Acrylic Lights", count: "1 Item", icon: "💡" },
    { id: "Corporate Swag", name: "Corporate Gift Sets", count: "1 Item", icon: "💼" },
    { id: "Keychains & Crafts", name: "Keychains & Crafts", count: "1 Item", icon: "🔑" },
  ];

  return (
    <section id="categories" className="py-12 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              PERSONALIZED CATEGORIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Explore Gift & Print Hub Collections
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              Select a gift category to customize names, messages, and uploaded photos
            </p>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-32 ${
                  isSelected
                    ? "bg-rose-500/10 border-rose-500 shadow-lg shadow-rose-500/10 text-white scale-[1.03]"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <div className="text-2xl">{cat.icon}</div>
                <div>
                  <h3 className="font-bold text-xs text-white leading-tight truncate">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-zinc-500 mt-0.5 block font-medium">
                    {cat.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
