"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { CartDrawer } from "../../../components/CartDrawer";
import { ProductCard } from "../../../components/ProductCard";
import { useCart } from "../../../context/CartContext";
import { PRODUCTS_DATA } from "../../../data/products";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  const product = PRODUCTS_DATA.find((p) => p.id === resolvedParams.id) || PRODUCTS_DATA[0];

  const [activeImage, setActiveImage] = useState(product.gallery?.[0] || product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs">("desc");

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const relatedProducts = PRODUCTS_DATA.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        <Navbar />

        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-zinc-800/80 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-500">{product.category}</span>
            <span>/</span>
            <span className="text-white font-medium truncate max-w-xs">{product.name}</span>
          </div>
        </div>

        {/* Product Overview Section */}
        <section className="py-8 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
              
              {/* Left Column: Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-indigo-600 text-white font-bold text-xs uppercase rounded-md shadow-md">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Gallery Thumbnails */}
                {product.gallery && product.gallery.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {product.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                          activeImage === img ? "border-indigo-500 scale-105" : "border-zinc-800 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Details & Purchasing Actions */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase">
                      {product.category}
                    </span>
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      In Stock & Ready to Ship
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-3 leading-tight">
                    {product.name}
                  </h1>

                  {/* Rating & SKU */}
                  <div className="flex items-center gap-4 mt-3 text-xs text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-400">
                        {"★".repeat(Math.floor(product.rating))}
                      </div>
                      <span className="font-bold text-white">{product.rating}</span>
                      <span>({product.reviewCount} customer reviews)</span>
                    </div>
                    <span>•</span>
                    <span>SKU: {product.sku}</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-baseline gap-4">
                  <span className="text-3xl font-extrabold text-white">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg font-medium text-zinc-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-md">
                      Save ${(product.originalPrice - product.price).toFixed(0)}
                    </span>
                  )}
                </div>

                {/* Description Short */}
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {product.description}
                </p>

                {/* Quantity selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                    Quantity
                  </label>
                  <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-900 w-36 p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-8 text-zinc-400 hover:text-white font-bold flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-white text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-8 text-zinc-400 hover:text-white font-bold flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Dual Buttons: Add to Cart & Buy Now */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to Cart
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    ⚡ Buy Now Instant Checkout
                  </button>
                </div>

                {/* Trust Guarantee Cards */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800 text-xs text-zinc-400">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
                    <span className="text-lg">🚚</span>
                    <div>
                      <strong className="text-white block font-semibold">Free Express Shipping</strong>
                      On orders over $200
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
                    <span className="text-lg">🛡️</span>
                    <div>
                      <strong className="text-white block font-semibold">Official Warranty</strong>
                      2-Year global protection
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Specifications & Description Tabs */}
        <section className="py-12 bg-zinc-950 border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex border-b border-zinc-800 gap-8 mb-8">
              <button
                onClick={() => setActiveTab("desc")}
                className={`pb-4 text-sm font-bold transition-colors relative ${
                  activeTab === "desc" ? "text-white border-b-2 border-indigo-500" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Overview & Description
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-4 text-sm font-bold transition-colors relative ${
                  activeTab === "specs" ? "text-white border-b-2 border-indigo-500" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Technical Specifications
              </button>
            </div>

            {activeTab === "desc" ? (
              <div className="prose prose-invert max-w-none text-zinc-300 text-sm space-y-4">
                <p>{product.description}</p>
                <p>
                  Engineered with premium materials for durability, comfort, and top-tier performance. Designed for everyday power users and digital professionals.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                {product.specs?.map((spec, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex justify-between text-xs">
                    <span className="text-zinc-400">{spec.label}</span>
                    <span className="font-semibold text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-zinc-950 border-t border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-extrabold text-white mb-8">Related Products You Might Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          </section>
        )}

        <CartDrawer />
      </div>

      <Footer />
    </main>
  );
}
