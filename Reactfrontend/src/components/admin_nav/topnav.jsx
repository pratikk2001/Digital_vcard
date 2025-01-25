import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu for Mobile */}
          <button
            className="text-white text-2xl lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-icons">menu</span>
          </button>
          <h1 className="text-white font-bold text-lg">Dashboard</h1>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center space-x-6">
          <button className="text-white">
            <CircleNotificationsIcon fontSize="large" />
          </button>
          <button
            className="text-white"
            onClick={() => navigate("/AdminSettings")}
          >
            <SettingsIcon fontSize="large" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-2"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-8 h-8 bg-yellow-400 text-white flex justify-center items-center rounded-full">
                SA
              </div>
              <span className="text-white hidden sm:inline">Admin</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2 z-50">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={() => navigate("/AdminProfile")}
                >
                  <AccountBoxIcon className="mr-2" />
                  Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={() => navigate("/signup")}
                >
                  <LogoutIcon className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-blue-500 text-white p-4 space-y-4">
          <button
            className="flex items-center space-x-2 w-full"
            onClick={() => navigate("/AdminSettings")}
          >
            <SettingsIcon />
            <span>Settings</span>
          </button>
          <button
            className="flex items-center space-x-2 w-full"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <AccountBoxIcon />
            <span>Profile</span>
          </button>
          <button
            className="flex items-center space-x-2 w-full"
            onClick={() => navigate("/signup")}
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
