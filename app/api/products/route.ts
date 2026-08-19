import { NextResponse } from "next/server";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsByTag,
} from "@/lib/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");

  if (id) {
    const product = getProductById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  }

  if (category) {
    return NextResponse.json(getProductsByCategory(category));
  }

  if (tag) {
    return NextResponse.json(getProductsByTag(tag as any));
  }

  return NextResponse.json(getAllProducts());
}