import React, { useState, useEffect } from "react";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const [userData, setUserData] = useState({
    orders: [],
    wishlist: [],
    returns: [],
    profile: { name: "", email: "", phone: "" },
  });

  useEffect(() => {
    // Mock fetch — replace with API call
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

  const handleProfileChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }));
  };

  const handleProfileSave = () => {
    // TODO: Add validation + API call
    alert("Profile updated!");
  };

  const tabs = [
    { key: "orders", label: "Orders" },
    { key: "profile", label: "Profile" },
    { key: "wishlist", label: "Wishlist" },
    { key: "returns", label: "Returns" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>

      {/* Tabs */}
      <nav className="flex gap-4 mb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 rounded transition ${
              activeTab === t.key
                ? "bg-blue-600 text-white shadow"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
            aria-current={activeTab === t.key ? "page" : undefined}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="bg-white p-4 rounded shadow">
        {/* Orders */}
        {activeTab === "orders" && (
          <>
            <h2 className="text-lg font-bold mb-4">Order History</h2>
            {userData.orders.length ? (
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
            ) : (
              <p className="text-gray-500">No orders found.</p>
            )}
          </>
        )}

        {/* Profile */}
        {activeTab === "profile" && (
          <>
            <h2 className="text-lg font-bold mb-4">Profile Settings</h2>
            <div className="space-y-4">
              {["name", "email", "phone"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  value={userData.profile[field]}
                  onChange={(e) => handleProfileChange(field, e.target.value)}
                  placeholder={
                    field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")
                  }
                  className="border p-2 rounded w-full"
                />
              ))}
              <button
                onClick={handleProfileSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </>
        )}

        {/* Wishlist */}
        {activeTab === "wishlist" && (
          <>
            <h2 className="text-lg font-bold mb-4">Wishlist</h2>
            {userData.wishlist.length ? (
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
            ) : (
              <p className="text-gray-500">Your wishlist is empty.</p>
            )}
          </>
        )}

        {/* Returns */}
        {activeTab === "returns" && (
          <>
            <h2 className="text-lg font-bold mb-4">Returns / Refunds</h2>
            {userData.returns.length ? (
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
            ) : (
              <p className="text-gray-500">No returns or refunds found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
