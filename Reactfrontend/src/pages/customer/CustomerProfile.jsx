import React, { useState, useEffect } from "react";
import Navbar from "../../components/customer_nav/Topnavbar";
import Sidenav from "../../components/customer_nav/Customersidenav";

const fetchAdminProfile = async (userId, token) => {
  try {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
    const endpoint = `${apiBaseUrl}/admin/${userId}`;
    console.log("Fetching admin profile from:", endpoint, "with token:", token);

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("API Response:", data);

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
      localStorage.setItem("userData", JSON.stringify(userData));
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

const updateAdminProfile = async (userId, token, updatedData) => {
  try {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
    const endpoint = `${apiBaseUrl}/admin/${userId}`;
    console.log("Updating admin profile at:", endpoint, "with data:", updatedData);

    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    console.log("Update API Response:", data);

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! Status: ${response.status}`);
    }

    if (data.status_code === 200) {
      return data;
    } else {
      throw new Error(data.message || "Failed to update admin profile");
    }
  } catch (error) {
    console.error("Error updating admin profile:", error.message);
    throw error;
  }
};

const changeAdminPassword = async (userId, token, passwordData) => {
  try {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
    const endpoint = `${apiBaseUrl}/admin/change-password/${userId}`;
    console.log("Changing password at:", endpoint, "with data:", passwordData);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });

    const data = await response.json();
    console.log("Change Password API Response:", data);

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! Status: ${response.status}`);
    }

    if (data.status_code === 200) {
      return data;
    } else {
      throw new Error(data.message || "Failed to change password");
    }
  } catch (error) {
    console.error("Error changing password:", error.message);
    throw error;
  }
};

const ProfilePage = () => {
  const [admin, setAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
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
      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      });
    };
    getAdminData();
  }, [userId, token]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      };
      const response = await updateAdminProfile(userId, token, updatedData);
      if (response.status_code === 200) {
        const updatedUserData = {
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          email: response.data.email,
          phone: response.data.phone,
          password: "********",
          profileImage: response.data.profileImage || admin.profileImage,
          status: response.data.status || admin.status,
        };
        setAdmin(updatedUserData);
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
        setIsEditing(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      setError(error.message || "Failed to update profile");
    }
  };

  const handlePasswordChangeInput = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await changeAdminPassword(userId, token, passwordData);
      if (response.status_code === 200) {
        setShowPasswordModal(false);
        setPasswordData({ currentPassword: "", newPassword: "" });
        alert("Password changed successfully!");
      }
    } catch (error) {
      setError(error.message || "Failed to change password");
    }
  };

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

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
            )}

            {/* Profile Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {isEditing ? (
                <>
                  <EditableField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                <>
                  <ProfileField label="First Name" value={admin.firstName} />
                  <ProfileField label="Last Name" value={admin.lastName} />
                  <ProfileField label="Email" value={admin.email} />
                  <ProfileField label="Phone" value={admin.phone} />
                </>
              )}
              <ProfileField label="Password" value={admin.password} />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-between">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    aria-label="Save Profile"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="bg-gray-400 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    aria-label="Cancel Edit"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEditToggle}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    aria-label="Edit Profile"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="bg-blue-400 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    aria-label="Change Password"
                  >
                    Change Password
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChangeSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-blue-800">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChangeInput}
                  className="w-full p-3 border border-blue-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-blue-800">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChangeInput}
                  className="w-full p-3 border border-blue-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Change Password
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="bg-gray-400 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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

// Reusable EditableField Component
const EditableField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-blue-800">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-blue-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default ProfilePage;