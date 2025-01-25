import React, { useState } from 'react';
import Sidenav from "../../components/admin_nav/SuperadminSidenav";
import TopNavbar from "../../components/admin_nav/topnav";

const Settings = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className=" bg-blue-50">
      {/* Top Navbar */}
      <TopNavbar />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidenav */}
        <div className="lg:block hidden">
          <Sidenav />
        </div>

        {/* Profile Section */}
        <div className="flex-1 max-w-4xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-xl w-full">
          {/* Header */}
          <div className="flex items-center flex-wrap space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 mb-4 sm:mb-6 lg:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full text-white text-xl sm:text-2xl flex items-center justify-center">
              SA
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-800">Profile</h1>
              <p className="text-sm sm:text-base text-blue-600">Dashboard / Profile</p>
            </div>
            <div className="ml-auto">
              <span className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-green-500 text-white rounded-full">
                Active
              </span>
            </div>
          </div>

          {/* Form */}
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Input Fields */}
              {[
                { label: "First Name", placeholder: "SaaS" },
                { label: "Last Name", placeholder: "Admin" },
                { label: "Email", placeholder: "admin@vcard.com" },
                { label: "Phone", placeholder: "Enter your phone number" },
                { label: "Password", placeholder: "" },
                { label: "Confirm Password", placeholder: "" },
              ].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-semibold text-blue-800">{field.label}</label>
                  <input
                    type={field.label === "Email" ? "email" : field.label.toLowerCase().includes("password") ? "password" : "text"}
                    placeholder={field.placeholder}
                    className="w-full p-2 border border-blue-300 rounded-md mt-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              {/* User Profile */}
              <div>
                <label className="block text-sm font-semibold text-blue-800">User Profile</label>
                <div className="flex flex-wrap items-center mt-2">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    id="profilePic"
                  />
                  <label
                    htmlFor="profilePic"
                    className="cursor-pointer py-2 px-4 bg-blue-500 text-white rounded-md"
                  >
                    Browse
                  </label>
                  {profileImage && (
                    <div className="ml-4 w-16 h-16 rounded-full overflow-hidden mt-4 sm:mt-0">
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4 sm:mt-6 flex justify-end">
              <button
                type="submit"
                className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
