'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { defaultStoreConfig } from '@/config/storeConfig';
import { CheckCircle2, ArrowRight, Package } from 'lucide-react';

export default function OrderSuccessPage() {
  const router = useRouter();
  const [storeConfig] = useState(defaultStoreConfig);

  const orderId = `#ORD-${Math.floor(1000 + Math.random() * 9000)}-XL`;

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Animated Background Confetti Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-1/4 w-3 h-3 bg-black dark:bg-white rounded-full animate-bounce" />
        <div className="absolute top-20 right-1/3 w-2 h-4 bg-emerald-500 rotate-45 animate-pulse" />
        <div className="absolute bottom-1/3 left-10 w-4 h-2 bg-indigo-500 -rotate-12" />
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-amber-500 rounded-full" />
      </div>

      <main className="w-full max-w-md bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6 relative z-10 animate-fade-in-up">
        {/* Animated Checkmark Circle */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center animate-scale-in">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5px]" />
          </div>
        </div>

        {/* Success Message */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Thank you for your purchase. We&apos;ve sent a confirmation SMS & Email.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-gray-50 dark:bg-slate-800/50 border border-gray-200/80 dark:border-slate-800 rounded-2xl p-4 text-left space-y-3 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-slate-800">
            <span className="text-gray-500 font-semibold uppercase tracking-wider">Order Details</span>
            <span className="font-extrabold text-black dark:text-white">{orderId}</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-gray-500">Estimated Delivery</span>
            <span className="font-bold text-gray-900 dark:text-white">2 - 3 Days</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-slate-800 text-sm">
            <span className="font-bold text-gray-900 dark:text-white">Total Amount</span>
            <span className="font-extrabold text-base text-gray-900 dark:text-white">
              {storeConfig.currency}4,310
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => alert(`Tracking Order ${orderId}`)}
            className="w-full h-12 bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-md active:scale-95"
          >
            <Package className="w-4 h-4" />
            Track Order
          </button>

          <Link
            href="/products"
            className="w-full h-12 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors active:scale-95"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
