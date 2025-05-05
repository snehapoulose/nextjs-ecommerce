"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  price: number;
  name: string;
  category: string;
  isNew: boolean;
  image: string;
}
export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [newPrice, setNewPrice] = useState<string>("");

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const updateProduct = async (updatedProduct: Product) => {
    const res = await fetch("/api/products", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    console.log(data);
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setNewPrice(product.price.toString());
  };

  const closeModal = () => {
    setEditProduct(null);
    setNewPrice("");
  };

  const handleSave = () => {
    if (editProduct) {
      const priceNum = parseFloat(newPrice);
      if (!isNaN(priceNum)) {
        const updatedProduct = { ...editProduct, price: priceNum };
        updateProduct(updatedProduct);
      } else {
        alert("Invalid price");
      }
    }
    const updatedProducts = products.map((p) =>
      p.id === editProduct?.id ? { ...p, price: parseFloat(newPrice) } : p
    );

    setProducts(updatedProducts);
    closeModal();
  };
  
  return (
    <div style={{ padding: "1.5rem" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1>Products List</h1>
      </header>
      {products.length === 0 ? (
        <p>Loading Products...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center justify-between mb-2 border p-2 rounded"
            >
              <div>
                <Image
                  src={product.image}
                  width={200}
                  height={150}
                  alt={product.name}
                  className="rounded"
                  unoptimized
                />
                <p className="font-semibold">{product.name}</p>
                <p>Price:${product.price.toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                {/* <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Edit {editProduct.name}</h2>
            <label className="block mb-2">New Price:</label>
            <input
              type="text"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
