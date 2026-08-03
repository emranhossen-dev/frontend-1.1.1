"use client";

import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { HeroCarousel } from "../components/HeroCarousel";
import { CategoryGrid } from "../components/CategoryGrid";
import { ProductGrid } from "../components/ProductGrid";
import { CartDrawer } from "../components/CartDrawer";
import { Footer } from "../components/Footer";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        <Navbar />
        <HeroCarousel />
        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <ProductGrid selectedCategory={selectedCategory} />
        <CartDrawer />
      </div>
      <Footer />
    </main>
  );
}
