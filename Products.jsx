import React from 'react'

function Products() {
const products = [
    {
        name: "Apple iPhone 15",
        price: "$799",
        description: "Latest model with advanced features.",
    },
    {
        name: "Samsung Galaxy S24",
        price: "$749",
        description: "High performance and sleek design.",
    },
    {
        name: "Sony WH-1000XM5 Headphones",
        price: "$399",
        description: "Noise cancelling wireless headphones.",
    },
    {
        name: "Apple MacBook Air M2",
        price: "$1199",
        description: "Lightweight laptop with powerful M2 chip.",
    },
];

return (
    // Product List
    <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Products</h2>
        <ul className="grid gap-6">
            {products.map((product, idx) => (
                <li
                    key={idx}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                >
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">{product.name}</h3>
                    <p className="text-lg font-medium text-gray-900 mb-1">Price: {product.price}</p>
                    <p className="text-gray-600">{product.description}</p>
                </li>
            ))}
        </ul>
    </div>
);
}

export default Products