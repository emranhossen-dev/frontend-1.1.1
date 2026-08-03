"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product, useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    router.push("/checkout");
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="group bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/5">
      {/* Clickable Image Box -> /products/[id] */}
      <Link href={`/products/${product.id}`} className="relative aspect-square bg-zinc-900 overflow-hidden block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 bg-indigo-600 text-white font-bold text-[10px] uppercase rounded-md shadow-sm">
              {product.badge}
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 bg-emerald-500 text-zinc-950 font-bold text-[10px] uppercase rounded-md shadow-sm">
              NEW
            </span>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
            {product.category}
          </span>
          <Link href={`/products/${product.id}`} className="block mt-0.5">
            <h3 className="font-semibold text-sm sm:text-base text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex text-amber-400 text-xs">
              {"★".repeat(Math.floor(product.rating))}
            </div>
            <span className="text-xs text-zinc-400 font-medium">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Price & Dual Action Buttons */}
        <div className="space-y-3 pt-2 border-t border-zinc-800/80">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-500 line-through font-medium">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Dual Action Buttons: Add to Cart & Buy Now */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/10 transition-colors flex items-center justify-center gap-1"
            >
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
