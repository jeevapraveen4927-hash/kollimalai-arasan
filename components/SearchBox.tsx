"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { searchProducts } from "@/lib/search";

export default function SearchBox({
  autoFocus = false,
  onNavigate,
}: {
  autoFocus?: boolean;
  onNavigate?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.trim() ? searchProducts(query).slice(0, 6) : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToResults = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setIsOpen(false);
    onNavigate?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      goToResults();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          aria-label="Search products"
          autoFocus={autoFocus}
          className="w-full rounded-full border-none bg-white py-2.5 pl-5 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
        />
        <button
          aria-label="Search"
          onClick={goToResults}
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-500 hover:text-brand-green"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {isOpen && query.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-lg">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              No products found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-50">
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/search?q=${encodeURIComponent(product.name)}`}
                      onClick={() => {
                        setIsOpen(false);
                        onNavigate?.();
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-cream"
                    >
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-cream">
                        <Image src={product.image} alt={product.name} fill sizes="40px" className="object-contain p-1" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-800">{product.name}</p>
                        {product.category && (
                          <p className="text-xs text-gray-400">{product.category}</p>
                        )}
                      </div>
                      <span className="flex-shrink-0 text-sm font-semibold text-brand-green">
                        ₹{product.price}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                onClick={goToResults}
                className="w-full border-t border-gray-100 px-4 py-2.5 text-center text-sm font-medium text-brand-green hover:bg-cream"
              >
                See all results for &ldquo;{query}&rdquo;
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
