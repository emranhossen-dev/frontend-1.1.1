"use client";

import React from "react";
import { HeroSlider } from "../components/HeroSlider";
import { CategoryGrid } from "../components/CategoryGrid";
import { BestDeals } from "../components/BestDeals";
import { ProductGrid } from "../components/ProductGrid";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <CategoryGrid />
      <BestDeals />
      <ProductGrid />
    </div>
  );
}
