"use client";

import { useState } from "react";
import { Product } from "../types/products";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addToCart } from "../redux/slices/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  initialProducts: Product[];
}

export default function ProductListClient({ initialProducts }: Props) {
  const router = useRouter()
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [products, setProducts] = useState(initialProducts);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [newPrice, setNewPrice] = useState<string>("");
  const [productName, setProductName] = useState<string>("");

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setNewPrice(product.price.toString());
    setProductName(product.name);
  };

  const handleSave = async () => {
    if (!editProduct) return;
    const priceNum = parseFloat(newPrice);
    if (isNaN(priceNum)) return alert("Invalid price");

    const updatedProduct = {
      ...editProduct,
      price: priceNum,
      name: productName,
    };

    await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });

    const updated = products.map((p) =>
      p.id === editProduct.id ? updatedProduct : p
    );
    setProducts(updated);
    closeModal();
  };

  const closeModal = () => {
    setEditProduct(null);
    setNewPrice("");
    setProductName("");
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/products", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    setProducts(products.filter((p) => p.id !== id));
  };
  const handleLogOut = async ()=>{
    await fetch("/api/logout",{
      method:'GET',
      credentials:'include'
    });
    router.push("/login")
  };

  return (
    <div>
      <div className="flex justify-between items-center  mb-4">
<Link href="/cart" className="text-blue-600 font-semibold">
        🛒 Cart Items: {cartItems.length}
      </Link>
      <button onClick={handleLogOut}>
        Logout
      </button>
      </div>
      

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-2">
            <Image
              src={product.image}
              width={200}
              height={150}
              alt={product.name}
              unoptimized
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Edit {editProduct.name}</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            <input
              type="text"
              placeholder="New Price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-3 py-1 rounded"
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
