"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import FormField from "@/components/FormField";
import { forgotPassword, verifyOtp, resetPassword } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    try {
      const result = await forgotPassword(trimmedEmail);

      if (!result.success) {
        setError(result.message || "Failed to send OTP.");
        return;
      }

      setGeneratedOtp(result.otp || "");
      setSent(true);

      console.log("Generated OTP:", result.otp);
    } catch (error) {
      console.error("Forgot password error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
  setError("");

  if (!otp.trim()) {
    setError("Please enter the OTP.");
    return;
  }

  try {
    const result = await verifyOtp(email.trim(), otp.trim());

    if (!result.success) {
      setError(result.message || "Invalid OTP. Please try again.");
      return;
    }

    setOtpVerified(true);
    setError("");
  } catch (error) {
    console.error("Verify OTP error:", error);
    setError("Something went wrong. Please try again.");
  }
};
const handleResetPassword = async () => {
  setError("");

  if (!newPassword.trim()) {
    setError("Please enter your new password.");
    return;
  }

  if (!confirmPassword.trim()) {
    setError("Please confirm your new password.");
    return;
  }

  if (newPassword.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  if (newPassword !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  try {
    const result = await resetPassword(
      email.trim(),
      newPassword,
      confirmPassword
    );

    if (!result.success) {
      setError(result.message || "Failed to reset password.");
      return;
    }

    setResetSuccess(true);
    setError("");
  } catch (error) {
    console.error("Reset password error:", error);
    setError("Something went wrong. Please try again.");
  }
};

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-card sm:p-8">

          <h1 className="text-center text-2xl font-bold text-brand-green sm:text-[28px]">
            Reset Password
          </h1>

          <p className="mt-1 text-center text-sm text-gray-500">
            Enter your email and we&apos;ll send you an OTP.
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          {!sent && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">

              <FormField
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                }
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-brand-green py-3 text-sm font-semibold text-white hover:bg-brand-green-dark"
              >
                Send OTP
              </button>

            </form>
          )}

          {sent && !otpVerified && (
            <div className="mt-6 space-y-5">

              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-center text-sm text-brand-green">
                OTP sent successfully to {email}
              </div>

              <div>
                <label
                  htmlFor="otp"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Enter OTP
                </label>

                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-lg tracking-[6px] outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                />
              </div>

              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full rounded-lg bg-brand-green py-3 text-sm font-semibold text-white hover:bg-brand-green-dark"
              >
                Verify OTP
              </button>

              {/* Demo purpose */}
              <p className="text-center text-xs text-gray-500">
                Demo OTP: {generatedOtp}
              </p>

            </div>
          )}

       {otpVerified && !resetSuccess && (
  <div className="mt-6 space-y-5">

    <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-center text-sm text-green-700">
      OTP verified successfully!
    </div>

    <div>
      <label
        htmlFor="newPassword"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        New Password
      </label>

      <input
        id="newPassword"
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
      />
    </div>

    <div>
      <label
        htmlFor="confirmPassword"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Confirm Password
      </label>

      <input
        id="confirmPassword"
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
      />
    </div>

    <button
      type="button"
      onClick={handleResetPassword}
      className="w-full rounded-lg bg-brand-green py-3 text-sm font-semibold text-white hover:bg-brand-green-dark"
    >
      Reset Password
    </button>

  </div>
)}

{resetSuccess && (
  <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-5 text-center">

    <p className="text-sm font-semibold text-green-700">
      Password reset successfully!
    </p>

    <p className="mt-1 text-xs text-gray-600">
      Your password has been updated successfully.
    </p>

    <Link
      href="/login"
      className="mt-4 block w-full rounded-lg bg-brand-green py-3 text-sm font-semibold text-white hover:bg-brand-green-dark"
    >
      Go to Login
    </Link>

  </div>
)}

          <p className="mt-5 text-center text-sm text-gray-600">
            <Link
              href="/login"
              className="font-semibold text-brand-green hover:underline"
            >
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