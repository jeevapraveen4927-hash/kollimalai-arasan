import Link from "next/link";
import { getProductsByTag } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function FlavoursGrid() {
  const flavourProducts = getProductsByTag("freshly-launched");

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-gray-900 sm:text-[32px]">
          Freshly Launched <span className="text-accent-orange">Flavours</span>
        </h2>
        <Link
          href="/shop"
          className="hidden items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-green-dark sm:flex"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white text-[10px]">
            +
          </span>
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {flavourProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Link
        href="/shop"
        className="mt-6 flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-green-dark sm:hidden"
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white text-[10px]">
          +
        </span>
        View All
      </Link>
    </section>
  );
}
