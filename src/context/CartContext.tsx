"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ExtendedProduct } from "../data/products";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  cartItemId?: string;
  quantity: number;
  variantColor?: string;
  variantSize?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, options?: Partial<CartItem>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Navigation & Filtering
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeMobileTab: string;
  setActiveMobileTab: (tab: string) => void;

  // Quick View Modal
  previewProduct: ExtendedProduct | null;
  setPreviewProduct: (product: ExtendedProduct | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMobileTab, setActiveMobileTab] = useState("home");
  const [previewProduct, setPreviewProduct] = useState<ExtendedProduct | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("websites_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem("websites_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.error("Failed to parse cart/wishlist from storage", e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("websites_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("websites_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist", e);
    }
  }, [wishlist]);

  const addToCart = (product: Product, options?: Partial<CartItem>) => {
    const variantColor = options?.variantColor || "";
    const variantSize = options?.variantSize || "";
    const key = `${product.id}-${variantColor}-${variantSize}`;
    const addedQty = options?.quantity || 1;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => (item.cartItemId || item.id) === key
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += addedQty;
        return updated;
      } else {
        const newItem: CartItem = {
          ...product,
          cartItemId: key,
          quantity: addedQty,
          variantColor,
          variantSize,
        };
        return [...prev, newItem];
      }
    });

    // Modern Toast Notification for Add to Cart
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-in fade-in slide-in-from-top-2" : "animate-out fade-out slide-out-to-top-2"
        } max-w-sm w-full bg-zinc-900 border border-blue-500/40 shadow-2xl rounded-2xl p-3.5 flex items-center gap-3 text-white pointer-events-auto`}
      >
        <div className="relative w-12 h-12 rounded-xl bg-zinc-950 overflow-hidden shrink-0 border border-zinc-800">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs">
            <span>✓ কার্টে যোগ করা হয়েছে!</span>
          </div>
          <h4 className="text-xs font-bold text-white truncate mt-0.5">{product.name}</h4>
          <span className="text-[11px] text-blue-400 font-black">৳{product.price.toLocaleString()}</span>
        </div>
        <a
          href="/cart"
          onClick={() => toast.dismiss(t.id)}
          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shrink-0 transition-all"
        >
          কার্ট দেখুন
        </a>
      </div>
    ));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => (item.cartItemId || item.id) !== cartItemId));
    toast.error("আইটেমটি কার্ট থেকে মুছে ফেলা হয়েছে");
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if ((item.cartItemId || item.id) === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const isPresent = wishlist.includes(productId);
    if (isPresent) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      toast("উইশলিস্ট থেকে সরানো হয়েছে", { icon: "❤️" });
    } else {
      setWishlist((prev) => [...prev, productId]);
      toast.success("উইশলিস্টে যোগ করা হয়েছে!");
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        activeMobileTab,
        setActiveMobileTab,
        previewProduct,
        setPreviewProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
