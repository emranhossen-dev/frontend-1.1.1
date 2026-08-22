import { StoreConfig, HeroBanner, Category, Product } from '@/types/store';

export const defaultStoreConfig: StoreConfig = {
  name: "Frontend",
  tagline: "Premium E-commerce Experience",
  currency: "৳",
  announcementText: "⚡ Free Delivery on orders over ৳5000 | Limited Time Offer",
};

export const defaultHeroBanner: HeroBanner = {
  badge: "New Collection",
  title: "Find something you'll love",
  subtitle: "Curated minimalist essentials crafted for high-end modern lifestyle.",
  imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
  ctaPrimaryText: "Shop Now",
  ctaPrimaryLink: "#products",
  ctaSecondaryText: "Explore Categories",
  ctaSecondaryLink: "#categories",
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
    name: "Gifts",
    slug: "gifts",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop",
    itemCount: 15,
  },
  {
    id: "cat-4",
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    itemCount: 34,
  },
];

export const defaultProducts: Product[] = [
  {
    id: "prod-1",
    title: "Ceramic Minimalist Vase",
    brand: "Studio Minimal",
    price: 3200,
    comparePrice: 3800,
    rating: 4.9,
    badge: "New",
    isNew: true,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=800&auto=format&fit=crop",
    category: "Gifts",
  },
  {
    id: "prod-2",
    title: "Architect Task Lamp",
    brand: "Lumina Studio",
    price: 5400,
    comparePrice: 6200,
    rating: 4.7,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop",
    category: "Electronics",
  },
  {
    id: "prod-3",
    title: "Leather Tech Pouch",
    brand: "Craft & Co",
    price: 2400,
    comparePrice: 2900,
    rating: 4.8,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    category: "Accessories",
  },
  {
    id: "prod-4",
    title: "Essential Notebook Set",
    brand: "Papier Studio",
    price: 1500,
    rating: 5.0,
    badge: "New",
    isNew: true,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    category: "Gifts",
  },
];
