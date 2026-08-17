import { Product, ProductTag } from "./types";

/**
 * SINGLE SOURCE OF TRUTH for all products.
 *
 * To add a product: append an object here with a unique `id`.
 * To remove a product: delete its object here.
 *
 * Nothing else needs to change — search, category pages, the
 * "Freshly Launched Flavours" grid, and the "Lowest Price Ever"
 * carousel all derive from this array via the helper functions below,
 * using `tags` and `category` rather than hardcoded lists.
 */
export const products: Product[] = [
  {
    id: "biriyani-leaf-1",
    name: "Biriyani Leaf",
    category: "Spices",
    sku: "KA-047",
    image: "/images/biriyani-leaf.png",
    weightLabel: "100g - ₹ 61.00 /Kg",
    price: 61,
    tags: ["freshly-launched"],
    inStock: true,
  },
  {
    id: "biriyani-leaf-2",
    name: "Biriyani Leaf",
    category: "Spices",
    sku: "KA-047",
    image: "/images/biriyani-leaf.png",
    weightLabel: "100g - ₹ 61.00 /Kg",
    price: 61,
    tags: ["freshly-launched"],
    inStock: true,
  },
  {
    id: "biriyani-leaf-3",
    name: "Biriyani Leaf",
    category: "Spices",
    sku: "KA-047",
    image: "/images/biriyani-leaf.png",
    weightLabel: "100g - ₹ 61.00 /Kg",
    price: 61,
    tags: ["freshly-launched"],
    inStock: true,
  },
  {
    id: "biriyani-leaf-4",
    name: "Biriyani Leaf",
    category: "Spices",
    sku: "KA-047",
    image: "/images/biriyani-leaf.png",
    weightLabel: "100g - ₹ 61.00 /Kg",
    price: 61,
    tags: ["freshly-launched"],
    inStock: true,
  },
  {
    id: "biriyani-leaf-5",
    name: "Biriyani Leaf",
    category: "Spices",
    sku: "KA-047",
    image: "/images/biriyani-leaf.png",
    weightLabel: "100g - ₹ 61.00 /Kg",
    price: 61,
    tags: ["freshly-launched"],
    inStock: true,
  },
  {
    id: "biriyani-leaf-6",
    name: "Biriyani Leaf",
    category: "Spices",
    sku: "KA-047",
    image: "/images/biriyani-leaf.png",
    weightLabel: "100g - ₹ 61.00 /Kg",
    price: 61,
    tags: ["freshly-launched"],
    inStock: true,
  },
  {
    id: "biriyani-leaf-7",
    name: "Biriyani Leaf",
    category: "Spices",
    sku: "KA-047",
    image: "/images/biriyani-leaf.png",
    weightLabel: "100g - ₹ 61.00 /Kg",
    price: 61,
    tags: ["freshly-launched"],
    inStock: true,
  },
  {
    id: "biriyani-leaf-8",
    name: "Biriyani Leaf",
    category: "Spices",
    sku: "KA-047",
    image: "/images/biriyani-leaf.png",
    weightLabel: "100g - ₹ 61.00 /Kg",
    price: 61,
    tags: ["freshly-launched"],
    inStock: true,
  },
  {
    id: "cardamom-50g",
    name: "Cardamom",
    category: "Spices",
    sku: "KA-102",
    image: "/images/cardamom-product.png",
    weightLabel: "50gm X 2 Pack = ₹90",
    price: 45,
    originalPrice: 50,
    discountLabel: "10% OFF",
    packOption: "50gm X 2 Pack = ₹90",
    taxIncluded: true,
    tags: ["lowest-price"],
    inStock: true,
  },
  {
    id: "cardamom-100g",
    name: "Cardamom",
    category: "Spices",
    sku: "KA-103",
    image: "/images/cardamom-product.png",
    weightLabel: "100gm Pack = ₹170",
    price: 85,
    originalPrice: 95,
    discountLabel: "10% OFF",
    packOption: "100gm Pack = ₹170",
    taxIncluded: true,
    tags: ["lowest-price"],
    inStock: true,
  },
  {
    id: "cardamom-250g",
    name: "Cardamom",
    category: "Spices",
    sku: "KA-104",
    image: "/images/cardamom-product.png",
    weightLabel: "250gm Pack = ₹410",
    price: 205,
    originalPrice: 228,
    discountLabel: "10% OFF",
    packOption: "250gm Pack = ₹410",
    taxIncluded: true,
    tags: ["lowest-price"],
    inStock: true,
  },
  {
    id: "cardamom-500g",
    name: "Cardamom",
    category: "Spices",
    sku: "KA-105",
    image: "/images/cardamom-product.png",
    weightLabel: "500gm Pack = ₹790",
    price: 395,
    originalPrice: 439,
    discountLabel: "10% OFF",
    packOption: "500gm Pack = ₹790",
    taxIncluded: true,
    tags: ["lowest-price"],
    inStock: true,
  },
];

// ---- Helper functions — everything else in the app reads through these ----

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByTag(tag: ProductTag): Product[] {
  return products.filter((p) => p.tags?.includes(tag));
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(
    (p) => p.category?.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  return Array.from(new Set(products.map((p) => p.category).filter(Boolean))) as string[];
}
