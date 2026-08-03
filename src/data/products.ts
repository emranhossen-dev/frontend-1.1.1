import { Product } from "../context/CartContext";

export interface ExtendedProduct extends Product {
  description: string;
  specs: { label: string; value: string }[];
  gallery: string[];
  inStock: boolean;
  sku: string;
  variants?: { name: string; options: string[] }[];
}

export const PRODUCTS_DATA: ExtendedProduct[] = [
  {
    id: "prod-001",
    name: "Nexus Pro Wireless ANC Headphones",
    price: 299,
    originalPrice: 399,
    image: "/images/hero.png",
    gallery: [
      "/images/hero.png",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Audio",
    rating: 4.9,
    reviewCount: 128,
    badge: "25% OFF",
    isNew: true,
    inStock: true,
    sku: "NX-AUD-001",
    description:
      "Experience studio-quality audio with advanced Active Noise Cancellation, custom 40mm beryllium drivers, and up to 60 hours of continuous playback on a single charge.",
    specs: [
      { label: "Driver Size", value: "40mm Beryllium" },
      { label: "Battery Life", value: "60 Hours (ANC Off), 45 Hours (ANC On)" },
      { label: "Connectivity", value: "Bluetooth 5.3 & 3.5mm Aux" },
      { label: "Weight", value: "250 grams" },
      { label: "Warranty", value: "2 Years Official" },
    ],
    variants: [
      { name: "Color", options: ["Midnight Black", "Silver Frost", "Indigo Glow"] },
    ],
  },
  {
    id: "prod-002",
    name: "Apex Ultra Smartwatch 2",
    price: 249,
    originalPrice: 299,
    image: "/images/smartwatch.png",
    gallery: [
      "/images/smartwatch.png",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Wearables",
    rating: 4.8,
    reviewCount: 94,
    badge: "BESTSELLER",
    inStock: true,
    sku: "APX-WCH-002",
    description:
      "Precision health and activity tracking smartwatch with an ultra-bright AMOLED retina display, ECG monitoring, dual-band GPS, and 50m water resistance.",
    specs: [
      { label: "Display", value: "1.91-inch AMOLED Retina (1000 nits)" },
      { label: "Water Resistance", value: "5 ATM (50 meters)" },
      { label: "Sensors", value: "SpO2, Heart Rate, ECG, Temperature" },
      { label: "Battery", value: "Up to 14 Days" },
    ],
    variants: [
      { name: "Band Size", options: ["41mm", "45mm"] },
      { name: "Case Color", options: ["Titanium Gray", "Matte Black"] },
    ],
  },
  {
    id: "prod-003",
    name: "CyberDeck RGB Mechanical Keyboard",
    price: 159,
    originalPrice: 189,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Gaming",
    rating: 4.7,
    reviewCount: 65,
    inStock: true,
    sku: "CYB-KBD-003",
    description:
      "75% hot-swappable mechanical gaming keyboard with per-key RGB lighting, gasket mount structure, sound-dampening foam, and custom tactile switches.",
    specs: [
      { label: "Switch Type", value: "Hot-Swappable Custom Tactile" },
      { label: "Connectivity", value: "2.4GHz Wireless, Bluetooth 5.0, Type-C" },
      { label: "Keycaps", value: "Double-shot PBT Cherry Profile" },
    ],
    variants: [
      { name: "Switch", options: ["Tactile Brown", "Linear Red", "Clicky Blue"] },
    ],
  },
  {
    id: "prod-004",
    name: "AeroTune True Wireless Earbuds",
    price: 119,
    originalPrice: 149,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Audio",
    rating: 4.6,
    reviewCount: 210,
    badge: "POPULAR",
    inStock: true,
    sku: "AER-EAR-004",
    description:
      "Ultra-compact true wireless earbuds featuring 10mm dynamic drivers, low-latency gaming mode, crystal clear beamforming quad-microphones, and wireless charging case.",
    specs: [
      { label: "Playtime", value: "8 Hours (32 Hours with Case)" },
      { label: "Water Rating", value: "IPX7 Sweat & Water Resistant" },
      { label: "Charging", value: "Qi Wireless & USB-C Fast Charge" },
    ],
  },
  {
    id: "prod-005",
    name: "Vortex Ergonomic Gaming Mouse",
    price: 79,
    originalPrice: 99,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Gaming",
    rating: 4.8,
    reviewCount: 88,
    inStock: true,
    sku: "VTX-MSE-005",
    description:
      "Ultra-lightweight 59g optical gaming mouse with 26,000 DPI flagship sensor, PTFE feet, and zero-drag paracord cable.",
    specs: [
      { label: "DPI Range", value: "100 - 26,000 DPI" },
      { label: "Weight", value: "59 grams" },
      { label: "Switches", value: "Optical Gen-3 (90 Million Clicks)" },
    ],
  },
  {
    id: "prod-006",
    name: "PulseFit GPS Health Tracker",
    price: 129,
    originalPrice: 159,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Wearables",
    rating: 4.5,
    reviewCount: 42,
    inStock: true,
    sku: "PLS-TRK-006",
    description:
      "Sleek fitness band with continuous heart rate monitoring, sleep score analysis, built-in GPS, and up to 10 days of battery life.",
    specs: [
      { label: "Battery", value: "Up to 10 Days" },
      { label: "Water Rating", value: "50m Water Resistant" },
    ],
  },
  {
    id: "prod-007",
    name: "Lumina Smart LED Desk Lamp",
    price: 89,
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Smart Tech",
    rating: 4.9,
    reviewCount: 76,
    isNew: true,
    inStock: true,
    sku: "LUM-LMP-007",
    description:
      "Minimalist smart desk lamp with wireless smartphone charging base, color temperature tuning (2700K - 6500K), and HomeKit / Alexa integration.",
    specs: [
      { label: "Wireless Charge", value: "15W Fast Qi Charger" },
      { label: "Brightness", value: "1000 Lumens" },
    ],
  },
  {
    id: "prod-008",
    name: "SonicSurround Bluetooth Bar",
    price: 199,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Audio",
    rating: 4.7,
    reviewCount: 112,
    inStock: true,
    sku: "SNC-BAR-008",
    description:
      "Compact soundbar speaker with Dolby Audio processing, dual bass radiators, and seamless Bluetooth / HDMI ARC TV connection.",
    specs: [
      { label: "Output Power", value: "120W Peak" },
      { label: "Inputs", value: "HDMI ARC, Optical, Bluetooth 5.0, AUX" },
    ],
  },
];
