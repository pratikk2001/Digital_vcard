import React, { useState } from "react";

const BasicDetails = ({ formData: parentFormData, setFormData: setParentFormData }) => {
  const [localFormData, setLocalFormData] = useState({
    firstName: parentFormData.firstName || "",
    middleName: parentFormData.middleName || "",
    lastName: parentFormData.lastName || "",
    email: parentFormData.email || "",
    phone: parentFormData.phone || "",
    whatsappNumber: parentFormData.whatsappNumber || "",
    dob: parentFormData.dob || "",
    positionTitles: parentFormData.positionTitles || [""],
    homeAddress: parentFormData.homeAddress || "",
    officeAddress: parentFormData.officeAddress || "",
    education: parentFormData.education || "",
    showEducation: parentFormData.showEducation || false,
    showQrCode: parentFormData.showQrCode || false,
    whatsappShare: parentFormData.whatsappShare || false,
    urlAlias: parentFormData.urlAlias || "",
    partyAffiliation: parentFormData.partyAffiliation || "BJP", // New field with default value
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [includeYear, setIncludeYear] = useState(false);

  const UserId = localStorage.getItem("userId");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name.startsWith("positionTitle")) {
      const index = parseInt(name.split("-")[1], 10);
      setLocalFormData((prev) => {
        const updatedTitles = [...prev.positionTitles];
        updatedTitles[index] = value;
        return { ...prev, positionTitles: updatedTitles };
      });
      setErrors((prev) => ({ ...prev, [`positionTitle-${index}`]: "" }));
    } else {
      setLocalFormData((prev) => ({ ...prev, [name]: newValue }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddPosition = () => {
    if (localFormData.positionTitles.length < 3) {
      setLocalFormData((prev) => ({
        ...prev,
        positionTitles: [...prev.positionTitles, ""],
      }));
    }
  };

  const handleRemovePosition = (index) => {
    if (localFormData.positionTitles.length > 1) {
      setLocalFormData((prev) => ({
        ...prev,
        positionTitles: prev.positionTitles.filter((_, i) => i !== index),
      }));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`positionTitle-${index}`];
        return newErrors;
      });
    }
  };

  const handleRegenerateAlias = () => {
    const newAlias = `alias-${Math.random().toString(36).substring(7)}`;
    setLocalFormData((prev) => ({ ...prev, urlAlias: newAlias }));
    setErrors((prev) => ({ ...prev, urlAlias: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["firstName", "lastName", "email", "phone", "whatsappNumber"];
    requiredFields.forEach((key) => {
      if (!localFormData[key].trim()) {
        newErrors[key] = "This field is required.";
      }
    });

    if (localFormData.email && !/^\S+@\S+\.\S+$/.test(localFormData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (localFormData.phone && !/^\d{10}$/.test(localFormData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    if (localFormData.whatsappNumber && !/^\d{10}$/.test(localFormData.whatsappNumber)) {
      newErrors.whatsappNumber = "WhatsApp number must be 10 digits.";
    }

    if (localFormData.dob) {
      if (!includeYear && !/^\d{2}\/\d{2}$/.test(localFormData.dob)) {
        newErrors.dob = "Enter date in MM/DD format.";
      } else if (includeYear && !/^\d{4}-\d{2}-\d{2}$/.test(localFormData.dob)) {
        newErrors.dob = "Select a valid date.";
      }
    }

    localFormData.positionTitles.forEach((title, index) => {
      if (title.trim() === "") {
        newErrors[`positionTitle-${index}`] = "Position title cannot be empty.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const formattedData = {
        firstName: localFormData.firstName.trim().charAt(0).toUpperCase() + localFormData.firstName.trim().slice(1).toLowerCase(),
        middleName: localFormData.middleName.trim().charAt(0).toUpperCase() + localFormData.middleName.trim().slice(1).toLowerCase(),
        lastName: localFormData.lastName.trim().charAt(0).toUpperCase() + localFormData.lastName.trim().slice(1).toLowerCase(),
        email: localFormData.email.toLowerCase().trim(),
        phone: localFormData.phone.trim(),
        whatsappNumber: localFormData.whatsappNumber.trim(),
        dob: localFormData.dob,
        positionTitles: localFormData.positionTitles.map((title) => title.trim()),
        homeAddress: localFormData.homeAddress.trim(),
        officeAddress: localFormData.officeAddress.trim(),
        education: localFormData.education.trim(),
        showEducation: localFormData.showEducation,
        showQrCode: localFormData.showQrCode,
        whatsappShare: localFormData.whatsappShare,
        urlAlias: localFormData.urlAlias.trim(),
        partyAffiliation: localFormData.partyAffiliation, // Include new field
      };

      const response = await fetch(`${apiBaseUrl}/api/template/save/basicDetails/${UserId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (response.ok && data.status_code === 200) {
        setParentFormData((prev) => ({ ...prev, ...formattedData }));
        alert(data.message);
      } else {
        throw new Error(data.message || "Failed to save data");
      }
    } catch (error) {
      console.error("Save Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setLocalFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      whatsappNumber: "",
      dob: "",
      positionTitles: [""],
      homeAddress: "",
      officeAddress: "",
      education: "",
      showEducation: false,
      showQrCode: false,
      whatsappShare: false,
      urlAlias: "",
      partyAffiliation: "BJP", // Reset to default
    });
    setErrors({});
    setIncludeYear(false);
  };

  // Determine which address to show based on what's filled
  const showHomeAddress = localFormData.homeAddress.trim() && !localFormData.officeAddress.trim();
  const showOfficeAddress = localFormData.officeAddress.trim() && !localFormData.homeAddress.trim();
  const showBothAddresses = localFormData.homeAddress.trim() && localFormData.officeAddress.trim();

  return (
    <form
      onSubmit={handleSave}
      className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Basic Details</h2>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">🏛️ Party Affiliation:</label>
          <select
            name="partyAffiliation"
            value={localFormData.partyAffiliation}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-48 focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            <option value="BJP">BJP</option>
            <option value="NCP">NCP</option>
            <option value="SHIVSENA">SHIVSENA</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>
      </div>

      {/* URL Alias Section */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
        <label className="text-gray-800 font-semibold mb-2 block text-lg">
          🔗 URL Alias
          <span className="text-gray-500 text-sm font-normal ml-2">(Unique identifier for your profile)</span>
        </label>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            name="urlAlias"
            value={localFormData.urlAlias}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
            placeholder="Enter or generate a URL alias"
            disabled={isSubmitting}
          />
          <button
            type="button"
            onClick={handleRegenerateAlias}
            className="p-3 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-medium disabled:bg-gray-400 transition-colors duration-200 flex items-center justify-center min-w-[100px]"
            disabled={isSubmitting}
          >
            <span className="mr-2">🔄</span>
          </button>
        </div>
        {errors.urlAlias && <span className="text-red-500 text-sm mt-1">{errors.urlAlias}</span>}
      </div>

      {/* Other Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">👤 First Name:</label>
          <input
            type="text"
            name="firstName"
            value={localFormData.firstName}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your first name"
            disabled={isSubmitting}
          />
          {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
        </div>

        {/* Middle Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">👤 Middle Name:</label>
          <input
            type="text"
            name="middleName"
            value={localFormData.middleName}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your middle name"
            disabled={isSubmitting}
          />
          {errors.middleName && <span className="text-red-500 text-sm">{errors.middleName}</span>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">👤 Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={localFormData.lastName}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your last name"
            disabled={isSubmitting}
          />
          {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">📧 Email:</label>
          <input
            type="email"
            name="email"
            value={localFormData.email}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email address"
            disabled={isSubmitting}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">📱 Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={localFormData.phone}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
            disabled={isSubmitting}
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
        </div>

        {/* WhatsApp Number */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">💬 WhatsApp Number:</label>
          <input
            type="tel"
            name="whatsappNumber"
            value={localFormData.whatsappNumber}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your WhatsApp number"
            disabled={isSubmitting}
          />
          {errors.whatsappNumber && <span className="text-red-500 text-sm">{errors.whatsappNumber}</span>}
        </div>

        {/* Date of Birth with Toggle */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">🎂 Date of Birth:</label>
          {includeYear ? (
            <input
              type="date"
              name="dob"
              value={localFormData.dob}
              onChange={handleInputChange}
              className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
          ) : (
            <input
              type="text"
              name="dob"
              value={localFormData.dob}
              onChange={handleInputChange}
              className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
              placeholder="MM/DD"
              disabled={isSubmitting}
            />
          )}
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={includeYear}
              onChange={(e) => {
                setIncludeYear(e.target.checked);
                if (!e.target.checked && localFormData.dob) {
                  const dobParts = localFormData.dob.split("-");
                  if (dobParts.length === 3) {
                    setLocalFormData((prev) => ({ ...prev, dob: `${dobParts[1]}/${dobParts[2]}` }));
                  }
                }
              }}
              className="mr-2 h-5 w-5"
              disabled={isSubmitting}
            />
            <label className="text-gray-700 text-sm">Include Year</label>
          </div>
          {errors.dob && <span className="text-red-500 text-sm mt-1">{errors.dob}</span>}
        </div>

        {/* Position Titles */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">💼 Position Titles:</label>
          {localFormData.positionTitles.map((title, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                name={`positionTitle-${index}`}
                value={title}
                onChange={handleInputChange}
                className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter position title ${index + 1}`}
                disabled={isSubmitting}
              />
              {localFormData.positionTitles.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemovePosition(index)}
                  className="ml-2 p-2 bg-red-500 hover:bg-red-400 rounded-md text-white disabled:bg-gray-400"
                  disabled={isSubmitting}
                >
                  🗑️
                </button>
              )}
              {errors[`positionTitle-${index}`] && (
                <span className="text-red-500 text-sm mt-1">{errors[`positionTitle-${index}`]}</span>
              )}
            </div>
          ))}
          {localFormData.positionTitles.length < 3 && (
            <button
              type="button"
              onClick={handleAddPosition}
              className="p-2 bg-blue-500 hover:bg-blue-400 rounded-md text-white disabled:bg-gray-400 mt-2"
              disabled={isSubmitting}
            >
              + Add Position (Max 3)
            </button>
          )}
        </div>

        {/* Home Address */}
        {(showHomeAddress || !showOfficeAddress) && (
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">🏠 Home Address:</label>
            <input
              type="text"
              name="homeAddress"
              value={localFormData.homeAddress}
              onChange={handleInputChange}
              className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your home address"
              disabled={isSubmitting}
            />
          </div>
        )}

        {/* Office Address */}
        {(showOfficeAddress || !showHomeAddress) && (
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">🏢 Office Address:</label>
            <input
              type="text"
              name="officeAddress"
              value={localFormData.officeAddress}
              onChange={handleInputChange}
              className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your office address"
              disabled={isSubmitting}
            />
          </div>
        )}

        {/* Education with Show Toggle */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">🎓 Education:</label>
          <input
            type="text"
            name="education"
            value={localFormData.education}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your education"
            disabled={isSubmitting}
          />
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              name="showEducation"
              checked={localFormData.showEducation}
              onChange={handleInputChange}
              className="mr-2 h-5 w-5"
              disabled={isSubmitting}
            />
            <label className="text-gray-700 text-sm">Show Education</label>
          </div>
        </div>

        {/* Show QR Code */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="showQrCode"
            checked={localFormData.showQrCode}
            onChange={handleInputChange}
            className="mr-2 h-5 w-5"
            disabled={isSubmitting}
          />
          <label className="text-gray-700 font-medium">🔲 Show QR Code</label>
        </div>

        {/* WhatsApp Share */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="whatsappShare"
            checked={localFormData.whatsappShare}
            onChange={handleInputChange}
            className="mr-2 h-5 w-5"
            disabled={isSubmitting}
          />
          <label className="text-gray-700 font-medium">💬 Enable WhatsApp Share</label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          type="submit"
          className="p-3 bg-green-500 hover:bg-green-400 rounded-md text-white disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "💾 Save"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="p-3 bg-gray-500 hover:bg-gray-400 rounded-md text-white disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          🔄 Reset
        </button>
      </div>
    </form>
  );
};

export default BasicDetails;