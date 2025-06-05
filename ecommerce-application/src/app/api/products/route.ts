import { NextRequest, NextResponse } from "next/server";
import products from "@/app/data/products.json";
export async function GET() {
  return NextResponse.json(products);
}

export async function PUT(req: NextRequest) {
  const { id, name, price, image, category, isNew } = await req.json();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  products[index] = { id, name, price, image, category, isNew };
  return NextResponse.json({
    message: "Product Updated",
    product: products[index],
  });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ message: "Product Not Found" }, { status: 404 });
  }
  products.splice(index, 1);
  return NextResponse.json({ message: "Product Deleted" });
}
