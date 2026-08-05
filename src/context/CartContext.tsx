"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
  supportsCustomText?: boolean;
  supportsPhotoUpload?: boolean;
}

export interface CartItem extends Product {
  cartItemId?: string;
  quantity: number;
  customText?: string;
  customFont?: string;
  customColor?: string;
  customNotes?: string;
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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart_items");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to parse cart from storage", e);
    }
  }, []);

  // Save cart to localStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem("cart_items", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  }, [cart]);

  const addToCart = (product: Product, options?: Partial<CartItem>) => {
    const customText = options?.customText?.trim() || "";
    const customFont = options?.customFont || "";
    const customColor = options?.customColor || "";
    const customNotes = options?.customNotes || "";
    const variantColor = options?.variantColor || "";
    const variantSize = options?.variantSize || "";

    const key = `${product.id}-${variantColor}-${variantSize}-${customText}-${customFont}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => (item.cartItemId || item.id) === key
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += options?.quantity || 1;
        return updated;
      } else {
        const newItem: CartItem = {
          ...product,
          cartItemId: key,
          quantity: options?.quantity || 1,
          customText,
          customFont,
          customColor,
          customNotes,
          variantColor,
          variantSize,
        };
        return [...prev, newItem];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => (item.cartItemId || item.id) !== cartItemId));
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
