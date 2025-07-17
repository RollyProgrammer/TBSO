import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { User } from "../app/models/user";
import { useLogoutMutation } from "../features/account/accountApi";

interface Props {
  user: User;
}

export default function UserMenu({ user }: Props) {
  const [logout] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="hidden md:block relative group">
      <button
        id="fade-menu"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="text-gray-800 !w-7 !h-7 cursor-pointer"
      >
        <AccountCircle className="text-gray-800 !w-7 !h-7 cursor-pointer" />
      </button>
      {/* Hover dropdown */}
      <div className="group-hover:block hidden absolute right-0 pt-4 z-50 transition-all duration-150">
        <div className="flex flex-col gap-2 w-auto py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
          <Link
            to="/profile"
            onClick={handleClose}
            className="hover:text-black"
          >
            <span className="font-medium">{user.email}</span>
          </Link>
          <Link to="/orders" onClick={handleClose} className="hover:text-black">
            Orders
          </Link>
          <p
            onClick={logout}
            className="cursor-pointer  text-red-500 hover:font-semibold"
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
}
