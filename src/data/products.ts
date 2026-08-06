import { Product } from "../context/CartContext";

export interface ExtendedProduct extends Product {
  description: string;
  specs: { label: string; value: string }[];
  features?: string[];
  usability?: string;
  faqs?: { question: string; answer: string }[];
  gallery: string[];
  inStock: boolean;
  sku: string;
  brand: string;
  isBestDeal?: boolean;
  discountPercent?: number;
  supportsCustomText?: boolean;
  supportsPhotoUpload?: boolean;
  variants?: { name: string; options: string[] }[];
}

export const CATEGORIES = [
  { id: "Electronics", name: "Electronics", icon: "laptop", count: "১২৪ টি আইটেম" },
  { id: "Accessories", name: "Accessories", icon: "glasses", count: "৮৯ টি আইটেম" },
  { id: "Smartwatch", name: "Smartwatch", icon: "watch", count: "৪৫ টি আইটেম" },
  { id: "Audio", name: "Audio", icon: "headphones", count: "৬৭ টি আইটেম" },
  { id: "Home", name: "Home", icon: "home", count: "৯৮ টি আইটেম" },
  { id: "Lifestyle", name: "Lifestyle", icon: "briefcase", count: "১১২ টি আইটেম" },
  { id: "Fashion", name: "Fashion", icon: "shirt", count: "১৫৬ টি আইটেম" },
  { id: "More", name: "More", icon: "grid", count: "২০০+ আইটেম" },
];

export const HERO_SLIDES = [
  {
    id: "slide-1",
    tagline: "নতুন কালেকশন",
    title: "Upgrade Your Everyday",
    subtitle: "সেরা মানের সাউন্ড, স্মার্ট গেজেট ও লাইফস্টাইল প্রডাক্টস পান সেরা মূল্যে।",
    ctaText: "Shop Now",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80",
    badge: "বিশেষ ২৫% ছাড়",
    accentColor: "from-blue-600 via-indigo-600 to-purple-600",
  },
  {
    id: "slide-2",
    tagline: "স্মার্ট ফিটনেস ঘড়ি",
    title: "Smart Fitness Watch 8",
    subtitle: "হার্ট রেট, হেলথ ট্র্যাকিং, AMOLED ডিসপ্লে ও ১৪ দিনের মেগা ব্যাটারি লাইফ।",
    ctaText: "Explore Watch",
    category: "Smartwatch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80",
    badge: "হট ট্রেন্ডিং",
    accentColor: "from-sky-500 via-blue-600 to-cyan-500",
  },
  {
    id: "slide-3",
    tagline: "অসাধারণ সাউন্ড অভিজ্ঞতা",
    title: "AirPulse Noise Canceling TWS",
    subtitle: "এক্টিভ নয়েজ ক্যান্সেলেশন, ক্রিস্টাল ক্লিয়ার কলিং এবং ওয়্যারলেস চার্জিং কেস।",
    ctaText: "Grab Deal",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1000&auto=format&fit=crop&q=80",
    badge: "ফ্ল্যাশ সেল",
    accentColor: "from-purple-600 via-pink-600 to-rose-600",
  },
];

export const PRODUCTS_DATA: ExtendedProduct[] = [
  {
    id: "prod-001",
    name: "Wireless ANC Pro Over-Ear Headphones",
    price: 2490,
    originalPrice: 3200,
    discountPercent: 22,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Audio",
    brand: "SonicX",
    rating: 4.9,
    reviewCount: 384,
    badge: "বেস্টসেলার",
    isNew: true,
    isBestDeal: true,
    inStock: true,
    sku: "WB-AUD-001",
    description:
      "স্টুডিও কোয়ালিটি সাউন্ড, হাইব্রিড এক্টিভ নয়েজ ক্যান্সেলেশন এবং ৪০ ঘণ্টার লং লাস্টিং ব্যাটারি লাইফ সহ প্রিমিয়াম হেডফোন। মেমরি ফোম পেডিং দীর্ঘক্ষণ ব্যবহারের জন্য অত্যন্ত আরামদায়ক।",
    features: [
      "৪০ ঘণ্টা নন-স্টপ মিউজিক প্লেব্যাক টাইম",
      "হাইব্রিড ANC টেকনোলজি বাইরের কোলাহল দূর করে",
      "টাইপ-সি ফাস্ট চার্জিং (১০ মিনিট চার্জে ৪ ঘণ্টা ব্যাকআপ)",
      "ব্লুটুথ ৫.৩ ও ৩.৫ মিমি অডিও জ্যাক সাপোর্ট",
      "সফ্ট লেদার মেমরি ফোম ইয়ার প্যাড",
    ],
    usability:
      "হেডফোনের পাওয়ার বাটন ৩ সেকেন্ড চেপে ধরে ব্লুটুথ অন করুন। মোবাইল বা ল্যাপটপের সাথে কানেক্ট করে আরামদায়ক সাউন্ড উপভোগ করুন। কল রিসিভ করতে এবং নয়েজ ক্যানসেলেশন মোড অন করতে সাইড বাটন ব্যবহার করুন।",
    faqs: [
      {
        question: "পণ্যটির সাথে কতদিনের ওয়ারেন্টি পাওয়া যাবে?",
        answer: "আমরা প্রদান করছি ১ বছরের অফিশিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি।",
      },
      {
        question: "স্মার্টফোন এবং ল্যাপটপ দুটোতেই কি ব্যবহার করা যাবে?",
        answer: "হ্যাঁ, এটি মাল্টিপয়েন্ট ব্লুটুথ সাপোর্ট করে, তাই একসাথে ল্যাপটপ ও ফোনে কানেক্ট রাখা যায়।",
      },
      {
        question: "ডেলিভারি চার্জ কত?",
        answer: "সারাদেশে ক্যাশ অন ডেলিভারিতে চার্জ মাত্র ৬০ টাকা (ঢাকার ভেতরে) ও ১২০ টাকা (ঢাকার বাইরে)।",
      },
    ],
    specs: [
      { label: "ব্যাটারি ব্যাকআপ", value: "৪০ ঘণ্টা পর্যন্ত" },
      { label: "কানেক্টিভিটি", value: "ব্লুটুথ ৫.৩ ও ৩.৫ মিমি অক্স" },
      { label: "ড্রাইভার সাইজ", value: "৪০ মিমি টাইটানিয়াম ড্রাইভার" },
      { label: "নয়েজ ক্যান্সেলেশন", value: "হাইব্রিড এক্টিভ নয়েজ ক্যানসেলেশন (ANC)" },
      { label: "চার্জিং পোর্ট", value: "USB Type-C ফাস্ট চার্জিং" },
    ],
    variants: [
      { name: "Color", options: ["Midnight Black", "Space Gray", "Nordic Blue"] },
    ],
  },
  {
    id: "prod-002",
    name: "Pro Ultra Smartwatch 8 Series AMOLED",
    price: 1990,
    originalPrice: 2600,
    discountPercent: 23,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Smartwatch",
    brand: "ChronoFit",
    rating: 4.8,
    reviewCount: 290,
    badge: "হট ডিল",
    isBestDeal: true,
    inStock: true,
    sku: "WB-WCH-002",
    description:
      "১.৯৬ ইঞ্চি ফুল HD AMOLED ডিসপ্লে, রিয়েল-টাইম হার্ট রেট ও ব্লড অক্সিজেন ট্র্যাকিং সহ ব্লুটুথ কলিং স্মার্টওয়াচ। ১২ দিনের দীর্ঘ ব্যাটারি ব্যাকআপ ও ৫০ মিটার ওয়াটারপ্রুফ।",
    features: [
      "১.৯৬ ইঞ্চি রেটিনা AMOLED অলওয়েজ-অন ডিসপ্লে",
      "ব্লুটুথ কলিং ও ডাইরেক্ট ডায়ালিং সুবিধা",
      "১০০+ স্পোর্টস মোড ও ফিটনেস ট্র্যাকার",
      "SpO2, হার্ট রেট ও স্লিপ মনিটরিং",
      "IP68 ওয়াটারপ্রুফ বডি",
    ],
    usability:
      "স্মার্টওয়াচটি ফোনে কানেক্ট করতে 'ChronoFit App' ইনস্টল করে কিউআর কোড স্ক্যান করুন। অ্যাপের মাধ্যমে বিভিন্ন ওয়াচ ফেস কাস্টমাইজ এবং নোটিফিকেশন সেট করতে পারবেন।",
    faqs: [
      {
        question: "আইফোন এবং এন্ড্রয়েড ফোন উভয়টিতেই চলবে কি?",
        answer: "হ্যাঁ, এটি iOS 10.0+ এবং Android 5.0+ সকল স্মার্টফোনে সাপোর্ট করে।",
      },
      {
        question: "ঘড়ি পরে কি সাঁতার কাটা যাবে?",
        answer: "এটি IP68 ওয়াটারপ্রুফ, তাই হাত ধোয়া ও হালকা বৃষ্টিতে নিশ্চিন্তে ব্যবহার করা যাবে।",
      },
    ],
    specs: [
      { label: "ডিসপ্লে", value: "১.৯৬ ইঞ্চি HD AMOLED টাচস্ক্রিন" },
      { label: "ওয়াটার রেসিস্ট্যান্স", value: "IP68 ওয়াটারপ্রুফ" },
      { label: "ব্যাটারি লাইফ", value: "১২ দিন পর্যন্ত লাইট ইউসেজ" },
      { label: "সেন্সর", value: "হার্ট রেট, SpO2, স্লিপ সেন্সর, জিপিএস" },
    ],
    variants: [
      { name: "Strap Color", options: ["Matte Black", "Ocean Blue", "Silver Titanium"] },
    ],
  },
  {
    id: "prod-003",
    name: "AirPulse Pro TWS Wireless Earbuds",
    price: 1250,
    originalPrice: 1800,
    discountPercent: 30,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Audio",
    brand: "AirPulse",
    rating: 4.9,
    reviewCount: 512,
    badge: "সেরা ডিল",
    isBestDeal: true,
    inStock: true,
    sku: "WB-AUD-003",
    description:
      "অাল্ট্রা-লাইটওয়েট ট্রু ওয়্যারলেস ইয়ারবাডস। এইচডি বেস সাউন্ড, ক্রিস্টাল ক্লিয়ার ভয়েস কলিং এবং ৩০ ঘণ্টার কেস ব্যাটারি ব্যাকআপ।",
    features: [
      "৩ডি স্পেশাল সারাউন্ড সাউন্ড ও বেস বুস্ট",
      "৮ ঘণ্টা ইয়ারবাডস + ৩০ ঘণ্টা চার্জিং কেস ব্যাকআপ",
      "স্মার্ট টাচ সেন্সর কন্ট্রোল",
      "IPX7 ওয়াটার ও সোয়েট প্রুফ",
    ],
    usability:
      "কেস থেকে বের করলেই এয়ারবাডস স্বয়ংক্রিয়ভাবে অন ও পেয়ার হয়ে যাবে। গান থামানো বা কল রিসিভ করতে এয়ারবাডসের পিঠে আলতো টাচ করুন।",
    faqs: [
      {
        question: "গেমিং করার সময় কোন ল্যাগ হবে কি?",
        answer: "না, এতে রয়েছে ৪৫ms আল্ট্রা-লো লেটেন্সি গেমিং মোড।",
      },
    ],
    specs: [
      { label: "অডিও টেকনোলজি", value: "৩ডি স্পেশাল সারাউন্ড সাউন্ড" },
      { label: "প্লেটাইম", value: "৮ ঘণ্টা বাডস + ৩০ ঘণ্টা কেস" },
      { label: "মাইক", value: "কোয়াড ENC নয়েজ রিডাকশন মাইক" },
    ],
    variants: [
      { name: "Color", options: ["Pure White", "Jet Black"] },
    ],
  },
  {
    id: "prod-004",
    name: "Studio 4K Mirrorless Digital Camera",
    price: 85000,
    originalPrice: 98000,
    discountPercent: 13,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Electronics",
    brand: "OptiShot",
    rating: 4.95,
    reviewCount: 144,
    badge: "প্রো পিক",
    isBestDeal: true,
    inStock: true,
    sku: "WB-CAM-004",
    description:
      "কন্টেন্ট ক্রিয়েটর ও ফটোগ্রাফারদের জন্য প্রফেশনাল ৪কে মিাররলেস ক্যামেরা। ২৪.২ মেগাপিক্সেল ফুল-ফ্রেম সেন্সর ও আই-ট্র্যাকিং অটোফোকাস।",
    features: [
      "২৪.২ মেগাপিক্সেল ফুল-ফ্রেম CMOS সেন্সর",
      "4K UHD ভিডিও রেকর্ডিং ৬০fps এ",
      "আই-ট্র্যাকিং রিয়েলটাইম অটোফোকাস",
      "রোটেশনাল টাচস্ক্রিন LCD ফ্লিপ স্ক্রিন",
    ],
    usability:
      "ক্যামেরায় লেন্স ফিট করে এসডি কার্ড ইনস্টল করুন। মোড ডায়াল ঘুরিয়ে ভিডিও বা ফটো মোড সিলেক্ট করে প্রফেশনাল কন্টেন্ট ক্রিয়েট করুন।",
    faqs: [
      {
        question: "ক্যামেরার সাথে কি লেন্স ইনক্লুডেড?",
        answer: "হ্যাঁ, ১৮-৫৫ মিমি কিট লেন্স সম্পূর্ণ ফ্রিতে অফারের সাথে পাবেন।",
      },
    ],
    specs: [
      { label: "সেন্সর", value: "২৪.২ MP ফুল-ফ্রেম CMOS সেন্সর" },
      { label: "ভিডিও রেজোলিউশন", value: "4K UHD 60fps / 1080p 120fps" },
      { label: "লেন্স মাউন্ট", value: "ইউনিভার্সাল E-মাউন্ট (১৮-৫৫ মিমি কিট লেন্স)" },
    ],
    variants: [
      { name: "Kit Option", options: ["Body Only", "18-55mm Lens Kit"] },
    ],
  },
  {
    id: "prod-005",
    name: "Minimalist Ergonomic Mechanical Keyboard",
    price: 4500,
    originalPrice: 5800,
    discountPercent: 22,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Electronics",
    brand: "KeyCraft",
    rating: 4.7,
    reviewCount: 198,
    isNew: true,
    inStock: true,
    sku: "WB-KEY-005",
    description:
      "ট্রাই-মোড ওয়্যারলেস ৭৫% মেকানিক্যাল কীবোর্ড। হট-সোয়াপ্যাবল সুইচ, কাস্টমাইজড RGB ব্যাকলাইটিং এবং সিএনসি অ্যালুমিনিয়াম ফ্রেম।",
    specs: [
      { label: "সুইচ টাইপ", value: "কাস্টম লিনিয়ার রেড মেকানিক্যাল সুইচ" },
      { label: "কানেকশন", value: "২.৪GHz ওয়্যারলেস / ব্লুটুথ ৫.১ / টাইপ-সি" },
      { label: "ব্যাটারি", value: "৪০০০mAh রিচার্জেবল ব্যাটারি" },
    ],
    variants: [
      { name: "Keycaps", options: ["Retro Cream", "Carbon Gray", "Cyberpunk Violet"] },
    ],
  },
  {
    id: "prod-006",
    name: "Smart Ambient RGB Atmosphere Light Bar",
    price: 1850,
    originalPrice: 2500,
    discountPercent: 26,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Home",
    brand: "Lumina",
    rating: 4.85,
    reviewCount: 220,
    isNew: true,
    inStock: true,
    sku: "WB-HOM-006",
    description:
      "স্মার্ট আরজিবি রুম অ্যান্ড ডেস্ক লাইট বার। মিউজিক ও গেমিং সাউন্ডের সাথে লাইট সিঙ্ক সুবিধা এবং অ্যাপ কন্ট্রোল।",
    specs: [
      { label: "কন্ট্রোল", value: "স্মার্ট অ্যাপ + রিমোট কন্ট্রোল" },
      { label: "পাওয়ার", value: "USB 5V/2A" },
      { label: "ফিচার", value: "মিউজিক রিদম সিঙ্ক ও কালার মোড" },
    ],
    variants: [
      { name: "Pack", options: ["Single Bar", "Dual Pack Set"] },
    ],
  },
  {
    id: "prod-007",
    name: "Waterproof Tactical Anti-Theft Backpack",
    price: 2200,
    originalPrice: 2900,
    discountPercent: 24,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Lifestyle",
    brand: "UrbanNomad",
    rating: 4.75,
    reviewCount: 165,
    inStock: true,
    sku: "WB-LIF-007",
    description:
      "ওয়াটারপ্রুফ ওয়াটার-রেপেলেন্ট ল্যাপটপ অ্যান্টি-থেফট ট্রাভেল ব্যাকপ্যাক। টিএসএ পাসওয়ার্ড লক এবং আউটডোর ইউএসবি চার্জিং পোর্ট।",
    specs: [
      { label: "ক্যাপাসিটি", value: "৩০ লিটার (১৬ ইঞ্চি ল্যাপটপ সহ সুবিধা)" },
      { label: "মেটেরিয়াল", value: "ওয়াটারপ্রুফ হাই-ডেনসিটি অক্সফোর্ড নাইলন" },
      { label: "সিকিউরিটি", value: "ইন্টিগ্রেটেড TSA পাসওয়ার্ড লক" },
    ],
    variants: [
      { name: "Color", options: ["Stealth Black", "Military Olive", "Slate Gray"] },
    ],
  },
  {
    id: "prod-008",
    name: "Luxury Chronograph Leather Quartz Watch",
    price: 3500,
    originalPrice: 4800,
    discountPercent: 27,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Accessories",
    brand: "Vanguard",
    rating: 4.9,
    reviewCount: 178,
    badge: "প্রিমিয়াম",
    inStock: true,
    sku: "WB-ACC-008",
    description:
      "জেনুইন লেদার স্ট্র্যাপ এবং স্ক্র্যাচ-রেজিস্ট্যান্ট স্যাফায়ার গ্লাস ওয়াচ। প্রিমিয়াম জাপানিজ কোয়ার্টজ মুভমেন্ট।",
    specs: [
      { label: "মুভমেন্ট", value: "জাপানিজ মিয়োটা কোয়ার্টজ ক্রোনোগ্রাফ" },
      { label: "কেস সাইজ", value: "৪২ মিমি ডায়ামিটার / ১০ মিমি থিকনেস" },
      { label: "স্ট্র্যাপ", value: "২২ মিমি অরিজিনাল লেদার" },
    ],
    variants: [
      { name: "Strap", options: ["Saddle Brown", "Cognac Tan", "Jet Black"] },
    ],
  },
  {
    id: "prod-009",
    name: "Heavyweight Fleece Unisex Streetwear Hoodie",
    price: 1650,
    originalPrice: 2200,
    discountPercent: 25,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Fashion",
    brand: "AuraWear",
    rating: 4.8,
    reviewCount: 310,
    inStock: true,
    sku: "WB-FSH-009",
    description:
      "৪০০ জিএসএম প্রিমিয়াম অর্গানিক কটন ও কাস্টম এমব্রয়ডারি করা ক্লাসি ও আরামদায়ক ইউনিসেক্স প্রিমিয়াম হুডি।",
    specs: [
      { label: "ফেব্রিক", value: "১০০% অর্গানিক হেভিওয়েট কটন" },
      { label: "ফিটিং", value: "রিল্যাক্সড বক্সি ড্রপ-শোল্ডার ফিট" },
    ],
    variants: [
      { name: "Size", options: ["S", "M", "L", "XL", "XXL"] },
      { name: "Color", options: ["Washed Black", "Sand Beige", "Sage Green"] },
    ],
  },
  {
    id: "prod-010",
    name: "MagSafe 10000mAh Slim Power Bank",
    price: 1450,
    originalPrice: 1950,
    discountPercent: 25,
    image: "https://images.unsplash.com/photo-1609592424089-98285f782390?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609592424089-98285f782390?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Accessories",
    brand: "VoltCharge",
    rating: 4.85,
    reviewCount: 245,
    inStock: true,
    sku: "WB-ACC-010",
    description:
      "ম্যাগনেটিক ম্যাগসেফ ওয়্যারলেস পাওয়ার ব্যাংক। ১৫W ফাস্ট ওয়্যারলেস এবং ২০W টাইপ-সি ফাস্ট চার্জিং আউটপুট।",
    specs: [
      { label: "ক্যাপাসিটি", value: "১০,০০০ mAh লি-পো ব্যাটারি" },
      { label: "ওয়্যারলেস আউটপুট", value: "১৫W ফাস্ট চার্জিং মেক্স" },
    ],
    variants: [
      { name: "Color", options: ["Space Gray", "Ceramic White"] },
    ],
  },
  {
    id: "prod-011",
    name: "Smart RGB Bluetooth Soundbar Speaker",
    price: 4200,
    originalPrice: 5500,
    discountPercent: 23,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Home",
    brand: "SonicX",
    rating: 4.7,
    reviewCount: 118,
    inStock: true,
    sku: "WB-HOM-011",
    description:
      "ডাবল সাবউফার সহ থ্রিডি সারাউন্ড সাউন্ড স্পিকার ও সাউন্ডবার। টিভি, পিসি ও মোবাইলে ব্যবহারে উপযোগী।",
    specs: [
      { label: "আউটপুট পাওয়ার", value: "৬০W পিক সাউন্ড পাওয়ার" },
      { label: "চ্যানেল", value: "২.১ চ্যানেল বিল্ট-ইন বেস পোর্ট" },
    ],
    variants: [
      { name: "Finish", options: ["Matte Black", "Brushed Silver"] },
    ],
  },
  {
    id: "prod-012",
    name: "Polarized UV400 Modern Aviator Sunglasses",
    price: 1150,
    originalPrice: 1600,
    discountPercent: 28,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Fashion",
    brand: "ShadeCo",
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    sku: "WB-FSH-012",
    description:
      "ইউভি৪০০ প্রটেকশন ও ৯-লেয়ার পোলারাইজড গ্লাস অ্যালয় ফ্রেম প্রিমিয়াম সানগ্লাস। চশমার সাথে বক্স কভার সহ।",
    specs: [
      { label: "লেন্স টেকনোলজি", value: "TAC Polarized UV400 Protection" },
      { label: "ফ্রেম মেটেরিয়াল", value: "আল্ট্রালাইট স্টিল অ্যালয়" },
    ],
    variants: [
      { name: "Lens Color", options: ["Gradient Black", "Emerald Mirror", "Warm Amber"] },
    ],
  },
];
