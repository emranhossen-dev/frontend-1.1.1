'use client';

import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import BottomNavBar from '@/components/BottomNavBar';
import { useStore } from '@/context/StoreContext';

export default function Home() {
  const { storeConfig, heroBanner, categories } = useStore();

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 font-sans text-gray-900 dark:text-gray-100 flex flex-col selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Top Header with Hamburger, Title, Search & Cart */}
      <Header siteName={storeConfig.name} />

      <main className="flex-1 w-full pb-20 sm:pb-12">
        {/* Editorial Hero Banner */}
        <HeroSection banner={heroBanner} />

        {/* Shop By Category Section */}
        <CategoryGrid categories={categories} />

        {/* Featured Products Grid */}
        <FeaturedProducts title="Featured Products" />
      </main>

      {/* Sticky Mobile Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
}
