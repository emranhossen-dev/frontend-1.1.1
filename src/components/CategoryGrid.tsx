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
    { id: "All", name: "All Products", count: "12 Items", icon: "⚡" },
    { id: "Audio", name: "Audio & Sound", count: "4 Items", icon: "🎧" },
    { id: "Wearables", name: "Smart Wearables", count: "3 Items", icon: "⌚" },
    { id: "Gaming", name: "Gaming Gear", count: "3 Items", icon: "🎮" },
    { id: "Smart Tech", name: "Smart Home", count: "2 Items", icon: "💡" },
  ];

  return (
    <section id="categories" className="py-12 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Explore by Category
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              Select a category to filter our latest tech catalog
            </p>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between h-32 ${
                  isSelected
                    ? "bg-indigo-600/10 border-indigo-500 shadow-lg shadow-indigo-500/10 text-white scale-[1.02]"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <div className="text-3xl">{cat.icon}</div>
                <div>
                  <h3 className="font-semibold text-sm text-white leading-tight">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-zinc-500 mt-0.5 block font-medium">
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
