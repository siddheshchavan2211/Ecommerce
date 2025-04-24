// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_Key,
  authDomain: "ecommerce-fc1b3.firebaseapp.com",
  projectId: "ecommerce-fc1b3",
  storageBucket: "ecommerce-fc1b3.firebasestorage.app",
  messagingSenderId: "635675627102",
  appId: "1:635675627102:web:3e2dc1d05de81eb97aeecf",
  measurementId: "G-2VDVRHNLCM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
