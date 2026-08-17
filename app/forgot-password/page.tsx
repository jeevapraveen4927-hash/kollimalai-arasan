"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import AuthHeader from "@/components/AuthHeader";
import FormField from "@/components/FormField";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <AuthHeader />

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <h1 className="text-center text-2xl font-bold text-brand-green sm:text-[28px]">
            Reset Password
          </h1>
          <p className="mt-1 text-center text-sm text-gray-500">
            Enter your email and we&apos;ll send you a reset link.
          </p>

          {sent ? (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-center text-sm text-brand-green">
              If an account exists for {email}, a reset link has been sent.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <FormField
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                }
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-brand-green py-3 text-sm font-semibold text-white hover:bg-brand-green-dark"
              >
                Send Reset Link
              </button>
            </form>
          )}

          <p className="mt-5 text-center text-sm text-gray-600">
            <Link href="/login" className="font-semibold text-brand-green hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>

      <footer className="border-t border-gray-100 bg-gray-50 py-4 text-center text-xs text-gray-500">
        Copyright © 2025 Kollimalai Arasan. All Rights Reserved.
      </footer>
    </main>
  );
}
