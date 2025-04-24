import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Men's Clothing",
    value: "men's clothing",
    image:
      "https://img.freepik.com/free-photo/young-handsome-man-choosing-clothes-shop_1303-19720.jpg",
  },
  {
    name: "Women's Clothing",
    value: "women's clothing",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4T2LADwIYqxPzEJ6ek49IPd2duVLCFcycEg&s",
  },
  {
    name: "Jewelry",
    value: "jewelery",
    image:
      "https://img.freepik.com/premium-photo/indian-traditional-wedding-jewellery-bangles-with-huldi-kumkum-white-flowers-selective-focus_466689-47911.jpg",
  },
  {
    name: "Electronics",
    value: "electronics",
    image:
      "https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309649.jpg?semt=ais_hybrid&w=740",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate("/products", { state: { selectedCategory: category } });
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative bg-cover w-full bg-center h-[450px]"
        style={{
          backgroundImage:
            "url('https://t3.ftcdn.net/jpg/02/84/32/52/360_F_284325273_ei2pxwlAyg4ghLOBINFPiF1LVubbfLpA.jpg')",
        }}
      >
        <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl font-bold mb-2">Upgrade Your Style</h1>
            <p className="mb-4 text-lg">
              Discover the latest trends in fashion, furniture & more.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-white text-black font-medium py-2 px-6 rounded hover:bg-gray-200 transition"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <section className="py-12 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="cursor-pointer group border rounded-lg overflow-hidden shadow hover:shadow-lg transition transform hover:-translate-y-1"
              onClick={() => handleCategoryClick(cat.value)}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg group-hover:text-emerald-600 transition">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer className="bg-gray-100 text-center py-4 mt-10 border-t">
        <p className="text-sm text-gray-600">
          © 2025 Ecommerce. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
