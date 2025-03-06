import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);  // State for profile image
  const [profile, setProfile] = useState(null); // Profile state
  const navigate = useNavigate();

  useEffect(() => {
    // Example of setting profile (you can replace this with your logic)
    setProfile({ username: "John Doe", initials: "JD" }); // Set your profile data here
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));  // Set the selected image URL
    }
  };

  // Handle error if profile is not found
  if (!profile) {
    return (
      <nav className="bg-blue-500 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white font-bold text-xl tracking-wide">My App</h1>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            className="text-white text-2xl lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
          </button>
          <h1 className="text-white font-bold text-xl tracking-wide">My App</h1>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
        
          <button
            className="text-white hover:scale-110 transition-all"
            onClick={() => navigate("/AdminSettings")}
            aria-label="Settings"
          >
            <SettingsIcon fontSize="large" />
          </button>

          <div className="relative">
            <button
              className="flex items-center space-x-2"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="Profile Dropdown"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-yellow-400 text-white flex justify-center items-center rounded-full font-bold text-lg">
                  {profile?.initials || "SA"}
                </div>
              )}
              <span className="text-white hidden sm:inline font-medium">{profile?.username}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in">
                <button
                  className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-blue-400 flex items-center font-medium"
                  onClick={() => navigate("/AdminProfile", { state: { profileImage } })}
                >
                  <AccountBoxIcon className="mr-3 text-pink-500" />
                  My Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-blue-400 flex items-center font-medium"
                  onClick={() => navigate("/")}
                  aria-label="Logout"
                >
                  <LogoutIcon className="mr-3 text-red-500" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-64 h-full bg-white shadow-md p-6 space-y-4 transform transition-transform duration-300">
          <button
            className="absolute top-4 right-4 text-gray-600 text-2xl"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Mobile Menu"
          >
            <CloseIcon />
          </button>
          <button
            className="flex items-center space-x-3 w-full text-gray-700 text-lg font-medium hover:bg-gray-100 p-3 rounded-lg"
            onClick={() => navigate("/AdminSettings")}
            aria-label="Go to Settings"
          >
            <SettingsIcon className="text-pink-500" />
            <span>Settings</span>
          </button>
          <button
            className="flex items-center space-x-3 w-full text-gray-700 text-lg font-medium hover:bg-gray-100 p-3 rounded-lg"
            onClick={() => navigate("/AdminProfile", { state: { profileImage } })}
          >
            <AccountBoxIcon className="text-purple-500" />
            <span>My Profile</span>
          </button>
          <button
            className="flex items-center space-x-3 w-full text-gray-700 text-lg font-medium hover:bg-gray-100 p-3 rounded-lg"
            onClick={() => navigate("/")}
            aria-label="Logout"
          >
            <LogoutIcon className="text-red-500" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;