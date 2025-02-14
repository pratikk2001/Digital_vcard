import React from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../customer_nav/Topnavbar";
import Sidenav from "../customer_nav/Customersidenav";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <div className="w-full bg-blue-600 text-white shadow-md">
        <Topnav />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden lg:block w-64">
          <Sidenav />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Language Preview</h1>

          {/* Language Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* English Preview */}
            <div
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
              onClick={() => navigate("/EnglishForm")}
            >
              <h2 className="text-xl font-semibold mb-2">English</h2>
              <p className="text-gray-600">This is an example of English text preview.</p>
              <img
                src="https://via.placeholder.com/300"
                alt="English Preview"
                className="mt-4 rounded-lg"
              />
            </div>

            {/* Marathi Preview */}
            <div
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
              onClick={() => navigate("/MarathiForm")}
            >
              <h2 className="text-xl font-semibold mb-2">मराठी</h2>
              <p className="text-gray-600">हे मराठी मजकूर पूर्वावलोकनाचे उदाहरण आहे.</p>
              <img
                src="https://via.placeholder.com/300"
                alt="Marathi Preview"
                className="mt-4 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
