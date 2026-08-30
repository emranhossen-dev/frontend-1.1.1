'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Tag, Check, Copy, ArrowRight, Clock, ShieldCheck, Gift } from 'lucide-react';

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

  const couponCode = 'ARDHI2026';

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
        sessionStorage.getItem('ardhi_promo_dismissed');
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
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-amber-200/50 dark:border-amber-500/20 transform transition-all animate-scale-in"
      >
        {/* Top Decorative Background Banner */}
        <div className="relative bg-gradient-to-r from-amber-500 via-[#FF6B00] to-orange-600 p-6 sm:p-8 text-white overflow-hidden">
          {/* Background Decorative Rings & Glow */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-black/10 rounded-full blur-xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close promotional popup"
            className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white/90 hover:text-white backdrop-blur-xs transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3 text-amber-100 border border-white/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
            <span>বিশেষ ওয়েলকাম অফার ⚡</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight drop-shadow-xs">
            পাবেন ২০% পর্যন্ত ছাড়!
          </h3>
          <p className="text-xs sm:text-sm font-medium text-amber-100 mt-1.5 opacity-95">
            আজকের দিনে আপনার যেকোনো অর্ডারে স্পেশাল ডিসকাউন্ট উপভোগ করুন।
          </p>
        </div>

        {/* Modal Main Body */}
        <div className="p-5 sm:p-7 space-y-5">
          {/* Countdown Timer Block */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/40 rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-xs sm:text-sm">
              <Clock className="w-4 h-4 text-[#FF6B00] animate-spin-slow" />
              <span>অফারের সময় বাকি:</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-white">
              <span className="bg-gray-900 dark:bg-slate-800 px-2.5 py-1 rounded-lg shadow-xs">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span className="text-gray-900 dark:text-white font-bold">:</span>
              <span className="bg-gray-900 dark:bg-slate-800 px-2.5 py-1 rounded-lg shadow-xs">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span className="text-gray-900 dark:text-white font-bold">:</span>
              <span className="bg-[#FF6B00] px-2.5 py-1 rounded-lg shadow-xs animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>

          {/* Coupon Code Section */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              আপনার স্পেশাল ভাউচার কোড:
            </label>
            <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-slate-800 rounded-xl border border-dashed border-gray-300 dark:border-slate-700">
              <div className="flex items-center gap-2 pl-3 flex-1 font-mono text-sm sm:text-base font-extrabold text-[#FF6B00] tracking-widest">
                <Tag className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{couponCode}</span>
              </div>
              <button
                onClick={handleCopyCode}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-gray-900 dark:bg-slate-700 hover:bg-black dark:hover:bg-slate-600 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>কপি করা হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>কপি করুন</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Key Value Highlights */}
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-slate-800/50">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>১০০% আসল প্রোডাক্ট</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-slate-800/50">
              <Gift className="w-4 h-4 text-amber-500 shrink-0" />
              <span>ফাস্ট ক্যাশ অন ডেলিভারি</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleClaimOffer}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-[#FF6B00] to-orange-600 hover:from-[#e05e00] hover:to-orange-700 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>অফার নিয়ে কেনাকাটা শুরু করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleClose}
              className="w-full py-2 text-center text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
            >
              ধন্যবাদ, পরে কেনাকাটা করব
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalEntryModal;
