'use client';

import React from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TrustBadgesBar from '@/components/TrustBadgesBar';
import CategoryGrid from '@/components/CategoryGrid';
import FlashSaleSection from '@/components/FlashSaleSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import BottomNavBar from '@/components/BottomNavBar';
import { useStore } from '@/context/StoreContext';

export default function Home() {
  const { storeConfig, heroBanner, categories } = useStore();

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 font-sans text-gray-900 dark:text-gray-100 flex flex-col selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Top Announcement Bar */}
      <AnnouncementBar text={storeConfig.announcementText} />

      {/* Top Navigation Header */}
      <Header siteName={storeConfig.name} />

      <main className="flex-1 w-full pb-12 sm:pb-16">
        {/* Editorial Hero Banner */}
        <HeroSection banner={heroBanner} />

        {/* Value Proposition Trust Badges Bar */}
        <TrustBadgesBar />

        {/* Shop By Category Showcase */}
        <CategoryGrid categories={categories} />

        {/* Flash Sale Limited Time Deals with Countdown */}
        <FlashSaleSection />

        {/* Featured Products Showcase Grid */}
        <FeaturedProducts title="Trending Collections" />

        {/* Verified Customer Reviews & Testimonials */}
        <TestimonialsSection />
      </main>

      {/* Comprehensive E-Commerce Footer */}
      <Footer />

      {/* Sticky Mobile Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
}
