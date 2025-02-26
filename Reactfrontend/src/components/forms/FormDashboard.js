import React from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../customer_nav/Topnavbar";
import Sidenav from "../customer_nav/Customersidenav";

const DashboardPage = () => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = (path) => () => navigate(path);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navigation */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <Topnav />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 bg-white shadow-md overflow-y-auto">
          <Sidenav />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 tracking-tight">
            Language Preview
          </h1>

          {/* Language Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* English Preview */}
            <div
              className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 cursor-pointer border border-gray-200"
              onClick={handleNavigation("/EnglishForm")}
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-3 text-blue-700 text-center">
                English Form
              </h2>
              <div className="w-full h-48 md:h-56 overflow-hidden rounded-lg mb-4">
                <img
                  src="English.jpg"
                  alt="English Preview"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
              Fill the Information 
              </button>
            </div>

            {/* Marathi Preview */}
            <div
              className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 cursor-pointer border border-gray-200"
              onClick={handleNavigation("/MarathiForm")}
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-3 text-blue-700 text-center">
              मराठी फॉर्म
              </h2>
              <div className="w-full h-48 md:h-56 overflow-hidden rounded-lg mb-4">
                <img
                  src="Marathi.jpg"
                  alt="Marathi Preview"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                माहिती भरा
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;