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
    urlAlias: "",
  });

  const [errors, setErrors] = useState({}); // Stores validation errors

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });

    // Clear error when user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const handleRegenerateAlias = () => {
    setFormData({ ...formData, urlAlias: `alias-${Math.random().toString(36).substring(7)}` });
    setErrors({ ...errors, urlAlias: "" }); // Clear error when regenerated
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === "string" && formData[key].trim() === "") {
        newErrors[key] = "This field is required.";
      }
    });

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Basic Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* URL Alias */}
        <div className="flex flex-col">
          <label htmlFor="urlAlias" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
            🔗 URL Alias:
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              name="urlAlias"
              value={formData.urlAlias}
              onChange={handleInputChange}
              className={`p-3 border rounded-md w-full focus:ring-2 ${errors.urlAlias ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter URL Alias"
            />
            <button type="button" onClick={handleRegenerateAlias} className="p-3 bg-blue-500 hover:bg-blue-400 rounded-md text-white">
              🔄
            </button>
          </div>
          {errors.urlAlias && <span className="text-red-500 text-sm">{errors.urlAlias}</span>}
        </div>

        {/* First Name */}
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-gray-700 font-medium mb-2">👤 First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`p-3 border rounded-md w-full focus:ring-2 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your first name"
          />
          {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-gray-700 font-medium mb-2">👤 Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`p-3 border rounded-md w-full focus:ring-2 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your last name"
          />
          {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-medium mb-2">📧 Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`p-3 border rounded-md w-full focus:ring-2 ${errors.email ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your email address"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-gray-700 font-medium mb-2">📱 Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`p-3 border rounded-md w-full focus:ring-2 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col">
          <label htmlFor="dob" className="text-gray-700 font-medium mb-2">🎂 Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className={`p-3 border rounded-md w-full focus:ring-2 ${errors.dob ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.dob && <span className="text-red-500 text-sm">{errors.dob}</span>}
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label htmlFor="address" className="text-gray-700 font-medium mb-2">🏡 Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={`p-3 border rounded-md w-full focus:ring-2 ${errors.address ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your address"
          />
          {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
        </div>
      </div>
    </form>
  );
};

export default EnglishFormBasicDetails;
