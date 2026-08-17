"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { searchProducts } from "@/lib/search";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const results = searchProducts(query);

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-8 sm:py-10">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-[32px]">
        {query ? (
          <>
            Search results for &ldquo;<span className="text-brand-green">{query}</span>&rdquo;
          </>
        ) : (
          "Search"
        )}
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        {results.length} {results.length === 1 ? "product" : "products"} found
      </p>

      {results.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-xl border border-gray-200 py-16 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <p className="mt-4 text-base font-semibold text-gray-700">No products found</p>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try a
            different keyword like &ldquo;cardamom&rdquo; or &ldquo;biriyani&rdquo;.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default function SearchPage() {
  return (
    <main>
      <Header />
      <Suspense fallback={<div className="px-4 py-10 text-sm text-gray-400">Loading…</div>}>
        <SearchResults />
      </Suspense>
      <Footer />
    </main>
  );
}
