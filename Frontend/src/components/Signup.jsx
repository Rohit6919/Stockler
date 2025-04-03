import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/logo3.svg";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [visible, setVisible] = useState(false); // ✅ State for password visibility
  const togglePasswordVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/signup`,
        formData,
        { withCredentials: true } // ✅ Added to support cookies
      );

      console.log("Signup successful:", response.data);
      alert("Signup successful! You can now log in.");

      navigate("/LoginIn"); // ✅ Redirect to login page after successful signup
    } catch (error) {
      console.error("Signup failed:", error);
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white md:flex">
          <img src={logo} className="h-15 w-auto" alt="Logo" />
          Stockler
        </a>

        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Create an account</h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm text-gray-900">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Username"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-900">Your email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Yourname@gmail.com"
                  required
                />
              </div>

              <div className="relative"> {/* Added relative positioning */}
                <label htmlFor="password" className="block mb-2 text-sm text-gray-900">Password</label>
                <input
                  type={visible ? "text" : "password"} // Dynamically change the input type
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-black mt-1.5 focus:outline-none"
                >
                  {visible ? "👁️" : "🙈"} {/* Using emojis for password visibility toggle */}
                </button>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>

              {error && <p className="text-red-500 text-sm">{error}</p>} {/* ✅ Display error message */}

              <p className="text-sm font-light text-black">
                Already have an account?{" "}
                <Link to="/LoginIn" className="font-medium text-black hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
