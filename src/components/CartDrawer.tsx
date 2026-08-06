"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import {
  HiXMark,
  HiOutlineTrash,
  HiPlus,
  HiMinus,
  HiOutlineShoppingBag,
  HiOutlineArrowRight,
  HiCheck,
  HiTag,
  HiSparkles,
} from "react-icons/hi2";
import Link from "next/link";

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, subtotal, totalItems } =
    useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoApplied, setPromoApplied] = useState("");

  if (!isCartOpen) return null;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "WEBSITES10" || promoCode.trim().toUpperCase() === "SAVE10") {
      setDiscount(0.1);
      setPromoApplied("WEBSITES10 (১০% ছাড়)");
      setPromoError("");
    } else {
      setPromoError("সঠিক কুপন কোড লিখুন (যেমন: WEBSITES10)");
    }
  };

  const discountAmount = subtotal * discount;
  const freeShippingThreshold = 3000;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-zinc-950/80 backdrop-blur-md transition-opacity">
      <div
        className="fixed inset-0"
        onClick={() => setIsCartOpen(false)}
        aria-label="Close background backdrop"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-900 border-l border-zinc-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/30">
                <HiOutlineShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-base font-black text-white">শপিং কার্ট (Shopping Cart)</h2>
                <p className="text-xs text-zinc-400">{totalItems} টি পণ্য সিলেক্ট করেছেন</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-zinc-950/60 border-b border-zinc-800/80">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <div className="flex items-center gap-1.5 text-zinc-300">
                {remainingForFreeShipping <= 0 && <HiSparkles className="w-4 h-4 text-amber-400 shrink-0" />}
                <span>
                  {remainingForFreeShipping > 0
                    ? `ফ্রি ডেলিভারির জন্য আরও ৳${remainingForFreeShipping.toLocaleString()} টাকার কেনাকাটা করুন`
                    : "অভিনন্দন! আপনি পাচ্ছেন ফ্রি এক্সপ্রেস ডেলিভারি!"}
                </span>
              </div>
              <span className="text-blue-400 font-bold">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-zinc-500 mb-4">
                  <HiOutlineShoppingBag className="w-8 h-8 text-zinc-500" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">আপনার কার্ট খালি রয়েছে</h3>
                <p className="text-xs text-zinc-400 max-w-xs mb-6">
                  আমাদের নতুন গেজেট ও অফারসমূহ এক্সপ্লোর করে পণ্য যুক্ত করুন।
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 cursor-pointer"
                >
                  কেনাকাটা শুরু করুন
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const key = item.cartItemId || item.id;
                return (
                  <div
                    key={key}
                    className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex gap-3 items-center relative group"
                  >
                    <div className="w-20 h-20 rounded-xl bg-zinc-900 overflow-hidden shrink-0 border border-zinc-800">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate leading-snug">
                        {item.name}
                      </h4>
                      {(item.variantColor || item.variantSize) && (
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          {item.variantColor} {item.variantSize && `• ${item.variantSize}`}
                        </p>
                      )}
                      <div className="text-xs font-black text-blue-400 mt-1">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-zinc-800/60">
                        <div className="flex items-center border border-zinc-800 rounded-lg bg-zinc-900 p-0.5">
                          <button
                            onClick={() => updateQuantity(key, -1)}
                            className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                          >
                            <HiMinus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(key, 1)}
                            className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                          >
                            <HiPlus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(key)}
                          className="p-1 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-800 bg-zinc-950 space-y-4">
              {/* Promo Code Input */}
              <div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <HiTag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="কুপন কোড (e.g. WEBSITES10)"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white uppercase placeholder:normal-case focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs cursor-pointer"
                  >
                    অ্যাপ্লাই
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                    <HiCheck className="w-3 h-3" />
                    <span>প্রযোজ্য {promoApplied}</span>
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-400 font-semibold mt-1">{promoError}</p>
                )}
              </div>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>সাবটোটাল</span>
                  <span className="font-semibold text-white">৳{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>ডিসকাউন্ট (১০%)</span>
                    <span>-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ</span>
                  <span className="font-semibold text-emerald-400">
                    {subtotal >= freeShippingThreshold ? "ফ্রি" : "৳১২০"}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-zinc-800">
                  <span>সর্বমোট (Total)</span>
                  <span className="text-blue-400">৳{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>অর্ডার সম্পন্ন করুন</span>
                <HiOutlineArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
