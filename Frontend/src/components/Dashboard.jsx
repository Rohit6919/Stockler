import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/verifyUser", {
          method: "GET",
          credentials: "include", 
        });
  
        if (!response.ok) {
          throw new Error("Token verification failed");
        }
  
        const data = await response.json();
        console.log("✅ Token verification successful:", data);
        setUser(data.userId); // ✅ Store userId in state
      } catch (error) {
        console.error("❌ Verification failed:", error);
        navigate("/LoginIn"); // ✅ Redirect if token is invalid
      }
    };
  
    verifyUser();
  }, [navigate]);
  

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // ✅ Ensures cookies are cleared
      });

      navigate("/LoginIn"); // ✅ Redirect to login page after logout
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4 flex justify-between items-center w-full">
        <h1 className="text-xl font-bold">Dashboard</h1>
        {user && <p>Welcome, {user.name}!</p>}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </header>
    </div>
  );
}

export default Dashboard;
