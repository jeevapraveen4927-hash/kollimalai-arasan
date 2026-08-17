export type ProductTag = "freshly-launched" | "lowest-price" | "featured";

export interface Product {
  id: string;
  name: string;
  category?: string;
  sku?: string;
  image: string;
  weightLabel: string;
  price: number;
  originalPrice?: number;
  discountLabel?: string;
  packOption?: string;
  taxIncluded?: boolean;
  tags?: ProductTag[];
  inStock?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  quote: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface CartItem {
  id: string;
  name: string;
  sku: string;
  weight: string;
  image: string;
  price: number;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  weightLabel: string;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  items: OrderItem[];
}
