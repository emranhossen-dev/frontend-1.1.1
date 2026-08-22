'use client';

import React from 'react';
import { Home, LayoutGrid, Search, Heart, User } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  wishlistCount: number;
  onOpenSearch: () => void;
  onOpenCategories: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  setActiveTab,
  wishlistCount,
  onOpenSearch,
  onOpenCategories,
}) => {
  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      action: () => setActiveTab('home'),
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: LayoutGrid,
      action: () => {
        setActiveTab('categories');
        onOpenCategories();
      },
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      action: () => {
        setActiveTab('search');
        onOpenSearch();
      },
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: Heart,
      badge: wishlistCount > 0 ? wishlistCount : undefined,
      action: () => setActiveTab('wishlist'),
    },
    {
      id: 'account',
      label: 'Account',
      icon: User,
      action: () => setActiveTab('account'),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-gray-200/80 dark:border-slate-800 h-16 flex items-center justify-around px-2 sm:hidden transition-colors shadow-lg">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={tab.action}
            className={`flex flex-col items-center justify-center w-14 py-1 relative transition-all active:scale-90 ${
              isActive
                ? 'text-black dark:text-white font-bold'
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium'
            }`}
          >
            <div className="relative">
              <IconComponent
                className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`}
              />
              {tab.badge !== undefined && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </div>

            <span className="text-[10px] uppercase tracking-wider mt-1 font-semibold">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;
