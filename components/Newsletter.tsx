"use client";

import { useState, FormEvent } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-8">
      <div className="flex flex-col items-start gap-6 rounded-2xl bg-brand-green px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-12">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-[28px]">
            Subscribe to our newsletter
          </h2>
          <p className="mt-2 max-w-md text-sm font-medium text-white/90">
            Fresh News &amp; Hot Deals – Sign up to get our latest updates and
            exclusive offers.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            aria-label="Email address"
            className="w-full rounded-full border-none px-5 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none sm:w-72"
          />
          <button
            type="submit"
            className="rounded-full bg-black px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            {submitted ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
