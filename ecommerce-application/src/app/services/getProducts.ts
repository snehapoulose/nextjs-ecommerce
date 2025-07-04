 import { Product } from "../types/products";
 export async function getProducts(): Promise<Product[]> {
    const res = await fetch("http://localhost:3000/api/products");
    return res.json();
  }