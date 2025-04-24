import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/CartSlice";
import { toast } from "react-toastify";

const Card = ({ product }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.user);
  const rounded = Math.round(product.rating.rate);

  const handleAddtoCart = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      dispatch(addItem(product));
      toast.success("Added to Cart!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("Please login to add products to the cart", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <div className="overflow-hidden w-72 h-[400px] m-4 group hover:shadow-lg transition-all duration-300 border rounded-xl shadow bg-white flex flex-col">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={product?.image || "/placeholder.svg"}
          alt={product?.title}
          className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Text Section */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        {/* Title */}
        <h3
          className="font-semibold text-xl overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product?.title}
        </h3>
        {/* Price */}
        <p className="text-2xl font-bold text-emerald-600">
          ₹{Math.round(product?.price * 83.5).toLocaleString("en-IN")}
        </p>
        <div className="text-yellow-500 text-2xl font-bold">
          {Array.from({ length: 5 }, (_, index) =>
            index < rounded ? "★" : "☆"
          ).join("")}
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="p-5 pt-0">
        <button
          onClick={handleAddtoCart}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded text-sm font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
