import React from 'react';
import logo from "../assets/images/logo3.svg";
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white hidden md:flex">
          <img
            src={logo}
            className="h-15 w-auto"
            alt="Logo"
          />
          Stockler
        </a>

        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm text-gray-900">Your email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com" 
                  required 
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm text-gray-900">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="••••••••" 
                  required 
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm text-gray-900">Confirm password</label>
                <input 
                  type="password" 
                  name="confirm-password" 
                  id="confirm-password" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="••••••••" 
                  required 
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input 
                    id="terms" 
                    aria-describedby="terms" 
                    type="checkbox" 
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    required 
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-black">
                    I accept the <a href="#" className="font-medium text-primary-600 hover:underline">Terms and Conditions</a>
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>

              <p className="text-sm font-light text-black">
                Already have an account? <Link to="/LoginIn" className="font-medium text-black hover:underline">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
