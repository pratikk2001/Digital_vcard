import React, { useState, useEffect } from "react";

const ProfileForm = ({ vcardData, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    education: "",
    awards: [],
    familyDetails: [],
  });

  useEffect(() => {
    if (vcardData) {
      setFormData({
        name: vcardData.name || "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        education: "",
        awards: [],
        familyDetails: [],
      });
    }
  }, [vcardData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Edit Profile</h2>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your address"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleSave}
            className="w-1/2 px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition-all duration-300"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="w-1/2 px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition-all duration-300 ml-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
