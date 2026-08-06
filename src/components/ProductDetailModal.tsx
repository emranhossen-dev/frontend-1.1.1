"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import {
  HiXMark,
  HiOutlineHeart,
  HiHeart,
  HiOutlineShoppingBag,
  HiCheck,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineArrowPath,
  HiPlus,
  HiMinus,
} from "react-icons/hi2";
import { FaStar } from "react-icons/fa6";

export const ProductDetailModal: React.FC = () => {
  const { previewProduct, setPreviewProduct, addToCart, toggleWishlist, isInWishlist } =
    useCart();

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (previewProduct) {
      setSelectedImage(previewProduct.image);
      setQuantity(1);
      setAdded(false);
      // Initialize default variant selections
      if (previewProduct.variants) {
        const initialVars: Record<string, string> = {};
        previewProduct.variants.forEach((v) => {
          if (v.options.length > 0) {
            initialVars[v.name] = v.options[0];
          }
        });
        setSelectedVariants(initialVars);
      } else {
        setSelectedVariants({});
      }
    }
  }, [previewProduct]);

  if (!previewProduct) return null;

  const inWishlist = isInWishlist(previewProduct.id);

  const handleAddToCart = () => {
    addToCart(previewProduct, {
      quantity,
      variantColor: selectedVariants["Color"] || selectedVariants["Strap Color"] || selectedVariants["Finish"] || "",
      variantSize: selectedVariants["Size"] || selectedVariants["Kit Option"] || "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => setPreviewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-950/60 backdrop-blur-md border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <HiXMark className="w-5 h-5" />
        </button>

        {/* Gallery Column */}
        <div className="md:w-1/2 p-5 sm:p-6 bg-zinc-950 flex flex-col justify-between">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 mb-4">
            <img
              src={selectedImage || previewProduct.image}
              alt={previewProduct.name}
              className="w-full h-full object-cover rounded-2xl"
            />
            {previewProduct.discountPercent && (
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md">
                -{previewProduct.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {previewProduct.gallery && previewProduct.gallery.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {previewProduct.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-xl border-2 overflow-hidden shrink-0 transition-all ${
                    (selectedImage || previewProduct.image) === img
                      ? "border-blue-500 scale-105"
                      : "border-zinc-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="md:w-1/2 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Category & Brand */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-extrabold uppercase text-blue-400 tracking-wider">
                {previewProduct.brand} • {previewProduct.category}
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">SKU: {previewProduct.sku}</span>
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-2xl font-black text-white leading-snug mb-2">
              {previewProduct.name}
            </h2>

            {/* Rating & Stock */}
            <div className="flex items-center gap-3 mb-4 text-xs text-zinc-400">
              <div className="flex items-center gap-1 bg-zinc-800/80 px-2 py-0.5 rounded-md text-white font-bold">
                <FaStar className="w-3.5 h-3.5 text-amber-400" />
                <span>{previewProduct.rating}</span>
              </div>
              <span>({previewProduct.reviewCount} Reviews)</span>
              <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                In Stock & Ready to Ship
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5 pb-4 border-b border-zinc-800">
              <span className="text-2xl sm:text-3xl font-black text-white">
                ${previewProduct.price.toFixed(2)}
              </span>
              {previewProduct.originalPrice && (
                <span className="text-sm sm:text-base text-zinc-500 line-through font-medium">
                  ${previewProduct.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-5">
              {previewProduct.description}
            </p>

            {/* Variant Options */}
            {previewProduct.variants && previewProduct.variants.length > 0 && (
              <div className="space-y-3 mb-5">
                {previewProduct.variants.map((v) => (
                  <div key={v.name}>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Select {v.name}:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {v.options.map((opt) => {
                        const isSelected = selectedVariants[v.name] === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() =>
                              setSelectedVariants((prev) => ({ ...prev, [v.name]: opt }))
                            }
                            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/20"
                                : "bg-zinc-800/80 border-zinc-700 text-zinc-400 hover:text-white"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Specs Highlights */}
            {previewProduct.specs && (
              <div className="mb-5 bg-zinc-950/70 p-3 rounded-2xl border border-zinc-800/80 space-y-1.5">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Specifications
                </h4>
                {previewProduct.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-zinc-400">{spec.label}:</span>
                    <span className="font-semibold text-zinc-200">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-950 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1.5 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <HiMinus className="w-4 h-4" />
                </button>
                <span className="px-3 font-bold text-sm text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1.5 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <HiPlus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
                  added
                    ? "bg-emerald-600 text-white shadow-emerald-600/30"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/30"
                }`}
              >
                {added ? (
                  <>
                    <HiCheck className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <HiOutlineShoppingBag className="w-4 h-4" />
                    <span>Add to Cart - ${(previewProduct.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(previewProduct.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  inWishlist
                    ? "bg-rose-500/20 border-rose-500 text-rose-500"
                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white"
                }`}
                aria-label="Wishlist"
              >
                {inWishlist ? (
                  <HiHeart className="w-5 h-5 text-rose-500" />
                ) : (
                  <HiOutlineHeart className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-zinc-400 border-t border-zinc-800/60">
              <div className="flex items-center gap-1 justify-center">
                <HiOutlineTruck className="w-3.5 h-3.5 text-blue-400" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-1 justify-center">
                <HiOutlineArrowPath className="w-3.5 h-3.5 text-indigo-400" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-1 justify-center">
                <HiOutlineShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>2 Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
