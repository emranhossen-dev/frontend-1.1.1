'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { defaultStoreConfig, defaultProducts } from '@/config/storeConfig';
import {
  ArrowLeft,
  Truck,
  Check,
  MapPin,
  HelpCircle,
  PackageCheck,
} from 'lucide-react';

interface OrderTrackingPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderTrackingPage({ params }: OrderTrackingPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const orderId = resolvedParams.id || '8849201A';

  const [storeConfig] = useState(defaultStoreConfig);

  const timelineSteps = [
    {
      title: 'Order Placed',
      description: 'We have received your order.',
      time: 'MAY 22, 09:00 AM',
      status: 'completed',
    },
    {
      title: 'Processing',
      description: 'Order packed & handed over to courier.',
      time: 'MAY 23, 14:15 PM',
      status: 'completed',
    },
    {
      title: 'Out for Delivery',
      description: 'Courier is on the way to your shipping address.',
      time: 'TODAY, 08:30 AM',
      status: 'active',
    },
    {
      title: 'Delivered',
      description: 'Pending delivery confirmation.',
      time: 'Est. MAY 24TH',
      status: 'pending',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans pb-12">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 h-16 flex items-center justify-between px-4">
        <button
          onClick={() => router.back()}
          aria-label="Back"
          className="p-2 -ml-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className="font-extrabold text-sm uppercase tracking-wider text-gray-900 dark:text-white">
          TRACKING
        </span>

        <div className="w-9" />
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full space-y-6">
        {/* Order Header Summary */}
        <section className="bg-white dark:bg-slate-900 p-4 sm:p-6 border-b border-gray-200/80 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                Order #{orderId}
              </h1>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                Arriving May 24th, 2026
              </p>
            </div>

            <div className="bg-black dark:bg-white text-white dark:text-black font-extrabold text-[10px] uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Truck className="w-3.5 h-3.5" />
              SHIPPED
            </div>
          </div>

          <div className="flex gap-4 p-3 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-800">
            <img
              src={defaultProducts[0].image}
              alt={defaultProducts[0].title}
              className="w-16 h-20 object-cover rounded-xl bg-gray-200 dark:bg-slate-700 shrink-0"
            />
            <div className="flex flex-col justify-center">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                {defaultProducts[0].title}
              </h3>
              <p className="text-xs text-gray-500 mt-1 font-medium">Qty: 1</p>
            </div>
          </div>
        </section>

        {/* Map View Mockup */}
        <section className="relative h-48 bg-slate-200 dark:bg-slate-800 overflow-hidden border-b border-gray-200 dark:border-slate-800">
          <img
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop"
            alt="Delivery Location Map"
            className="w-full h-full object-cover grayscale opacity-60"
          />
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-white dark:from-slate-900 via-white/80 dark:via-slate-900/80 to-transparent">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-gray-200 dark:border-slate-800 rounded-2xl p-3 flex items-center gap-3 shadow-lg">
              <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Courier Partner
                </p>
                <p className="text-xs font-bold text-gray-900 dark:text-white">
                  Steadfast Express (Rider: Alex)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tracking Timeline */}
        <section className="px-4 py-4 space-y-4">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
            Tracking History
          </h2>

          <div className="relative pl-4 space-y-8">
            {timelineSteps.map((step, idx) => {
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';

              return (
                <div key={idx} className="relative flex gap-4 items-start group">
                  {/* Timeline Connecting Line */}
                  {idx < timelineSteps.length - 1 && (
                    <div
                      className={`absolute left-3 top-6 bottom-0 w-0.5 -ml-px ${
                        isCompleted ? 'bg-black dark:bg-white' : 'bg-gray-200 dark:bg-slate-800'
                      }`}
                    />
                  )}

                  {/* Indicator Dot */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center z-10 shrink-0 mt-0.5 transition-all ${
                      isCompleted
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : isActive
                        ? 'bg-black text-white dark:bg-white dark:text-black ring-4 ring-gray-200 dark:ring-slate-800'
                        : 'bg-gray-100 dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-700'
                    }`}
                  >
                    {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                    {isActive && <div className="w-2 h-2 rounded-full bg-white dark:bg-black" />}
                  </div>

                  {/* Text Details */}
                  <div className={step.status === 'pending' ? 'opacity-50' : ''}>
                    <h3
                      className={`text-sm font-bold ${
                        isActive
                          ? 'text-black dark:text-white'
                          : 'text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {step.description}
                    </p>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1 block">
                      {step.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Support Link */}
        <section className="px-4 pt-4 flex justify-center">
          <button
            onClick={() => alert('Customer Support Hotline: +8801700000000')}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <HelpCircle className="w-4 h-4" /> Need Help with this order?
          </button>
        </section>
      </main>
    </div>
  );
}
