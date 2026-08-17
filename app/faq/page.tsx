import type { Metadata } from "next";
import SimplePageLayout from "@/components/SimplePageLayout";

export const metadata: Metadata = { title: "FAQ's | Kollimalai Arasan" };

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 3–7 business days depending on your location.",
  },
  {
    q: "Are your spices chemical-free?",
    a: "Yes, all our spices and millets follow chemical-free, non-GMO farming practices.",
  },
  {
    q: "Do you offer free delivery?",
    a: "Yes, delivery is free for all orders over ₹3500.",
  },
  {
    q: "Can I return a product?",
    a: "Unopened products can be returned within 7 days. See our Return & Refund Policy for details.",
  },
];

export default function FaqPage() {
  return (
    <SimplePageLayout title="Frequently Asked Questions">
      <div className="space-y-6">
        {faqs.map((item) => (
          <div key={item.q}>
            <h3 className="font-semibold text-gray-900">{item.q}</h3>
            <p className="mt-1">{item.a}</p>
          </div>
        ))}
      </div>
    </SimplePageLayout>
  );
}
