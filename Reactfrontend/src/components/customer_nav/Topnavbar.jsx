import React, { useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();
  

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button className="text-white text-2xl">
            <span className="material-icons">menu</span>
          </button>
          <h1 className="text-white font-bold text-lg">Dashboard</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          <button className="text-white">
            <span className="material-icons"><CircleNotificationsIcon/></span>
          </button>
          <button  className="text-white">
            <span onClick={()=>navigate("/AdminSettings")} className="material-icons"><SettingsIcon/></span>
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
              <span className="text-white">USER</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2">
                <a
                  href="#profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                
                  onClick={() => navigate("/AdminProfile")}
                >
                  <span className="material-icons text-sm mr-2"><AccountBoxIcon/></span>
                  Profile
                </a>
                <a
                  href="#logout"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => navigate("/signup")}
                >
                  <span className="material-icons text-sm mr-2"><LogoutIcon></LogoutIcon></span>
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
