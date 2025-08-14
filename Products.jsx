// ProductListingPage.tsx
import React, { useState, useMemo } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

const productsData: Product[] = [
  { id: 1, name: "Red Shirt", category: "Clothing", price: 25 },
  { id: 2, name: "Blue Jeans", category: "Clothing", price: 40 },
  { id: 3, name: "Running Shoes", category: "Footwear", price: 60 },
  { id: 4, name: "Sneakers", category: "Footwear", price: 55 },
  { id: 5, name: "Laptop", category: "Electronics", price: 800 },
  { id: 6, name: "Headphones", category: "Electronics", price: 120 },
  { id: 7, name: "Backpack", category: "Accessories", price: 50 },
  { id: 8, name: "Watch", category: "Accessories", price: 150 },
];

export default function ProductListingPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const categories = ["Clothing", "Footwear", "Electronics", "Accessories"];

  const filteredProducts = useMemo(() => {
    let filtered = productsData;

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (sortBy === "priceLowHigh") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighLow") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [search, category, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded px-3 py-2 w-full md:w-1/3"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="border rounded px-3 py-2"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
              Image
            </div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="mt-2 font-bold">${product.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === idx + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
