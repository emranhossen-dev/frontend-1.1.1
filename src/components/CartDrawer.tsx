"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    clearCart,
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 100;
  const amountLeftForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-zinc-100 flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="text-lg font-bold text-white">Your Customized Gifts ({cart.length})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-zinc-900/80 px-6 py-3 border-b border-zinc-800 text-xs">
            {amountLeftForFreeShipping > 0 ? (
              <p className="text-zinc-400 font-medium">
                Add <span className="text-rose-400 font-bold">${amountLeftForFreeShipping.toFixed(2)}</span> more to qualify for <span className="text-white font-bold">FREE Gift Shipping</span>!
              </p>
            ) : (
              <p className="text-emerald-400 font-bold flex items-center gap-1.5">
                🎉 You've unlocked FREE Gift Shipping!
              </p>
            )}
            <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-zinc-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-zinc-300 font-semibold text-base">Your cart is empty</h3>
                <p className="text-zinc-500 text-xs max-w-xs mx-auto">
                  Start customizing mugs, hoodies, photo frames, and executive gift sets!
                </p>
              </div>
            ) : (
              cart.map((item) => {
                const itemId = item.cartItemId || item.id;
                return (
                  <div
                    key={itemId}
                    className="flex flex-col gap-2 p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800"
                  >
                    <div className="flex gap-4 items-center justify-between">
                      <div className="relative w-16 h-16 bg-zinc-900 rounded-xl overflow-hidden flex-shrink-0 border border-zinc-800">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                        <span className="text-xs text-zinc-400">${item.price} each</span>
                        
                        {/* Customization Badges */}
                        {item.customText && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold">
                              Text: "{item.customText}"
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="text-right font-black text-sm text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                      <div className="flex items-center border border-zinc-800 rounded-lg bg-zinc-950">
                        <button
                          onClick={() => updateQuantity(itemId, -1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(itemId, 1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(itemId)}
                        className="text-xs text-rose-400 hover:text-rose-300 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-900/40 space-y-4">
              <div className="space-y-2 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald-400 font-semibold">
                    {subtotal >= freeShippingThreshold ? "FREE" : "$9.99"}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-white font-bold pt-2 border-t border-zinc-800">
                  <span>Total</span>
                  <span className="text-rose-400">
                    ${(subtotal + (subtotal >= freeShippingThreshold ? 0 : 9.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert("Order Placed! Thank you for shopping with Gift & Print Hub.");
                  clearCart();
                  setIsCartOpen(false);
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold shadow-lg shadow-rose-500/20 transition-all text-sm text-center"
              >
                Checkout Custom Order
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
