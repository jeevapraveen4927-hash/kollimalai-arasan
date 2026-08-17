import Image from "next/image";
import { features } from "@/lib/data";

export default function Features() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-12 text-center md:py-16">
      <h2 className="text-2xl font-medium leading-snug text-gray-900 sm:text-[28px]">
        Explore the world of rich and pure Spices &amp; Millets with
        <br className="hidden sm:block" /> <span className="text-accent-orange">Kollimalai Arasan.</span>
      </h2>

      <div className="mx-auto mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
        {features.map((f) => (
          <div key={f.title} className="flex flex-col items-center">
            <div className="relative h-16 w-16">
              <Image src={f.icon} alt={f.title} fill sizes="64px" className="object-contain" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">{f.title}</h3>
            <p className="mt-2 max-w-[280px] text-sm text-gray-600">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
