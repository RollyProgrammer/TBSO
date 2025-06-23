import React from "react";

const Banner: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-y-2 gap-x-4 px-4 py-2 max-w-screen-xl mx-auto text-sm">
        {/* Left Section */}
        <div className="w-full sm:w-1/3 text-center sm:text-left">
          <p className="truncate">PHP</p>
        </div>

        {/* Center Section */}
        <div className="w-full sm:w-1/3 text-center">
          <p className="truncate">Sign up and get 15% off on first purchase</p>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-1/3 text-center sm:text-right">
          <p className="truncate">Support</p>
        </div>
      </div>
    </nav>
  );
};

export default Banner;
