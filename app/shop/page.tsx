import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { fetchAllProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Shop All | Kollimalai Arasan",
};

export default async function ShopPage() {
  const allProducts = await fetchAllProducts();

  return (
    <main>
      <Header />

      <section className="mx-auto max-w-[1200px] px-4 py-10">
        <h1 className="text-2xl font-bold uppercase tracking-tight text-gray-900 sm:text-[32px]">
          Shop All
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          Browse our full range of farm-fresh, authentic spices and millets.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {allProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}