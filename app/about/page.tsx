import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import WhyChooseUs from "@/components/WhyChooseUs";

export const metadata: Metadata = {
  title: "About Us | Kollimalai Arasan",
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-[1200px] px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-[32px]">About Us</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
          Kollimalai Arasan brings the finest, pure Spices &amp; Millets from
          our farms in the Kolli Hills directly to your table. Since day one,
          our promise has been to never compromise on quality — every product
          is farm fresh, authentically processed, and packed with care.
        </p>
      </section>
      <Features />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}
