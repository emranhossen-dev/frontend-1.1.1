'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const PageNavigationLoader: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show brief spinner transition on route change
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Top Loading Progress Bar */}
      <div className="h-1 w-full bg-gray-200/50 overflow-hidden">
        <div className="h-full bg-black dark:bg-white animate-pulse rounded-r" style={{ width: '70%' }} />
      </div>

      {/* Subtle Center Spinner Toast */}
      <div className="fixed top-20 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-gray-200/80 dark:border-slate-800 rounded-full px-4 py-2 shadow-lg flex items-center gap-2.5 animate-fade-in pointer-events-auto">
        <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-slate-700 border-t-black dark:border-t-white animate-spin" />
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
          Loading Page...
        </span>
      </div>
    </div>
  );
};

export default PageNavigationLoader;
