import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="p-6 text-center text-lg text-gray-600">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">👤 Your Profile</h1>
      <p className="text-lg mb-2">
        <strong>Name:</strong> {user.displayName || "Not provided"}
      </p>
      <p className="text-lg mb-2">
        <strong>Email:</strong> {user.email}
      </p>
      {user.photoURL && (
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-24 h-24 mt-4 rounded-full object-cover"
        />
      )}
    </div>
  );
};

export default Profile;
