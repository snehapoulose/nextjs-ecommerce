import { Product } from "../types/products";
import ProductList from "./ProductList";
export default async function ProductPage() {
  async function getProducts(): Promise<Product[]> {
    const res = await fetch("http://localhost:3000/api/products");
    return res.json();
  }
  const products = await getProducts();
  return (
    <div style={{ padding: "1.5rem" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        <strong>Products List</strong>
      </header>
      <ProductList initialProducts={products} />
    </div>
  );
}
