import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  Close,
  Search,
  ShoppingCart,
  AccountCircle,
} from "@mui/icons-material";
import { brandLink, midLinks, rightLinks } from "../constants/navLinks";

const isLoggedIn = false;

// Logout handler
const handleLogout = () => {
  // Implement logout logic here
};

// Reusable nav item component
function NavItem({ title, path }: { title: string; path: string }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `text-sm font-medium px-2 ${
          isActive ? "font-extrabold text-black" : "text-gray-500"
        }`
      }
    >
      {title.toUpperCase()}
    </NavLink>
  );
}

export default function NavBar({ cartItemCount = 5 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Toggle mobile menu

  return (
    <nav className="fixed top-[92px] sm:top-9 left-0 right-0 z-40 bg-white shadow py-3">
      {/* Container */}
      <div className="max-w-[1800px] mx-auto flex justify-between items-center px-2 sm:px-20 md:px-40">
        {/* Brand link */}
        <div className="text-xl font-bold whitespace-nowrap mr-0 sm:mr-[215px] md:mr-0">
          <NavLink to={brandLink.path} className="text-black no-underline">
            {brandLink.title}
          </NavLink>
        </div>

        {/* Desktop mid links */}
        <div
          className={`hidden md:flex gap-4 ${isLoggedIn ? "mr-[7.25rem]" : ""}`}
        >
          {midLinks.map((link) => (
            <NavItem key={link.path} {...link} />
          ))}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Search bar (small screens only) */}
          <div className="hidden sm:flex items-center border border-gray-300 rounded px-2 py-1 bg-gray-100">
            <Search fontSize="small" className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Search…"
              className="bg-transparent outline-none text-sm text-gray-700 w-32 sm:w-40"
            />
          </div>

          {/* Cart icon with badge */}
          <Link to="/cart" className="relative cursor-pointer">
            <ShoppingCart className="text-gray-800" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          </Link>

          {/* Right links or account menu (desktop only) */}
          <div className="hidden md:flex gap-4 items-center relative">
            {!isLoggedIn ? (
              rightLinks.map((link) => <NavItem key={link.path} {...link} />)
            ) : (
              <div className="relative group">
                <AccountCircle className="text-gray-800 !w-7 !h-7 cursor-pointer" />
                {/* Hover dropdown */}
                <div className="group-hover:block hidden absolute right-0 pt-4 z-50 transition-all duration-150">
                  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
                    <Link to="/profile" className="hover:text-black">
                      My Profile
                    </Link>
                    <Link to="/orders" className="hover:text-black">
                      Orders
                    </Link>
                    <p
                      onClick={handleLogout}
                      className="cursor-pointer hover:text-black"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu toggle button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
      {/* Mobile nav menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 border-t border-gray-300 pt-3 px-4 space-y-3 bg-white">
          {/* Mid links */}
          {midLinks.map((link) => (
            <div key={link.path}>
              <NavItem {...link} />
            </div>
          ))}

          {/* Conditional right section for mobile */}
          {isLoggedIn ? (
            <div>
              <p
                onClick={handleLogout}
                className="text-sm font-medium px-2 text-gray-500 hover:text-black cursor-pointer"
              >
                LOGOUT
              </p>
            </div>
          ) : (
            rightLinks.map((link) => (
              <div key={link.path}>
                <NavItem {...link} />
              </div>
            ))
          )}
        </div>
      )}
    </nav>
  );
}
