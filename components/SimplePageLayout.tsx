import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SimplePageLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-[900px] px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-[32px]">{title}</h1>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600">
          {children}
        </div>
      </section>
      <Footer />
    </main>
  );
}
