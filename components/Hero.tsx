"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroSlides } from "@/lib/data";

const AUTOPLAY_DELAY = 5000;

// Clone the first slide at the end so we can always slide forward
// (right → left) and seamlessly loop back without ever reversing.
const slides = [...heroSlides, heroSlides[0]];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Autoplay — always moves forward
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => i + 1);
    }, AUTOPLAY_DELAY);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // When we land on the cloned slide, snap back to the real first
  // slide instantly (no transition) so the loop feels continuous.
  useEffect(() => {
    if (index === slides.length - 1) {
      const timeout = setTimeout(() => {
        setWithTransition(false);
        setIndex(0);
      }, 700); // matches transition duration below
      return () => clearTimeout(timeout);
    }
    if (!withTransition) {
      const raf = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [index, withTransition]);

  const realIndex = index % heroSlides.length;

  return (
    <section className="relative w-full">
      <div className="relative h-[220px] w-full overflow-hidden sm:h-[320px] md:h-[420px] lg:h-[460px]">
        <div
          className={`flex h-full ${withTransition ? "transition-transform duration-700 ease-in-out" : ""}`}
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${index * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={`${slide.id}-${i}`}
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / slides.length}%` }}
              aria-hidden={i !== index}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {heroSlides.length > 1 && (
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-4">
            {heroSlides.map((slide, i) => (
              <span
                key={slide.id}
                className={`h-2 rounded-full transition-all ${
                  i === realIndex ? "w-6 bg-white" : "w-2 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}