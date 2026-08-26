'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { defaultStoreConfig, defaultProducts } from '@/config/storeConfig';
import {
  ArrowLeft,
  Lock,
  ChevronDown,
  ShoppingBag,
  Truck,
  CreditCard,
  PhoneCall,
  CheckCircle,
} from 'lucide-react';

import { useStore } from '@/context/StoreContext';

export default function CheckoutPage() {
  const router = useRouter();
  const [storeConfig] = useState(defaultStoreConfig);
  const { cartItems, clearCart } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Accordion Expand States
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(true);
  const [activeStep, setActiveStep] = useState<'shipping' | 'delivery' | 'payment'>('shipping');

  // Form Fields State
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Dhaka');

  // Delivery & Payment Selection
  const [deliveryMethod, setDeliveryMethod] = useState<'inside' | 'outside'>('inside');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'bKash' | 'Card'>('COD');

  const cartSubtotal = cartItems.length > 0
    ? cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    : 4250;
  const shippingFee = deliveryMethod === 'inside' ? 60 : 120;
  const grandTotal = cartSubtotal + shippingFee;

  const handlePlaceOrder = async () => {
    if (!firstName || !phone || !address) {
      alert('Please fill in your Name, Phone Number, and Delivery Address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const itemsPayload = cartItems.length > 0
        ? cartItems.map((i) => ({
            productId: i.product.id,
            productName: i.product.title,
            quantity: i.quantity,
            price: i.product.price,
            image: i.product.image,
          }))
        : [{
            productId: defaultProducts[0].id,
            productName: defaultProducts[0].title,
            quantity: 1,
            price: defaultProducts[0].price,
            image: defaultProducts[0].image,
          }];

      const res = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: `${firstName} ${lastName}`.trim(),
          customerEmail: email || undefined,
          customerPhone: phone,
          shippingAddress: address,
          city: city,
          items: itemsPayload,
          subtotal: cartSubtotal,
          shippingFee: shippingFee,
          totalAmount: grandTotal,
          paymentMethod: paymentMethod,
        }),
      });

      if (res.ok) {
        clearCart();
      }
    } catch (err) {
      console.warn('Backend API order submit error fallback:', err);
    } finally {
      setIsSubmitting(false);
      router.push('/checkout/success');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans pb-28">
      {/* Transactional Top Bar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 h-16 flex items-center justify-between px-4">
        <button
          onClick={() => router.back()}
          aria-label="Back"
          className="p-2 -ml-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className="font-extrabold text-sm uppercase tracking-wider text-gray-900 dark:text-white">
          CHECKOUT
        </span>

        <div className="p-2 text-gray-400">
          <Lock className="w-4 h-4" />
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-4 space-y-4">
        {/* Order Summary Collapsible Card */}
        <section className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
          <div
            onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
            className="flex justify-between items-center cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gray-900 dark:text-white" />
              <h2 className="font-bold text-sm text-gray-900 dark:text-white">
                Order Summary (2 items)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                {storeConfig.currency}
                {grandTotal.toLocaleString()}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                  isSummaryExpanded ? 'rotate-180' : ''
                }`}
              />
            </div>
          </div>

          {/* Expanded Summary Items */}
          {isSummaryExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={defaultProducts[0].image}
                  alt={defaultProducts[0].title}
                  className="w-12 h-14 object-cover rounded-lg bg-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-xs text-gray-900 dark:text-white truncate">
                    {defaultProducts[0].title}
                  </p>
                  <p className="text-[10px] text-gray-400">QTY: 1</p>
                </div>
                <p className="font-extrabold text-xs text-gray-900 dark:text-white">
                  {storeConfig.currency}
                  {defaultProducts[0].price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={defaultProducts[1].image}
                  alt={defaultProducts[1].title}
                  className="w-12 h-14 object-cover rounded-lg bg-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-xs text-gray-900 dark:text-white truncate">
                    {defaultProducts[1].title}
                  </p>
                  <p className="text-[10px] text-gray-400">QTY: 1</p>
                </div>
                <p className="font-extrabold text-xs text-gray-900 dark:text-white">
                  {storeConfig.currency}
                  {defaultProducts[1].price.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Step 1: Shipping Information */}
        <section className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs">
          <button
            onClick={() => setActiveStep('shipping')}
            className="flex justify-between items-center w-full text-left"
          >
            <h2
              className={`font-bold text-base ${
                activeStep === 'shipping'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-400'
              }`}
            >
              1. Shipping Address
            </h2>
          </button>

          {activeStep === 'shipping' && (
            <div className="mt-4 space-y-3 pt-3 border-t border-gray-100 dark:border-slate-800">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Shakib"
                    className="w-full h-11 px-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-black dark:focus:border-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Al Hasan"
                    className="w-full h-11 px-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-black dark:focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Mobile Number (for Courier Booking) *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 01700000000"
                  className="w-full h-11 px-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-black dark:focus:border-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House/Road/Area details"
                  className="w-full h-11 px-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-black dark:focus:border-white"
                />
              </div>

              <button
                onClick={() => setActiveStep('delivery')}
                className="w-full h-11 bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider rounded-xl mt-2 hover:bg-gray-800 transition-colors"
              >
                Continue to Delivery
              </button>
            </div>
          )}
        </section>

        {/* Step 2: Delivery Option */}
        <section className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs">
          <button
            onClick={() => setActiveStep('delivery')}
            className="flex justify-between items-center w-full text-left"
          >
            <h2
              className={`font-bold text-base ${
                activeStep === 'delivery'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-400'
              }`}
            >
              2. Delivery Method
            </h2>
          </button>

          {activeStep === 'delivery' && (
            <div className="mt-4 space-y-3 pt-3 border-t border-gray-100 dark:border-slate-800">
              <label
                onClick={() => {
                  setDeliveryMethod('inside');
                  setCity('Dhaka');
                }}
                className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${
                  deliveryMethod === 'inside'
                    ? 'border-black dark:border-white bg-gray-50 dark:bg-slate-800'
                    : 'border-gray-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <div>
                    <span className="font-bold text-xs text-gray-900 dark:text-white block">
                      Inside Dhaka City
                    </span>
                    <span className="text-[10px] text-gray-500">
                      Steadfast / Pathao Delivery (24-48 Hours)
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-xs text-gray-900 dark:text-white">
                  {storeConfig.currency}60
                </span>
              </label>

              <label
                onClick={() => {
                  setDeliveryMethod('outside');
                  setCity('Outside Dhaka');
                }}
                className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${
                  deliveryMethod === 'outside'
                    ? 'border-black dark:border-white bg-gray-50 dark:bg-slate-800'
                    : 'border-gray-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <div>
                    <span className="font-bold text-xs text-gray-900 dark:text-white block">
                      Outside Dhaka (All Bangladesh)
                    </span>
                    <span className="text-[10px] text-gray-500">
                      Express Courier Delivery (2-3 Days)
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-xs text-gray-900 dark:text-white">
                  {storeConfig.currency}120
                </span>
              </label>

              <button
                onClick={() => setActiveStep('payment')}
                className="w-full h-11 bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider rounded-xl mt-2 hover:bg-gray-800 transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          )}
        </section>

        {/* Step 3: Payment Selection */}
        <section className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs">
          <button
            onClick={() => setActiveStep('payment')}
            className="flex justify-between items-center w-full text-left"
          >
            <h2
              className={`font-bold text-base ${
                activeStep === 'payment'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-400'
              }`}
            >
              3. Payment Options
            </h2>
          </button>

          {activeStep === 'payment' && (
            <div className="mt-4 space-y-3 pt-3 border-t border-gray-100 dark:border-slate-800">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('COD')}
                  className={`py-3 px-2 border rounded-xl font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-sm'
                      : 'border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <PhoneCall className="w-4 h-4" />
                  COD
                </button>

                <button
                  onClick={() => setPaymentMethod('bKash')}
                  className={`py-3 px-2 border rounded-xl font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'bKash'
                      ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-sm'
                      : 'border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  bKash
                </button>

                <button
                  onClick={() => setPaymentMethod('Card')}
                  className={`py-3 px-2 border rounded-xl font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'Card'
                      ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-sm'
                      : 'border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  Card
                </button>
              </div>

              {paymentMethod === 'COD' && (
                <p className="text-xs text-gray-500 bg-gray-50 dark:bg-slate-800 p-3 rounded-xl">
                  💵 Pay with Cash when courier delivers product to your address.
                </p>
              )}

              {paymentMethod === 'bKash' && (
                <p className="text-xs text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40 p-3 rounded-xl font-medium">
                  📱 bKash Merchant Payment option will open after clicking Place Order.
                </p>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-gray-200/80 dark:border-slate-800 p-4 z-40 shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">Total (Including VAT & Delivery)</span>
            <span className="font-extrabold text-base text-gray-900 dark:text-white">
              {storeConfig.currency}
              {grandTotal.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full h-13 bg-black dark:bg-white text-white dark:text-black font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg active:scale-95"
          >
            <Lock className="w-4 h-4" />
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
