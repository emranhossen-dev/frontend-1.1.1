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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-violet-600 flex items-center justify-center font-bold text-white text-xs">
                🎁
              </div>
              <span className="font-black text-lg tracking-tight text-white">
                GIFT <span className="text-rose-400">&</span> PRINT HUB
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Crafting personalized custom gifts, photo ceramic mugs, custom hoodies, engraved wooden frames, and executive corporate merchandise with premium HD printing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Gift Categories</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#categories" className="hover:text-white transition-colors">Magic Photo Mugs & Tumblers</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">Custom Embroidered Hoodies</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">Laser Engraved Wooden Frames</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">3D Acrylic LED Lamps</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">Executive Corporate Swag</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Custom Orders & Help</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Bulk Corporate Orders</a></li>
              <li><a href="#" className="hover:text-white transition-colors">HD Photo Printing Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Express Delivery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">100% Quality Satisfaction Guarantee</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Get $10 OFF Your First Custom Gift</h4>
            <p className="text-xs text-zinc-400">
              Subscribe for exclusive seasonal gift guides, custom discount codes, and new printable drops.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 pt-1">
              <input
                type="email"
                placeholder="Enter your email..."
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 w-full"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold rounded-xl text-xs transition-colors flex-shrink-0"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 Gift & Print Hub Inc. All rights reserved.</p>

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
