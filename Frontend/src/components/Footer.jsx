import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/images/logo3.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-200 border-t border-b">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img
                src={Logo}
                className="h-15 w-auto"
                alt="Logo"
              />
              <span className="self-center text-3xl font-bold whitespace-nowrap text-black">Stockler</span>
            </Link>
          </div>

          {/* Resources Section */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {/* Resources List */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-black uppercase">Resources</h2>
              <ul className="text-gray-500 font-medium space-y-4">
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:underline">
                    SignUp
                  </Link>
                </li>
                <li>
                  <Link to="/LoginIn" className="hover:underline">
                    LogIn
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Me Section */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-black uppercase">Follow Me</h2>
              <ul className="text-gray-500 font-medium space-y-4">
                <li>
                  <a
                    href="https://github.com/Rohit6919"
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-black sm:mx-auto lg:my-8" />

        {/* Footer Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2025
            <a
              href="https://rohit-portfolio-ivory.vercel.app/"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rohitpatel
            </a>
            . All Rights Reserved.
          </span>

          {/* Social Media Links */}
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            {/* Earth Icon Link */}
            <Link to="https://rohit-portfolio-ivory.vercel.app/" className="text-gray-500" target="_blank" rel="noopener noreferrer">
              <svg
                className="w-8 h-8" // Matching the size with the GitHub icon
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.3c5.3 0 9.6 4.3 9.6 9.6S17.3 21.5 12 21.5 2.4 17.2 2.4 12 6.7 2.3 12 2.3zm0 1.4C7.4 3.7 3.7 7.4 3.7 12s3.7 8.3 8.3 8.3c4.6 0 8.3-3.7 8.3-8.3s-3.7-8.3-8.3-8.3zm1.7 4.4c.5-.1 1-.1 1.5-.1 2.1 0 3.8.7 5.1 1.9-.5-.8-.9-1.6-1.5-2.2-.6-.6-1.2-1.1-1.9-1.6C15.3 7.7 13.7 8 12 8c-1.7 0-3.3-.3-4.7-.9-.7.5-1.4 1.1-2 1.6-.6.6-1 1.4-1.5 2.2 1.3-1.2 3-1.9 5.1-1.9zm1.5 2.9c.5 0 .9.1 1.3.3.4-.3.8-.7 1.1-1.2-.3-.4-.7-.8-1.1-1.1-.4-.3-.8-.5-1.3-.7-.5-.1-.9-.3-1.3-.3-1.4 0-2.8.4-4 1.2.5.7.9 1.5 1.5 2.1.5-.4 1-.6 1.5-.9zM9.7 10c-.2.3-.4.6-.7.9-.2.3-.4.5-.7.7-.4.4-.8.8-1.2 1.2-.5.4-1.1.8-1.6 1.2.1.6.4 1.1.7 1.7 1-.6 2.1-1.2 3.3-1.6-.4-.8-.6-1.7-.7-2.6zM7 13.2c.4-.3.9-.7 1.4-1.1 1-.7 2.1-1.4 3.2-2 .4-.3.8-.7 1.2-1.1.4.4.7.8 1.1 1.3.6.7 1.1 1.3 1.6 2.1.6-.8 1-1.7 1.5-2.5-.3-.6-.7-1.2-1.1-1.8.4-.5.7-1.1 1.1-1.6-.2-.4-.6-.8-1-1.2-1.2 1.3-2.6 2.6-4 3.8z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Visit Our Website</span>
            </Link>

            {/* GitHub Icon Link */}
            <Link to="https://github.com/Rohit6919" className="text-gray-500" target="_blank" rel="noopener noreferrer">
              <svg
                className="w-8 h-8" // Matching the size with the Earth icon
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub Account</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
