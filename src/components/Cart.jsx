import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} from "../utils/CartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { convertToINR } from "../utils/currencyUtils";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    toast.info("Item removed from cart");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.warn("Cart cleared");
  };

  const handleIncrement = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item.quantity >= 5) {
      toast.error("Max limit of 5 reached");
      return;
    }
    dispatch(incrementQuantity(id));
    toast.success("Increased quantity");
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
    toast.info("Decreased quantity");
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded shadow"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-28 object-contain mb-2 md:mb-0"
              />
              <div className="flex-1 md:ml-6">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600 mb-1">
                  ₹{convertToINR(item.price)} x {item.quantity}
                </p>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleDecrement(item.id)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    −
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item.id)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-2 md:mt-0">
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col md:flex-row justify-between items-center border-t pt-4">
            <p className="text-xl font-bold">
              Total: ₹{convertToINR(totalPrice)}
            </p>
            <div className="mt-4 md:mt-0 space-x-4">
              <button
                onClick={handleClearCart}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate("/payment", { state: { cartItems } })}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
