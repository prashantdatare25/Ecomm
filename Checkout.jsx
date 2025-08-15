import React, { useState } from "react";

export default function CheckoutPage() {
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("credit");

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

        {/* Shipping Address Form */}
        <section className="mb-8">
          <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Street Address"
              className="border p-3 rounded-lg sm:col-span-2 w-full"
            />
            <input
              type="text"
              placeholder="City"
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="State"
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Country"
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="border p-3 rounded-lg w-full"
            />
          </form>
        </section>

        {/* Delivery Options */}
        <section className="mb-8">
          <h2 className="text-lg font-medium mb-4">Delivery Options</h2>
          <div className="space-y-3">
            {[
              { id: "standard", label: "Standard Delivery (3-5 days)", price: "Free" },
              { id: "express", label: "Express Delivery (1-2 days)", price: "$10" },
              { id: "overnight", label: "Overnight Delivery", price: "$20" },
            ].map((option) => (
              <label
                key={option.id}
                className="flex items-center justify-between border p-3 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="delivery"
                    value={option.id}
                    checked={deliveryOption === option.id}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                  />
                  <span>{option.label}</span>
                </div>
                <span className="text-sm font-medium">{option.price}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Payment Methods */}
        <section className="mb-8">
          <h2 className="text-lg font-medium mb-4">Payment Method</h2>
          <div className="space-y-3">
            {[
              { id: "credit", label: "Credit / Debit Card" },
              { id: "paypal", label: "PayPal" },
              { id: "cod", label: "Cash on Delivery" },
            ].map((method) => (
              <label
                key={method.id}
                className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>{method.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Place Order Button */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
          Place Order
        </button>
      </div>
    </div>
  );
}
