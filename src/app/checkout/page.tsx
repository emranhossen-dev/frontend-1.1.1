"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import {
  HiCheckCircle,
  HiOutlineBanknotes,
  HiOutlineCreditCard,
  HiOutlineDevicePhoneMobile,
  HiOutlineArrowRight,
  HiOutlineTruck,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import Swal from "sweetalert2";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "mobile" | "card">("cod");
  const [formData, setFormData] = useState({
    fullName: "শামসেদ রহমান",
    email: "shamsshed@example.com",
    phone: "01712345678",
    address: "বাসা ৪২, রোড ১১, বনানী",
    city: "ঢাকা (Dhaka)",
    notes: "",
  });

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shippingFee = subtotal >= 3000 || cart.length === 0 ? 0 : 120;
  const grandTotal = subtotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = "WB-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsOrdered(true);

    Swal.fire({
      title: "অর্ডার সফলভাবে জমা হয়েছে!",
      text: `আপনার অর্ডার আইডি #${generatedId}। অতি শীঘ্রই আমাদের কাস্টমার কেয়ার থেকে আপনার সাথে যোগাযোগ করা হবে।`,
      icon: "success",
      confirmButtonText: "ঠিক আছে",
      confirmButtonColor: "#2563eb",
      background: "#18181b",
      color: "#ffffff",
      customClass: {
        popup: "rounded-3xl border border-zinc-800",
      },
    });

    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 sm:py-16 text-center space-y-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
          <HiCheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">অর্ডার সফলভাবে সম্পূর্ণ হয়েছে!</h1>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto">
          websites-এ কেনাকাটা করার জন্য ধন্যবাদ। আপনার অর্ডার নম্বর <span className="text-blue-400 font-bold">#{orderId}</span> প্রস্তুত করা হচ্ছে।
        </p>

        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-left max-w-md mx-auto space-y-2.5">
          <div className="flex justify-between">
            <span className="text-zinc-400">অর্ডার নম্বর:</span>
            <span className="text-white font-bold">#{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">আনূমানিক ডেলিভারি সময়:</span>
            <span className="text-emerald-400 font-semibold">২ - ৩ কার্যদিবস</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">পেমেন্ট মেথড:</span>
            <span className="text-white font-semibold uppercase">
              {paymentMethod === "cod"
                ? "ক্যাশ অন ডেলিভারি (COD)"
                : paymentMethod === "mobile"
                ? "বিকাশ / নগদ / রকেট"
                : "কার্ড পেমেন্ট"}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/account"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span>অর্ডার স্ট্যাটাস দেখুন</span>
            <HiOutlineArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs sm:text-sm transition-colors text-center"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
      <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight pb-4 sm:pb-6 border-b border-zinc-800">
        চেকআউট ও ডেলিভারি তথ্য (Checkout)
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <p className="text-zinc-400 text-xs sm:text-sm">আপনার কার্ট খালি রয়েছে। অর্ডার করার আগে পণ্য যুক্ত করুন।</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all">
            <span>কেনাকাটা করুন</span>
            <HiOutlineArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 pt-6">
          
          {/* Left 2 Columns: Shipping Forms & Payment Options */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            
            {/* 1. Customer Delivery Details */}
            <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">১</span>
                শিপিং ঠিকানা ও ডেলিভারি তথ্য
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">আপনার পূর্ণ নাম *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">মোবাইল নম্বর (জরুরি) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">ইমেইল এড্রেস</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">জেলা / শহর *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">সম্পূর্ণ ঠিকানা (বাসা নম্বর, রোড, এলাকা) *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method Selection (Mobile Grid) */}
            <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">২</span>
                পেমেন্ট মেথড নির্বাচন করুন
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === "cod"
                      ? "bg-blue-600/15 border-blue-500 text-white shadow-md"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-white">
                    <HiOutlineBanknotes className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>ক্যাশ অন ডেলিভারি</span>
                  </div>
                  <span className="text-[11px] text-zinc-400 block mt-1">পণ্য হাতে পেয়ে টাকা দিন</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("mobile")}
                  className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === "mobile"
                      ? "bg-blue-600/15 border-blue-500 text-white shadow-md"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-white">
                    <HiOutlineDevicePhoneMobile className="w-5 h-5 text-pink-400 shrink-0" />
                    <span>বিকাশ / নগদ / রকেট</span>
                  </div>
                  <span className="text-[11px] text-zinc-400 block mt-1">ইনস্ট্যান্ট বিকাশ পেমেন্ট</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "bg-blue-600/15 border-blue-500 text-white shadow-md"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-white">
                    <HiOutlineCreditCard className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>কার্ড পেমেন্ট</span>
                  </div>
                  <span className="text-[11px] text-zinc-400 block mt-1">Visa, Mastercard, Amex</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-6">
              <h2 className="text-base sm:text-lg font-bold text-white border-b border-zinc-800 pb-3">
                অর্ডারের আইটেমসমূহ ({cart.length})
              </h2>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1 no-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-11 h-11 bg-zinc-900 rounded-lg overflow-hidden shrink-0 border border-zinc-800">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white truncate text-xs">{item.name}</div>
                        <span className="text-zinc-400 text-[11px]">পরিমাণ: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-white shrink-0">৳{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Price Calculation in BDT */}
              <div className="space-y-2 text-xs text-zinc-400 border-t border-zinc-800 pt-4">
                <div className="flex justify-between">
                  <span>সাবটোটাল</span>
                  <span className="text-white font-semibold">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>শিপিং ফি</span>
                  <span className="text-emerald-400 font-semibold">
                    {shippingFee === 0 ? "ফ্রি" : `৳${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-3 border-t border-zinc-800">
                  <span>সর্বমোট বিল</span>
                  <span className="text-blue-400">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 sm:py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-500/25 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>অর্ডার নিশ্চিত করুন</span>
                <HiOutlineArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Trust Badges */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2 text-zinc-300 font-semibold">
                <HiOutlineTruck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>সারাদেশে ক্যাশ অন ডেলিভারি সুবিধা</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300 font-semibold">
                <HiOutlineShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>১০০% অরিজিনাল প্রডাক্টের গ্যারান্টি</span>
              </div>
            </div>
          </div>

        </form>
      )}
    </div>
  );
}
