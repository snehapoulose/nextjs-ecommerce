"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeCart } from "../redux/slices/cartSlice";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeCart(id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h2>
        <Link href="/products" className="text-blue-600 underline">
          ← Go back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart 🛒</h1>
      <Link href="/products" className="text-blue-600 underline">
        ← Go back to products
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cartItems.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow-sm flex gap-4 items-center"
          >
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={80}
                className="rounded"
                unoptimized
              />
            </Link>
            <div className="flex-grow">
              <Link
                href={`/product/${product.id}`}
                className="text-lg font-semibold block"
              >
                {product.name}
              </Link>
              <p>Price: ${product.price.toFixed(2)}</p>
            </div>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => handleRemove(product.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right text-xl font-semibold">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}
