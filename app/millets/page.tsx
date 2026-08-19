import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { fetchProductsByCategory } from "@/lib/api";

export const metadata: Metadata = {
  title: "Millets | Kollimalai Arasan",
};

export default async function MilletsPage() {
  const millets = await fetchProductsByCategory("Millets");

  return (
    <main>
      <Header />

      <section className="mx-auto max-w-[1200px] px-4 py-10">
        <h1 className="text-2xl font-bold uppercase tracking-tight text-gray-900 sm:text-[32px]">
          Millets
        </h1>

        <p className="mt-2 max-w-xl text-sm text-gray-500">
          Wholesome, non-GMO millets — sustainably grown and ethically sourced.
        </p>

        {millets.length === 0 ? (
          <div className="mt-10 rounded-xl border border-gray-200 py-16 text-center">
            <p className="text-base font-semibold text-gray-700">
              No millet products yet
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Check back soon, or browse our{" "}
              <a
                href="/spices"
                className="font-medium text-brand-green hover:underline"
              >
                Spices
              </a>{" "}
              range in the meantime.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {millets.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
