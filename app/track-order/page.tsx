"use client";

import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <Header />
      <section className="mx-auto max-w-[600px] px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-[32px]">Track My Order</h1>
        <p className="mt-2 text-sm text-gray-500">
          Enter your order ID to check the latest status.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
          <input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. KA-9824"
            required
            className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none"
          />
          <button className="rounded-lg bg-brand-green px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-dark">
            Track
          </button>
        </form>

        {submitted && (
          <div className="mt-6 rounded-lg border border-gray-200 p-4 text-sm text-gray-600">
            {orderId ? (
              <>
                Order <span className="font-semibold text-gray-900">#{orderId}</span> is
                currently <span className="font-semibold text-brand-green">out for delivery</span>{" "}
                and should arrive within 2 business days.
              </>
            ) : (
              "Please enter a valid order ID."
            )}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
