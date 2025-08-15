// src/pages/Home.jsx
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Home() {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-blue-600 text-white p-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold">Welcome to Our Store</h1>
        <p className="mt-2 text-lg">Your one-stop shop for seasonal deals</p>
        <button className="mt-4 px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500">
          Shop Now
        </button>
      </section>

      {/* Featured Categories */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Electronics", "Clothing", "Home", "Sports"].map((cat, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg text-center"
            >
              <div className="h-24 bg-gray-200 rounded mb-2"></div>
              <p className="font-medium">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal Deals */}
      <section className="py-12 px-6 bg-yellow-50">
        <h2 className="text-2xl font-bold mb-6">Seasonal Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((deal) => (
            <div
              key={deal}
              className="bg-white rounded-lg shadow hover:shadow-lg p-4"
            >
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <h3 className="font-semibold">Deal #{deal}</h3>
              <p className="text-sm text-gray-600">
                Save big on our exclusive seasonal items.
              </p>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Deal
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Product Slider */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
        <Slider {...settings}>
          {[1, 2, 3].map((item) => (
            <div key={item} className="px-2">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <h3 className="font-semibold">Product #{item}</h3>
                <p className="text-sm text-gray-600">Best seller item details</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
}
