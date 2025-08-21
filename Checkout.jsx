import React, { useState, useEffect } from "react";
// Placeholder for Stripe.js integration
// import { loadStripe } from "@stripe/stripe-js";

// ✅ Utility functions for validation & sanitization
const sanitizeInput = (value) => value.trim().replace(/<[^>]*>?/gm, "");
const isNotEmpty = (value) => value.trim().length > 0;

// ✅ Mock JWT verification (replace with real API call)
const verifyJWT = () => {
  const token = localStorage.getItem("authToken");
  return token && token.length > 10; // Simple check for demo
};

// 📌 Shipping Address Form Component
const ShippingAddressForm = ({ formData, setFormData, errors }) => (
  <section className="mb-8">
    <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        { id: "firstName", placeholder: "First Name" },
        { id: "lastName", placeholder: "Last Name" },
        { id: "street", placeholder: "Street Address", span: true },
        { id: "city", placeholder: "City" },
        { id: "state", placeholder: "State" },
        { id: "postalCode", placeholder: "Postal Code" },
        { id: "country", placeholder: "Country" },
        { id: "phone", placeholder: "Phone Number" },
      ].map((field) => (
        <div key={field.id} className={field.span ? "sm:col-span-2" : ""}>
          <label
            htmlFor={field.id}
            className="sr-only"
          >
            {field.placeholder}
          </label>
          <input
            id={field.id}
            type="text"
            placeholder={field.placeholder}
            value={formData[field.id] || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                [field.id]: sanitizeInput(e.target.value),
              })
            }
            className="border p-3 rounded-lg w-full"
            aria-invalid={!!errors[field.id]}
            aria-describedby={`${field.id}-error`}
          />
          {errors[field.id] && (
            <p id={`${field.id}-error`} className="text-red-500 text-sm mt-1">
              {errors[field.id]}
            </p>
          )}
        </div>
      ))}
    </form>
  </section>
);

// 📌 Delivery Options Component
const DeliveryOptions = ({ deliveryOption, setDeliveryOption }) => (
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
);

// 📌 Payment Methods Component
const PaymentMethods = ({ paymentMethod, setPaymentMethod }) => (
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
);

// 📌 Main Checkout Page
export default function CheckoutPage() {
  const [formData, setFormData] = useState({});
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Check authentication before rendering
  useEffect(() => {
    if (!verifyJWT()) {
      setErrorMessage("You must be logged in to proceed with checkout.");
    }
  }, []);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!isNotEmpty(value)) newErrors[key] = `${key} is required`;
    });
    return newErrors;
  };

  // Handle place order
  const handlePlaceOrder = async () => {
    try {
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        throw new Error("Please fill out all required fields.");
      }

      // Here you'd integrate with Stripe or payment API
      console.log("Order placed:", {
        formData,
        deliveryOption,
        paymentMethod,
      });

      alert("Order placed successfully!");
    } catch (err) {
      console.error("Checkout Error:", err);
      setErrorMessage(err.message || "Something went wrong.");
    }
  };

  if (errorMessage && !verifyJWT()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

        <ShippingAddressForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
        />
        <DeliveryOptions
          deliveryOption={deliveryOption}
          setDeliveryOption={setDeliveryOption}
        />
        <PaymentMethods
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />

        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

/*
📌 Jest Test Placeholders:

test('form validation works', () => {
  // Simulate form submission and check for errors
});

test('order placement works with valid data', async () => {
  // Mock API call and check if data passes correctly
});
*/
