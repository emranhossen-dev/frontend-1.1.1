"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { CartDrawer } from "../../components/CartDrawer";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  const freeShippingThreshold = 200;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : 15;
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount + (cart.length > 0 ? shippingFee : 0));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "NEXUS10") {
      setAppliedDiscount(10);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try 'NEXUS10' for 10% OFF.");
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Shopping Cart
              </h1>
              <p className="text-zinc-400 text-sm mt-1">
                You have {cart.length} item(s) in your cart
              </p>
            </div>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold self-start sm:self-auto"
              >
                Clear Cart
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-6">
              <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-zinc-600">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
              <p className="text-zinc-400 text-sm max-w-sm mx-auto">
                Explore our tech catalog and add your favorite headphones, wearables, and gaming gear.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all"
              >
                Explore Products →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
              
              {/* Left Column: Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-20 h-20 bg-zinc-900 rounded-xl overflow-hidden flex-shrink-0 border border-zinc-800">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-semibold text-indigo-400 uppercase">
                          {item.category}
                        </span>
                        <Link href={`/products/${item.id}`} className="block">
                          <h3 className="text-base font-bold text-white hover:text-indigo-300 transition-colors truncate">
                            {item.name}
                          </h3>
                        </Link>
                        <span className="text-xs text-zinc-400 block mt-0.5">${item.price} each</span>
                      </div>
                    </div>

                    {/* Quantity Modifiers & Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-zinc-800/80">
                      <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-950 p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 text-zinc-400 hover:text-white font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 font-bold text-sm text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 text-zinc-400 hover:text-white font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-bold text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-rose-400 hover:text-rose-300 font-medium mt-1 block"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Order Summary Sidebar */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-6">
                  <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-4">
                    Order Summary
                  </h2>

                  {/* Promo Code Box */}
                  <form onSubmit={handleApplyPromo} className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 block">Promo Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Try 'NEXUS10'"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 flex-1 uppercase"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl text-xs transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {appliedDiscount > 0 && (
                      <p className="text-xs text-emerald-400 font-medium">
                        ✓ Promo code NEXUS10 applied (10% OFF)!
                      </p>
                    )}
                    {promoError && <p className="text-xs text-rose-400">{promoError}</p>}
                  </form>

                  {/* Price Breakdown */}
                  <div className="space-y-3 text-xs text-zinc-400 border-t border-zinc-800 pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-semibold">
                        <span>Discount ({appliedDiscount}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span className="text-white font-semibold">
                        {isFreeShipping ? (
                          <span className="text-emerald-400 font-bold">FREE</span>
                        ) : (
                          `$${shippingFee.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-zinc-800">
                      <span>Grand Total</span>
                      <span className="text-indigo-400">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="block w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm text-center shadow-lg shadow-indigo-600/30 transition-all"
                  >
                    Proceed to Checkout →
                  </Link>
                </div>
              </div>

            </div>
          )}

        </div>

        <CartDrawer />
      </div>

      <Footer />
    </main>
  );
}
