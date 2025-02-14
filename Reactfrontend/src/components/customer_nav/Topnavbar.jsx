import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Logout as LogoutIcon,
  AccountBox as AccountBoxIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle Handlers (Memoized)
  const toggleDropdown = useCallback(() => setDropdownOpen((prev) => !prev), []);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((prev) => !prev), []);

  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Menu Button */}
        <div className="flex items-center space-x-4">
          <button
            className="text-white text-2xl lg:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
          </button>
        </div>

        {/* Right Section (Desktop View) */}
        <div className="hidden lg:flex items-center space-x-6">
          <button className="text-white hover:scale-110 transition-all" aria-label="Notifications">
            <NotificationsIcon fontSize="large" />
          </button>
          <button
            className="text-white hover:scale-110 transition-all"
            onClick={() => navigate("/CustomerSettings")}
            aria-label="Settings"
          >
            <SettingsIcon fontSize="large" />
          </button>

          {/* Profile Dropdown */}
          <ProfileDropdown isOpen={dropdownOpen} toggleDropdown={toggleDropdown} navigate={navigate} />
        </div>
      </div>

      {/* Mobile Menu (Slide-in Effect) */}
      {mobileMenuOpen && <MobileMenu closeMenu={toggleMobileMenu} navigate={navigate} />}
    </nav>
  );
};

// Extracted Profile Dropdown Component
const ProfileDropdown = ({ isOpen, toggleDropdown, navigate }) => (
  <div className="relative">
    <button className="flex items-center space-x-2" onClick={toggleDropdown} aria-label="Profile menu">
      <div className="w-10 h-10 bg-yellow-400 text-white flex justify-center items-center rounded-full font-bold text-lg">
        SA
      </div>
    </button>

    {isOpen && (
      <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in" role="menu">
        <button
          className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-100 flex items-center font-medium"
          onClick={() => navigate("/CustomerProfile")}
          role="menuitem"
        >
          <AccountBoxIcon className="mr-3 text-pink-500" />
          My Profile
        </button>
        <button
          className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-100 flex items-center font-medium"
          onClick={() => navigate("/")}
          role="menuitem"
        >
          <LogoutIcon className="mr-3 text-red-500" />
          Logout
        </button>
      </div>
    )}
  </div>
);

// Extracted Mobile Menu Component
const MobileMenu = ({ closeMenu, navigate }) => (
  <div className="lg:hidden fixed top-0 left-0 w-64 h-full bg-white shadow-md p-6 space-y-4 transition-transform duration-300">
    <button
      className="absolute top-4 right-4 text-gray-600 text-2xl"
      onClick={closeMenu}
      aria-label="Close mobile menu"
    >
      <CloseIcon />
    </button>

    {[
      { path: "/CustomerSettings", icon: <SettingsIcon className="text-pink-500" />, label: "Settings" },
      { path: "/CustomerProfile", icon: <AccountBoxIcon className="text-purple-500" />, label: "My Profile" },
      { path: "/", icon: <LogoutIcon className="text-red-500" />, label: "Logout" },
    ].map((item, index) => (
      <button
        key={index}
        className="flex items-center space-x-3 w-full text-gray-700 text-lg font-medium hover:bg-gray-100 p-3 rounded-lg"
        onClick={() => {
          navigate(item.path);
          closeMenu();
        }}
      >
        {item.icon}
        <span>{item.label}</span>
      </button>
    ))}
  </div>
);

export default Navbar;
