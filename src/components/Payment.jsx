import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { convertToINR } from "../utils/currencyUtils";

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cartItems = state?.cartItems || [];
  const user = useSelector((state) => state.user.user);

  const totalPriceInINR = cartItems.reduce(
    (total, item) => total + item.price * item.quantity * 83.5,
    0
  );
  const totalAmountInPaisa = Math.round(totalPriceInINR * 100);

  const loadRazorpay = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items before paying.");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => alert("Razorpay SDK failed to load.");
    script.onload = () => {
      const options = {
        key: import.meta.env.VITE_rz_key,
        amount: totalAmountInPaisa,
        currency: "INR",
        name: "Ecommerce",
        description: "Order Payment",
        handler: function (response) {
          navigate("/success", {
            state: {
              paymentId: response.razorpay_payment_id,
              cartItems,
              totalPaid: totalPriceInINR.toFixed(2),
            },
          });
        },
        prefill: {
          name: user?.displayName || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    document.body.appendChild(script);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Order Summary</h1>
      {cartItems.map((item, index) => (
        <div key={index} className="flex justify-between mb-1">
          <span>{item.title}</span>
          <span>
            ₹{convertToINR(item.price)} × {item.quantity}
          </span>
        </div>
      ))}
      <hr className="my-3" />
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>₹{totalPriceInINR.toFixed(0)}</span>
      </div>
      <button
        onClick={loadRazorpay}
        className="mt-5 w-full bg-blue-600 text-white py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
