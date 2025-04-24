import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddProducts } from "../utils/ProductsSlice";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL);
        const data = await res.json();
        setProducts(data);
        dispatch(AddProducts(data));
        setFilteredProducts(data);

        const uniqueCategories = [
          "all",
          ...new Set(data.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updated = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      updated = updated.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query (product name)
    if (searchQuery) {
      updated = updated.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products based on the selected option
    if (sortOption === "price-low") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      updated.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      updated.sort((a, b) => b.rating.rate - a.rating.rate);
    } else if (sortOption === "popularity") {
      updated.sort((a, b) => b.rating.count - a.rating.count);
    }

    setFilteredProducts(updated);
  }, [selectedCategory, sortOption, searchQuery, products]);

  return (
    <>
      {/* Filter Options and Search Bar Above Products */}
      <div className="flex gap-4 p-4 bg-white justify-center shadow-md mb-4">
        {/* Search Bar */}
        <div className="w-1/4">
          <label className="block mb-2 font-medium">Search</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Search by product name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="w-1/4">
          <label className="block mb-2 font-medium">Category</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="w-1/4">
          <label className="block mb-2 font-medium">Sort By</label>
          <select
            className="w-full p-2 border rounded"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">None</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>

      {/* Products Display Section */}
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {filteredProducts.map((product) => (
          <Link to={"/details/" + product.id} key={product.id}>
            {" "}
            <Card product={product} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Products;
