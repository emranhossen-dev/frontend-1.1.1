import { Product } from "../context/CartContext";

export interface ExtendedProduct extends Product {
  description: string;
  specs: { label: string; value: string }[];
  gallery: string[];
  inStock: boolean;
  sku: string;
  supportsCustomText: boolean;
  supportsPhotoUpload: boolean;
  variants?: { name: string; options: string[] }[];
}

export const PRODUCTS_DATA: ExtendedProduct[] = [
  {
    id: "gift-001",
    name: "Personalized Magic Heat-Reveal Ceramic Mug",
    price: 16.99,
    originalPrice: 22.99,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Mugs & Drinkware",
    rating: 4.9,
    reviewCount: 245,
    badge: "TOP SELLER",
    isNew: true,
    inStock: true,
    sku: "GPH-MUG-001",
    supportsCustomText: true,
    supportsPhotoUpload: true,
    description:
      "Watch your favorite photo or custom text magic reveal when hot coffee or tea is poured into this high-gloss ceramic mug. Perfect for birthdays, anniversaries, and personal keepsakes.",
    specs: [
      { label: "Capacity", value: "11 oz / 325 ml" },
      { label: "Material", value: "Premium Grade Ceramic" },
      { label: "Feature", value: "Heat-Activated Thermo Magic Coat" },
      { label: "Care", value: "Handwash Recommended" },
      { label: "Print Quality", value: "Sublimation Full-Color HD" },
    ],
    variants: [
      { name: "Color Base", options: ["Magic Black", "Glossy White", "Matte Navy"] },
    ],
  },
  {
    id: "gift-002",
    name: "Custom Embroidered Unisex Premium Fleece Hoodie",
    price: 42.99,
    originalPrice: 54.99,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Custom Apparel",
    rating: 4.8,
    reviewCount: 189,
    badge: "TRENDING",
    inStock: true,
    sku: "GPH-HOD-002",
    supportsCustomText: true,
    supportsPhotoUpload: false,
    description:
      "Heavyweight 350 GSM cotton-blend hoodie personalized with your custom embroidered name, initials, or logo on the chest or cuff. Soft brushed fleece interior for maximum comfort.",
    specs: [
      { label: "Fabric", value: "80% Organic Cotton, 20% Recycled Polyester" },
      { label: "Embroidery", value: "High-Density Japanese Madeira Thread" },
      { label: "Fit", value: "Unisex Relaxed Streetwear Fit" },
      { label: "Sizes Available", value: "S, M, L, XL, XXL" },
    ],
    variants: [
      { name: "Size", options: ["S", "M", "L", "XL", "XXL"] },
      { name: "Hoodie Color", options: ["Vintage Black", "Sand Beige", "Charcoal Gray"] },
    ],
  },
  {
    id: "gift-003",
    name: "Laser Engraved Walnut Wooden Photo Frame",
    price: 27.99,
    originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Photo Frames",
    rating: 4.9,
    reviewCount: 112,
    badge: "GIFT FAVORITE",
    inStock: true,
    sku: "GPH-FRM-003",
    supportsCustomText: true,
    supportsPhotoUpload: true,
    description:
      "Solid walnut timber picture frame custom laser-etched with names, dates, or heartfelt quotes. Comes with HD photo printing included inside the glass.",
    specs: [
      { label: "Frame Size", value: "8x10 Inches (Photo: 5x7 Inch)" },
      { label: "Material", value: "Solid Natural Walnut Wood" },
      { label: "Engraving Method", value: "Precision CO2 Laser Etching" },
      { label: "Includes", value: "Real Glass Front & Desk Kickstand" },
    ],
    variants: [
      { name: "Wood Finish", options: ["Dark Walnut", "Natural Oak", "Rosewood"] },
    ],
  },
  {
    id: "gift-004",
    name: "Custom 3D Acrylic Photo LED Night Lamp",
    price: 32.99,
    originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517999186661-ac0f0ab6f028?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Acrylic Lights",
    rating: 4.9,
    reviewCount: 310,
    badge: "BESTSELLER",
    isNew: true,
    inStock: true,
    sku: "GPH-LMP-004",
    supportsCustomText: true,
    supportsPhotoUpload: true,
    description:
      "Transform any portrait or outline illustration into an enchanting glowing 3D LED acrylic lamp with custom laser engraving and 7 interchangeable LED colors.",
    specs: [
      { label: "Light Modes", value: "7 RGB Solid Colors & Breathing Mode" },
      { label: "Base", value: "Solid Beechwood LED Base" },
      { label: "Power", value: "USB Cable or 3x AA Batteries" },
      { label: "Acrylic Thickness", value: "5mm Premium Optical Acrylic" },
    ],
    variants: [
      { name: "Base Style", options: ["Natural Wood Base", "Black Touch Base"] },
    ],
  },
  {
    id: "gift-005",
    name: "Deluxe Executive Corporate Gift Box",
    price: 64.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Corporate Swag",
    rating: 5.0,
    reviewCount: 78,
    badge: "BULK SWAG",
    inStock: true,
    sku: "GPH-BOX-005",
    supportsCustomText: true,
    supportsPhotoUpload: false,
    description:
      "Curated corporate appreciation gift box containing a custom logo laser-engraved stainless tumbler, debossed leatherette A5 notebook, metal pen, and matching keychain.",
    specs: [
      { label: "Set Contents", value: "Notebook, Metal Pen, Tumbler, Keychain" },
      { label: "Customization", value: "Laser Engraved Logo & Recipient Name" },
      { label: "Packaging", value: "Matte Black Magnetic Gift Box with Ribbon" },
      { label: "Minimum Bulk Order", value: "1 Unit or Bulk Discounts (50+)" },
    ],
    variants: [
      { name: "Box Color", options: ["Matte Black", "Royal Navy", "Emerald Green"] },
    ],
  },
  {
    id: "gift-006",
    name: "Personalized Engraved Leatherette Keychains (Set of 2)",
    price: 14.99,
    originalPrice: 19.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Keychains & Crafts",
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
    sku: "GPH-KEY-006",
    supportsCustomText: true,
    supportsPhotoUpload: false,
    description:
      "Matching custom leather keychains with precision laser-etched names, anniversary coordinates, or initials. Perfect couple or friendship gift.",
    specs: [
      { label: "Material", value: "Reinforced Vegan Leather & Zinc Alloy" },
      { label: "Quantity", value: "Set of 2 Matching Keychains" },
      { label: "Engraving", value: "Dual-Sided Laser Etching" },
    ],
    variants: [
      { name: "Leather Color", options: ["Cognac Brown", "Saddle Tan", "Jet Black"] },
    ],
  },
  {
    id: "gift-007",
    name: "Gallery Wrapped Canvas Photo Print (16x20 Inch)",
    price: 38.99,
    originalPrice: 49.99,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Photo Frames",
    rating: 4.9,
    reviewCount: 164,
    badge: "PREMIUM PRINT",
    inStock: true,
    sku: "GPH-CVS-007",
    supportsCustomText: true,
    supportsPhotoUpload: true,
    description:
      "Turn your cherished family photos, wedding portraits, or artwork into museum-grade canvas wall art. UV-resistant archival inks stretched over sturdy pine stretcher bars.",
    specs: [
      { label: "Canvas Type", value: "380 GSM Cotton Canvas" },
      { label: "Print Tech", value: "12-Color HDR Pigment Archival Ink" },
      { label: "Frame Depth", value: "1.5 Inch Gallery Stretch" },
    ],
    variants: [
      { name: "Dimensions", options: ["12x16 Inch", "16x20 Inch", "24x36 Inch"] },
    ],
  },
  {
    id: "gift-008",
    name: "Personalized Stainless Steel Insulated Tumbler (20 oz)",
    price: 22.99,
    originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1570831739435-660143a4e5dc?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570831739435-660143a4e5dc?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Mugs & Drinkware",
    rating: 4.8,
    reviewCount: 142,
    inStock: true,
    sku: "GPH-TMB-008",
    supportsCustomText: true,
    supportsPhotoUpload: false,
    description:
      "Double-wall vacuum insulated stainless travel tumbler laser engraved with your custom name, monogram, or quote. Keeps beverages icy cold for 18h or steaming hot for 8h.",
    specs: [
      { label: "Capacity", value: "20 oz / 600 ml" },
      { label: "Material", value: "18/8 Food Grade Stainless Steel" },
      { label: "Lid", value: "Spill-Proof Clear Slider Lid" },
    ],
    variants: [
      { name: "Finish", options: ["Matte Black", "Rose Gold", "Stainless Steel", "Pastel Pink"] },
    ],
  },
];
