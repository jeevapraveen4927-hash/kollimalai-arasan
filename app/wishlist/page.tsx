"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  return (
    <main>
      <Header />
      <section className="mx-auto max-w-[1200px] px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-[32px]">My Wishlist</h1>
        <p className="mt-1 text-sm text-gray-500">Items you&apos;ve saved for later.</p>

        {items.length === 0 ? (
          <div className="mt-10 rounded-xl border border-gray-200 p-10 text-center text-gray-500">
            Your wishlist is empty.{" "}
            <Link href="/shop" className="font-medium text-brand-green hover:underline">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {items.map((item) => (
              <div key={item.id} className="relative rounded-xl border border-gray-200 bg-white p-3">
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name} from wishlist`}
                  className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-500 shadow hover:text-red-500"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-cream">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 45vw, 280px"
                    className="object-contain p-6"
                  />
                </div>
                <h3 className="mt-3 text-sm font-bold text-gray-900 sm:text-base">{item.name}</h3>
                <p className="mt-1 text-sm font-semibold text-accent-orange">{item.weightLabel}</p>
                <button
                  onClick={() =>
                    addItem({
                      id: item.id,
                      name: item.name,
                      sku: "",
                      weight: item.weightLabel,
                      image: item.image,
                      price: item.price,
                    })
                  }
                  className="mt-3 w-full rounded-md bg-brand-green py-2 text-xs font-semibold tracking-wide text-white hover:bg-brand-green-dark sm:text-sm"
                >
                  ADD TO CART
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
