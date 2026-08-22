'use client';

import React from 'react';

export const LoadingSpinner: React.FC<{ fullScreen?: boolean; label?: string }> = ({
  fullScreen = false,
  label = 'Loading...',
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative w-10 h-10">
        <div className="w-10 h-10 rounded-full border-3 border-gray-200 dark:border-slate-800 border-t-black dark:border-t-white animate-spin" />
      </div>
      {label && (
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 animate-pulse">
          {label}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
        {content}
      </div>
    );
  }

  return <div className="py-12 flex justify-center">{content}</div>;
};

export const ProductSkeletonGrid: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-xl p-2.5 animate-pulse space-y-3"
        >
          <div className="w-full aspect-[3/4] bg-gray-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-3/4" />
          <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-1/2" />
          <div className="h-5 bg-gray-200 dark:bg-slate-800 rounded w-1/3 pt-2" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSpinner;
