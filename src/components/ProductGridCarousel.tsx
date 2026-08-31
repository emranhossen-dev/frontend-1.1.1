'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Product } from '@/types/store';
import { ProductCard } from '@/components/ProductCard';

interface ProductGridCarouselProps {
  products: Product[];
  showStockBar?: boolean;
}

export const ProductGridCarousel: React.FC<ProductGridCarouselProps> = ({
  products,
  showStockBar = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // Group products into 2-row column pairs: [[P0, P1], [P2, P3], [P4, P5], ...]
  const columns: Product[][] = [];
  for (let i = 0; i < products.length; i += 2) {
    columns.push(products.slice(i, i + 2));
  }

  // Time delay step slide (slides 1 column of 2 products together every 3 seconds)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || columns.length <= 1) return;

    const timer = setInterval(() => {
      if (isInteracting) return;

      const firstCol = container.firstElementChild as HTMLElement;
      const colWidth = firstCol ? firstCol.offsetWidth + 16 : 180; // Column width + gap

      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 15) {
        // Endless loop: rewind smoothly to start
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Slide 1 column (2 products stacked together) forward
        container.scrollBy({ left: colWidth, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [isInteracting, columns.length]);

  if (columns.length === 0) return null;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
      className="flex flex-row overflow-x-auto no-scrollbar scroll-smooth gap-3 sm:gap-4 py-1 select-none cursor-grab active:cursor-grabbing w-full"
    >
      {columns.map((colPair, cIdx) => (
        <div key={cIdx} className="w-[160px] sm:w-[190px] md:w-[210px] shrink-0 flex flex-col gap-3 sm:gap-4">
          {colPair.map((product, pIdx) => (
            <div key={product.id} className="w-full">
              <ProductCard
                product={product}
                showStockBar={showStockBar}
                stockSoldPercent={showStockBar ? 85 - ((cIdx * 2 + pIdx) % 6) * 10 : undefined}
                stockLeftCount={showStockBar ? ((cIdx * 2 + pIdx) % 6) + 2 : undefined}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductGridCarousel;
