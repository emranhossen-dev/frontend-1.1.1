'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNavBar from '@/components/BottomNavBar';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How long does delivery take inside and outside Dhaka?',
      a: 'Inside Dhaka delivery takes 24 to 48 hours via Steadfast/Pathao Courier. Outside Dhaka delivery takes 2 to 4 business days.',
    },
    {
      q: 'Is Cash on Delivery (COD) available?',
      a: 'Yes! Cash on Delivery is available across all 64 districts in Bangladesh. You pay when the rider delivers your package.',
    },
    {
      q: 'How can I track my order?',
      a: 'After placing an order, you can visit the Track Order page or click the link sent via SMS to view live status.',
    },
    {
      q: 'What is the return policy if I get a damaged item?',
      a: 'We offer a 7-Day Replacement Guarantee. Simply contact our support hotline or email us with your order ID.',
    },
    {
      q: 'Which payment methods do you accept?',
      a: 'We accept bKash, Nagad, Cash on Delivery (COD), Visa, Mastercard, and American Express.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> Support Center
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Everything you need to know about ordering, shipping, returns, and payment options.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-3xl p-4 sm:p-6 divide-y divide-gray-100 dark:divide-slate-800 shadow-sm">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center text-left gap-4 font-bold text-sm sm:text-base text-gray-900 dark:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-black dark:text-white' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
      <BottomNavBar />
    </div>
  );
}
