'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, LayoutGrid, Search, ShoppingBag, User } from 'lucide-react';

interface BottomNavBarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  wishlistCount?: number;
  onOpenSearch?: () => void;
  onOpenCategories?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onOpenSearch,
  onOpenCategories,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      href: '/',
      isActive: pathname === '/',
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: LayoutGrid,
      href: '/products',
      isActive: pathname === '/products',
      action: onOpenCategories,
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      href: '#',
      action: onOpenSearch || (() => router.push('/products')),
      isActive: activeTab === 'search',
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingBag,
      href: '/cart',
      isActive: pathname === '/cart' || pathname === '/checkout',
    },
    {
      id: 'account',
      label: 'Account',
      icon: User,
      href: '/account',
      isActive: pathname.startsWith('/account'),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-gray-200/80 dark:border-slate-800 h-16 flex items-center justify-around px-2 sm:hidden transition-colors shadow-lg">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const active = tab.isActive;

        if (tab.action) {
          return (
            <button
              key={tab.id}
              onClick={tab.action}
              className={`flex flex-col items-center justify-center w-14 py-1 relative transition-all active:scale-90 ${
                active
                  ? 'text-black dark:text-white font-bold'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium'
              }`}
            >
              <IconComponent className={`w-5 h-5 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] uppercase tracking-wider mt-1 font-semibold">
                {tab.label}
              </span>
            </button>
          );
        }

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`flex flex-col items-center justify-center w-14 py-1 relative transition-all active:scale-90 ${
              active
                ? 'text-black dark:text-white font-bold'
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium'
            }`}
          >
            <IconComponent className={`w-5 h-5 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-[10px] uppercase tracking-wider mt-1 font-semibold">
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;
