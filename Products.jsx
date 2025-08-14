import React from 'react';

function ProductsPage() {
    const products = [
        {
            name: "Apple iPhone 15",
            description: "Latest model with advanced features.",
            price: "$799",
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-og-202309?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1694138185471"
        },
        {
            name: "Samsung Galaxy S24",
            description: "High performance and sleek design.",
            price: "$749",
            image: "https://images.samsung.com/is/image/samsung/p6pim/in/sm-s921bzvdins/gallery/in-galaxy-s24-sm-s921bzvdins-thumb-538916837"
        },
        {
            name: "Sony WH-1000XM5 Headphones",
            description: "Noise cancelling wireless headphones.",
            price: "$399",
            image: "https://www.sony.com/image/2d1e4b7b3b8c2c8e6b2e1fa89f592eff?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF"
        },
        {
            name: "Apple MacBook Air M2",
            description: "Lightweight laptop with powerful M2 chip.",
            price: "$1199",
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-m2-og-202206?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1653497303764"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            <header className="mb-8"></header>
                <h1 className="text-4xl font-bold text-blue-700">Products</h1>
                <p className="text-lg text-gray-700 mt-2">Browse our latest electronics</p>
      
            <main className="w-full max-w-4xl">
                <section>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {products.map((product, idx) => (
                            <li key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                                <img src={product.image} alt={product.name} className="w-40 h-40 object-contain mb-4 rounded" />
                                <h3 className="text-xl font-bold text-blue-600">{product.name}</h3>
                                <p className="text-gray-800 mt-2">{product.description}</p>
                                <span className="mt-3 text-blue-700 font-semibold text-lg">{product.price}</span>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Add to Cart</button>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
            <footer className="mt-10 text-gray-500">
                &copy; {new Date().getFullYear()} Ecomm. All rights reserved.
            </footer>
        </div>
    );
}

export default ProductsPage;
