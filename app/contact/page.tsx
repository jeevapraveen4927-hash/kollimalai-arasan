import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { footerData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact | Kollimalai Arasan",
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-[1200px] px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-[32px]">Contact Us</h1>
        <p className="mt-2 max-w-xl text-sm text-gray-500">
          Have a question about an order or our products? Reach out — we&apos;re
          happy to help.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <form className="space-y-4 rounded-xl border border-gray-200 p-6">
            <div>
              <label className="text-sm font-semibold text-gray-800">Name</label>
              <input className="mt-1.5 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-800">Email</label>
              <input type="email" className="mt-1.5 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-800">Message</label>
              <textarea rows={4} className="mt-1.5 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none" />
            </div>
            <button className="w-full rounded-lg bg-brand-green py-3 text-sm font-semibold text-white hover:bg-brand-green-dark">
              Send Message
            </button>
          </form>

          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900">Reach us directly</h2>
            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <p>📞 {footerData.contact.phone}</p>
              <p>💬 WhatsApp: {footerData.contact.whatsapp}</p>
              <p>✉️ {footerData.contact.mail}</p>
              <p className="pt-2 text-gray-500">{footerData.address}</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
