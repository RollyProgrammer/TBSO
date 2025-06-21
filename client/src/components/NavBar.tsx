import { NavLink } from "react-router-dom";
import { Search, ShoppingCart } from "@mui/icons-material";

// Sample data
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

type Props = {
  toggleDarkMode: () => void;
  darkMode: boolean;
  cartItemCount?: number;
};

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

export default function NavBar({ cartItemCount = 44 }: Props) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white text-black shadow px-6 py-3">
      <div className="flex justify-between items-center gap-4 max-w-screen-xl mx-auto">
        {/* Brand */}
        <div className="text-xl font-bold whitespace-nowrap">
          <NavLink to={brandLink.path} className="text-black no-underline">
            {brandLink.title}
          </NavLink>
        </div>

        {/* Mid Links */}
        <div className="hidden md:flex gap-4 overflow-x-auto whitespace-nowrap">
          {midLinks.map((link) => (
            <NavItem key={link.path} {...link} />
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden sm:flex items-center border border-gray-300 rounded px-2 py-1 bg-gray-100">
            <Search fontSize="small" className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Search…"
              className="bg-transparent outline-none text-sm text-gray-700 w-32 sm:w-40"
            />
          </div>

          {/* Cart */}
          <div className="relative">
            <ShoppingCart className="text-gray-800" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          </div>

          {/* Right Links */}
          <div className="hidden md:flex gap-4 overflow-x-auto whitespace-nowrap">
            {rightLinks.map((link) => (
              <NavItem key={link.path} {...link} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
