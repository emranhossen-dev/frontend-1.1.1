export interface StoreConfig {
  name: string;
  tagline: string;
  currency: string;
  logoUrl?: string;
  announcementText?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount?: number;
}

export interface Product {
  id: string;
  title: string;
  brand?: string;
  price: number;
  comparePrice?: number;
  rating: number;
  reviewsCount?: number;
  badge?: string;
  image: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface HeroBanner {
  title: string;
  subtitle: string;
  badge: string;
  imageUrl: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
