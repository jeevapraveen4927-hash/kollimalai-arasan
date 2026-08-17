import type { Metadata } from "next";
import SimplePageLayout from "@/components/SimplePageLayout";

export const metadata: Metadata = { title: "Privacy Policy | Kollimalai Arasan" };

export default function PrivacyPage() {
  return (
    <SimplePageLayout title="Privacy Policy">
      <p>
        We respect your privacy. This page explains what information we
        collect and how we use it.
      </p>
      <p>
        <strong>Information we collect:</strong> Name, email, phone number,
        and shipping address when you register or place an order.
      </p>
      <p>
        <strong>How we use it:</strong> To process orders, provide customer
        support, and send updates about your purchases.
      </p>
      <p>
        <strong>Data security:</strong> We take reasonable measures to
        protect your personal information from unauthorized access.
      </p>
      <p>
        We never sell your personal data to third parties.
      </p>
    </SimplePageLayout>
  );
}
