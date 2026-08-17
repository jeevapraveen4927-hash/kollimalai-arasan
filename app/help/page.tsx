import type { Metadata } from "next";
import SimplePageLayout from "@/components/SimplePageLayout";
import { footerData } from "@/lib/data";

export const metadata: Metadata = { title: "How Can We Help? | Kollimalai Arasan" };

export default function HelpPage() {
  return (
    <SimplePageLayout title="How Can We Help?">
      <p>
        Got a question about your order, a product, or delivery? Our team is
        here for you every day from 8:30 AM to 8:30 PM IST.
      </p>
      <ul className="space-y-2">
        <li>📞 Call us: {footerData.contact.phone}</li>
        <li>💬 WhatsApp: {footerData.contact.whatsapp}</li>
        <li>✉️ Email: {footerData.contact.mail}</li>
      </ul>
      <p>
        You can also visit our{" "}
        <a href="/contact" className="font-medium text-brand-green hover:underline">
          Contact page
        </a>{" "}
        to send us a message directly.
      </p>
    </SimplePageLayout>
  );
}
