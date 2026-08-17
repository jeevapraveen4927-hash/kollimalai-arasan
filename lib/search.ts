import { Product } from "./types";
import { getAllProducts } from "./products";

/**
 * Case-insensitive search across product name, category, and SKU.
 * Matches from the very first typed character (substring match, not
 * prefix-only), so "car" matches "Cardamom", "c" matches everything
 * starting with or containing a C, etc.
 *
 * Reads from the live product catalog (lib/products.ts), so newly added
 * or removed products are automatically included/excluded with no changes
 * needed here.
 */
export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return getAllProducts().filter((product) => {
    const haystack = [product.name, product.category, product.sku]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
