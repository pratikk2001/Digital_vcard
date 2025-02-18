import React from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../customer_nav/Topnavbar";
import Sidenav from "../customer_nav/Customersidenav";

const DashboardPage = () => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = (path) => () => navigate(path);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <div className="w-full bg-blue-600 text-white shadow-md">
        <Topnav />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 bg-gray-100 overflow-y-auto">
          <Sidenav />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Language Preview</h1>

          {/* Language Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* English Preview */}
            <div 
              className="bg-white p-6 rounded-xl shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl"
              onClick={handleNavigation("/EnglishForm")}
            >
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-center">English</h2>
              <p className="text-gray-700 mb-4 text-center">This is an example of English text preview.</p>
              <img 
                src="https://via.placeholder.com/300x200?text=English+Flag"
                alt="English Preview"
                className="w-full rounded-lg mb-4"
              />
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none">Explore</button>
            </div>

            {/* Marathi Preview */}
            <div 
              className="bg-white p-6 rounded-xl shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl"
              onClick={handleNavigation("/MarathiForm")}
            >
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-center">मराठी</h2>
              <p className="text-gray-700 mb-4 text-center">हे मराठी मजकूर पूर्वावलोकनाचे उदाहरण आहे.</p>
              <img 
                src="https://via.placeholder.com/300x200?text=Marathi+Flag"
                alt="Marathi Preview"
                className="w-full rounded-lg mb-4"
              />
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none">पाहा</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;