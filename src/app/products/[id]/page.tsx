'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNavBar from '@/components/BottomNavBar';
import FeaturedProducts from '@/components/FeaturedProducts';
import { Product } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import {
  Heart,
  Share2,
  Star,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  RotateCcw,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const {
    products,
    isLoading,
    storeConfig,
    wishlistIds,
    toggleWishlist,
    addToCart,
    setIsCartOpen,
  } = useStore();

  // Find product by id
  const product: Product | undefined = products.find((p) => p.id === productId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Matte White');
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>(
    'description'
  );

  // Full-Screen Image Lightbox Modal State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!product || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 lg:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-6 w-full aspect-square bg-gray-200 dark:bg-slate-800 rounded-3xl animate-pulse" />
            <div className="lg:col-span-6 space-y-6">
              <div className="h-8 bg-gray-200 dark:bg-slate-800 rounded-xl w-3/4 animate-pulse" />
              <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded-xl w-1/3 animate-pulse" />
              <div className="h-14 bg-gray-200 dark:bg-slate-800 rounded-2xl w-full animate-pulse" />
              <div className="h-14 bg-gray-200 dark:bg-slate-800 rounded-2xl w-full animate-pulse" />
            </div>
          </div>
        </main>
        <Footer />
        <BottomNavBar />
      </div>
    );
  }

  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1581783342308-f792dbdd77c5?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
  ];

  const colors = [
    { name: 'Matte White', bg: 'bg-[#fdf8f8] border-gray-300' },
    { name: 'Onyx Black', bg: 'bg-[#1c1b1b]' },
    { name: 'Soft Beige', bg: 'bg-[#dcd7d5]' },
  ];

  const sizes = ['Small', 'Medium', 'Large'];

  const isWishlisted = wishlistIds.includes(product.id);

  const discountPercent = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 20;

  // Filter Related Products (Same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 6);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCartOpen(false);
    router.push('/checkout');
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans">
      {/* Header */}
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 pb-3 border-b border-gray-200/80 dark:border-slate-800">
          <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-[#FF6B00] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#FF6B00] transition-colors">
              {product.category || 'Products'}
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-semibold truncate">{product.title}</span>
          </nav>
        </div>

        {/* 2-Column Responsive Layout (Balanced 6/6 split on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Sticky Product Gallery & Thumbnails Strip */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            {/* Main Stage Image */}
            <div className="relative w-full aspect-square bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-slate-800 overflow-hidden group shadow-sm">
              <img
                src={galleryImages[activeImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover cursor-zoom-in transition-all duration-500 group-hover:scale-105"
                onClick={() => openLightbox(activeImageIndex)}
              />

              {/* Lightbox Zoom Button */}
              <button
                onClick={() => openLightbox(activeImageIndex)}
                className="absolute top-4 right-4 p-3 bg-black/60 dark:bg-white/80 backdrop-blur-md text-white dark:text-black rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all opacity-80 hover:opacity-100 cursor-pointer"
                aria-label="View Fullscreen Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Prev/Next Chevron Controls */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Selector Strip */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 bg-white dark:bg-slate-900 ${
                    activeImageIndex === idx
                      ? 'border-[#FF6B00] scale-105 shadow-md'
                      : 'border-gray-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Title, Ratings, Pricing, Variants & CTAs */}
          <div className="lg:col-span-6 space-y-6 bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
            
            {/* Brand Category Tag & Title & Wishlist */}
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider block">
                  {product.brand || product.category}
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                  {product.title}
                </h1>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist"
                  className="p-3 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 hover:text-red-500 transition-all cursor-pointer shadow-xs active:scale-90"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                <button
                  onClick={async () => {
                    try {
                      if (typeof window !== 'undefined' && navigator.share) {
                        await navigator.share({
                          title: product.title,
                          url: window.location.href,
                        });
                      } else if (typeof window !== 'undefined' && navigator.clipboard) {
                        await navigator.clipboard.writeText(window.location.href);
                        alert('Product link copied to clipboard!');
                      }
                    } catch {
                      // Share dialog dismissed
                    }
                  }}
                  aria-label="Share"
                  className="p-3 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 hover:text-black dark:hover:text-white transition-all cursor-pointer shadow-xs active:scale-90"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Ratings & Verified Badge */}
            <div className="flex items-center gap-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                {product.rating.toFixed(1)} ({product.reviewsCount || 124} verified reviews)
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                In Stock
              </span>
            </div>

            {/* Pricing Box & Discount Pill */}
            <div className="flex items-center gap-4 py-3 border-y border-gray-100 dark:border-slate-800">
              <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
                {storeConfig.currency}
                {product.price.toLocaleString()}
              </span>
              {product.comparePrice && (
                <span className="text-lg sm:text-xl text-gray-400 line-through font-medium">
                  {storeConfig.currency}
                  {product.comparePrice.toLocaleString()}
                </span>
              )}
              <span className="bg-[#FF6B00] text-white font-black text-xs px-3 py-1 rounded-lg shadow-xs">
                SAVE {discountPercent}%
              </span>
            </div>

            {/* Color Variants */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
                Color Variant:{' '}
                <span className="text-[#FF6B00] font-bold capitalize">
                  {selectedColor}
                </span>
              </h3>
              <div className="flex gap-3">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-11 h-11 rounded-full border-2 p-0.5 flex items-center justify-center transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? 'border-[#FF6B00] scale-110 shadow-md'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span className={`w-full h-full rounded-full ${c.bg}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Variants */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
                  Select Size
                </h3>
                <button
                  onClick={() => alert('Size Guide: Standard International Fit')}
                  className="text-xs text-gray-500 hover:text-[#FF6B00] underline font-semibold cursor-pointer"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex gap-3">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`flex-1 py-3 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'border-[#0F396F] bg-[#0F396F] text-white shadow-md'
                        : 'border-gray-200 dark:border-slate-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Main Action Buttons */}
            <div className="space-y-4 pt-2">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
                  Quantity
                </h3>
                <div className="flex items-center border border-gray-300 dark:border-slate-700 rounded-xl w-36 h-12 bg-white dark:bg-slate-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex-1 h-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-l-xl cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="flex-1 text-center font-black text-sm text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex-1 h-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-r-xl cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* High-Contrast Full-Width Action Buttons with Shimmer Light Sweep */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="btn-shimmer flex-1 bg-[#0F396F] hover:bg-[#164685] text-white py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-md"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="btn-shimmer flex-1 bg-[#FF6B00] hover:bg-[#E56000] text-white py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 border-t border-gray-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600 dark:text-gray-300 font-medium">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span>7-Day Return</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span>COD Available</span>
              </div>
            </div>

            {/* Multi-Tab Description & Specifications */}
            <div className="pt-4 border-t border-gray-200 dark:border-slate-800">
              <div className="flex border-b border-gray-200 dark:border-slate-800">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-3 mr-6 text-xs font-extrabold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                    activeTab === 'description'
                      ? 'border-[#FF6B00] text-[#FF6B00]'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Description
                </button>

                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`py-3 mr-6 text-xs font-extrabold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                    activeTab === 'specifications'
                      ? 'border-[#FF6B00] text-[#FF6B00]'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Specifications
                </button>

                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-3 text-xs font-extrabold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'border-[#FF6B00] text-[#FF6B00]'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Reviews ({product.reviewsCount || 124})
                </button>
              </div>

              <div className="py-4 text-xs text-gray-600 dark:text-gray-300 space-y-2 leading-relaxed">
                {activeTab === 'description' && (
                  <p>
                    {(product as any).description ||
                      'Hand-crafted from premium materials, this minimalist piece embodies quiet luxury and modern elegance. Designed to complement your everyday lifestyle.'}
                  </p>
                )}

                {activeTab === 'specifications' && (
                  <ul className="space-y-2">
                    <li className="flex justify-between py-1 border-b border-gray-100 dark:border-slate-800">
                      <span className="font-semibold text-gray-900 dark:text-white">Material</span>
                      <span>Artisanal Premium Grade</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-gray-100 dark:border-slate-800">
                      <span className="font-semibold text-gray-900 dark:text-white">Warranty</span>
                      <span>1 Year Warranty</span>
                    </li>
                  </ul>
                )}

                {activeTab === 'reviews' && (
                  <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-gray-900 dark:text-white">Rafiqul Islam</span>
                      <span className="text-[10px] text-gray-400">2 days ago</span>
                    </div>
                    <p className="text-xs">Amazing build quality! Looks even better in person.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Showcase - 6 Cards per row on Desktop */}
        <div className="mt-12 border-t border-gray-200 dark:border-slate-800 pb-24">
          <FeaturedProducts title="You May Also Like" products={relatedProducts} />
        </div>
      </main>

      {/* Mobile Bottom Action Bar */}
      <div className="fixed bottom-14 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-gray-200/80 dark:border-slate-800 px-4 py-3 flex gap-3 z-40 shadow-2xl sm:hidden">
        <button
          onClick={handleAddToCart}
          className="btn-shimmer flex-1 bg-[#0F396F] hover:bg-[#164685] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors active:scale-95 cursor-pointer shadow-sm"
        >
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="btn-shimmer flex-[1.5] bg-[#FF6B00] hover:bg-[#E56000] text-white py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg active:scale-95 cursor-pointer"
        >
          Buy Now
        </button>
      </div>

      {/* Full-Screen Image Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 animate-fade-in">
          <div className="flex justify-between items-center text-white">
            <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
              Image {lightboxIndex + 1} of {galleryImages.length}
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close Lightbox"
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-4">
            <img
              src={galleryImages[lightboxIndex]}
              alt={`${product.title} full view`}
              className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl transition-all"
            />

            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))
                  }
                  className="absolute left-2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() =>
                    setLightboxIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))
                  }
                  className="absolute right-2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="flex justify-center gap-3 py-2 overflow-x-auto">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  lightboxIndex === idx ? 'border-white scale-105' : 'border-transparent opacity-50'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Comprehensive Footer */}
      <Footer />

      {/* Bottom Nav */}
      <BottomNavBar />
    </div>
  );
}
