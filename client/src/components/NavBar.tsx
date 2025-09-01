import { Link, NavLink } from "react-router-dom";
import { brandLink, midLinks, rightLinks } from "../constants/navLinks";
import { useFetchBasketQuery } from "../features/basket/basketApi";
import UserMenu from "../layout/UserMenu";
import { useLogoutMutation, useUserInfoQuery } from "../features/account/accountApi";
import { AccountCircle, Close, Menu, ShoppingCart } from "@mui/icons-material";
import { useState } from "react";

function NavItem({ title, path }: { title: string; path: string }) {
  return (
    <NavLink to={path} className={({ isActive }) => `text-sm font-medium px-2 ${isActive ? "font-extrabold text-black" : "text-gray-500"}`}>
      {title.toUpperCase()}
    </NavLink>
  );
}

export default function NavBar() {
  const { data: user, isLoading } = useUserInfoQuery(undefined, { refetchOnMountOrArgChange: true });
  const { data: basket } = useFetchBasketQuery();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logout] = useLogoutMutation();

  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="fixed top-[92px] sm:top-9 left-0 right-0 z-40 bg-white shadow py-3">
      <div className="max-w-[1800px] mx-auto flex flex-wrap justify-between items-center px-4 sm:px-6 md:px-20 lg:px-40 gap-2">
        {/* Brand */}
        <div className="text-xl font-bold whitespace-nowrap">
          <NavLink to={brandLink.path} className="text-black no-underline">
            {brandLink.title}
          </NavLink>
        </div>

        {/* Desktop mid links */}
        <div className="hidden md:flex gap-4 flex-wrap justify-center flex-1">
          {midLinks.map((link) => (
            <NavItem key={link.path} {...link} />
          ))}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Cart - desktop */}
          <div className="hidden md:block relative">
            <Link to="/cart">
              <ShoppingCart className="text-gray-800" />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">{itemCount}</span>
            </Link>
          </div>

          {isLoading ? (
            <div className="hidden md:flex items-center gap-2">
              <AccountCircle sx={{ fontSize: 28 }} />
            </div>
          ) : user ? (
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

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-gray-800" />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">{itemCount}</span>
            </Link>
            <button className="text-gray-800 focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <Close /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="w-full md:hidden px-4 py-4 bg-white shadow rounded-b space-y-4">
            {/* Middle links */}
            <div className="flex flex-col gap-2">
              {midLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `text-sm font-medium ${isActive ? "font-extrabold text-black" : "text-gray-500"}`}
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
                  <Link to="/inventory" className="text-gray-600 hover:text-black" onClick={() => setMobileMenuOpen(false)}>
                    Inventory
                  </Link>
                  <Link to="/orders" className="text-gray-600 hover:text-black" onClick={() => setMobileMenuOpen(false)}>
                    Orders
                  </Link>
                  <p
                    onClick={async () => {
                      try {
                        await logout({}).unwrap();
                        setMobileMenuOpen(false);
                      } catch (error) {
                        console.error("Logout failed:", error);
                      }
                    }}
                    className="text-red-500 cursor-pointer"
                  >
                    Logout
                  </p>
                </>
              ) : (
                rightLinks.map((link) => (
                  <NavLink key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)} className="text-gray-500 hover:text-black">
                    {link.title}
                  </NavLink>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
