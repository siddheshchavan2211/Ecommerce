import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../utils/firebase";
import { removeUser } from "../utils/UserSlice";
import { clearCart } from "../utils/CartSlice";

function ResponsiveAppBar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const CurrentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSignOut = async () => {
    try {
      localStorage.removeItem("cartItems");
      dispatch(clearCart());

      await signOut(getAuth(app));
      dispatch(removeUser());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white shadow-md mb-2">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/">
              <span className="text-2xl font-bold">Ecommerce</span>
            </Link>

            <div className="flex space-x-4">
              <Link
                to="/products"
                className="text-black font-medium hover:underline"
              >
                Products
              </Link>
              <Link
                to="/cart"
                className="text-black font-medium hover:underline relative px-4"
              >
                Cart
                {totalItems > 0 && (
                  <span className="absolute top-1 right-0 left-14 inline-block bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 text-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {CurrentUser ? (
            <div className="flex items-center space-x-4 relative">
              {/* Avatar */}
              <img
                src={CurrentUser.photoURL}
                alt="User"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              />
              {userMenuOpen && (
                <div className="absolute right-0 mt-42 w-40 bg-white shadow-lg rounded-md overflow-hidden z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <div
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setUserMenuOpen(false);
                      handleSignOut();
                    }}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : location.pathname !== "/login" ? (
            <Link to="/login">
              <Button color="inherit" variant="contained">
                Login
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default ResponsiveAppBar;
