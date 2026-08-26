"use client";

import React, { useState } from "react";
import { ExtendedProduct } from "../data/products";
import { useCart } from "../context/CartContext";
import { FaStar, FaHeart, FaRegHeart, FaBagShopping, FaCheck, FaBolt } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: ExtendedProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    router.push("/cart");
  };

  return (
    <div
      onClick={handleCardClick}
      className="group rounded-2xl bg-zinc-900/90 border border-zinc-800/80 hover:border-blue-500/40 p-3 sm:p-4 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer relative overflow-hidden h-full"
    >
      {/* Top Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 pointer-events-none">
        {product.discountPercent ? (
          <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider">
            -{product.discountPercent}% OFF
          </span>
        ) : product.badge ? (
          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md uppercase tracking-wider">
            {product.badge}
          </span>
        ) : null}
      </div>

      {/* Wishlist Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
          inWishlist
            ? "bg-rose-500/20 border-rose-500 text-rose-500 scale-105"
            : "bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
        }`}
        aria-label="Toggle Wishlist"
      >
        {inWishlist ? (
          <FaHeart className="w-3.5 h-3.5 text-rose-500" />
        ) : (
          <FaRegHeart className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Product Image Container */}
      <div className="relative w-full aspect-square rounded-xl bg-zinc-950 overflow-hidden mb-3 group-hover:opacity-95">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Product Meta Info */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1 text-[11px] text-zinc-400">
            <span className="font-semibold text-blue-400 uppercase tracking-wider text-[10px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 bg-zinc-950/60 px-1.5 py-0.5 rounded-md border border-zinc-800/60">
              <FaStar className="w-3 h-3 text-amber-400" />
              <span className="font-bold text-white text-[11px]">{product.rating}</span>
              <span className="text-zinc-500 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors h-9">
            {product.name}
          </h3>
        </div>

        {/* Bottom Section: PRICING ABOVE BUTTONS, THEN 2 BUTTONS IN ONE ROW */}
        <div className="mt-3 pt-2.5 border-t border-zinc-800/70 space-y-2">
          {/* Pricing Row (Above Buttons) */}
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-black text-white leading-none">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-zinc-500 line-through font-medium leading-none">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* 2 Buttons in 1 Row: Cart & Buy */}
          <div className="grid grid-cols-2 gap-1.5 w-full">
            {/* Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`py-1.5 px-2 rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer ${
                added
                  ? "bg-emerald-600 text-white shadow-emerald-600/30"
                  : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
              }`}
            >
              {added ? (
                <>
                  <FaCheck className="w-3 h-3" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <FaBagShopping className="w-3 h-3 text-blue-400" />
                  <span>Cart</span>
                </>
              )}
            </button>

            {/* Buy Button - Routes to /cart */}
            <button
              onClick={handleBuyNow}
              className="py-1.5 px-2 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/25 flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
            >
              <FaBolt className="w-3 h-3 text-amber-300" />
              <span>Buy</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
