import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [visible, setVisible] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/auth/login`, formData, {
        withCredentials: true, // ✅ Ensure cookies are included
      });

      console.log("✅ Login successful:", res.data);
      console.log("Cookies:", document.cookie);

      // ✅ Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed!");
      console.error("❌ Login error:", error.response?.data?.message || error.message);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow-md sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
            Log in to your account
          </h1>

          {error && <div className="text-red-500 text-sm">{error}</div>} {/* ✅ Display error message */}

          <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Your email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Password</label>
              <input
                type={visible ? "text" : "password"} // Conditionally change the type
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-8 text-sm text-black mt-1.5 focus:outline-none"
              >
                 {visible ? "👁️": "🙈"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>

            <p className="text-sm font-light text-black">
              Don’t have an account yet?{" "}
              <a href="/signup" className="font-medium text-black hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
