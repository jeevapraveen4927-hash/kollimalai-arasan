"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import AuthHeader from "@/components/AuthHeader";
import FormField from "@/components/FormField";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    register({ fullName, email, phone });
    router.push("/profile");
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <AuthHeader />

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-green-100 to-transparent" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-tr from-orange-50 to-transparent" />

          <div className="relative">
            <h1 className="text-center text-2xl font-bold text-brand-green sm:text-[28px]">
              Create Account
            </h1>
            <p className="mt-1 text-center text-sm text-gray-500">
              Join Kollimalai Arasan to explore the world of rich and pure
              Spices &amp; Millets.
            </p>

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <FormField
                label="Full Name"
                placeholder="John Doe"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                }
              />

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

              <FormField
                label="Phone Number"
                type="tel"
                placeholder="+91 00000 00000"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                }
              />

              <FormField
                label="Password"
                placeholder="••••••••"
                required
                isPassword
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                }
              />

              <FormField
                label="Confirm Password"
                placeholder="••••••••"
                required
                isPassword
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                }
              />

              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                />
                <span>
                  I agree to the{" "}
                  <Link href="/terms" className="font-medium text-brand-green hover:underline">
                    Terms &amp; Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="font-medium text-brand-green hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                className="w-full rounded-lg bg-brand-green py-3 text-sm font-semibold text-white hover:bg-brand-green-dark"
              >
                Create Account
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-brand-green hover:underline">
                Sign in here
              </Link>
            </p>

            <Link
              href="/"
              className="mt-3 flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-brand-green"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Return to Home
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-100 bg-gray-50 py-4 text-center text-xs text-gray-500">
        Copyright © 2025 Kollimalai Arasan. All Rights Reserved.
      </footer>
    </main>
  );
}
