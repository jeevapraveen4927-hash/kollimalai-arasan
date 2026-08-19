import { Product } from "@/lib/types";

const API_URL = "http://localhost:3000/api/products";
export async function fetchAllProducts(): Promise<Product[]> {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function fetchProductById(
  id: string
): Promise<Product> {
  const response = await fetch(
    `${API_URL}?id=${encodeURIComponent(id)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function fetchProductsByCategory(
  category: string
): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}?category=${encodeURIComponent(category)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  return response.json();
}

export async function fetchProductsByTag(
  tag: string
): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}?tag=${encodeURIComponent(tag)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tagged products");
  }

  return response.json();
}