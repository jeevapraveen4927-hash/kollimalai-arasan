import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full">
      <div className="relative h-[220px] w-full sm:h-[320px] md:h-[420px] lg:h-[460px]">
        <Image
          src="/images/hero-banner.jpg"
          alt="Assortment of pure spices and millets arranged like a world map"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
