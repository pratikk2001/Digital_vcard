import React, { useState, useEffect, useCallback } from "react";
import Sidenav from "../../components/multiadmin_nav/sidenav";
import Navbar from "../../components/multiadmin_nav/Topnavbar";

const fetchUserProfile = async () => {
  // Simulating an API call (Replace this with actual API call)
  return {
    firstName: "Enter First Name",
    lastName: "Enter Last Name",
    email: "Enter Email",
    phone: "Phone Number",
    password: "********",
    profileImage: "https://via.placeholder.com/150",
    status: "Active",
  };
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserProfile();
      setUser(data);
    };
    getUserData();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-50" role="status">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <div className="hidden lg:block lg:w-1/4">
          <Sidenav />
        </div>

        <div className="flex-1 p-6 sm:p-8">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <div className="w-24 h-24 bg-blue-600 rounded-full text-white text-3xl flex items-center justify-center">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-blue-800">Profile</h1>
              </div>
              <div className="sm:ml-auto">
                <span className="px-6 py-2 bg-green-500 text-white rounded-full text-sm sm:text-base">
                  {user.status}
                </span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <ProfileField label="First Name" value={user.firstName} />
              <ProfileField label="Last Name" value={user.lastName} />
              <ProfileField label="Email" value={user.email} />
              <ProfileField label="Phone" value={user.phone} />
              <ProfileField label="Password" value={user.password} />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-between">
              {/* <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-label="Edit Profile"
              >
                Edit Profile
              </button> */}
              <button
                className="bg-blue-400 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                aria-label="Change Password"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable ProfileField Component
const ProfileField = ({ label, value }) => (
  <div>
    <label className="block text-sm font-semibold text-blue-800">{label}</label>
    <div className="w-full p-3 border border-blue-300 rounded-md mt-2 bg-gray-100 text-gray-700">
      {value}
    </div>
  </div>
);

export default ProfilePage;
