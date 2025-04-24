import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import Products from "./components/Products";
import Login from "./components/Login";
import { Provider, useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { removeUser, setUser } from "./utils/UserSlice";
import { app } from "../src/utils/firebase";
import Details from "./components/Details";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Payment from "./components/Payment";
import Success from "./components/Success";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        dispatch(setUser(userData));
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/success"
          element={
            <PrivateRoute>
              <Success />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
