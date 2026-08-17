import type { Metadata } from "next";
import SimplePageLayout from "@/components/SimplePageLayout";

export const metadata: Metadata = { title: "Delivery Information | Kollimalai Arasan" };

export default function DeliveryPage() {
  return (
    <SimplePageLayout title="Delivery Information">
      <p>
        We deliver farm-fresh spices and millets across Tamil Nadu and pan-India.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Free delivery on all orders over ₹3500.</li>
        <li>Standard delivery takes 3–7 business days depending on location.</li>
        <li>All orders are packed fresh and shipped in sealed, tamper-proof packaging.</li>
        <li>
          Track your order anytime from{" "}
          <a href="/track-order" className="font-medium text-brand-green hover:underline">
            Track My Order
          </a>
          .
        </li>
      </ul>
    </SimplePageLayout>
  );
}
