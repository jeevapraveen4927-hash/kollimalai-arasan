"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getProductsByTag } from "@/lib/products";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export default function LowestPrice() {
  const products = getProductsByTag("lowest-price");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [products.length]);

  const scroll = (dir: "left" | "right") => {
    scrollerRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const handleAdd = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      sku: product.sku ?? product.id,
      weight: product.packOption ?? product.weightLabel,
      image: product.image,
      price: product.price,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-gray-900 sm:text-[32px]">
          Lowest Price Ever
        </h2>
        <div className="flex items-center gap-2">
          <button
            aria-label="Scroll left"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-orange-badge text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-orange-badge text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar grid grid-flow-col auto-cols-[70%] gap-4 overflow-x-auto scroll-smooth sm:auto-cols-[45%] md:auto-cols-[23%]"
      >
        {products.map((product) => (
          <div key={product.id} className="relative overflow-hidden rounded-lg border border-gray-200">
            {product.discountLabel && (
              <span className="absolute left-0 top-3 z-10 rounded-r-full bg-accent-orange-badge px-3 py-1 text-xs font-semibold text-white">
                {product.discountLabel}
              </span>
            )}
            <div className="relative aspect-[4/5] w-full bg-white px-4 pb-4 pt-10">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 45vw, 280px"
                className="object-contain"
              />
            </div>
            <div className="px-3 pb-4 sm:px-4">
              <h3 className="truncate text-sm text-gray-900 sm:text-base">{product.name}</h3>
              <p className="mt-1 text-xs sm:text-sm">
                {product.originalPrice && (
                  <span className="text-gray-400 line-through">
                    ₹{product.originalPrice.toFixed(2)}
                  </span>
                )}{" "}
                <span className="text-gray-700">from </span>
                <span className="font-bold text-brand-green">
                  ₹{product.price.toFixed(2)}
                </span>
              </p>
              {product.taxIncluded && (
                <p className="text-[11px] text-gray-400 sm:text-xs">(Tax included)</p>
              )}

              {product.packOption && (
                <div className="relative mt-3">
                  <select
                    className="w-full appearance-none truncate rounded-md bg-cream px-3 py-2 text-xs text-gray-700 focus:outline-none sm:text-sm"
                    defaultValue={product.packOption}
                  >
                    <option value={product.packOption}>{product.packOption}</option>
                  </select>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              )}

              <button
                onClick={() => handleAdd(product)}
                disabled={product.inStock === false}
                className={`mt-3 w-full rounded-md py-2 text-xs font-semibold tracking-wide text-white transition sm:text-sm ${
                  product.inStock === false
                    ? "cursor-not-allowed bg-gray-300"
                    : addedId === product.id
                    ? "bg-brand-green-dark"
                    : "bg-brand-green hover:bg-brand-green-dark"
                }`}
              >
                {product.inStock === false
                  ? "OUT OF STOCK"
                  : addedId === product.id
                  ? "ADDED ✓"
                  : "ADD TO CART"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
