import React from "react";
import { signInWithGoogle } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/UserSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();

      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      };

      dispatch(setUser(userData));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-sm text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 mb-8 text-sm">
          Login with your Google account to continue
        </p>

        <button
          onClick={handleLogin}
          className="w-full bg-white border border-gray-300 hover:border-gray-500 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center gap-3 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium">Sign in with Google</span>
        </button>

        <p className="text-xs text-gray-400 mt-6">
          By continuing, you agree to our{" "}
          <span className="underline cursor-pointer">Terms</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
