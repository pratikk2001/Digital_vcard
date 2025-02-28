import React, { useState } from "react";

const MarathiFormBasicDetails = ({ formData: parentFormData, setFormData: setParentFormData }) => {
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
    partyAffiliation: parentFormData.partyAffiliation || "भाजप", // New field with default value in Marathi
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
        newErrors[key] = "हा फील्ड आवश्यक आहे.";
      }
    });

    if (localFormData.email && !/^\S+@\S+\.\S+$/.test(localFormData.email)) {
      newErrors.email = "वैध ईमेल पत्ता प्रविष्ट करा.";
    }

    if (localFormData.phone && !/^\d{10}$/.test(localFormData.phone)) {
      newErrors.phone = "फोन नंबर 10 अंकी असणे आवश्यक आहे.";
    }

    if (localFormData.whatsappNumber && !/^\d{10}$/.test(localFormData.whatsappNumber)) {
      newErrors.whatsappNumber = "व्हॉट्सअ‍ॅप नंबर 10 अंकी असणे आवश्यक आहे.";
    }

    if (localFormData.dob) {
      if (!includeYear && !/^\d{2}\/\d{2}$/.test(localFormData.dob)) {
        newErrors.dob = "MM/DD स्वरूपात दिनांक प्रविष्ट करा.";
      } else if (includeYear && !/^\d{4}-\d{2}-\d{2}$/.test(localFormData.dob)) {
        newErrors.dob = "वैध दिनांक निवडा.";
      }
    }

    localFormData.positionTitles.forEach((title, index) => {
      if (title.trim() === "") {
        newErrors[`positionTitle-${index}`] = "पदनाम रिकामे असू शकत नाही.";
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
        throw new Error(data.message || "डेटा जतन करण्यात अयशस्वी");
      }
    } catch (error) {
      console.error("जतन त्रुटी:", error);
      alert(`त्रुटी: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("तुम्ही सर्व मूलभूत तपशील रीसेट करायचे आहात याची खात्री आहे का?")) {
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
        partyAffiliation: "भाजप", // Reset to default in Marathi
      });
      setErrors({});
      setIncludeYear(false);
    }
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
        <h2 className="text-2xl font-bold text-gray-800">मूलभूत तपशील</h2>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">🏛️ पक्षाची सदस्यता:</label>
          <select
            name="partyAffiliation"
            value={localFormData.partyAffiliation}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-48 focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            <option value="भाजप">भाजप</option>
            <option value="NCP">राष्ट्रीय काँग्रेस पक्ष</option>
            <option value="SHIVSENA">शिवसेना</option>
            <option value="OTHER">इतर</option>
          </select>
        </div>
      </div>

      {/* URL Alias Section */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
        <label className="text-gray-800 font-semibold mb-2 block text-lg">
          🔗 URL अलियास
          <span className="text-gray-500 text-sm font-normal ml-2">(आपल्या प्रोफाइलसाठी अद्वितीय ओळखकर्ता)</span>
        </label>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            name="urlAlias"
            value={localFormData.urlAlias}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
            placeholder="URL अलियास प्रविष्ट करा किंवा तयार करा"
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
          <label className="text-gray-700 font-medium mb-2">👤 पहिले नाव:</label>
          <input
            type="text"
            name="firstName"
            value={localFormData.firstName}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="आपले पहिले नाव प्रविष्ट करा"
            disabled={isSubmitting}
          />
          {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
        </div>

        {/* Middle Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">👤 मधले नाव:</label>
          <input
            type="text"
            name="middleName"
            value={localFormData.middleName}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="आपले मधले नाव प्रविष्ट करा"
            disabled={isSubmitting}
          />
          {errors.middleName && <span className="text-red-500 text-sm">{errors.middleName}</span>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">👤 आडनाव:</label>
          <input
            type="text"
            name="lastName"
            value={localFormData.lastName}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="आपले आडनाव प्रविष्ट करा"
            disabled={isSubmitting}
          />
          {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">📧 ईमेल:</label>
          <input
            type="email"
            name="email"
            value={localFormData.email}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="आपला ईमेल पत्ता प्रविष्ट करा"
            disabled={isSubmitting}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">📱 फोन नंबर:</label>
          <input
            type="tel"
            name="phone"
            value={localFormData.phone}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="आपला फोन नंबर प्रविष्ट करा"
            disabled={isSubmitting}
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
        </div>

        {/* WhatsApp Number */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">💬 व्हॉट्सअ‍ॅप नंबर:</label>
          <input
            type="tel"
            name="whatsappNumber"
            value={localFormData.whatsappNumber}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="आपला व्हॉट्सअ‍ॅप नंबर प्रविष्ट करा"
            disabled={isSubmitting}
          />
          {errors.whatsappNumber && <span className="text-red-500 text-sm">{errors.whatsappNumber}</span>}
        </div>

        {/* Date of Birth with Toggle */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">🎂 जन्मदिनांक:</label>
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
            <label className="text-gray-700 text-sm">वर्ष समाविष्ट करा</label>
          </div>
          {errors.dob && <span className="text-red-500 text-sm mt-1">{errors.dob}</span>}
        </div>

        {/* Position Titles */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">💼 पदनाम:</label>
          {localFormData.positionTitles.map((title, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                name={`positionTitle-${index}`}
                value={title}
                onChange={handleInputChange}
                className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
                placeholder={`पदनाम ${index + 1} प्रविष्ट करा`}
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
              + पद जोडा (कमाल 3)
            </button>
          )}
        </div>

        {/* Home Address */}
        {(showHomeAddress || !showOfficeAddress) && (
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">🏠 घरचा पत्ता:</label>
            <input
              type="text"
              name="homeAddress"
              value={localFormData.homeAddress}
              onChange={handleInputChange}
              className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
              placeholder="आपला घरचा पत्ता प्रविष्ट करा"
              disabled={isSubmitting}
            />
          </div>
        )}

        {/* Office Address */}
        {(showOfficeAddress || !showHomeAddress) && (
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">🏢 ऑफिसचा पत्ता:</label>
            <input
              type="text"
              name="officeAddress"
              value={localFormData.officeAddress}
              onChange={handleInputChange}
              className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
              placeholder="आपला ऑफिसचा पत्ता प्रविष्ट करा"
              disabled={isSubmitting}
            />
          </div>
        )}

        {/* Education with Show Toggle */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">🎓 शिक्षण:</label>
          <input
            type="text"
            name="education"
            value={localFormData.education}
            onChange={handleInputChange}
            className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="आपले शिक्षण प्रविष्ट करा"
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
            <label className="text-gray-700 text-sm">शिक्षण दाखवा</label>
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
          <label className="text-gray-700 font-medium">🔲 QR कोड दाखवा</label>
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
          <label className="text-gray-700 font-medium">💬 व्हॉट्सअ‍ॅप शेअर सक्षम करा</label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          type="submit"
          className="p-3 bg-green-500 hover:bg-green-400 rounded-md text-white disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? "सेव्हिंग..." : "💾 जतन करा"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="p-3 bg-gray-500 hover:bg-gray-400 rounded-md text-white disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          🔄 रीसेट
        </button>
      </div>
    </form>
  );
};

export default MarathiFormBasicDetails;