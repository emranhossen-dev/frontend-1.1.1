'use client';

import React, { ReactNode, Suspense } from 'react';
import { StoreProvider, useStore } from '@/context/StoreContext';
import CartDrawer from '@/components/CartDrawer';
import SearchModal from '@/components/SearchModal';
import MobileNavDrawer from '@/components/MobileNavDrawer';
import PageNavigationLoader from '@/components/PageNavigationLoader';
import StorefrontAiChatbot from '@/components/StorefrontAiChatbot';
import { useRouter } from 'next/navigation';

const StoreShellInner: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const {
    storeConfig,
    categories,
    products,
    cartItems,
    isCartOpen,
    setIsCartOpen,
    isSearchOpen,
    setIsSearchOpen,
    isMenuOpen,
    setIsMenuOpen,
    updateQuantity,
    removeFromCart,
  } = useStore();

  return (
    <>
      <Suspense fallback={null}>
        <PageNavigationLoader />
      </Suspense>

      {children}

      {/* Global AI Support Assistant Chatbot */}
      <StorefrontAiChatbot />

      {/* Global Slide-over Mobile Menu Navigation */}
      <MobileNavDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        siteName={storeConfig.name}
        categories={categories}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Global Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={storeConfig.currency}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          router.push('/checkout');
        }}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        currency={storeConfig.currency}
        onSelectProduct={(p) => router.push(`/products/${p.id}`)}
      />
    </>
  );
};

import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';

export const StoreShell: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <StoreProvider>
          <StoreShellInner>{children}</StoreShellInner>
        </StoreProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default StoreShell;
