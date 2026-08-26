'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { notifySuccess } from '@/lib/sweetalert';
import Image from 'next/image';
import {
  Send,
  PhoneCall,
  Mail,
  MapPin,
  Heart,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { storeConfig } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      notifySuccess('Subscribed Successfully!', 'Thank you for subscribing to our newsletter.');
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-20 sm:pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Newsletter Banner */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Join Our VIP Newsletter
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Get exclusive promo discount codes, new arrivals & flash sale alerts straight to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="h-12 bg-slate-950 border border-slate-700 rounded-xl px-4 text-xs text-white placeholder-slate-500 outline-none focus:border-white transition-colors w-full sm:w-72"
            />
            <button
              type="submit"
              className="h-12 px-6 bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              Subscribe
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="ArdhiMart Logo"
                width={180}
                height={45}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Curated minimalist essentials and modern luxury e-commerce experience across Bangladesh.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-slate-400 shrink-0" />
                <span>+880 1700-000000 (10 AM - 10 PM)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>support@domain.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Gulshan-2, Dhaka-1212, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/account/orders/8849201A/track" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-2">
              Customer Care & Policies
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/return-policy" className="hover:text-white transition-colors">
                  7-Day Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions (FAQ)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Payments & Courier Partners */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-2">
              Accepted Payments & Couriers
            </h4>
            
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Payment Partners
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <span className="px-2.5 py-1 bg-pink-950 text-pink-300 rounded border border-pink-900">
                  bKash
                </span>
                <span className="px-2.5 py-1 bg-orange-950 text-orange-300 rounded border border-orange-900">
                  Nagad
                </span>
                <span className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded border border-slate-700">
                  COD (Cash on Delivery)
                </span>
                <span className="px-2.5 py-1 bg-blue-950 text-blue-300 rounded border border-blue-900">
                  Visa / MasterCard
                </span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Logistics Partners
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
                <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700">
                  Steadfast Courier
                </span>
                <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700">
                  Pathao Courier
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Agency Credit Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {storeConfig.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-1.5 font-medium">
            <span>Developed with</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
            <span>by <strong className="text-white font-bold tracking-wide">Next Station 26</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
