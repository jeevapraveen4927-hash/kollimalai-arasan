import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Spices | Kollimalai Arasan",
};

export default function SpicesPage() {
  const spices = getProductsByCategory("Spices");

  return (
    <main>
      <Header />
      <section className="mx-auto max-w-[1200px] px-4 py-10">
        <h1 className="text-2xl font-bold uppercase tracking-tight text-gray-900 sm:text-[32px]">
          Spices
        </h1>
        <p className="mt-2 max-w-xl text-sm text-gray-500">
          Pure, farm-fresh spices sourced from the Kolli Hills.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {spices.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
