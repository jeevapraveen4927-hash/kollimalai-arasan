"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useWishlist } from "@/lib/wishlist-context";
import SearchBox from "./SearchBox";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { totalCount } = useCart();
  const { isLoggedIn } = useAuth();
  const { items: wishlistItems } = useWishlist();

  return (
    <header className="relative z-30 w-full">
      {/* ---------- MOBILE HEADER (icon bar) ---------- */}
      <div className="bg-brand-green md:hidden">
        <div className="flex items-center justify-between px-3 py-2.5">
          <Link href="/" className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-white">
            <div className="relative h-full w-full">
              <Image
                src="/images/logo.png"
                alt="Kollimalai Arasan"
                fill
                sizes="40px"
                className="object-contain p-0.5"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-4 text-white">
            <button aria-label="Search" onClick={() => setMobileSearchOpen((o) => !o)}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <Link href="/cart" aria-label="Cart" className="relative">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent-orange-badge text-[10px] font-semibold text-white">
                {totalCount}
              </span>
            </Link>

            <button aria-label="Toggle menu" onClick={() => setMobileOpen((o) => !o)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {mobileSearchOpen && (
          <div className="px-3 pb-3">
            <SearchBox autoFocus onNavigate={() => setMobileSearchOpen(false)} />
          </div>
        )}

        {mobileOpen && (
          <nav className="border-t border-white/20 bg-white px-4 py-3">
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
              <li>
                <Link
                  href="/delivery"
                  className="block rounded px-2 py-2 font-medium text-brand-green"
                  onClick={() => setMobileOpen(false)}
                >
                  Need Delivery?
                </Link>
              </li>
              <li className="mt-1 border-t border-gray-100 pt-2">
                {isLoggedIn ? (
                  <Link
                    href="/profile"
                    className="block rounded px-2 py-2 text-gray-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    My Profile
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="block rounded px-2 py-2 text-gray-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </li>
              {!isLoggedIn && (
                <li>
                  <Link
                    href="/register"
                    className="block rounded px-2 py-2 text-gray-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>

      {/* ---------- DESKTOP HEADER ---------- */}
      <div className="relative hidden md:block">
        {/* Top green utility bar */}
        <div className="bg-brand-green">
          <div className="mx-auto flex max-w-[1440px] items-center gap-3 py-3 pl-32 pr-8">
            <div className="relative max-w-xl flex-1">
              <SearchBox />
            </div>

            <div className="ml-auto flex items-center gap-5 text-sm text-white">
              <a href="tel:+917418188950" aria-label="Call us" className="hover:opacity-80">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
              <Link href="/help" className="underline underline-offset-2 hover:opacity-80">
                How Can We Help?
              </Link>
              <Link href={isLoggedIn ? "/profile" : "/login"} aria-label="Account" className="hover:opacity-80">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
              <Link href="/wishlist" aria-label="Wishlist" className="relative hover:opacity-80">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishlistItems.length > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent-orange-badge text-[10px] font-semibold text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <Link href="/cart" aria-label="Cart" className="relative hover:opacity-80">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent-orange-badge text-[10px] font-semibold text-white">
                  {totalCount}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom nav bar */}
        <div className="border-b border-gray-100 bg-white">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 py-3 pl-32 pr-8">
            <nav aria-label="Main navigation">
              <ul className="flex items-center gap-6 text-[15px] font-medium text-gray-800">
                {navLinks.map((link) => (
                  <li
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                    onMouseLeave={() => link.children && setOpenDropdown(null)}
                  >
                    <Link href={link.href} className="flex items-center gap-1 py-2 hover:text-brand-green">
                      {link.label}
                      {link.children && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      )}
                    </Link>
                    {link.children && openDropdown === link.label && (
                      <ul className="absolute left-0 top-full z-40 min-w-[180px] rounded-md border border-gray-100 bg-white py-2 shadow-lg">
                        {link.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-cream hover:text-brand-green"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <Link
              href="/delivery"
              className="flex items-center gap-2 text-sm font-medium text-brand-green underline underline-offset-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              Need Delivery?
            </Link>
          </div>
        </div>

        {/* Logo - overlaps both bars, top-left */}
        <Link href="/" className="absolute left-6 top-2 z-40 h-20 w-20 overflow-hidden rounded-md bg-white shadow-card">
          <Image
            src="/images/logo.png"
            alt="Kollimalai Arasan"
            fill
            sizes="80px"
            className="object-contain p-1"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
