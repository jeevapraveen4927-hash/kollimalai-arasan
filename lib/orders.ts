import { Order } from "./types";
import { getProductById } from "./products";

/**
 * Mock order history. Each item references a real product `productId` from
 * lib/products.ts, so Reorder always pulls live product data (current
 * image, current price) rather than a stale snapshot.
 */
export const mockOrders: Order[] = [
  {
    id: "KA-9824",
    date: "Placed on Oct 24, 2023",
    status: "Delivered",
    items: [
      { productId: "cardamom-50g", name: "Cardamom", image: "/images/cardamom-product.png", price: 45, quantity: 2, weightLabel: "50gm X 2 Pack" },
      { productId: "biriyani-leaf-1", name: "Biriyani Leaf", image: "/images/biriyani-leaf.png", price: 61, quantity: 3, weightLabel: "100g" },
    ],
  },
  {
    id: "KA-9710",
    date: "Placed on Sep 15, 2023",
    status: "Delivered",
    items: [
      { productId: "biriyani-leaf-2", name: "Biriyani Leaf", image: "/images/biriyani-leaf.png", price: 61, quantity: 2, weightLabel: "100g" },
    ],
  },
  {
    id: "KA-9605",
    date: "Placed on Aug 02, 2023",
    status: "Delivered",
    items: [
      { productId: "cardamom-100g", name: "Cardamom", image: "/images/cardamom-product.png", price: 85, quantity: 1, weightLabel: "100gm Pack" },
      { productId: "biriyani-leaf-3", name: "Biriyani Leaf", image: "/images/biriyani-leaf.png", price: 61, quantity: 2, weightLabel: "100g" },
    ],
  },
];

export function getOrderTotal(order: Order): number {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Resolves an order's items against the LIVE product catalog. Items whose
 * product has since been removed are flagged as unavailable so the UI /
 * Reorder handler can skip them and inform the user, instead of silently
 * failing or adding stale data.
 */
export function resolveOrderItems(order: Order) {
  return order.items.map((item) => ({
    ...item,
    product: getProductById(item.productId),
  }));
}
