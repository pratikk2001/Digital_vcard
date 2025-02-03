import React from "react";
import { useNavigate } from "react-router-dom";
import Sidenav from "../../components/admin_nav/SuperadminSidenav";

const AdminSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidenav />
      
      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Settings</h1>
        
        {/* Profile Settings */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Settings</h2>
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
            onClick={() => navigate("/AdminProfile")}
          >
            Edit Profile
          </button>
        </div>

        {/* System Settings */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">System Settings</h2>
          <button
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg"
            onClick={() => navigate("/")}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
