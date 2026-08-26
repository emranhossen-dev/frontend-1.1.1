'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem, StoreConfig, Category } from '@/types/store';
import {
  defaultStoreConfig,
  defaultCategories,
  defaultProducts,
  defaultHeroBanner,
} from '@/config/storeConfig';
import { notifySuccess, notifyInfo } from '@/lib/sweetalert';

interface StoreContextType {
  storeConfig: StoreConfig;
  categories: Category[];
  products: Product[];
  heroBanner: typeof defaultHeroBanner;
  cartItems: CartItem[];
  wishlistIds: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleWishlist: (productId: string) => void;
  clearCart: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [storeConfig] = useState<StoreConfig>(defaultStoreConfig);
  const [categories] = useState<Category[]>(defaultCategories);
  const [products, setProducts] = useState<Product[]>([]);
  const [heroBanner] = useState(defaultHeroBanner);

  // Fetch real products from NestJS REST API
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ardhimart-backend.onrender.com/api/v1';
        const res = await fetch(`${baseUrl}/products`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setProducts(data);
          }
        }
      } catch (err) {
        console.warn('Backend API connection warning:', err);
      }
    };
    fetchProducts();
  }, []);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    notifySuccess('Added to Shopping Bag!', product.title);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    notifyInfo('Item removed from cart');
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        notifyInfo('Removed from Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        notifySuccess('Added to Wishlist!');
        return [...prev, productId];
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <StoreContext.Provider
      value={{
        storeConfig,
        categories,
        products,
        heroBanner,
        cartItems,
        wishlistIds,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isMenuOpen,
        setIsMenuOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        clearCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
