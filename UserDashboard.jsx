import React, { useState, useEffect } from "react";

export default function UserDashboard() {
  const [tab, setTab] = useState("orders");
  const [userData, setUserData] = useState({
    orders: [],
    wishlist: [],
    returns: [],
    profile: { name: "", email: "", phone: "" },
  });

  useEffect(() => {
    // Fetch user data from backend (mocked for now)
    setUserData({
      orders: [
        { id: 101, date: "2025-08-01", item: "Laptop", status: "Delivered" },
        { id: 102, date: "2025-08-10", item: "Shoes", status: "Shipped" },
      ],
      wishlist: [
        { id: 201, name: "Smartphone", price: 699 },
        { id: 202, name: "Headphones", price: 199 },
      ],
      returns: [
        { id: 301, item: "Shoes", date: "2025-08-12", status: "Processing" },
      ],
      profile: { name: "John Doe", email: "john@example.com", phone: "9876543210" },
    });
  }, []);

  const handleProfileSave = () => {
    alert("Profile updated!");
    // Call API to update profile
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        {["orders", "profile", "wishlist", "returns"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded ${
              tab === t ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-4 rounded shadow">
        {/* Order History */}
        {tab === "orders" && (
          <>
            <h2 className="text-lg font-bold mb-4">Order History</h2>
            <ul>
              {userData.orders.map((o) => (
                <li key={o.id} className="border-b py-2 flex justify-between">
                  <span>
                    #{o.id} - {o.item} ({o.date})
                  </span>
                  <span className="text-sm text-gray-500">{o.status}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Profile Settings */}
        {tab === "profile" && (
          <>
            <h2 className="text-lg font-bold mb-4">Profile Settings</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={userData.profile.name}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    profile: { ...userData.profile, name: e.target.value },
                  })
                }
                placeholder="Full Name"
                className="border p-2 rounded w-full"
              />
              <input
                type="email"
                value={userData.profile.email}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    profile: { ...userData.profile, email: e.target.value },
                  })
                }
                placeholder="Email"
                className="border p-2 rounded w-full"
              />
              <input
                type="tel"
                value={userData.profile.phone}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    profile: { ...userData.profile, phone: e.target.value },
                  })
                }
                placeholder="Phone Number"
                className="border p-2 rounded w-full"
              />
              <button
                onClick={handleProfileSave}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </>
        )}

        {/* Wishlist */}
        {tab === "wishlist" && (
          <>
            <h2 className="text-lg font-bold mb-4">Wishlist</h2>
            <ul>
              {userData.wishlist.map((w) => (
                <li key={w.id} className="border-b py-2 flex justify-between">
                  <span>
                    {w.name} - ${w.price}
                  </span>
                  <button className="text-blue-600 hover:underline">
                    Add to Cart
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Returns / Refunds */}
        {tab === "returns" && (
          <>
            <h2 className="text-lg font-bold mb-4">Returns / Refunds</h2>
            <ul>
              {userData.returns.map((r) => (
                <li key={r.id} className="border-b py-2 flex justify-between">
                  <span>
                    {r.item} ({r.date})
                  </span>
                  <span className="text-sm text-gray-500">{r.status}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
