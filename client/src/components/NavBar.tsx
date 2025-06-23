import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Close, Search, ShoppingCart } from "@mui/icons-material";

// Navigation Links
const brandLink = { title: "The Bluesky Online", path: "/" };

const midLinks = [
  { title: "New", path: "/new" },
  { title: "Best Sellers", path: "/bestseller" },
  { title: "Collection", path: "/collection" },
  { title: "About Us", path: "/aboutpage" },
];

const rightLinks = [
  { title: "Login", path: "/login" },
  { title: "Sign Up", path: "/signup" },
];

// Reusable Nav Item Component
function NavItem({ title, path }: { title: string; path: string }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `text-sm font-medium px-2 ${
          isActive ? "font-bold text-black" : "text-gray-700"
        }`
      }
    >
      {title.toUpperCase()}
    </NavLink>
  );
}

export default function NavBar({ cartItemCount = 5 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-[92px] sm:top-8 left-0 right-0 z-40 bg-white shadow py-3">
      <div className="max-w-[1800px] mx-auto flex justify-between items-center px-2 sm:px-20 md:px-40">
        {/* Brand */}
        <div className="text-xl font-bold whitespace-nowrap mr-0 sm:mr-[215px] md:mr-0">
          <NavLink to={brandLink.path} className="text-black no-underline">
            {brandLink.title}
          </NavLink>
        </div>

        {/* Middle Links (Desktop Only) */}
        <div className="hidden md:flex gap-4">
          {midLinks.map((link) => (
            <NavItem key={link.path} {...link} />
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar (Visible only on small screens but hidden on tablets) */}
          <div className="hidden sm:flex md:hidden items-center border border-gray-300 rounded px-2 py-1 bg-gray-100">
            <Search fontSize="small" className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Search…"
              className="bg-transparent outline-none text-sm text-gray-700 w-32 sm:w-40"
            />
          </div>

          {/* Cart Icon */}
          <Link to="/cart">
            <div className="relative cursor-pointer">
              <ShoppingCart className="text-gray-800" />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            </div>
          </Link>

          {/* Right Links (Desktop Only) */}
          <div className="hidden md:flex gap-4">
            {rightLinks.map((link) => (
              <NavItem key={link.path} {...link} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 border-t border-gray-300 pt-3 px-4 space-y-3 bg-white">
          {[...midLinks, ...rightLinks].map((link) => (
            <div key={link.path}>
              <NavItem {...link} />
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
