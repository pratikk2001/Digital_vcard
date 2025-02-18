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

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleRegenerateAlias = () => {
    setFormData({ ...formData, urlAlias: `alias-${Math.random().toString(36).substring(7)}` });
    setErrors({ ...errors, urlAlias: "" });
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

  const handleSave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Saved Data:", formData);
      alert("Form submitted successfully!");
    }
  };

  const handleReset = () => {
    setFormData({
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
    setErrors({});
  };

  return (
    <form onSubmit={handleSave} className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Basic Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* URL Alias */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">🔗 URL Alias:</label>
          <div className="flex gap-3">
            <input type="text" name="urlAlias" value={formData.urlAlias} onChange={handleInputChange} className="p-3 border rounded-md w-full" placeholder="URL Alias प्रविष्ट करा" />
            <button type="button" onClick={handleRegenerateAlias} className="p-3 bg-blue-500 hover:bg-blue-400 rounded-md text-white">🔄</button>
          </div>
        </div>

        {/* First Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">👤 पहिले नाव:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="p-3 border rounded-md w-full" placeholder="तुमचे पहिले नाव प्रविष्ट करा" />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">👤 आडनाव:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="p-3 border rounded-md w-full" placeholder="तुमचे आडनाव प्रविष्ट करा" />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">📧 ईमेल:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="p-3 border rounded-md w-full" placeholder="तुमचा ईमेल पत्ता प्रविष्ट करा" />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">📱 फोन नंबर:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="p-3 border rounded-md w-full" placeholder="तुमचा फोन नंबर प्रविष्ट करा" />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">🎂 जन्मतारीख:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="p-3 border rounded-md w-full" />
        </div>

        {/* Position Title */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">💼 पद शीर्षक:</label>
          <input type="text" name="positionTitle" value={formData.positionTitle} onChange={handleInputChange} className="p-3 border rounded-md w-full" placeholder="पद शीर्षक प्रविष्ट करा" />
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">🏡 पत्ता:</label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="p-3 border rounded-md w-full" placeholder="तुमचा पत्ता प्रविष्ट करा" />
        </div>

        {/* Education */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">🎓 शिक्षण:</label>
          <input type="text" name="education" value={formData.education} onChange={handleInputChange} className="p-3 border rounded-md w-full" placeholder="तुमचे शिक्षण प्रविष्ट करा" />
        </div>

        {/* Show QR Code */}
        <div className="flex items-center">
          <input type="checkbox" name="showQrCode" checked={formData.showQrCode} onChange={handleInputChange} className="mr-2" />
          <label className="text-gray-700 font-medium">🔲 QR कोड दाखवा</label>
        </div>

        {/* WhatsApp Share */}
        <div className="flex items-center">
          <input type="checkbox" name="whatsappShare" checked={formData.whatsappShare} onChange={handleInputChange} className="mr-2" />
          <label className="text-gray-700 font-medium">💬 WhatsApp शेअर सक्षम करा</label>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
      <button
          onClick={handleSave}
          className="p-3 bg-green-500 hover:bg-green-400 rounded-md text-white"
        >
          💾 Save
        </button>
        <button
          onClick={handleReset}
          className="p-3 bg-gray-500 hover:bg-gray-400 rounded-md text-white"
        >
          🔄 Reset
        </button>
      </div>
    </form>
  );
};

export default EnglishFormBasicDetails;
