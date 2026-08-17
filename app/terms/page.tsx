import type { Metadata } from "next";
import SimplePageLayout from "@/components/SimplePageLayout";

export const metadata: Metadata = { title: "Terms & Conditions | Kollimalai Arasan" };

export default function TermsPage() {
  return (
    <SimplePageLayout title="Terms & Conditions">
      <p>
        By using the Kollimalai Arasan website and placing an order, you agree
        to the following terms.
      </p>
      <p>
        <strong>Orders:</strong> All orders are subject to availability and
        confirmation. We reserve the right to refuse or cancel any order.
      </p>
      <p>
        <strong>Pricing:</strong> Prices are listed in INR and include
        applicable taxes unless stated otherwise. Prices may change without
        prior notice.
      </p>
      <p>
        <strong>Product Information:</strong> We strive to keep product
        descriptions and images accurate, but slight variations in packaging
        or appearance may occur.
      </p>
      <p>
        For questions about these terms, reach us via the{" "}
        <a href="/contact" className="font-medium text-brand-green hover:underline">
          Contact page
        </a>
        .
      </p>
    </SimplePageLayout>
  );
}
