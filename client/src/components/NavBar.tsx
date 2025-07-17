import { Link, NavLink } from "react-router-dom";
import { brandLink, midLinks, rightLinks } from "../constants/navLinks";
import { useFetchBasketQuery } from "../features/basket/basketApi";
import UserMenu from "../layout/UserMenu";
import {
  useLogoutMutation,
  useUserInfoQuery,
} from "../features/account/accountApi";
import { Close, Menu, Search, ShoppingCart } from "@mui/icons-material";
import { useState } from "react";

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

export default function NavBar() {
  const { data: user } = useUserInfoQuery();
  const { data: basket } = useFetchBasketQuery();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logout] = useLogoutMutation();

  const itemCount =
    basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

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
        <div className={`hidden md:flex gap-4 ${user ? "ml-20" : "ml-20"}`}>
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

          {/* Cart icon - desktop only */}
          <div className="hidden md:block">
            <Link to="/cart" className="relative cursor-pointer">
              <ShoppingCart className="text-gray-800" />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            </Link>
          </div>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <UserMenu user={user} />
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              {rightLinks.map((link) => (
                <NavItem key={link.path} {...link} />
              ))}
            </div>
          )}
        </div>

        {/* Cart + Menu button - mobile only */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Cart icon - mobile only */}
          <Link to="/cart" className="relative cursor-pointer">
            <ShoppingCart className="text-gray-800" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          </Link>

          <button
            className="text-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-4 bg-white shadow rounded-b space-y-4">
          {/* Middle links */}
          <div className="flex flex-col gap-2">
            {midLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive ? "font-extrabold text-black" : "text-gray-500"
                  }`
                }
              >
                {link.title.toUpperCase()}
              </NavLink>
            ))}
          </div>

          {/* Auth section */}
          <div className="flex flex-col gap-2 border-t pt-4">
            {user ? (
              <>
                <span className="font-medium text-gray-600">{user.email}</span>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="text-gray-600 hover:text-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Orders
                </Link>
                <p
                  onClick={async () => {
                    try {
                      await logout({}).unwrap(); // waits for the API call to finish and throws if there's an error
                      setMobileMenuOpen(false);
                      // optionally redirect or clear local state
                    } catch (error) {
                      console.error("Logout failed:", error);
                      // Optionally show user feedback
                    }
                  }}
                  className="text-red-500 cursor-pointer"
                >
                  Logout
                </p>
              </>
            ) : (
              rightLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-black"
                >
                  {link.title}
                </NavLink>
              ))
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
