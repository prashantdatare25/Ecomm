import { useState, useMemo } from "react";

const products = [
  { id: 1, name: "Red Shoes", category: "Shoes", price: 50, rating: 4.5, inStock: true },
  { id: 2, name: "Blue Hoodie", category: "Hoodies", price: 80, rating: 4.0, inStock: false },
  { id: 3, name: "Green Tee", category: "Tees", price: 20, rating: 3.8, inStock: true },
  { id: 4, name: "Cap", category: "Accessories", price: 15, rating: 4.2, inStock: true },
  { id: 5, name: "Leather Bag", category: "Bags", price: 120, rating: 4.9, inStock: false },
];

const categories = ["All", "Shoes", "Hoodies", "Tees", "Accessories", "Bags"];

export default function PLP() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, category, sort]);

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      {/* Search & Filters */}
      <div className="flex gap-2 flex-wrap">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1 flex-1"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-2 py-1">
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded px-2 py-1">
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paginated.map((p) => (
          <div key={p.id} className="border rounded p-3">
            <h2 className="font-semibold">{p.name}</h2>
            <p className="text-sm text-gray-500">{p.category}</p>
            <p className="text-lg">${p.price}</p>
            <p className="text-yellow-500">⭐ {p.rating}</p>
            <p className={p.inStock ? "text-green-600" : "text-red-600"}>
              {p.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-2 justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-gray-200" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
