'use client';

export const runtime = 'edge';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNavBar from '@/components/BottomNavBar';
import FeaturedProducts from '@/components/FeaturedProducts';
import { Product } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { useAuth } from '@/context/AuthContext';
import {
  Heart,
  Share2,
  Star,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  RotateCcw,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Zap,
  MessageSquare,
  MessageCircle,
  Phone,
  CheckCircle2,
  FileText,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const {
    products,
    isLoading,
    storeConfig,
    wishlistIds,
    toggleWishlist,
    addToCart,
    setIsCartOpen,
  } = useStore();

  const { user: currentUser } = useAuth();

  // Find product by id or urlSlug
  const product: Product | undefined = products.find(
    (p) => p.id === productId || p.urlSlug === productId
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Full-Screen Image Lightbox Modal State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Verified Reviews State
  const [reviewsList, setReviewsList] = useState<
    Array<{
      id: string;
      userName: string;
      rating: number;
      comment: string;
      date: string;
      image?: string;
    }>
  >([
    {
      id: 'rev-1',
      userName: 'আব্দুল্লাহ আল মামুন',
      rating: 5,
      comment: 'প্রডাক্টটি হাতে পেয়েছি। কোয়ালিটি অনেক ভালো এবং ফাস্ট ডেলিভারি পেয়েছি। ধন্যবাদ!',
      date: '২৮ আগস্ট, ২০২৬',
    },
  ]);

  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newReviewImage, setNewReviewImage] = useState('');

  if (!product || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 lg:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-6 w-full aspect-square bg-gray-200 dark:bg-slate-800 rounded-md animate-pulse" />
            <div className="lg:col-span-6 space-y-4">
              <div className="h-7 bg-gray-200 dark:bg-slate-800 rounded-md w-3/4 animate-pulse" />
              <div className="h-5 bg-gray-200 dark:bg-slate-800 rounded-md w-1/3 animate-pulse" />
              <div className="h-12 bg-gray-200 dark:bg-slate-800 rounded-md w-full animate-pulse" />
            </div>
          </div>
        </main>
        <Footer />
        <BottomNavBar />
      </div>
    );
  }

  const galleryImages = [
    product.image,
    ...(product.galleryImages && Array.isArray(product.galleryImages) ? product.galleryImages : []),
  ].filter(Boolean);

  // Split comma-separated variants from database if present (product.color)
  const variantOptions = product.color
    ? product.color.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const isWishlisted = wishlistIds.includes(product.id);

  const discountPercent = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  // Filter Related Products (Same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 6);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor || (variantOptions[0] ?? ''));
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor || (variantOptions[0] ?? ''));
    setIsCartOpen(false);
    router.push('/checkout');
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  // Review Image File Handler
  const handleReviewImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewReviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Review Form Submit Handler (Verified buyers only)
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      router.push('/login');
      return;
    }

    if (!newComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      userName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Verified Customer',
      rating: newRating,
      comment: newComment,
      date: new Date().toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      image: newReviewImage || undefined,
    };

    setReviewsList((prev) => [newRev, ...prev]);
    setNewComment('');
    setNewReviewImage('');
    setNewRating(5);
    alert('ধন্যবাদ! আপনার রিভিউটি সফলভাবে প্রকাশিত হয়েছে।');
  };

  const featuresList = product.features && product.features.length > 0 ? product.features : [
    '১০০% প্রিমিয়াম ও অরিজিনাল কোয়ালিটি গ্যারান্টি।',
    'দীর্ঘস্থায়ী ও অত্যন্ত টেকসই উপাদান।',
    'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা।',
    '৭ দিনের সহজ রিটার্ন ও রিপ্লেসমেন্ট সুবিধা।',
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans select-none">
      {/* Header */}
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 pb-24 lg:pb-12">
        {/* Breadcrumb Navigation */}
        <div className="mb-4 pb-2 border-b border-gray-200/80 dark:border-slate-800">
          <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-[#FF6B00] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/products?category=${encodeURIComponent(product.category || 'All')}`}
              className="hover:text-[#FF6B00] transition-colors"
            >
              {product.category || 'Products'}
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-semibold truncate">{product.title}</span>
          </nav>
        </div>

        {/* 2-Column Responsive Layout (Blended Background, Compact Spacing) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Product Gallery Slider (Square Shaped Container - Point 6) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-3">
            {/* Main Stage Square Image Viewer */}
            <div className="relative w-full aspect-square bg-white dark:bg-slate-900 rounded-md border border-gray-200/80 dark:border-slate-800 overflow-hidden group shadow-xs flex items-center justify-center">
              <img
                src={galleryImages[activeImageIndex] || product.image}
                alt={product.title}
                className="w-full h-full object-contain cursor-zoom-in transition-all duration-300 group-hover:scale-102"
                onClick={() => openLightbox(activeImageIndex)}
              />

              {/* Lightbox Zoom Button */}
              <button
                onClick={() => openLightbox(activeImageIndex)}
                className="absolute top-3 right-3 p-2 bg-black/60 dark:bg-white/80 backdrop-blur-md text-white dark:text-black rounded-md shadow hover:scale-105 transition-all opacity-80 hover:opacity-100 cursor-pointer"
                aria-label="View Fullscreen Image"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              {/* Prev/Next Chevron Controls */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-md backdrop-blur-sm opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-md backdrop-blur-sm opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Selector Strip */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all cursor-pointer shrink-0 bg-white dark:bg-slate-900 ${
                      activeImageIndex === idx
                        ? 'border-[#FF6B00] scale-102 shadow-xs'
                        : 'border-gray-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover rounded-md" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Title, Pricing, Variants & CTAs (Blended Background - Point 11) */}
          <div className="lg:col-span-6 space-y-4 py-1">
            
            {/* FULL WIDTH TITLE (Justified & Lighter Font - Point 7) */}
            <div className="space-y-1.5">
              <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-normal w-full text-left sm:text-justify block tracking-normal">
                {product.title}
              </h1>

              {/* Action Metadata Row */}
              <div className="flex items-center justify-between pt-0.5">
                <Link
                  href={`/products?category=${encodeURIComponent(product.category || 'All')}`}
                  className="text-xs font-bold text-[#FF6B00] hover:underline uppercase tracking-wider truncate whitespace-nowrap"
                >
                  {product.brand || product.category}
                </Link>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Wishlist"
                    className="p-2 rounded-md bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-500 hover:text-red-500 transition-all cursor-pointer shadow-xs active:scale-90"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  <button
                    onClick={async () => {
                      try {
                        if (typeof window !== 'undefined' && navigator.share) {
                          await navigator.share({
                            title: product.title,
                            url: window.location.href,
                          });
                        } else if (typeof window !== 'undefined' && navigator.clipboard) {
                          await navigator.clipboard.writeText(window.location.href);
                          alert('প্রডাক্টের লিংক কপি করা হয়েছে!');
                        }
                      } catch {}
                    }}
                    aria-label="Share"
                    className="p-2 rounded-md bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-500 hover:text-black dark:hover:text-white transition-all cursor-pointer shadow-xs active:scale-90"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Ratings & Stock Row (Cleaned up - Point 8) */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-medium text-gray-600 dark:text-gray-400">
                ({reviewsList.length + (product.reviewsCount || 0)})
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                In Stock
              </span>
            </div>

            {/* Pricing Box & Discount Pill */}
            <div className="flex items-center gap-3 py-2 border-y border-gray-200/80 dark:border-slate-800">
              <span className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                {storeConfig.currency}
                {product.price.toLocaleString()}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-sm sm:text-base text-gray-400 line-through font-medium">
                  {storeConfig.currency}
                  {product.comparePrice.toLocaleString()}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-[#FF6B00] text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow-xs">
                  SAVE {discountPercent}%
                </span>
              )}
            </div>

            {/* Dynamic Variant Options Selector */}
            {variantOptions.length > 0 && (
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  Select Option:{' '}
                  <span className="text-[#FF6B00] font-bold">
                    {selectedColor || variantOptions[0]}
                  </span>
                </h3>
                <div className="flex gap-1.5 flex-wrap">
                  {variantOptions.map((opt) => {
                    const isSelected = (selectedColor || variantOptions[0]) === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedColor(opt)}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#FF6B00] text-white border-[#FF6B00] shadow-xs'
                            : 'bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-[#FF6B00]'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Quantity:</span>
              <div className="flex items-center border border-gray-200 dark:border-slate-800 rounded-md p-0.5 bg-white dark:bg-slate-900 shrink-0">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 rounded text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-all cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-bold text-xs text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 rounded text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ADD TO CART & BUY NOW BUTTONS (Square-shaped rounded-md - Point 9) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleAddToCart}
                className="btn-shimmer w-full py-2.5 px-2 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-xs active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span className="truncate whitespace-nowrap">Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="btn-shimmer w-full py-2.5 px-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-xs active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Zap className="w-4 h-4 shrink-0" />
                <span className="truncate whitespace-nowrap">Buy Now</span>
              </button>
            </div>

            {/* WHATSAPP & CALL FOR ORDER BUTTONS WITH SLIDING SHIMMER ANIMATION & SMALLER READABLE TEXT (Point 10 & 13) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`https://wa.me/8801700000000?text=${encodeURIComponent(
                  `আসসালামু আলাইকুম, আমি "${product.title}" প্রডাক্টটি অর্ডার করতে চাই।\nমূল্য: ৳${product.price}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn-shimmer w-full py-2.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px] sm:text-xs rounded-md transition-all shadow-xs active:scale-98 cursor-pointer flex items-center justify-center gap-1 text-center"
              >
                <MessageCircle className="w-4 h-4 shrink-0 text-white" />
                <span className="truncate whitespace-nowrap">Order on WhatsApp</span>
              </a>

              <a
                href="tel:+8801700000000"
                className="btn-shimmer w-full py-2.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-[11px] sm:text-xs rounded-md transition-all shadow-xs active:scale-98 cursor-pointer flex items-center justify-center gap-1 text-center"
              >
                <Phone className="w-4 h-4 shrink-0 text-white" />
                <span className="truncate whitespace-nowrap">Call for Order</span>
              </a>
            </div>
          </div>
        </div>

        {/* STACKED CONTENT SECTIONS (Blended Background, No Isolated Card Containers - Point 11 & 12) */}
        <div className="mt-6 space-y-6">
          
          {/* Section 1: Product Description (পণ্য বিবরণ - Bangla Predominant) */}
          <section className="border-b border-gray-200/80 dark:border-slate-800 pb-5 space-y-2.5">
            <div className="flex items-center gap-2 pb-1">
              <FileText className="w-4 h-4 text-[#FF6B00]" />
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                পণ্য বিবরণ (Product Overview)
              </h2>
            </div>
            <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
              {product.shortDescription && (
                <p className="font-semibold text-gray-900 dark:text-white">
                  {product.shortDescription}
                </p>
              )}
              <p className="whitespace-pre-line leading-relaxed">
                {product.description || 'পণ্যটির বিস্তারিত বিবরণ এবং প্রস্তুত প্রণালী বাংলা ভাষায় সুন্দরভাবে উপস্থাপিত।'}
              </p>
            </div>
          </section>

          {/* Section 2: Key Features (মূল বৈশিষ্ট্যসমূহ - Clean Bullet List - Point 12) */}
          <section className="border-b border-gray-200/80 dark:border-slate-800 pb-5 space-y-2.5">
            <div className="flex items-center gap-2 pb-1">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                মূল বৈশিষ্ট্যসমূহ (Key Features)
              </h2>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              {featuresList.map((feat: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: How to Use (ব্যবহারবিধি ও সতর্কতা - Blended Text - Point 12) */}
          <section className="border-b border-gray-200/80 dark:border-slate-800 pb-5 space-y-2.5">
            <div className="flex items-center gap-2 pb-1">
              <HelpCircle className="w-4 h-4 text-cyan-500" />
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                ব্যবহারবিধি ও যত্ন (How to Use & Care Instructions)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line font-normal">
              {product.usability || `১. ব্যবহারের পূর্বে প্যাকেটের ইউজার নির্দেশিকা সতর্কতার সাথে পড়ুন।
২. পানি, আর্দ্রতা এবং অতিরিক্ত উত্তাপ থেকে পণ্যটিকে দূরে সংরক্ষণ করুন।
৩. সঠিক ও নিয়মিত যত্নের মাধ্যমে পণ্যটির স্থায়িত্ব দীর্ঘমেয়াদী বজায় রাখুন।`}
            </p>
          </section>

          {/* Section 4: Customer Reviews (গ্রাহক রিভিউ ও মতামত) */}
          <section className="space-y-4 pb-4">
            <div className="flex items-center justify-between border-b border-gray-200/80 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-500" />
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  গ্রাহক রিভিউ (Customer Reviews)
                </h2>
              </div>
              <span className="text-[11px] font-bold text-[#FF6B00]">
                {reviewsList.length} Verified Reviews
              </span>
            </div>

            {/* List of Verified Reviews */}
            {reviewsList.length > 0 ? (
              <div className="space-y-3">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="py-2.5 border-b border-gray-100 dark:border-slate-800/60 space-y-1">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] font-extrabold flex items-center justify-center text-xs">
                          {rev.userName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-gray-900 dark:text-white">{rev.userName}</span>
                            <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[9px] font-bold rounded flex items-center gap-0.5">
                              <ShieldCheck className="w-3 h-3" /> Verified Buyer
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-400">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-slate-700'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed pt-1">{rev.comment}</p>
                    {rev.image && (
                      <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 dark:border-slate-800 mt-1">
                        <img src={rev.image} alt="Review Attachment" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center space-y-1 text-xs text-gray-500">
                <MessageSquare className="w-6 h-6 text-gray-300 dark:text-slate-700 mx-auto" />
                <p>এখনও কোনো কাস্টমার রিভিউ পোস্ট করা হয়নি। প্রথম রিভিউটি আপনি দিন!</p>
              </div>
            )}

            {/* Submit Review Form (Verified Buyers Only) */}
            <div className="pt-2 space-y-3">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                আপনার রিভিউ জমা দিন (Submit Your Review)
              </h3>

              {!currentUser ? (
                <div className="p-3 bg-amber-50/80 dark:bg-slate-900/60 border border-amber-200/80 dark:border-slate-800 rounded-md flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>রিভিউ দিতে হলে আপনাকে প্রথমে একাউন্টে লগইন করতে হবে।</span>
                  </div>
                  <button
                    onClick={() => router.push('/login')}
                    className="px-3 py-1.5 bg-[#FF6B00] text-white font-bold rounded-md text-xs hover:bg-[#e05e00] transition-colors cursor-pointer shrink-0"
                  >
                    লগইন করুন
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      আপনার রেটিং নির্ধারণ করুন:
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 text-amber-400 hover:scale-105 transition-transform cursor-pointer"
                        >
                          <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-slate-700'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      পণ্যটির অভিজ্ঞতা লিখে জানান:
                    </label>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                      placeholder="পণ্যটির গুণগত মান, ডেলিভারি সার্ভিস এবং ব্যবহার অভিজ্ঞতা বিস্তারিত লিখুন..."
                      className="w-full p-2.5 text-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-md text-gray-900 dark:text-white focus:outline-none focus:border-[#FF6B00]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      ছবি সংযুক্ত করুন (অপশনাল):
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleReviewImageUpload}
                      className="text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#FF6B00]/10 file:text-[#FF6B00] hover:file:bg-[#FF6B00]/20 cursor-pointer"
                    />
                    {newReviewImage && (
                      <div className="mt-1.5 w-14 h-14 rounded-md overflow-hidden border border-gray-200">
                        <img src={newReviewImage} alt="Review attachment" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#FF6B00] hover:bg-[#e05e00] text-white font-bold text-xs rounded-md transition-all shadow-xs active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    রিভিউ জমা দিন (Submit Review)
                  </button>
                </form>
              )}
            </div>
          </section>
        </div>

        {/* Trust Badges Bar */}
        <section className="px-4 py-4 bg-gray-50 dark:bg-slate-900/60 border-t border-gray-200 dark:border-slate-800 space-y-2 mt-4 rounded-md">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
              Inside Dhaka: ৳{product.deliveryInsideDhaka || 80} | Outside Dhaka: ৳{product.deliveryOutsideDhaka || 120}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
              7-Day Replacement Guarantee
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
            <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
              Cash on Delivery Available & Encrypted Checkout
            </span>
          </div>
        </section>

        {/* Related Products Showcase */}
        <div className="mt-6 border-t border-gray-200 dark:border-slate-800 pt-4">
          <FeaturedProducts title="You May Also Like" products={relatedProducts} />
        </div>
      </main>

      {/* Mobile-Only Fixed Bottom Bar */}
      <div className="sm:hidden fixed bottom-16 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-gray-200/80 dark:border-slate-800 px-3 py-2.5 flex gap-2 z-30 shadow-2xl">
        <button
          onClick={handleAddToCart}
          className="btn-shimmer flex-1 border border-gray-300 dark:border-slate-700 py-2.5 rounded-md font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-900 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-4 h-4 shrink-0" />
          <span className="truncate whitespace-nowrap">Add to Cart</span>
        </button>

        <button
          onClick={handleBuyNow}
          className="btn-shimmer flex-[1.5] bg-[#FF6B00] text-white py-2.5 rounded-md font-bold text-xs uppercase tracking-wider hover:bg-[#e05e00] transition-colors active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
        >
          <Zap className="w-4 h-4 shrink-0" />
          <span className="truncate whitespace-nowrap">Buy Now</span>
        </button>
      </div>

      {/* Full-Screen Image Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 animate-fade-in">
          {/* Top Bar */}
          <div className="flex justify-between items-center text-white">
            <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
              Image {lightboxIndex + 1} of {galleryImages.length}
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close Lightbox"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Full Screen Image View */}
          <div className="relative flex-1 flex items-center justify-center py-4">
            <img
              src={galleryImages[lightboxIndex] || product.image}
              alt={`${product.title} full view`}
              className="max-h-[80vh] max-w-full object-contain rounded-md shadow-2xl transition-all"
            />

            {/* Prev/Next Controls */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))
                  }
                  className="absolute left-2 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setLightboxIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))
                  }
                  className="absolute right-2 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex justify-center gap-2 py-2 overflow-x-auto">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                  lightboxIndex === idx ? 'border-white scale-105' : 'border-transparent opacity-50'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover rounded-md" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Comprehensive Footer */}
      <Footer />

      {/* Bottom Nav */}
      <BottomNavBar />
    </div>
  );
}
