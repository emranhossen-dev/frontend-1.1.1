"use client";

import React, { useState, use, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductCard } from "../../../components/ProductCard";
import { useCart } from "../../../context/CartContext";
import { PRODUCTS_DATA } from "../../../data/products";
import {
  FaStar,
  FaBolt,
  FaBagShopping,
  FaCheck,
  FaTruckFast,
  FaShieldHalved,
  FaRotateLeft,
  FaHeadset,
  FaChevronLeft,
  FaChevronRight,
  FaXmark,
  FaExpand,
} from "react-icons/fa6";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  const product = PRODUCTS_DATA.find((p) => p.id === resolvedParams.id) || PRODUCTS_DATA[0];

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Lightbox Modal state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Touch Swipe Handling for Mobile Lightbox
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped Left -> Next image
        setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
      } else {
        // Swiped Right -> Previous image
        setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      }
    }
    touchStartX.current = null;
  };

  const handleAddToCart = () => {
    addToCart(product, { quantity });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  const relatedProducts = PRODUCTS_DATA.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-600 selection:text-white">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 border-b border-zinc-800/80 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">হোম (Home)</Link>
          <span>/</span>
          <span className="text-zinc-500">{product.category}</span>
          <span>/</span>
          <span className="text-white font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Product Overview & Interactive Image Gallery */}
      <section className="py-8 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            
            {/* Left Column: Image Preview with Fullscreen Touch Lightbox Trigger */}
            <div className="space-y-4">
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="relative aspect-square w-full rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group flex items-center justify-center cursor-pointer"
                title="ফুল স্ক্রিনে ছবি দেখতে ক্লিক করুন"
              >
                <img
                  src={galleryImages[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {product.discountPercent && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white font-black text-xs uppercase rounded-lg shadow-md z-10">
                    -{product.discountPercent}% ছাড়
                  </span>
                )}

                {/* Expand Lightbox Icon Badge */}
                <div className="absolute bottom-4 right-4 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-700 text-white text-xs font-bold flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <FaExpand className="w-3.5 h-3.5 text-blue-400" />
                  <span>ফুল স্ক্রিন ভিউ (Fullscreen)</span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? "border-blue-500 scale-105 shadow-md shadow-blue-500/20"
                          : "border-zinc-800 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Information, Pricing & Quick Actions */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase">
                    {product.brand} • {product.category}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    স্টকে আছে (In Stock)
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mt-3 leading-tight">
                  {product.name}
                </h1>

                {/* Rating & SKU */}
                <div className="flex items-center gap-4 mt-3 text-xs text-zinc-400">
                  <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md">
                    <FaStar className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-bold text-white">{product.rating}</span>
                    <span>({product.reviewCount} কাস্টমার রিভিউ)</span>
                  </div>
                  <span>•</span>
                  <span>SKU: {product.sku}</span>
                </div>
              </div>

              {/* Price Display in BDT (৳) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 flex items-baseline gap-4">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  ৳{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg font-medium text-zinc-500 line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description in Bangla */}
              <p className="text-zinc-300 text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  পরিমাণ (Quantity)
                </label>
                <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-900 w-36 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-8 text-zinc-400 hover:text-white font-bold flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-white text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-8 text-zinc-400 hover:text-white font-bold flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons: Cart & Buy Now */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="py-3.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs sm:text-sm border border-zinc-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <FaBagShopping className="w-4 h-4 text-blue-400" />
                  <span>Cart এ যোগ করুন</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaBolt className="w-4 h-4 text-amber-300" />
                  <span>এখনই কিনুন (Buy)</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Key Features & Usability Guidelines */}
      <section className="py-10 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Features List */}
          {product.features && (
            <div>
              <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-500 rounded-full inline-block" />
                বিশেষ বৈশিষ্ট্যসমূহ (Key Features)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3 text-xs text-zinc-200"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <FaCheck className="w-3 h-3" />
                    </div>
                    <span className="font-semibold leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Usability & Tips */}
          {product.usability && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/30 to-zinc-900 border border-blue-900/40 space-y-2">
              <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">
                💡 ব্যবহারবিধি ও টিপস (Usability Guide)
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {product.usability}
              </p>
            </div>
          )}

          {/* Specifications Table */}
          <div>
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-indigo-500 rounded-full inline-block" />
              টেকনিক্যাল স্পেসিফিকেশন (Specifications)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.specs?.map((spec, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex justify-between text-xs">
                  <span className="text-zinc-400">{spec.label}</span>
                  <span className="font-semibold text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* WHY BUY FROM US */}
      <section className="py-12 bg-zinc-900/40 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-white">কেন আমাদের থেকে কিনবেন?</h2>
            <p className="text-xs text-zinc-400">আপনার প্রতিটি কেনাকাটায় সর্বোচ্চ নিরাপত্তা ও শতভাগ সন্তুষ্টির নিশ্চয়তা</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto">
                <FaTruckFast className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">ক্যাশ অন ডেলিভারি</h4>
              <p className="text-xs text-zinc-400">পণ্য হাতে পেয়ে দেখে টাকা পরিশোধের সেরা সুবিধা।</p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                <FaShieldHalved className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">১০০% অরিজিনাল প্রডাক্ট</h4>
              <p className="text-xs text-zinc-400">অফিশিয়াল ব্র্যান্ডের সেরা কোয়ালিটি ও ওয়্যারেন্টি গ্রান্টি।</p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
                <FaRotateLeft className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">৭ দিনের রিপ্লেসমেন্ট</h4>
              <p className="text-xs text-zinc-400">যেকোনো সমস্যায় দ্রত রিপ্লেসমেন্ট সুবিধা।</p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
                <FaHeadset className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">২৪/৭ কাস্টমার সাপোর্ট</h4>
              <p className="text-xs text-zinc-400">যেকোনো প্রয়োজনে আমাদের টিম সবসময় আপনার পাশে।</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      {product.faqs && product.faqs.length > 0 && (
        <section className="py-12 bg-zinc-950 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-black text-white mb-6 text-center">
              প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
            </h3>

            <div className="space-y-3">
              {product.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-850"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <HiOutlineChevronUp className="w-4 h-4 text-blue-400 shrink-0" />
                      ) : (
                        <HiOutlineChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-zinc-300 border-t border-zinc-800/60 pt-3 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Products Grid - Identical 2-col (mobile) / 3-col (sm) / 4-col (md+) layout */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-zinc-950 border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-black text-white mb-6">সম্পর্কিত পণ্যসমূহ (Related Products)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Full-Screen Touch & Slide Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 overflow-hidden select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Lightbox Top Control Bar */}
          <div className="flex items-center justify-between text-white z-20">
            <span className="text-xs font-bold text-zinc-400">
              ছবি {activeImageIndex + 1} / {galleryImages.length} (মোবাইলে স্লাইড করুন)
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white cursor-pointer"
              aria-label="Close Lightbox"
            >
              <FaXmark className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Main Image & Slide Arrows */}
          <div className="relative flex-1 flex items-center justify-center my-4">
            <img
              src={galleryImages[activeImageIndex]}
              alt={product.name}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300"
            />

            {/* Left Arrow */}
            {galleryImages.length > 1 && (
              <button
                onClick={() =>
                  setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
                }
                className="absolute left-2 sm:left-4 p-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-white hover:bg-blue-600 transition-all cursor-pointer"
                aria-label="Previous image"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Right Arrow */}
            {galleryImages.length > 1 && (
              <button
                onClick={() => setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)}
                className="absolute right-2 sm:right-4 p-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-white hover:bg-blue-600 transition-all cursor-pointer"
                aria-label="Next image"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex items-center justify-center gap-2 overflow-x-auto z-20 py-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-14 rounded-xl border-2 overflow-hidden shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx ? "border-blue-500 scale-110" : "border-zinc-800 opacity-50"
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
