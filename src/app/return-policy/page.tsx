'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNavBar from '@/components/BottomNavBar';
import { RotateCcw, CheckCircle, ShieldAlert } from 'lucide-react';

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <RotateCcw className="w-3.5 h-3.5" /> 7-Day Guarantee
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Return & Refund Policy
          </h1>
          <p className="text-xs text-gray-500">Last updated: January 2026</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-sm leading-relaxed shadow-sm">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              1. 7-Day Replacement Guarantee
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We stand by the quality of our products. If you receive a defective, damaged, or incorrect product, you may request a replacement within 7 days of receiving your package.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-gray-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              2. Conditions for Return
            </h2>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
              <li>The item must be unused, unwashed, and in original packaging.</li>
              <li>All tags, manuals, and accessories must be intact.</li>
              <li>Unboxing video/photo is recommended for damage claims upon arrival.</li>
            </ul>
          </section>

          <section className="space-y-2 pt-4 border-t border-gray-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              3. Refund Process
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Once your return is received and inspected, we will notify you of the approval status. Approved refunds will be processed via bKash, Nagad, or Bank Transfer within 3 to 5 business days.
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <BottomNavBar />
    </div>
  );
}
