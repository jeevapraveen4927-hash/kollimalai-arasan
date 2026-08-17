import Image from "next/image";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-12">
      <h2 className="text-center text-2xl font-bold uppercase tracking-tight text-gray-900 sm:text-[32px]">
        From Our Customers
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={t.id}
            className={`rounded-2xl border p-6 ${
              i === 1 ? "border-brand-green" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                <Image src={t.avatar} alt={t.name} fill sizes="48px" className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-green">{t.name}</p>
                <p className="text-xs text-gray-500">{t.location}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">{t.quote}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
