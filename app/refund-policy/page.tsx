import type { Metadata } from "next";
import SimplePageLayout from "@/components/SimplePageLayout";

export const metadata: Metadata = { title: "Return & Refund Policy | Kollimalai Arasan" };

export default function RefundPolicyPage() {
  return (
    <SimplePageLayout title="Return & Refund Policy">
      <p>
        Your satisfaction matters to us. If something isn&apos;t right with
        your order, here&apos;s how returns and refunds work.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Report damaged or incorrect items within 48 hours of delivery.</li>
        <li>Unopened, unused products can be returned within 7 days.</li>
        <li>Refunds are processed to the original payment method within 5–7 business days.</li>
        <li>Perishable spice and millet products cannot be returned once opened.</li>
      </ul>
      <p>
        To start a return, contact us via{" "}
        <a href="/help" className="font-medium text-brand-green hover:underline">
          How Can We Help
        </a>
        .
      </p>
    </SimplePageLayout>
  );
}
