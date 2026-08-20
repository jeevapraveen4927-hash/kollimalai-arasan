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

export async function searchProductsAPI(
  query: string
): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}?search=${encodeURIComponent(query)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  return response.json();
}

export async function loginUser(
  email: string,
  password: string
) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  return {
    success: response.ok,
    message: data.message,
    user: data.user,
  };
}

export async function registerUser(
  fullName: string,
  email: string,
  phone: string,
  password: string
) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName,
      email,
      phone,
      password,
    }),
  });

  const data = await response.json();

  return {
    success: response.ok,
    message: data.message,
    user: data.user,
  };
}
export async function forgotPassword(email: string) {
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  const data = await response.json();

  return {
    success: response.ok,
    message: data.message,
  };
}
export async function fetchProfile() {
const response = await fetch("/api/auth/profile", {
  method: "GET",
    cache: "no-store",
  });

  const data = await response.json();

  return {
    success: response.ok,
    message: data.message,
    user: data.user,
  };
}

export async function updateProfile(
  fullName: string,
  phone: string
) {
  const response = await fetch("/api/auth/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName,
      phone,
    }),
  });

  const data = await response.json();

  return {
    success: response.ok,
    message: data.message,
    user: data.user,
  };
}