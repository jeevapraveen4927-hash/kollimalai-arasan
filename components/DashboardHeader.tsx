"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import SearchBox from "./SearchBox";

export default function DashboardHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalCount } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white shadow-sm">
      <div className="relative mx-auto flex max-w-[1280px] items-center gap-4 px-4 py-3 pl-20 md:gap-6 md:px-8 md:pl-24">
        {/* Logo - exact same treatment as the main site header */}
        <Link
          href="/"
          className="absolute left-2 top-1.5 z-40 h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-white shadow-card md:left-4 md:top-2 md:h-16 md:w-16"
        >
          <Image
            src="/images/logo.png"
            alt="Kollimalai Arasan"
            fill
            sizes="64px"
            className="object-contain p-1"
            priority
          />
        </Link>

        <div className="hidden max-w-md flex-1 md:block">
          <SearchBox />
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-800 hover:text-brand-green"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Link href="/wishlist" aria-label="Wishlist" className="relative text-gray-700 hover:text-brand-green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistItems.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent-orange-badge text-[10px] font-semibold text-white">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative text-gray-700 hover:text-brand-green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent-orange-badge text-[10px] font-semibold text-white">
              {totalCount}
            </span>
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="text-gray-700 md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-gray-100 px-4 py-3 md:hidden">
          <div className="mb-3">
            <SearchBox onNavigate={() => setMobileOpen(false)} />
          </div>
          <ul className="flex flex-col gap-1 text-sm font-medium text-gray-800">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block rounded px-2 py-2 hover:bg-cream hover:text-brand-green"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
