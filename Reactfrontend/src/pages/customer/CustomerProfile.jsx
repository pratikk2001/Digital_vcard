import React, { useState, useEffect } from 'react';
import Navbar from "../../components/customer_nav/Topnavbar"; // Adjust the path based on your file structure
import Sidenav from "../../components/customer_nav/Customersidenav";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  // Simulating fetching user data for the profile (replace with your API call)
  useEffect(() => {
    const fetchUserProfile = async () => {
      // Simulate fetching user profile (replace with an actual API request)
      setUser({
        firstName: 'John',
        lastName: 'Doe',
        email: 'admin@vcard.com',
        phone: '123-456-7890',
        password: '********',
        profileImage: 'https://via.placeholder.com/150',
        status: 'Active',
      });
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen bg-blue-50">Loading...</div>; // Loading state
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Top Navbar */}
      <Navbar />
      
      {/* Page Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden lg:block lg:w-1/4">
          <Sidenav />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full text-white text-2xl flex items-center justify-center">
                {user.firstName[0]}{user.lastName[0]} {/* Use initials */}
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-blue-800">Profile</h1>
                <p className="text-sm text-blue-600">Dashboard / Profile</p>
              </div>
              <div className="sm:ml-auto">
                <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm sm:text-base">{user.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-semibold text-blue-800">First Name</label>
                <div className="w-full p-2 border border-blue-300 rounded-md mt-2 bg-gray-100 text-gray-700">{user.firstName}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-800">Last Name</label>
                <div className="w-full p-2 border border-blue-300 rounded-md mt-2 bg-gray-100 text-gray-700">{user.lastName}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-800">Email</label>
                <div className="w-full p-2 border border-blue-300 rounded-md mt-2 bg-gray-100 text-gray-700">{user.email}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-800">Phone</label>
                <div className="w-full p-2 border border-blue-300 rounded-md mt-2 bg-gray-100 text-gray-700">{user.phone}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-800">Password</label>
                <div className="w-full p-2 border border-blue-300 rounded-md mt-2 bg-gray-100 text-gray-700">{user.password}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
