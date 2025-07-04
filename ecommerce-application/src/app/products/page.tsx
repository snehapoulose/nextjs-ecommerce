import { getProducts } from "../services/getProducts";
import ProductList from "./ProductList";
export default async function ProductPage() {
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
