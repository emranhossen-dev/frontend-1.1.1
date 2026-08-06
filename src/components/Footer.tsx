"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineTruck,
  HiOutlineArrowPath,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { FaBagShopping, FaHeadset } from "react-icons/fa6";
import { useCart } from "../context/CartContext";

export const Footer: React.FC = () => {
  const { setSelectedCategory } = useCart();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 text-zinc-400 pt-12 pb-24 md:pb-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-zinc-800/80">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/60">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <HiOutlineTruck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">ফ্রি হোম ডেলিভারি</h4>
              <p className="text-[10px] text-zinc-400">৳৩,০০০ টাকার কেনাকাটায়</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/60">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <HiOutlineArrowPath className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">৭ দিনের রিপ্লেসমেন্ট</h4>
              <p className="text-[10px] text-zinc-400">ইজি প্রোডাক্ট রিটার্ন</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/60">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <HiOutlineShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">১০০% অরিজিনাল</h4>
              <p className="text-[10px] text-zinc-400">ব্র্যান্ডের আসল গ্যাজেট</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/60">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FaHeadset className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">২৪/৭ কাস্টমার সাপোর্ট</h4>
              <p className="text-[10px] text-zinc-400">যেকোনো সহায়তায় পাশে</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10">
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <FaBagShopping className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-xl text-white">
                websites<span className="text-blue-500">.</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400 max-w-sm">
              বাংলাদেশের সেরা ও বিশ্বস্ত ই-কমার্স প্ল্যাটফর্ম। অরিজিনাল টেক প্রোডাক্ট, স্মার্টওয়াচ, সাউন্ড ও লাইফস্টাইল গেজেট কিনুন সেরা মূল্যে।
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              ক্যাটাগরিসমূহ
            </h4>
            <ul className="space-y-2 text-xs">
              {["Electronics", "Smartwatch", "Audio", "Accessories", "Home", "Lifestyle"].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      const el = document.getElementById("product-catalog");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              প্রয়োজনীয় লিংক
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  হোম পেজ
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  কার্ট ভিউ
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-white transition-colors">
                  চেকআউট
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  মাই অ্যাকাউন্ট
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              নিউজলেটার সাবস্ক্রিপশন
            </h4>
            <p className="text-xs text-zinc-400">
              বিশেষ অফার এবং নতুন পণ্যের আপডেট পেতে ইমেইল সাবস্ক্রাইব করুন।
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="আপনার ইমেইল নাম লিখুন"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer">
                যুক্ত হন
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} websites. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span>প্রাইভেসি পলিসি</span>
            <span>টার্মস অফ সার্ভিস</span>
            <span>শিপিং পলিসি</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
