import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Logout as LogoutIcon,
  AccountBox as AccountBoxIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from localStorage and listen for changes
  useEffect(() => {
    const updateUserData = () => {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        // Handle both camelCase (firstName) and snake_case (first_name)
        setUserData({
          firstName: parsedData.firstName || parsedData.first_name || "Unknown",
          lastName: parsedData.lastName || parsedData.last_name || "User",
          email: parsedData.email,
          role: parsedData.role,
        });
        console.log("User data updated in Navbar:", parsedData); // Debug log
      } else {
        setUserData(null);
        console.log("No user data found in localStorage."); // Debug log
      }
    };

    // Initial fetch
    updateUserData();

    // Listen for changes to localStorage (across tabs) and custom event (same tab)
    const handleStorageChange = () => {
      updateUserData();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("storageUpdated", handleStorageChange);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("storageUpdated", handleStorageChange);
    };
  }, []);

  // Check if user is logged in; redirect to login if not
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");
    if (!userId || !authToken) {
      console.warn("User not logged in. Redirecting to login page.");
      navigate("/CustomerLogin");
    }
  }, [navigate]);

  // Toggle Handlers (Memoized)
  const toggleDropdown = useCallback(() => setDropdownOpen((prev) => !prev), []);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((prev) => !prev), []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userData");
    setUserData(null);
    navigate("/"); // Redirect to login page
  };

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
          <button
            className="text-white hover:scale-110 transition-all"
            onClick={() => navigate("/CustomerSettings")}
            aria-label="Settings"
          >
            <SettingsIcon fontSize="large" />
          </button>

          {/* User Details and Profile Dropdown */}
          <div className="flex items-center space-x-3">
            {userData && (
              <div className="text-white font-medium">
                Welcome, {userData.firstName} {userData.lastName}
              </div>
            )}
            <ProfileDropdown
              isOpen={dropdownOpen}
              toggleDropdown={toggleDropdown}
              navigate={navigate}
              userData={userData}
              handleLogout={handleLogout}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu (Slide-in Effect) */}
      {mobileMenuOpen && (
        <MobileMenu
          closeMenu={toggleMobileMenu}
          navigate={navigate}
          userData={userData}
          handleLogout={handleLogout}
        />
      )}
    </nav>
  );
};

// Profile Dropdown Component
const ProfileDropdown = ({ isOpen, toggleDropdown, navigate, userData, handleLogout }) => {
  const initials = userData
    ? `${userData.firstName?.[0] || "U"}${userData.lastName?.[0] || "N"}`
    : "UN"; // Fallback to "UN" (Unknown) if no user data

  return (
    <div className="relative">
      <button className="flex items-center space-x-2" onClick={toggleDropdown} aria-label="Profile menu">
        <div className="w-10 h-10 bg-yellow-400 text-white flex justify-center items-center rounded-full font-bold text-lg">
          {initials}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in" role="menu">
          <button
            className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-blue-500 hover:text-white flex items-center font-medium"
            onClick={() => navigate("/CustomerProfile")}
            role="menuitem"
          >
            <AccountBoxIcon className="mr-3 text-pink-500" />
            My Profile
          </button>
          <button
            className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-blue-500 hover:text-white flex items-center font-medium"
            onClick={handleLogout}
            role="menuitem"
          >
            <LogoutIcon className="mr-3 text-red-500" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

// Mobile Menu Component with Active Route Highlighting
const MobileMenu = ({ closeMenu, navigate, userData, handleLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/CustomerSettings", icon: <SettingsIcon className="text-pink-500" />, label: "Settings" },
    { path: "/CustomerProfile", icon: <AccountBoxIcon className="text-purple-500" />, label: "My Profile" },
    { path: "/", icon: <LogoutIcon className="text-red-500" />, label: "Logout", onClick: handleLogout },
  ];

  return (
    <div className="lg:hidden fixed top-0 left-0 w-64 h-full bg-white shadow-md p-6 space-y-4 transition-transform duration-300">
      <button
        className="absolute top-4 right-4 text-gray-600 text-2xl"
        onClick={closeMenu}
        aria-label="Close mobile menu"
      >
        <CloseIcon />
      </button>

      {/* Display User Details in Mobile Menu */}
      {userData ? (
        <div className="mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-400 text-white flex justify-center items-center rounded-full font-bold text-xl">
              {userData.firstName?.[0]}{userData.lastName?.[0]}
            </div>
            <div>
              <p className="text-gray-800 font-semibold">
                {userData.firstName} {userData.lastName}
              </p>
              <p className="text-gray-600 text-sm">{userData.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <p className="text-gray-600 text-sm">Not logged in</p>
        </div>
      )}

      {menuItems.map((item, index) => (
        <button
          key={index}
          className={`flex items-center space-x-3 w-full text-lg font-medium p-3 rounded-lg transition-all ${
            location.pathname === item.path ? "bg-blue-700 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => {
            if (item.onClick) {
              item.onClick();
            } else {
              navigate(item.path);
            }
            closeMenu();
          }}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Navbar;