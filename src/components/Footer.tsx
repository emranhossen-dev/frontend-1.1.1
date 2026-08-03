"use client";

import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 py-16 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-emerald-400 flex items-center justify-center font-bold text-white text-sm">
                N
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                NEXUS<span className="text-indigo-400">STORE</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Premium next-gen consumer tech and electronics engineered for modern creators, gamers, and audiophiles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Shop & Browse</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#categories" className="hover:text-white transition-colors">Audio & Headphones</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">Smart Wearables</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">Gaming Keyboards & Mice</a></li>
              <li><a href="#deals" className="hover:text-white transition-colors">Special Discount Deals</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Track Order Status</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Delivery Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center & FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-sm">Join the VIP Club</h4>
            <p className="text-xs text-zinc-400">
              Subscribe to get $20 OFF your first order and exclusive tech drops.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 pt-1">
              <input
                type="email"
                placeholder="Enter your email..."
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 w-full"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition-colors flex-shrink-0"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 NexusStore Inc. All rights reserved.</p>

          {/* Payment Badges */}
          <div className="flex items-center gap-3 font-semibold text-[10px] text-zinc-400">
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">VISA</span>
            <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded">MASTERCARD</span>
            <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded">APPLE PAY</span>
            <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded">PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
