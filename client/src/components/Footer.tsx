import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <footer className="bg-white text-sm text-gray-700 w-full mt-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Newsletter & Links */}
        <div className="flex flex-col gap-14 sm:grid sm:grid-cols-1 md:grid-cols-[3fr_1fr_1fr] py-12">
          {/* Newsletter Signup */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold uppercase tracking-widest text-gray-900 mb-5">
              Sign up for our <br /> newsletter
            </h1>
            <p className="text-gray-600 max-w-md">
              Be the first to know about our special offers, news, and updates.
            </p>
            <form
              onSubmit={onSubmitHandler}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 my-6 w-full max-w-lg"
            >
              <input
                className="flex-1 border border-gray-300 px-4 py-3 outline-none w-full sm:w-auto"
                type="email"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="bg-black text-white text-xs px-6 py-3 hover:bg-gray-800 transition"
              >
                SIGN UP
              </button>
            </form>
          </div>

          {/* Company Info */}
          <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <NavLink to="/" className='hover:text-gray-900 transition hover:font-semibold'>Home</NavLink>
              <NavLink to="aboutpage" className='hover:text-gray-900 transition hover:font-semibold'>About Us</NavLink>
              <NavLink to="/" className='hover:text-gray-900 transition hover:font-semibold'>Delivery</NavLink>
              <NavLink to="/" className='hover:text-gray-900 transition hover:font-semibold'>Privacy Policy</NavLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li>+63 (02) 2418501 to 04</li>
              <li>+63 (02) 2413846</li>
              <li>+63 (02) 2410621</li>
              <li>
                <a
                  href="http://www.bluesky.com.ph/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition hover:font-semibold"
                >
                  www.bluesky.com.ph
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-black text-white text-center text-xs sm:text-sm py-4 mt-4">
        <p>Copyright © {year} The BlueSky Online - All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
