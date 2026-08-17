"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { isWishlisted, toggleItem } = useWishlist();
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
  type="button"
  aria-label={
    isWishlisted(product.id)
      ? `Remove ${product.name} from wishlist`
      : `Add ${product.name} to wishlist`
  }
  onClick={() =>
    toggleItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      weightLabel: product.weightLabel,
    })
  }
  className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow transition ${
    isWishlisted(product.id)
      ? "text-red-500"
      : "text-gray-500 hover:text-red-500"
  }`}
>
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill={isWishlisted(product.id) ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
