import React, { useState, useEffect } from "react";
import Navbar from "../../components/customer_nav/Topnavbar";
import Sidenav from "../../components/customer_nav/Customersidenav";
import axios from "axios"; // Ensure axios is installed: npm install axios

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Use adminId (same as userId in this context)
        console.log("Admin ID from localStorage:", userId); // Debug: Log userId

        if (!userId) {
          throw new Error("Admin not authenticated. Please log in.");
        }

        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
        const endpoint = `${apiBaseUrl}/api/admin/profile/${userId}`;
        console.log("Fetching admin profile from:", endpoint); // Debug: Log endpoint

        const response = await axios.get(endpoint, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("API Response:", response.data); // Debug: Log response

        const adminData = response.data.data; // Adjust based on your API response structure
        setUser({
          firstName: adminData.first_name || "Enter First Name",
          lastName: adminData.last_name || "Enter Last Name",
          email: adminData.email || "Enter Email",
          phone: adminData.phone || "", // Default to empty if not present
          password: "********", // Mask password for security
          profileImage: adminData.profileImage || "https://via.placeholder.com/150", // Optional
          status: adminData.status || "Active", // Optional
        });
        setEditForm({
          firstName: adminData.first_name || "",
          lastName: adminData.last_name || "",
          email: adminData.email || "",
          phone: adminData.phone || "",
        });
      } catch (err) {
        console.error("Error fetching admin profile:", err.response?.data || err.message);
        setError(err.message || "Failed to load admin profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("Admin not authenticated. Please log in.");

      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const endpoint = `${apiBaseUrl}/api/admin/profile/${userId}`;

      const response = await axios.put(endpoint, editForm, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.status_code === 200) {
        setUser((prev) => ({
          ...prev,
          firstName: editForm.firstName,
          lastName: editForm.lastName,
          email: editForm.email,
          phone: editForm.phone,
        }));
        setIsEditing(false);
        alert("Admin profile updated successfully!");
      } else {
        throw new Error(response.data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating admin profile:", err.response?.data || err.message);
      alert(`Error: ${err.message || "Failed to update profile. Please try again."}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-50" role="status">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-50 text-red-500" role="alert">
        {error}
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

            {/* Profile Details or Edit Form */}
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col">
                  <label className="block text-sm font-semibold text-blue-800">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editForm.firstName}
                    onChange={handleInputChange}
                    className="p-3 border border-blue-300 rounded-md mt-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-semibold text-blue-800">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editForm.lastName}
                    onChange={handleInputChange}
                    className="p-3 border border-blue-300 rounded-md mt-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-semibold text-blue-800">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    className="p-3 border border-blue-300 rounded-md mt-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-semibold text-blue-800">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleInputChange}
                    className="p-3 border border-blue-300 rounded-md mt-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2 flex justify-end gap-4 mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <ProfileField label="First Name" value={user.firstName} />
                <ProfileField label="Last Name" value={user.lastName} />
                <ProfileField label="Email" value={user.email} />
                <ProfileField label="Phone" value={user.phone} />
                <ProfileField label="Password" value={user.password} />
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={handleEditToggle}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-label="Edit Profile"
              >
                Edit Profile
              </button>
              <button
                className="bg-blue-400 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                aria-label="Change Password"
                onClick={() => {/* Add logic to navigate to change password page or open modal */}}
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