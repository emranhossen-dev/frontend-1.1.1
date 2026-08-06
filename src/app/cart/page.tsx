"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import {
  HiOutlineShoppingBag,
  HiOutlineArrowRight,
  HiOutlineTrash,
  HiPlus,
  HiMinus,
  HiCheck,
  HiTag,
} from "react-icons/hi2";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  const freeShippingThreshold = 3000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : 120;
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount + (cart.length > 0 ? shippingFee : 0));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "WEBSITES10" || promoCode.trim().toUpperCase() === "SAVE10") {
      setAppliedDiscount(10);
      setPromoError("");
    } else {
      setPromoError("সঠিক কুপন কোড লিখুন (যেমন: WEBSITES10 ১০% ছাড়ের জন্য)।");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            শপিং কার্ট (Shopping Cart)
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            আপনার কার্টে {cart.length} টি আইটেম রয়েছে
          </p>
        </div>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-rose-400 hover:text-rose-300 font-semibold self-start sm:self-auto cursor-pointer"
          >
            কার্ট খালি করুন
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 space-y-6">
          <div className="w-20 h-20 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <HiOutlineShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-white">আপনার কার্ট খালি রয়েছে</h2>
          <p className="text-zinc-400 text-sm max-w-sm mx-auto">
            আমাদের ক্যাটালগ ঘুরে দেখুন এবং আপনার পছন্দের টেক প্রডাক্ট ও গেজেট যোগ করুন।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all"
          >
            <span>পণ্যসমূহ দেখুন</span>
            <HiOutlineArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const key = item.cartItemId || item.id;
              return (
                <div
                  key={key}
                  className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-20 h-20 bg-zinc-900 rounded-xl overflow-hidden shrink-0 border border-zinc-800">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-semibold text-blue-400 uppercase">
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold text-white truncate">
                        {item.name}
                      </h3>
                      <span className="text-xs text-zinc-400 block mt-0.5">৳{item.price.toLocaleString()} প্রতিটি</span>
                    </div>
                  </div>

                  {/* Quantity Modifiers & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-zinc-800/80">
                    <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-950 p-1">
                      <button
                        onClick={() => updateQuantity(key, -1)}
                        className="w-8 h-8 text-zinc-400 hover:text-white font-bold flex items-center justify-center cursor-pointer"
                      >
                        <HiMinus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 font-bold text-sm text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(key, 1)}
                        className="w-8 h-8 text-zinc-400 hover:text-white font-bold flex items-center justify-center cursor-pointer"
                      >
                        <HiPlus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-bold text-white">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </div>
                      <button
                        onClick={() => removeFromCart(key)}
                        className="text-xs text-rose-400 hover:text-rose-300 font-medium mt-1 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <HiOutlineTrash className="w-3.5 h-3.5" />
                        <span>মুছে ফেলুন</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-6">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-4">
                অর্ডার হিসাব (Order Summary)
              </h2>

              {/* Promo Code Box */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 block">কুপন কোড</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <HiTag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="e.g. WEBSITES10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    অ্যাপ্লাই
                  </button>
                </div>
                {appliedDiscount > 0 && (
                  <p className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-1">
                    <HiCheck className="w-3.5 h-3.5" />
                    <span>কুপন কোড WEBSITES10 প্রযোজ্য (১০% ছাড়)!</span>
                  </p>
                )}
                {promoError && <p className="text-xs text-rose-400 mt-1">{promoError}</p>}
              </form>

              {/* Price Breakdown in BDT */}
              <div className="space-y-3 text-xs text-zinc-400 border-t border-zinc-800 pt-4">
                <div className="flex justify-between">
                  <span>সাবটোটাল</span>
                  <span className="text-white font-semibold">৳{subtotal.toLocaleString()}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>ডিসকাউন্ট ({appliedDiscount}%)</span>
                    <span>-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ</span>
                  <span className="text-white font-semibold">
                    {isFreeShipping ? (
                      <span className="text-emerald-400 font-bold">ফ্রি (FREE)</span>
                    ) : (
                      `৳${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-zinc-800">
                  <span>সর্বমোট (Total)</span>
                  <span className="text-blue-400">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm text-center shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>অর্ডার সম্পন্ন করুন</span>
                <HiOutlineArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
