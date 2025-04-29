import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Watchlist from "./Watchlist";
import TradingViewChart from "./TradingViewChart"; // ✅ Import TradingViewChart component

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("dashboard");
  ;

  const handleSearch = () => {
    setSelectedStock(stockSymbol);
  };

  // Verify user session on component mount
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/verifyUser`, {
          method: "GET",
          credentials: "include", // Include cookies with the request
        });

        if (!response.ok) {
          // Handle failure (redirect to login)
          throw new Error("Token verification failed");
        }

        const data = await response.json();
        setUser(data.userId); // Store userId if authenticated
      } catch (error) {
        console.error("❌ Verification failed:", error);
        navigate("/LoginIn"); // Redirect to login page if token verification fails
      }
    };

    verifyUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // Ensure cookies are cleared
      });
      navigate("/LoginIn"); // Redirect to login page after logout
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 h-full fixed md:static transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 md:w-64`}
      >
        <div className="p-4 flex justify-between items-center md:hidden">
          <h2 className="text-lg font-bold">Stocker</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="text-white w-6 h-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li
              className="hover:bg-gray-700 p-2 rounded cursor-pointer"
              onClick={() => {
                setActiveTab("dashboard");
                window.history.pushState({}, "", "/dashboard");
              }}
            >Dashboard</li>
            <li
              className="hover:bg-gray-700 p-2 rounded cursor-pointer"
              onClick={() => {
                setActiveTab("watchlist");
                window.history.pushState({}, "", "/dashboard/watchlist");
              }}
            >Watchlist</li>
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
          <h2 className="font-bold text-2xl">WELCOME👋 </h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        {/* Main Body */}
        <main className="flex-1 p-4 bg-gray-100">
          {activeTab === "dashboard" && (
            <div>
              <h1 className="text-2xl font-semibold text-center">Discover the Market's Best Stocks</h1>
              <div className="flex justify-center items-center">
                <input
                  className="border p-2 rounded-2xl mr-1"
                  type="text"
                  placeholder="Enter Stock Symbol"
                  value={stockSymbol}
                  onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                />
                <button
                  type="button"
                  className="text-white bg-black font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>

              {selectedStock && <TradingViewChart stockSymbol={selectedStock} />}
            </div>
          )}

{activeTab === "watchlist" && (
  <div>
    <Watchlist />
  </div>
)}
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
