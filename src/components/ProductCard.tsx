"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { ExtendedProduct } from "../data/products";

interface ProductCardProps {
  product: ExtendedProduct;
  onOpenCustomizer?: (product: ExtendedProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenCustomizer }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleCustomize = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onOpenCustomizer) {
      onOpenCustomizer(product);
    } else {
      router.push(`/products/${product.id}`);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="group bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden hover:border-rose-500/50 transition-all flex flex-col justify-between hover:shadow-xl hover:shadow-rose-500/5">
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
            <span className="px-2.5 py-1 bg-rose-500 text-white font-bold text-[10px] uppercase rounded-md shadow-sm">
              {product.badge}
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 bg-amber-400 text-zinc-950 font-bold text-[10px] uppercase rounded-md shadow-sm">
              NEW GIFT
            </span>
          )}
        </div>

        {/* Customization Available tag */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="px-2.5 py-1 bg-zinc-950/85 backdrop-blur-md border border-zinc-700 text-zinc-200 text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-md">
            ✨ Custom Printable
          </span>
        </div>
      </Link>

      {/* Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[10px] font-extrabold text-rose-400 uppercase tracking-wider">
            {product.category}
          </span>
          <Link href={`/products/${product.id}`} className="block mt-0.5">
            <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-rose-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex text-amber-400 text-xs">
              {"★".repeat(Math.floor(product.rating))}
            </div>
            <span className="text-xs text-zinc-400 font-medium">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Price & Dual Action Buttons */}
        <div className="space-y-3 pt-2 border-t border-zinc-800/80">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-white">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-500 line-through font-medium">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Action Buttons: Personalize & Quick Add */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCustomize}
              className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-1"
            >
              ✍️ Personalize
            </button>

            <button
              onClick={handleQuickAdd}
              className="py-2.5 px-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1"
            >
              + Quick Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
