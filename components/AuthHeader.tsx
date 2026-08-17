import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-4 sm:px-8">
        <Link href="/" className="text-xl font-bold text-brand-green sm:text-2xl">
          Kollimalai Arasan
        </Link>
      </div>
    </header>
  );
}
