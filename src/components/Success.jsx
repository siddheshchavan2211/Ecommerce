import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/CartSlice";
import { convertToINR } from "../utils/currencyUtils";

const Success = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const paymentId = location.state?.paymentId || "Unavailable";
  const cartItems = location.state?.cartItems || [];
  const totalPaid = location.state?.totalPaid || 0;

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-md mx-auto bg-green-100 rounded-xl shadow-md space-y-4 text-center">
      <h1 className="text-2xl font-bold text-green-700">Payment Successful!</h1>
      <p>
        Payment ID: <strong>{paymentId}</strong>
      </p>
      <p>
        Order ID:{" "}
        <strong>{`ORDER${Math.floor(Math.random() * 1000000)}`}</strong>
      </p>
      <hr />
      <h2 className="text-lg font-semibold">Purchased Items:</h2>
      {cartItems.map((item, index) => (
        <div key={index} className="flex justify-between">
          <span>{item.title}</span>
          <span>
            ₹{convertToINR(item.price)} x {item.quantity}
          </span>
        </div>
      ))}
      <div className="mt-2 font-bold">
        Total Paid: ₹{parseFloat(totalPaid).toFixed(0)}
      </div>
      <Link to="/" className="text-blue-600 underline mt-4 block">
        Back to Home
      </Link>
    </div>
  );
};

export default Success;
