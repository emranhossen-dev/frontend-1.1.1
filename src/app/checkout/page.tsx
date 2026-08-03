"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod" | "mobile">("cod");
  const [formData, setFormData] = useState({
    fullName: "Shamsshed Rahman",
    email: "shamsshed@example.com",
    phone: "+880 1712 345678",
    address: "House 42, Road 11, Banani",
    city: "Dhaka",
    zipCode: "1213",
    notes: "",
  });

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shippingFee = subtotal >= 200 || cart.length === 0 ? 0 : 15;
  const grandTotal = subtotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = "NX-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
        <div>
          <Navbar />
          <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-3xl">
              ✓
            </div>
            <h1 className="text-3xl font-extrabold text-white">Order Confirmed Successfully!</h1>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              Thank you for shopping with NexusStore. Your order <span className="text-indigo-400 font-bold">#{orderId}</span> has been placed and is currently being processed.
            </p>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Order Number:</span>
                <span className="text-white font-bold">#{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Estimated Delivery:</span>
                <span className="text-emerald-400 font-semibold">2 - 3 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Payment Method:</span>
                <span className="text-white font-semibold uppercase">{paymentMethod}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/account"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all"
              >
                View Order Status in Customer Dashboard →
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-sm transition-colors"
              >
                Return to Shop
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pb-6 border-b border-zinc-800">
            Checkout & Order Details
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-zinc-400 text-sm">Your cart is empty. Please add products before checking out.</p>
              <Link href="/" className="inline-block px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl text-sm">
                Return to Shop →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
              
              {/* Left 2 Columns: Forms */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* 1. Contact & Delivery Info */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">1</span>
                    Customer & Delivery Information
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-zinc-400 block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-400 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-400 block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-400 block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-zinc-400 block mb-1">Shipping Address</label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Payment Method */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">2</span>
                    Select Payment Method
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        paymentMethod === "cod"
                          ? "bg-indigo-600/10 border-indigo-500 text-white"
                          : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <div className="font-bold text-sm text-white">💵 Cash on Delivery</div>
                      <span className="text-[11px] text-zinc-500 block mt-1">Pay when you receive package</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        paymentMethod === "card"
                          ? "bg-indigo-600/10 border-indigo-500 text-white"
                          : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <div className="font-bold text-sm text-white">💳 Credit / Debit Card</div>
                      <span className="text-[11px] text-zinc-500 block mt-1">Visa, Mastercard, Amex</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("mobile")}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        paymentMethod === "mobile"
                          ? "bg-indigo-600/10 border-indigo-500 text-white"
                          : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <div className="font-bold text-sm text-white">📱 Mobile Banking</div>
                      <span className="text-[11px] text-zinc-500 block mt-1">bKash, Nagad, Rocket</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-6">
                  <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-4">
                    Items in Order ({cart.length})
                  </h2>

                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-10 h-10 bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-white truncate">{item.name}</div>
                            <span className="text-zinc-400">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-xs text-zinc-400 border-t border-zinc-800 pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-emerald-400 font-semibold">
                        {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-zinc-800">
                      <span>Total Amount</span>
                      <span className="text-emerald-400">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 transition-all text-center"
                  >
                    Place Order Now 🚀
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>
      </div>

      <Footer />
    </main>
  );
}
