"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart-context";

const SHIPPING = 50;
const TAX_RATE = 0.05;

export default function CartPage() {
  const { items, updateQty, removeItem } = useCart();
  const [coupon, setCoupon] = useState("");

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + (items.length ? SHIPPING : 0) + tax;

  return (
    <main>
      <Header />

      <section className="mx-auto max-w-[1200px] px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-[32px]">Shopping Cart</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review your items and proceed to checkout.
        </p>

        {items.length === 0 ? (
          <div className="mt-10 rounded-xl border border-gray-200 p-10 text-center text-gray-500">
            Your cart is empty.{" "}
            <Link href="/shop" className="font-medium text-brand-green hover:underline">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative flex gap-4 rounded-xl border border-gray-200 p-4"
                >
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="absolute right-3 top-3 text-gray-400 hover:text-red-500"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>

                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-cream sm:h-24 sm:w-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between pr-6">
                    <div>
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-xs text-gray-400">
                        {item.sku && `SKU: ${item.sku} • `}
                        {item.weight}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-brand-green">
                        ₹{item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-gray-200">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="flex h-8 w-8 items-center justify-center text-gray-500 hover:text-brand-green"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          aria-label="Increase quantity"
                          className="flex h-8 w-8 items-center justify-center text-gray-500 hover:text-brand-green"
                        >
                          +
                        </button>
                      </div>
                      <p className="hidden text-sm font-bold text-gray-800 sm:block">
                        Total: ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">₹{SHIPPING.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium text-gray-900">₹{tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="coupon" className="text-sm text-gray-600">
                  Have a coupon code?
                </label>
                <div className="mt-1.5 flex gap-2">
                  <input
                    id="coupon"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
                  />
                  <button className="rounded-md border border-brand-green px-4 py-2 text-sm font-medium text-brand-green hover:bg-cream">
                    Apply
                  </button>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-brand-green">₹{total.toFixed(2)}</span>
              </div>

              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green py-3 text-sm font-semibold text-white hover:bg-brand-green-dark">
                Proceed to Checkout
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Secure Checkout
              </p>
            </aside>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
