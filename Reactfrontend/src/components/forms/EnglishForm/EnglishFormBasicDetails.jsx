import React, { useState } from "react";

const EnglishFormBasicDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    positionTitle: "",
    address: "",
    education: "",
    showQrCode: false,  
    whatsappShare: false,
    urlAlias: "", // Added missing state field
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegenerateAlias = () => {
    setFormData({ ...formData, urlAlias: `alias-${Math.random().toString(36).substring(7)}` });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Basic Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* URL Alias */}
        <div className="flex flex-col">
          <label htmlFor="urlAlias" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
            <span className="text-blue-500">🔗</span> URL Alias:
          </label>
          <div className="flex items-center gap-3 mt-1">
            <input
              type="text"
              name="urlAlias"
              value={formData.urlAlias}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Enter URL Alias"
            />
            <button
              type="button"
              onClick={handleRegenerateAlias}
              className="p-3 bg-blue-500 hover:bg-blue-400 rounded-md text-white"
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>

        {/* First Name */}
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-gray-700 font-medium mb-2">👤 First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your first name"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-gray-700 font-medium mb-2">👤 Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your last name"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-medium mb-2">📧 Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email address"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-gray-700 font-medium mb-2">📱 Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
        </div>
      </div>
    </div>
  );
};

export default EnglishFormBasicDetails;