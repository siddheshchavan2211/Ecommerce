import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../utils/CartSlice";
import { toast } from "react-toastify";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.product.products.find((p) => p.id === parseInt(id))
  );

  const CurrentUser = useSelector((state) => state.user.user);

  const handleAddToCart = () => {
    if (!CurrentUser) {
      toast.error("Please login to add products to the cart", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        theme: "colored",
      });
      return;
    }

    dispatch(addItem(product));
    toast.success("Added to Cart!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      theme: "colored",
    });
  };

  if (!product) return <div className="p-4">Product not found.</div>;

  return (
    <div className="p-4 flex items-center justify-center lg:mt-6">
      <div className="flex lg:max-w-5xl w-full">
        {/* Image Section */}
        <div className="w-1/2 pr-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="w-1/2 flex flex-col justify-start lg:mt-12">
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
          <p className="text-4xl text-emerald-600 font-semibold mb-2">
            ₹{(product.price * 80).toFixed(0)}
          </p>
          <p className="text-xl text-gray-600 mb-4">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="bg-emerald-600 text-white px-6 py-3 text-xl cursor-pointer rounded-lg hover:bg-emerald-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
