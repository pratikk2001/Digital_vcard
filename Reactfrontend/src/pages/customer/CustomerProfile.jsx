import React, { useState, useEffect } from "react";
import Navbar from "../../components/customer_nav/Topnavbar";
import Sidenav from "../../components/customer_nav/Customersidenav";

const fetchAdminProfile = async (userId, token) => {
  try {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
    const endpoint = `${apiBaseUrl}/admin/${userId}`;
    console.log("Fetching admin profile from:", endpoint, "with token:", token); // Debug log

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("API Response:", data); // Debug log

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! Status: ${response.status}`);
    }

    if (data.status_code === 200) {
      const userData = {
        firstName: data.data.first_name || "Enter First Name",
        lastName: data.data.last_name || "Enter Last Name",
        email: data.data.email || "Enter Email",
        phone: data.data.phone || "Phone Number",
        password: "********",
        profileImage: data.data.profileImage || "https://via.placeholder.com/150",
        status: data.data.status || "Active",
      };
      localStorage.setItem("userData", JSON.stringify(userData)); // Store in localStorage
      return userData;
    } else {
      throw new Error(data.message || "Failed to fetch admin profile");
    }
  } catch (error) {
    console.error("Error fetching admin profile:", error.message);
    return {
      firstName: "Error",
      lastName: "Error",
      email: "Error fetching data",
      phone: "Error",
      password: "********",
      profileImage: "https://via.placeholder.com/150",
      status: "Inactive",
    };
  }
};

const ProfilePage = () => {
  const [admin, setAdmin] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const getAdminData = async () => {
      if (!userId || !token) {
        console.warn("No userId or token found in localStorage. Admin may not be logged in.", {
          userId,
          token,
        });
        setAdmin({
          firstName: "Not Logged In",
          lastName: "",
          email: "Please log in",
          phone: "",
          password: "********",
          profileImage: "https://via.placeholder.com/150",
          status: "Inactive",
        });
        return;
      }

      const data = await fetchAdminProfile(userId, token);
      setAdmin(data);
    };
    getAdminData();
  }, [userId, token]);

  if (!admin) {
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
                {admin.firstName[0]}{admin.lastName[0]}
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-blue-800">Profile</h1>
              </div>
              <div className="sm:ml-auto">
                <span className="px-6 py-2 bg-green-500 text-white rounded-full text-sm sm:text-base">
                  {admin.status}
                </span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <ProfileField label="First Name" value={admin.firstName} />
              <ProfileField label="Last Name" value={admin.lastName} />
              <ProfileField label="Email" value={admin.email} />
              <ProfileField label="Phone" value={admin.phone} />
              <ProfileField label="Password" value={admin.password} />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-label="Edit Profile"
              >
                Edit Profile
              </button>
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