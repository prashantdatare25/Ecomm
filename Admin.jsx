import React, { useState, useEffect } from "react";
//comment
// Mock API calls
const fetchAdminData = async (token) => {
  // fetch from /api/admin/dashboard
  return {
    metrics: { totalOrders: 128, revenue: 45230, recentActivity: ["Order #123", "User John Registered"] },
    products: [{ id: 1, name: "Laptop", price: 1200 }],
    users: [{ id: 1, name: "John Doe", role: "customer" }],
    orders: [{ id: 1, product: "Laptop", status: "Shipped" }],
  };
};

export default function AdminDashboard() {
  const [tab, setTab] = useState("products");
  const [data, setData] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetchAdminData(token).then(setData);
  }, []);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return alert("Fill all fields");
    setData((prev) => ({
      ...prev,
      products: [...prev.products, { id: Date.now(), ...newProduct }],
    }));
    setNewProduct({ name: "", price: "" });
  };

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-xl font-bold">{data.metrics.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-xl font-bold">${data.metrics.revenue}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Recent Activity</p>
          <ul className="text-sm">
            {data.metrics.recentActivity.map((act, i) => (
              <li key={i}>{act}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        {["products", "users", "orders"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded ${tab === t ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-4 rounded shadow">
        {tab === "products" && (
          <>
            <h2 className="text-lg font-bold mb-4">Manage Products</h2>
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="border p-2 rounded w-1/2"
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="border p-2 rounded w-1/4"
              />
              <button
                onClick={handleAddProduct}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
            <ul>
              {data.products.map((p) => (
                <li key={p.id} className="flex justify-between border-b py-2">
                  <span>{p.name} - ${p.price}</span>
                  <button className="text-red-500 hover:underline">Delete</button>
                </li>
              ))}
            </ul>
          </>
        )}

        {tab === "users" && (
          <>
            <h2 className="text-lg font-bold mb-4">Users</h2>
            <ul>
              {data.users.map((u) => (
                <li key={u.id} className="border-b py-2">
                  {u.name} ({u.role})
                </li>
              ))}
            </ul>
          </>
        )}

        {tab === "orders" && (
          <>
            <h2 className="text-lg font-bold mb-4">Orders</h2>
            <ul>
              {data.orders.map((o) => (
                <li key={o.id} className="border-b py-2">
                  {o.product} - {o.status}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
