import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 h-full fixed md:static transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 md:w-64`}
      >
        <div className="p-4 flex justify-between items-center md:hidden">
          <h2 className="text-lg font-bold">Stocker</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="text-white w-6 h-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Dashboard</li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Portfolio</li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Watchlist</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center w-full">
          <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Dashboard</h1>
          {user && <p>Welcome, {user.name}!</p>}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        {/* Main Section */}
        <main className="flex-1 p-4 bg-gray-100">
          <h2 className="text-xl font-bold">Welcome to Stocker</h2>
          <p>Track your investments easily.</p>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          © 2025 Stocker. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
