import { StoreConfig, HeroBanner, Category, Product } from '@/types/store';

export const defaultStoreConfig: StoreConfig = {
  name: "ArdhiMart",
  tagline: "Premium E-commerce Experience",
  currency: "৳",
  logoUrl: "/logo.png",
  announcementText: "Free Delivery on orders over ৳5000 | Use Code: FIRST50",
};

export const defaultHeroBanner: HeroBanner = {
  badge: "Smart Tech Collection ⚡",
  title: "Smart LED Digital Pen Holder",
  subtitle: "Premium desk organizer with digital clock, alarm & ambient LED light. Elevate your workspace with a modern touch!",
  imageUrl: "/images/ardhimart-smart-pen-holder.webp",
  ctaPrimaryText: "Order Now",
  ctaPrimaryLink: "/products",
  ctaSecondaryText: "Explore Gadgets",
  ctaSecondaryLink: "/products",
};

export const defaultCategories: Category[] = [
  {
    id: "cat-1",
    name: "Clothing",
    slug: "clothing",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600&auto=format&fit=crop",
    itemCount: 42,
  },
  {
    id: "cat-2",
    name: "Electronics",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    itemCount: 28,
  },
  {
    id: "cat-3",
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    itemCount: 34,
  },
  {
    id: "cat-4",
    name: "Gifts & Living",
    slug: "gifts",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop",
    itemCount: 19,
  },
];

export const defaultProducts: Product[] = [];
