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
  const [editProduct,setEditProduct] = useState<Product|null>(null)

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const updateProduct = async ()=>{
    if(!editProduct) return;

    await fetch('/api/products',{
        method:'PUT',
        body:JSON.stringify(editProduct)
    })
    setEditProduct(null)
    fetchProducts()
  }

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
      ):(
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
            className="flex items-center justify-between mb-2 border p-2 rounded"
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
            //   onClick={() => setEditProduct(product)}
            onClick={()=>window.alert('gf')}
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
        <div className="mt-6 border p-4 rounded bg-gray-100">
          <h2 className="text-xl mb-2">Edit Product</h2>
          <input
            className="border p-1 mr-2"
            value={editProduct.name}
            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
          />
          <input
            className="border p-1 mr-2"
            type="number"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
          />
          <button
            className="bg-green-500 text-white px-2 py-1 rounded"
            onClick={updateProduct}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
