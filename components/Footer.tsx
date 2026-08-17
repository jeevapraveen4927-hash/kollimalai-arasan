import Image from "next/image";
import Link from "next/link";
import { footerData } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-cream">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="relative h-16 w-16">
            <Image src="/images/logo.png" alt="Kollimalai Arasan" fill sizes="64px" className="object-contain" />
          </div>

          <h3 className="mt-4 text-base font-bold text-brand-green">MKT &amp; Packed By :</h3>
          <div className="mt-2 flex items-start gap-2 text-sm text-gray-600">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-0.5 flex-shrink-0 text-brand-green"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{footerData.address}</span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            {["facebook", "instagram", "youtube", "whatsapp"].map((social) => (
              <a
                key={social}
                href="#"
                aria-label={social}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
              >
                <SocialIcon name={social} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-brand-green">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            {footerData.quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-brand-green">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold text-brand-green">Here to Help</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            {footerData.hereToHelp.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-brand-green">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold text-brand-green">Contact Us</h3>
          <div className="mt-3 space-y-3 text-sm text-gray-700">
            <a href={`tel:${footerData.contact.phone}`} className="flex items-center gap-2 hover:text-brand-green">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-green">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {footerData.contact.phone}
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-brand-green">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.29-1.39a9.87 9.87 0 0 0 4.7 1.2h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2z" />
              </svg>
              {footerData.contact.whatsapp}
            </a>
            <a href={`mailto:${footerData.contact.mail}`} className="flex items-center gap-2 hover:text-brand-green">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-green">
                <path d="M4 4h16v16H4z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {footerData.contact.mail}
            </a>
          </div>
        </div>
      </div>

      <div className="bg-brand-green">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white sm:flex-row">
          <p>Copyright © 2025 Kollimalai Arasan. All Rights Reserved.</p>
          <p>
            Design and Developed By{" "}
            <a href="#" className="underline">
              ProZ Solutions LLP.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case "facebook":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
        </svg>
      );
    case "instagram":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
        </svg>
      );
    case "youtube":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="4" />
          <polygon points="10 9 15 12 10 15" fill="currentColor" stroke="none" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.29-1.39a9.87 9.87 0 0 0 4.7 1.2h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2z" />
        </svg>
      );
    default:
      return null;
  }
}
