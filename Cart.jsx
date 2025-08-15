import React, { useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([
    { id: 1, name: "Laptop", price: 55000, qty: 1, image: "https://via.placeholder.com/80" },
    { id: 2, name: "Headphones", price: 2500, qty: 2, image: "https://via.placeholder.com/80" },
    { id: 3, name: "Mouse", price: 1200, qty: 1, image: "https://via.placeholder.com/80" },
  ]);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCart(cart.map(item => 
      item.id === id ? { ...item, qty: newQty } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Total</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3 flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
                    <span>{item.name}</span>
                  </td>
                  <td className="p-3">₹{item.price}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-3">₹{item.price * item.qty}</td>
                  <td className="p-3">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow w-full md:w-1/3 ml-auto">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax (10%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
