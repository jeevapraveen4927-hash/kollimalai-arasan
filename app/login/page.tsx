"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import FormField from "@/components/FormField";
import { loginUser } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { loginSuccess } = useAuth();
  

 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setError("");

  // Email validation
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    setError("Please enter your email address.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmedEmail)) {
    setError("Please enter a valid email address.");
    return;
  }

  // Password validation
  if (!password) {
    setError("Please enter your password.");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  // Login
const result = await loginUser(trimmedEmail, password);

if (!result.success) {
  setError(
    result.message ?? "Invalid email or password. Please try again."
  );
  return;
}

// Save logged-in user and session
if (result.user) {
  loginSuccess({
    fullName: result.user.fullName || "Test User",
    email: result.user.email,
    phone: result.user.phone || "",
  });
}

// Login successful
router.push("/profile");
 }
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <div className="relative mb-5 hidden h-28 w-full overflow-hidden rounded-lg sm:block">
            <Image
              src="/images/auth-banner.jpg"
              alt="Kollimalai Arasan spices"
              fill
              sizes="400px"
              className="object-cover"
            />
          </div>

          <h1 className="text-center text-2xl font-bold text-brand-green sm:text-[28px]">
            Welcome Back
          </h1>
          <p className="mt-1 text-center text-sm text-gray-500">
            Sign in to continue to your account.
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}{" "}
              {error.includes("register") && (
                <Link href="/register" className="font-semibold underline">
                  Create one now
                </Link>
              )}
            </div>
          )}

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
              rightSlot={
                <Link href="/forgot-password" className="text-xs font-medium text-brand-green hover:underline">
                  Forgot Password?
                </Link>
              }
            />

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
              />
              Remember me
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-brand-green py-3 text-sm font-semibold text-white hover:bg-brand-green-dark"
            >
              Login
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-brand-green hover:underline">
              Register here
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
