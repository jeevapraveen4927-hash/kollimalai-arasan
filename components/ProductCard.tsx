"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (product.inStock === false) return;
    addItem({
      id: product.id,
      name: product.name,
      sku: product.sku ?? "",
      weight: product.weightLabel,
      image: product.image,
      price: product.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-cream">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 45vw, 280px"
          className="object-contain p-6"
        />
        <button
          aria-label="Quick view"
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-600 shadow"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2v14a2 2 0 0 0 2 2h14" />
            <path d="M18 22V8a2 2 0 0 0-2-2H2" />
          </svg>
        </button>
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="truncate text-sm font-bold text-gray-900 sm:text-base" title={product.name}>
          {product.name}
        </h3>
        {product.sku && <p className="mt-0.5 truncate text-xs text-gray-500">SKU: {product.sku}</p>}
        <p className="mt-1 truncate text-sm font-semibold text-accent-orange">{product.weightLabel}</p>

        <button
          onClick={handleAdd}
          disabled={product.inStock === false}
          className={`mt-3 w-full rounded-md py-2 text-xs font-semibold tracking-wide text-white transition sm:text-sm ${
            product.inStock === false
              ? "cursor-not-allowed bg-gray-300"
              : added
              ? "bg-brand-green-dark"
              : "bg-brand-green hover:bg-brand-green-dark"
          }`}
        >
          {product.inStock === false ? "OUT OF STOCK" : added ? "ADDED ✓" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}
