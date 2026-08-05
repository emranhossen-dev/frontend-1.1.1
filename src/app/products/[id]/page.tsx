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

  // Customization State
  const [customText, setCustomText] = useState("Your Name Here");
  const [selectedFont, setSelectedFont] = useState("font-serif");
  const [selectedColor, setSelectedColor] = useState("#fbbf24");
  const [customNotes, setCustomNotes] = useState("");

  const fontOptions = [
    { label: "Classic Serif", value: "font-serif" },
    { label: "Modern Sans", value: "font-sans" },
    { label: "Monospace", value: "font-mono" },
  ];

  const colorOptions = [
    { label: "Amber Gold", hex: "#fbbf24" },
    { label: "Rose Pink", hex: "#f43f5e" },
    { label: "Pure White", hex: "#ffffff" },
    { label: "Emerald", hex: "#10b981" },
    { label: "Sky Blue", hex: "#38bdf8" },
  ];

  const handleAddToCart = () => {
    addToCart(product, {
      customText,
      customFont: selectedFont,
      customColor: selectedColor,
      customNotes,
      quantity,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const relatedProducts = PRODUCTS_DATA.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
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

        {/* Product Overview & Personalizer Section */}
        <section className="py-8 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
              
              {/* Left Column: Live Customizer Image Preview */}
              <div className="space-y-4">
                <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group flex items-center justify-center">
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                  />

                  {/* Custom Text Overlay */}
                  {product.supportsCustomText && customText && (
                    <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/25 pointer-events-none text-center">
                      <p
                        style={{ color: selectedColor }}
                        className={`text-2xl sm:text-3xl font-black drop-shadow-lg break-words max-w-[80%] ${selectedFont}`}
                      >
                        "{customText}"
                      </p>
                    </div>
                  )}

                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-rose-500 text-white font-bold text-xs uppercase rounded-lg shadow-md">
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
                          activeImage === img ? "border-rose-500 scale-105" : "border-zinc-800 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Customization Controls & Actions */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase">
                      {product.category}
                    </span>
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      In Stock & Ready for Custom Print
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mt-3 leading-tight">
                    {product.name}
                  </h1>

                  {/* Rating & SKU */}
                  <div className="flex items-center gap-4 mt-3 text-xs text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-400">
                        {"★".repeat(Math.floor(product.rating))}
                      </div>
                      <span className="font-bold text-white">{product.rating}</span>
                      <span>({product.reviewCount} verified reviews)</span>
                    </div>
                    <span>•</span>
                    <span>SKU: {product.sku}</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-baseline gap-4">
                  <span className="text-3xl font-black text-white">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg font-medium text-zinc-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Live Custom Text Input */}
                {product.supportsCustomText && (
                  <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                        ✍️ Live Gift Personalizer
                      </h3>
                      <span className="text-[10px] text-zinc-400">Instant Real-Time Render</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Enter Custom Text / Name:
                      </label>
                      <input
                        type="text"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="e.g. Best Dad Ever 2026"
                        maxLength={35}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-rose-500 transition-colors"
                      />
                    </div>

                    {/* Font Options */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Select Font Typography:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {fontOptions.map((font) => (
                          <button
                            key={font.value}
                            onClick={() => setSelectedFont(font.value)}
                            className={`py-2 px-2 text-xs rounded-xl border font-semibold transition-all ${
                              selectedFont === font.value
                                ? "bg-rose-500/10 border-rose-500 text-rose-400"
                                : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                            } ${font.value}`}
                          >
                            {font.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Options */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Text Color Accent:
                      </label>
                      <div className="flex items-center gap-3">
                        {colorOptions.map((c) => (
                          <button
                            key={c.hex}
                            onClick={() => setSelectedColor(c.hex)}
                            style={{ backgroundColor: c.hex }}
                            className={`w-7 h-7 rounded-full border-2 transition-transform ${
                              selectedColor === c.hex
                                ? "scale-125 border-white ring-2 ring-rose-500/50"
                                : "border-zinc-800 opacity-80 hover:opacity-100"
                            }`}
                            title={c.label}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

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

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add Customized Gift to Cart
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-sm shadow-xl shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    ⚡ Buy Now Instant Checkout
                  </button>
                </div>

                {/* Trust Guarantee */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800 text-xs text-zinc-400">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
                    <span className="text-lg">🚚</span>
                    <div>
                      <strong className="text-white block font-semibold">Express Gift Shipping</strong>
                      Safe protective packaging
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
                    <span className="text-lg">🎨</span>
                    <div>
                      <strong className="text-white block font-semibold">HD Sublimation Print</strong>
                      Vibrant non-fading colors
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
                  activeTab === "desc" ? "text-rose-400 border-b-2 border-rose-500" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Gift Story & Description
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-4 text-sm font-bold transition-colors relative ${
                  activeTab === "specs" ? "text-rose-400 border-b-2 border-rose-500" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Print Specifications
              </button>
            </div>

            {activeTab === "desc" ? (
              <div className="prose prose-invert max-w-none text-zinc-300 text-sm space-y-4">
                <p>{product.description}</p>
                <p>
                  Printed with premium archival non-fading inks using precision laser and sublimation technology. Each custom item is hand-inspected for quality before shipping.
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

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-zinc-950 border-t border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-black text-white mb-8">More Custom Gifts You'll Love</h2>
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
