// Importing the user icon from Material UI
import { AccountCircle } from "@mui/icons-material";

// React Router's Link component for navigation
import { Link } from "react-router-dom";

// React hook for managing local component state
import { useState } from "react";

// Type definition for the user object
import type { User } from "../app/models/user";

// RTK Query mutation hook for logging out
import { useLogoutMutation } from "../features/account/accountApi";

// Props expected by the UserMenu component
interface Props {
  user: User; // The currently logged-in user
}

export default function UserMenu({ user }: Props) {
  // Hook to trigger logout API call
  const [logout] = useLogoutMutation();

  // State to manage the anchor element for the dropdown menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Boolean to determine if the dropdown is open
  const open = Boolean(anchorEl);

  // When the user clicks the icon, set the anchor element
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the dropdown by clearing the anchor element
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // Container for the menu, hidden on small screens
    <div className="hidden md:block relative group">
      {/* Icon button that triggers the dropdown */}
      <button
        id="fade-menu"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="text-gray-800 !w-7 !h-7 cursor-pointer"
      >
        {/* User icon */}
        <AccountCircle className="text-gray-800 !w-7 !h-7 cursor-pointer" />
      </button>

      {/* Dropdown menu shown on hover */}
      <div className="group-hover:block hidden absolute right-0 pt-4 z-50 transition-all duration-150">
        <div className="flex flex-col gap-2 w-auto py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
          {/* Link to profile page, shows user's email */}
          <Link to="/profile" onClick={handleClose} className="hover:text-black">
            <span className="font-medium">{user.email}</span>
          </Link>

          {/* Link to orders page */}
          <Link to="/orders" onClick={handleClose} className="hover:text-black">
            Orders
          </Link>

          {/* Conditionally show Inventory link if user is an Admin */}
          {user.role.includes("Admin") && (
            <Link to="/inventory" onClick={handleClose} className="hover:text-black">
              Inventory
            </Link>
          )}

          {/* Logout option */}
          <p onClick={logout} className="cursor-pointer text-red-500 hover:font-semibold">
            Logout
          </p>
        </div>
      </div>
    </div>
  );
}
