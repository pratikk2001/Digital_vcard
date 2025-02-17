import React, { useState } from "react";

const EnglishFormBasicDetails = ({ formData, setFormData }) => {
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
            <span
              className="text-gray-500 cursor-pointer relative group"
              title="The main URL that your vCard is going to be accessed from."
              aria-label="Information about URL alias"
            >
              <i className="fas fa-info-circle"></i>
              <span className="sr-only">The main URL that your vCard is going to be accessed from.</span>
              <div className="absolute top-full left-0 bg-black text-white text-xs p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                The main URL that your vCard is going to be accessed from.
              </div>
            </span>
          </label>
          <div className="flex items-center gap-3 mt-1">
            <input
              id="urlAlias"
              type="text"
              name="urlAlias"
              value={formData.urlAlias}
              onChange={handleInputChange}
              aria-label="Enter your vCard's URL alias"
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              placeholder="Enter URL Alias"
              required
            />
            <button
              type="button"
              onClick={handleRegenerateAlias}
              className="p-3 bg-gradient-to-r from-blue-500 to-teal-400 hover:bg-blue-400 rounded-md text-white transition-all duration-200 ease-in-out"
              title="Regenerate URL Alias"
              aria-label="Regenerate URL Alias"
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>

        {/* First Name */}
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
            <span className="text-green-500">👤</span> First Name:
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            aria-label="Enter your first name"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Enter your first name"
            required
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
            <span className="text-green-500">👤</span> Last Name:
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            aria-label="Enter your last name"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Enter your last name"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
            <span className="text-yellow-500">📧</span> Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            aria-label="Enter your email address"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Enter your email address"
            required
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
            <span className="text-blue-500">📱</span> Phone Number:
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            aria-label="Enter your phone number"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col">
          <label htmlFor="dob" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
            <span className="text-pink-500">🎂</span> Date of Birth:
          </label>
          <input
            id="dob"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            aria-label="Enter your date of birth"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required
          />
        </div>

        {/* Position Title */}
        <div className="flex flex-col">
          <label htmlFor="positionTitle" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
            <span className="text-gray-700">💼</span> Position Title:
          </label>
          <input
            id="positionTitle"
            type="text"
            name="positionTitle"
            value={formData.positionTitle}
            onChange={handleInputChange}
            aria-label="Enter your position title"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Enter your position title"
            required
          />
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label htmlFor="address" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
            <span className="text-red-500">📍</span> Address:
          </label>
          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            aria-label="Enter your address"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Enter your address"
            required
          />
        </div>

        {/* Education */}
        <div className="flex flex-col">
          <label htmlFor="education" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
            <span className="text-orange-500">🎓</span> Education:
          </label>
          <input
            id="education"
            type="text"
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            aria-label="Enter your education"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Enter your education"
            required
          />
        </div>

        {/* Show QR Code Toggle */}
        <div className="flex items-center justify-between mt-6">
          <label htmlFor="showQrCode" className="font-medium text-gray-700 flex items-center gap-2">
            <i className="fas fa-qrcode text-gray-500"></i>
            <span>Show QR Code:</span>
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              id="showQrCode"
              type="checkbox"
              name="showQrCode"
              checked={formData.showQrCode}
              onChange={handleInputChange}
              aria-label="Toggle QR code display"
              className="sr-only"
              required
            />
            <span className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-focus:ring-2 peer-focus:ring-blue-300"></span>
            <span className="absolute inset-y-0 left-1 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-full"></span>
          </label>
        </div>

        {/* WhatsApp Share Toggle */}
        <div className="flex items-center justify-between mt-6">
          <label htmlFor="whatsappShare" className="font-medium text-gray-700 flex items-center gap-2">
            <i className="fab fa-whatsapp text-green-500"></i>
            WhatsApp Share:
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              id="whatsappShare"
              type="checkbox"
              name="whatsappShare"
              checked={formData.whatsappShare}
              onChange={handleInputChange}
              aria-label="Toggle WhatsApp sharing"
              className="sr-only"
              required
            />
            <span className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-300"></span>
            <span className="absolute inset-y-0 left-1 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-full"></span>
          </label>
        </div>

      </div>
    </div>
  );
};

export default EnglishFormBasicDetails;