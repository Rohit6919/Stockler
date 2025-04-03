import { StrictMode, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // ✅ Ensure Tailwind styles are imported
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout.jsx";
import Home from "./components/Home.jsx";
import Signup from "./components/Signup";
import LoginIn from "./components/LoginIn";
import Dashboard from "./components/Dashboard";

// ✅ Use environment variable or fallback to localhost
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Prevent flashing effect

  useEffect(() => {
    axios.get(`${API_URL}/auth/verifyUser`, { withCredentials: true })
      .then((res) => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false); // ✅ Stop loading after check
      });
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="LoginIn" element={<LoginIn />} />
        
        {/* ✅ Prevent flashing effect by waiting for authentication check */}
        <Route 
          path="/dashboard" 
          element={loading ? <div>Loading...</div> : (isAuthenticated ? <Dashboard /> : <Navigate to="/LoginIn" />)} 
        />
      </Route>
    )
  );

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
