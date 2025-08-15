import React, { useState, useEffect } from "react";

// Mock API fetch function (replace with real API calls)
const fetchUserData = async () => {
  return {
    name: "John Doe",
    email: "john@example.com",
    orders: [
      { id: "ORD123", date: "2025-08-01", total: 250, status: "Delivered" },
      { id: "ORD124", date: "2025-08-05", total: 100, status: "Pending" },
    ],
    wishlist: [
      { id: 1, name: "Wireless Headphones", price: 99 },
      { id: 2, name: "Smart Watch", price: 149 },
    ],
    returns: [
      { id: "RET001", product: "Bluetooth Speaker", status: "Processing" },
    ],
  };
};

// ---------------- Order History ----------------
const OrderHistory = ({ orders }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4">Order History</h2>
    {orders.length === 0 ? (
      <p className="text-gray-500">No orders found.</p>
    ) : (
      <ul className="divide-y">
        {orders.map((order) => (
          <li key={order.id} className="py-2 flex justify-between text-sm">
            <span>{order.id} - {order.date}</span>
            <span className="font-medium">₹{order.total} ({order.status})</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

// ---------------- Profile Settings ----------------
const ProfileSettings = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({ name: user.name, email: user.email });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and Email cannot be empty.");
      return;
    }
    onUpdate(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border w-full p-2 rounded"
          aria-label="Full Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border w-full p-2 rounded"
          aria-label="Email Address"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

// ---------------- Wishlist ----------------
const Wishlist = ({ wishlist }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4">Wishlist</h2>
    {wishlist.length === 0 ? (
      <p className="text-gray-500">Your wishlist is empty.</p>
    ) : (
      <ul className="divide-y">
        {wishlist.map((item) => (
          <li key={item.id} className="py-2 flex justify-between text-sm">
            <span>{item.name}</span>
            <span className="font-medium">₹{item.price}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

// ---------------- Returns & Refunds ----------------
const ReturnsRefunds = ({ returns }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4">Returns & Refunds</h2>
    {returns.length === 0 ? (
      <p className="text-gray-500">No return requests found.</p>
    ) : (
      <ul className="divide-y">
        {returns.map((item) => (
          <li key={item.id} className="py-2 flex justify-between text-sm">
            <span>{item.product}</span>
            <span className="font-medium">{item.status}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

// ---------------- Main User Dashboard ----------------
const UserDashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    fetchUserData().then((data) => setUserData(data));
  }, []);

  const handleProfileUpdate = (updatedData) => {
    console.log("Updated profile:", updatedData); // Replace with API call
    setUserData({ ...userData, ...updatedData });
  };

  if (!userData) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userData.name}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <OrderHistory orders={userData.orders} />
        <ProfileSettings user={userData} onUpdate={handleProfileUpdate} />
        <Wishlist wishlist={userData.wishlist} />
        <ReturnsRefunds returns={userData.returns} />
      </div>
    </div>
  );
};

export default UserDashboard;
