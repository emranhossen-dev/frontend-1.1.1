'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Tag, Check, Copy, ArrowRight, Clock, Truck, Gift } from 'lucide-react';

interface PromotionalEntryModalProps {
  forceOpen?: boolean;
  onCloseModal?: () => void;
}

export const PromotionalEntryModal: React.FC<PromotionalEntryModalProps> = ({
  forceOpen = false,
  onCloseModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Simulated countdown timer (12 hours, 45 mins, 30 secs)
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  const couponCode = 'ARDHI100';

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      return;
    }

    if (typeof window !== 'undefined') {
      const dismissed = sessionStorage.getItem('ardhi_promo_dismissed');
      if (!dismissed) {
        // Subtle delay to allow layout paint while background product fetch executes silently
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [forceOpen]);

  // Countdown timer tick effect
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('ardhi_promo_dismissed', 'true');
      } catch (e) {}
    }
    if (onCloseModal) onCloseModal();
  };

  const handleCopyCode = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleClaimOffer = () => {
    handleClose();
    // Scroll to flash sale or top featured products
    const flashSaleEl = document.getElementById('flash-sale');
    if (flashSaleEl) {
      flashSaleEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-md animate-fade-in transition-opacity"
      aria-modal="true"
      role="dialog"
    >
      {/* Compact Modal Container (Optimized max-width for mobile & desktop) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[360px] sm:max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-amber-200/60 dark:border-amber-500/20 transform transition-all animate-scale-in"
      >
        {/* Compact Decorative Header Banner */}
        <div className="relative bg-gradient-to-r from-amber-500 via-[#FF6B00] to-orange-600 px-5 py-5 sm:px-6 sm:py-6 text-white text-center overflow-hidden">
          {/* Background Decorative Glow */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/15 rounded-full blur-lg pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-black/15 rounded-full blur-lg pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close promotional popup"
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/25 hover:bg-black/45 text-white/90 hover:text-white backdrop-blur-xs transition-colors cursor-pointer z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Badge */}
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider mb-2 text-amber-100 border border-white/20 shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-200 animate-pulse" />
            <span>স্পেশাল মেগা অফার ⚡</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight drop-shadow-xs">
            ৳১০০ ছাড় + ফ্রি ডেলিভারি!
          </h3>
          <p className="text-[11px] sm:text-xs font-medium text-amber-100 mt-1 opacity-95">
            আজকের অর্ডারে বিশেষ ধামাকা সুবিধা উপভোগ করুন
          </p>
        </div>

        {/* Modal Main Body */}
        <div className="p-4 sm:p-5 space-y-3.5">
          {/* 2 Core Offer Highlights */}
          <div className="space-y-2">
            {/* Offer 1: Free Shipping */}
            <div className="flex items-center gap-2.5 p-2.5 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-extrabold text-gray-900 dark:text-amber-200">
                  ৳৯৯৯+ কেনাকাটায় ফ্রি ডেলিভারি!
                </span>
                <span className="block text-[10px] text-gray-500 dark:text-gray-400 font-semibold">
                  যেকোনো হোম ডেলিভারি চার্জ সম্পূর্ণ মাফ
                </span>
              </div>
            </div>

            {/* Offer 2: 100Tk Voucher */}
            <div className="flex items-center gap-2.5 p-2.5 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/40 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Gift className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-extrabold text-gray-900 dark:text-emerald-200">
                  যেকোনো পণ্য কিনলেই ৳১০০ ভাউচার!
                </span>
                <span className="block text-[10px] text-gray-500 dark:text-gray-400 font-semibold">
                  যেকোনো অর্ডারে সরাসরি ৳১০০ ছাড় পান
                </span>
              </div>
            </div>
          </div>

          {/* Countdown Timer Block */}
          <div className="bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-bold text-[11px] sm:text-xs">
              <Clock className="w-3.5 h-3.5 text-[#FF6B00] animate-spin-slow" />
              <span>অফারের সময় বাকি:</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-extrabold text-white">
              <span className="bg-gray-900 dark:bg-slate-700 px-2 py-0.5 rounded shadow-xs">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span className="text-gray-900 dark:text-white font-bold">:</span>
              <span className="bg-gray-900 dark:bg-slate-700 px-2 py-0.5 rounded shadow-xs">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span className="text-gray-900 dark:text-white font-bold">:</span>
              <span className="bg-[#FF6B00] px-2 py-0.5 rounded shadow-xs animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>

          {/* Coupon Code Section */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
              ভাউচার কোড:
            </label>
            <div className="flex items-center gap-2 p-1.5 bg-gray-100 dark:bg-slate-800 rounded-xl border border-dashed border-gray-300 dark:border-slate-700">
              <div className="flex items-center gap-1.5 pl-2.5 flex-1 font-mono text-xs sm:text-sm font-extrabold text-[#FF6B00] tracking-widest">
                <Tag className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{couponCode}</span>
              </div>
              <button
                onClick={handleCopyCode}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-gray-900 dark:bg-slate-700 hover:bg-black dark:hover:bg-slate-600 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-white" />
                    <span>কপিড!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>কপি করুন</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-1.5 pt-1">
            <button
              onClick={handleClaimOffer}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#FF6B00] to-orange-600 hover:from-[#e05e00] hover:to-orange-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>অফার নিয়ে কেনাকাটা করুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleClose}
              className="w-full py-1.5 text-center text-[11px] font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
            >
              ধন্যবাদ, পরে কিনব
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalEntryModal;
