'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { defaultStoreConfig, defaultProducts } from '@/config/storeConfig';
import { Product, CartItem } from '@/types/store';
import CartDrawer from '@/components/CartDrawer';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
} from 'lucide-react';

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const [storeConfig] = useState(defaultStoreConfig);
  // Find product by id or fallback to default product 1
  const product: Product =
    defaultProducts.find((p) => p.id === productId) || defaultProducts[0];

  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1581783342308-f792dbdd77c5?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Matte White');
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>(
    'description'
  );
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const colors = [
    { name: 'Matte White', bg: 'bg-[#fdf8f8] border-gray-300' },
    { name: 'Onyx Black', bg: 'bg-[#1c1b1b]' },
    { name: 'Soft Beige', bg: 'bg-[#dcd7d5]' },
  ];

  const sizes = ['Small', 'Medium', 'Large'];

  const discountPercent = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 20;

  const handleAddToCart = () => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    alert('Redirecting to Checkout Flow!');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 h-16 flex items-center justify-between px-4">
        <button
          onClick={() => router.back()}
          aria-label="Back"
          className="p-2 -ml-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className="font-extrabold text-sm uppercase tracking-wider text-gray-900 dark:text-white">
          DETAILS
        </span>

        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          aria-label="Wishlist"
          className="p-2 -mr-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-95"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? 'fill-red-500 text-red-500' : ''
            }`}
          />
        </button>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto">
        {/* Image Gallery Carousel */}
        <section className="relative w-full aspect-[4/5] sm:aspect-square bg-gray-100 dark:bg-slate-900 overflow-hidden">
          <div className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="min-w-full h-full snap-center relative"
                onClick={() => setActiveImageIndex(idx)}
              >
                <img
                  src={img}
                  alt={`${product.title} view ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2">
            {galleryImages.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeImageIndex === idx
                    ? 'bg-black dark:bg-white w-6'
                    : 'bg-black/30 dark:bg-white/30'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Product Info Section */}
        <section className="px-4 py-6 space-y-4">
          <div className="flex justify-between items-start gap-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {product.title}
            </h1>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: product.title,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Product link copied to clipboard!');
                }
              }}
              aria-label="Share"
              className="p-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              {product.rating.toFixed(1)} (124 reviews)
            </span>
          </div>

          {/* Pricing & Discount Tag */}
          <div className="flex items-center gap-3 pt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {storeConfig.currency}
              {product.price.toLocaleString()}
            </span>
            {product.comparePrice && (
              <span className="text-base text-gray-400 line-through font-medium">
                {storeConfig.currency}
                {product.comparePrice.toLocaleString()}
              </span>
            )}
            <span className="bg-black dark:bg-white text-white dark:text-black font-extrabold text-xs px-2.5 py-1 rounded-md">
              {discountPercent}% OFF
            </span>
          </div>
        </section>

        {/* Selectors Section */}
        <section className="px-4 py-6 border-t border-gray-200 dark:border-slate-800 space-y-6">
          {/* Color Variant Selector */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
              Color:{' '}
              <span className="text-gray-500 dark:text-gray-400 font-medium capitalize">
                {selectedColor}
              </span>
            </h3>
            <div className="flex gap-3">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-10 h-10 rounded-full border-2 p-0.5 flex items-center justify-center transition-all ${
                    selectedColor === c.name
                      ? 'border-black dark:border-white scale-110 shadow-sm'
                      : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <span className={`w-full h-full rounded-full ${c.bg}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Size Variant Selector */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Size
              </h3>
              <button
                onClick={() => alert('Size Guide: Standard International Fit')}
                className="text-xs text-gray-500 hover:text-black dark:hover:text-white underline"
              >
                Size Guide
              </button>
            </div>
            <div className="flex gap-3">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all ${
                    selectedSize === s
                      ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-sm'
                      : 'border-gray-200 dark:border-slate-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
              Quantity
            </h3>
            <div className="flex items-center border border-gray-300 dark:border-slate-700 rounded-xl w-36 h-12 bg-white dark:bg-slate-900">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex-1 h-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-l-xl"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="flex-1 text-center font-extrabold text-sm text-gray-900 dark:text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex-1 h-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-r-xl"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Dynamic Multi-Tab Section */}
        <section className="border-t border-gray-200 dark:border-slate-800">
          <div className="flex border-b border-gray-200 dark:border-slate-800 px-4">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 mr-6 text-xs font-bold tracking-wider uppercase border-b-2 transition-all ${
                activeTab === 'description'
                  ? 'border-black dark:border-white text-black dark:text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Description
            </button>

            <button
              onClick={() => setActiveTab('specifications')}
              className={`py-4 mr-6 text-xs font-bold tracking-wider uppercase border-b-2 transition-all ${
                activeTab === 'specifications'
                  ? 'border-black dark:border-white text-black dark:text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Specifications
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 text-xs font-bold tracking-wider uppercase border-b-2 transition-all ${
                activeTab === 'reviews'
                  ? 'border-black dark:border-white text-black dark:text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Reviews (124)
            </button>
          </div>

          <div className="p-4 text-sm text-gray-600 dark:text-gray-300 space-y-3 leading-relaxed">
            {activeTab === 'description' && (
              <>
                <p>
                  Hand-crafted from premium stoneware clay, this minimalist piece embodies quiet luxury and modern elegance. Its organic curves and matte finish are designed to complement rather than overpower your interior space.
                </p>
                <p>
                  Each piece is unique, featuring subtle natural variations in texture that highlight the artisanal craftsmanship process.
                </p>
              </>
            )}

            {activeTab === 'specifications' && (
              <ul className="space-y-2">
                <li className="flex justify-between py-1 border-b border-gray-100 dark:border-slate-800">
                  <span className="font-semibold text-gray-900 dark:text-white">Material</span>
                  <span>Artisanal Ceramic</span>
                </li>
                <li className="flex justify-between py-1 border-b border-gray-100 dark:border-slate-800">
                  <span className="font-semibold text-gray-900 dark:text-white">Dimensions</span>
                  <span>12&quot; H x 6&quot; W</span>
                </li>
                <li className="flex justify-between py-1 border-b border-gray-100 dark:border-slate-800">
                  <span className="font-semibold text-gray-900 dark:text-white">Weight</span>
                  <span>1.4 kg</span>
                </li>
                <li className="flex justify-between py-1 border-b border-gray-100 dark:border-slate-800">
                  <span className="font-semibold text-gray-900 dark:text-white">Warranty</span>
                  <span>1 Year Manufacturer Warranty</span>
                </li>
              </ul>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 dark:bg-slate-900 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-gray-900 dark:text-white">Rafiqul Islam</span>
                    <span className="text-xs text-gray-400">2 days ago</span>
                  </div>
                  <div className="flex text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs">Amazing build quality! Looks even better in person.</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Trust Badges */}
        <section className="px-4 py-6 bg-gray-50 dark:bg-slate-900/60 border-t border-gray-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-gray-500" />
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
              Free shipping on orders over {storeConfig.currency}5000
            </span>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-gray-500" />
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
              7-Day Replacement Guarantee
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-gray-500" />
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
              Cash on Delivery Available & Encrypted Checkout
            </span>
          </div>
        </section>
      </main>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-gray-200/80 dark:border-slate-800 px-4 py-3 flex gap-3 z-50 shadow-2xl">
        <button
          onClick={handleAddToCart}
          className="flex-1 border border-gray-300 dark:border-slate-700 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-900 active:scale-95"
        >
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-[1.5] bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg active:scale-95"
        >
          Buy Now
        </button>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={storeConfig.currency}
        onUpdateQuantity={(id, delta) => {
          setCartItems((prev) =>
            prev
              .map((item) =>
                item.product.id === id
                  ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                  : item
              )
              .filter((item) => item.quantity > 0)
          );
        }}
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((i) => i.product.id !== id))}
        onCheckout={() => alert('Proceeding to Checkout!')}
      />
    </div>
  );
}
