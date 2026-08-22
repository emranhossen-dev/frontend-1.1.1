'use client';

import React from 'react';
import { CartItem } from '@/types/store';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: string;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 5000;
  const progressPercent = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gray-900 dark:text-white" />
              <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">
                Your Shopping Bag ({items.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 border-b border-gray-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              <span>
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    🎉 You qualify for FREE Shipping!
                  </span>
                ) : (
                  <>Add {currency}{(freeShippingThreshold - subtotal).toLocaleString()} for Free Delivery</>
                )}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-black dark:bg-white h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-12">
                <ShoppingBag className="w-16 h-16 stroke-1 mb-4 text-gray-300 dark:text-slate-700" />
                <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
                  Your cart is empty
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Browse our catalog to add items to your shopping bag
                </p>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-800"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-24 object-cover rounded-lg bg-gray-200 dark:bg-slate-700 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-1">
                          {product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          aria-label="Remove item"
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {product.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-gray-900 dark:text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                        {currency}
                        {(product.price * quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {currency}
                    {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {subtotal >= freeShippingThreshold ? 'FREE' : `${currency}120`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-slate-800">
                  <span>Total</span>
                  <span>
                    {currency}
                    {(
                      subtotal + (subtotal >= freeShippingThreshold ? 0 : 120)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full h-12 bg-black dark:bg-white text-white dark:text-black font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 active:scale-95 transition-all shadow-lg"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
