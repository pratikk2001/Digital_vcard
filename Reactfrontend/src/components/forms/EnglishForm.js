import React, { useState } from "react";
import Topnav from "../customer_nav/Topnavbar";
import Sidenav from "../customer_nav/Customersidenav";
import { FaInfoCircle, FaImage, FaAward, FaUsers, FaHandsHelping, FaCalendarAlt, FaNewspaper } from "react-icons/fa";


const EditVCard = () => {
  const [activeSection, setActiveSection] = useState("Basic Details");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    education: "",
    awards: [],            // Initialize as an array
    currentAward: "",
    familyDetails: [],     // Initialize as an array
    currentFamilyDetail: "",
    profilePicture: null,
    bannerImage: null,
    socialWorkImages: [],  // Initialize as an array
    eventImages: [],       // Initialize as an array
    newsCenterImages: [],  // Initialize as an array
    previewImage: null,    // For image preview
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      dob: "",
      education: "",
      awards: [],
      currentAward: "",
      familyDetails: [],
      currentFamilyDetail: "",
      profilePicture: null,
      bannerImage: null,
      socialWorkImages: [],
      eventImages: [],
      newsCenterImages: [],
    });
  };

  const sidebarItems = [
    { name: "Basic Details", icon: <FaInfoCircle /> },
    { name: "Profile and Banner", icon: <FaImage /> },
    { name: "Awards", icon: <FaAward /> },
    { name: "Family Details", icon: <FaUsers /> },
    { name: "Social Work", icon: <FaHandsHelping /> },
    { name: "Events", icon: <FaCalendarAlt /> },
    { name: "News Center", icon: <FaNewspaper /> },
  ];
  const handleSave = () => {
    console.log("Form data saved:", formData);
    // Optionally, handle API calls for saving the data
  };

  const handleRegenerateAlias = () => {
    const newAlias = "new-alias-" + Math.floor(Math.random() * 1000); // Example logic
    setFormData((prev) => ({ ...prev, urlAlias: newAlias }));
  };
  

  const handleMultipleFileChange = (e, fieldName) => {
    const files = Array.from(e.target.files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    
    // Ensure fieldName is always an array
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: Array.isArray(prevData[fieldName]) 
        ? [...prevData[fieldName], ...imageURLs] 
        : imageURLs, // If it's not an array, initialize it with the new files
    }));
  };
  
  const handleRemoveFile = (fileType) => {
    setFormData({
      ...formData,
      [fileType]: "",  // Clear the specific file type
    });
  };

  const removeImage = (imageType) => {
    setFormData((prevData) => ({
      ...prevData,
      [imageType]: null, // Clear the specific image from the formData
    }));
  };
  
  

  const handleRemoveImage = (fieldName, index) => {
    const updatedImages = [...formData[fieldName]];
    updatedImages.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: updatedImages,
    }));
  };

  const handlePreviewImage = (image) => {
    setFormData({ ...formData, previewImage: image });
  };

  const addToList = (fieldName, currentFieldName) => {
    if (formData[currentFieldName]) {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: [...prevData[fieldName], formData[currentFieldName]],
        [currentFieldName]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <div className="w-full bg-blue-600 text-white shadow-md">
        <Topnav />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="lg:w-64 w-full hidden lg:block">
          <Sidenav />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-7xl p-2">
            <div className="w-full bg-white shadow-lg rounded-lg p-8">
              <h1 className="text-2xl font-semibold">Edit VCard</h1>
            </div>

            {/* Sidebar and Content */}
            <div className="grid grid-cols-12 gap-6 mt-6">
              {/* Sidebar */}
              <div className="col-span-3 bg-white p-6 rounded-lg shadow-md">
  <ul className="space-y-4">
    {sidebarItems.map((item) => (
      <li
        key={item.name}
        className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg text-lg font-medium transition duration-200 ${
          activeSection === item.name
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => setActiveSection(item.name)}
      >
        <span className="text-xl">{item.icon}</span>
        {item.name}
      </li>
    ))}
  </ul>
</div>

              {/* Main Content */}
<div className="col-span-9 p-6 bg-gray-50 rounded-lg shadow-md">

{/* Section Render Logic */}
{activeSection === "Basic Details" && (
  <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
    <h2 className="text-2xl font-semibold text-gray-800 mb-8">Basic Details</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

      {/* URL Alias */}
      <div className="flex flex-col">
        <label htmlFor="urlAlias" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
          <span className="text-blue-500">🔗</span> URL Alias:
          <span
            className="text-gray-500 cursor-pointer relative group"
            title="The main URL that your vCard is going to be accessed from."
          >
            <i className="fas fa-info-circle"></i>
            <div className="absolute top-full left-0 bg-black text-white text-xs p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              The main URL that your vCard is going to be accessed from.
            </div>
          </span>
        </label>
        <div className="flex items-center gap-3 mt-1">
          <input
            type="text"
            name="urlAlias"
            value={formData.urlAlias}
            onChange={handleInputChange}
            aria-label="Enter your vCard's URL alias"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Enter URL Alias"
          />
          <button
            type="button"
            onClick={handleRegenerateAlias}
            className="p-3 bg-gradient-to-r from-blue-500 to-teal-400 hover:bg-blue-400 rounded-md text-white transition-all duration-200 ease-in-out"
            title="Regenerate URL Alias"
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
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          aria-label="Enter your first name"
          className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          placeholder="Enter your first name"
        />
      </div>

      {/* Last Name */}
      <div className="flex flex-col">
        <label htmlFor="lastName" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
          <span className="text-green-500">👤</span> Last Name:
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          aria-label="Enter your last name"
          className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          placeholder="Enter your last name"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
          <span className="text-yellow-500">📧</span> Email:
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          aria-label="Enter your email address"
          className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          placeholder="Enter your email address"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col">
        <label htmlFor="phone" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
          <span className="text-blue-500">📱</span> Phone Number:
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          aria-label="Enter your phone number"
          className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          placeholder="Enter your phone number"
        />
      </div>

      {/* Date of Birth */}
      <div className="flex flex-col">
        <label htmlFor="dob" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
          <span className="text-pink-500">🎂</span> Date of Birth:
        </label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          aria-label="Enter your date of birth"
          className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        />
      </div>

      {/* Position Title */}
      <div className="flex flex-col">
        <label htmlFor="positionTitle" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
          <span className="text-gray-700">💼</span> Position Title:
        </label>
        <input
          type="text"
          name="positionTitle"
          value={formData.positionTitle}
          onChange={handleInputChange}
          aria-label="Enter your position title"
          className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          placeholder="Enter your position title"
        />
      </div>

      {/* Address */}
      <div className="flex flex-col">
        <label htmlFor="address" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
          <span className="text-red-500">📍</span> Address:
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          aria-label="Enter your address"
          className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          placeholder="Enter your address"
        />
      </div>

      {/* Education */}
      <div className="flex flex-col">
        <label htmlFor="education" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
          <span className="text-orange-500">🎓</span> Education:
        </label>
        <input
          type="text"
          name="education"
          value={formData.education}
          onChange={handleInputChange}
          aria-label="Enter your education"
          className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          placeholder="Enter your education"
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
            type="checkbox"
            name="showQrCode"
            checked={formData.showQrCode}
            onChange={handleInputChange}
            aria-label="Toggle QR code display"
            className="sr-only"
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
            type="checkbox"
            name="whatsappShare"
            checked={formData.whatsappShare}
            onChange={handleInputChange}
            aria-label="Toggle WhatsApp sharing"
            className="sr-only"
          />
          <span className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-300"></span>
          <span className="absolute inset-y-0 left-1 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-full"></span>
        </label>
      </div>

    </div>
  </div>
)}

              {/* Profile Section */}
{activeSection === "Profile and Banner" && (
  <div className="p-6 bg-white rounded-lg shadow-md space-y-8">

    {/* Profile Picture */}
    <div className="mt-4">
      <label className="text-xl font-semibold mb-4 flex items-center gap-2">
        <i className="fas fa-user-circle text-blue-500"></i> Profile Picture
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleMultipleFileChange(e, "profilePicture")}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-white file:text-blue-700 hover:file:bg-blue-100 transition duration-300 ease-in-out"
      />
      {formData.profilePicture && (
        <div className="mt-4 relative">
          <img
            src={formData.profilePicture}
            alt="Profile Preview"
            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300 shadow-md"
          />
          <button
            onClick={() => removeImage("profilePicture")}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-sm hover:bg-red-600"
          >
            X
          </button>
        </div>
      )}
    </div>

    {/* Banner Image */}
    <div className="mt-8">
      <label className="text-xl font-semibold mb-4 flex items-center gap-2">
        <i className="fas fa-image text-blue-500"></i> Banner Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleMultipleFileChange(e, "bannerImage")}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-white file:text-blue-700 hover:file:bg-blue-100 transition duration-300 ease-in-out"
      />
      {formData.bannerImage && (
        <div className="mt-4 relative">
          <img
            src={formData.bannerImage}
            alt="Banner Preview"
            className="w-full h-32 object-cover rounded-lg border-2 border-gray-300 shadow-md"
          />
          <button
            onClick={() => removeImage("bannerImage")}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-sm hover:bg-red-600"
          >
            X
          </button>
        </div>
      )}
    </div>

  </div>
)}



            {/* Awards Section */}
{activeSection === "Awards" && (
  <div className="p-6 bg-white rounded-lg shadow-md space-y-8">
    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
      <i className="fas fa-trophy text-yellow-500"></i> Awards
    </h2>
    <div className="flex items-center mb-4 space-x-4">
      {/* Input for Award Name */}
      <input
        type="text"
        name="currentAward"
        value={formData.currentAward}
        onChange={handleInputChange}
        placeholder="Enter Award Name"
        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* Add Award Button */}
      <button
        type="button"
        onClick={() => addToList("awards", "currentAward")}
        className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        <i className="fas fa-plus-circle"></i> Add
      </button>
    </div>
    <ul className="list-disc pl-6">
      {formData.awards.map((award, index) => (
        <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
          <i className="fas fa-medal text-yellow-500"></i> {award}
        </li>
      ))}
    </ul>
  </div>
)}

{/* Family Details Section */}
{activeSection === "Family Details" && (
  <div className="p-6 bg-white rounded-lg shadow-md space-y-8">
    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
      <i className="fas fa-users text-green-500"></i> Family Details
    </h2>
    <div className="flex items-center mb-4 space-x-4">
      {/* Input for Family Detail */}
      <input
        type="text"
        name="currentFamilyDetail"
        value={formData.currentFamilyDetail}
        onChange={handleInputChange}
        placeholder="Enter Family Detail"
        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {/* Add Family Detail Button */}
      <button
        type="button"
        onClick={() => addToList("familyDetails", "currentFamilyDetail")}
        className="px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
      >
        <i className="fas fa-plus-circle"></i> Add
      </button>
    </div>
    <ul className="list-disc pl-6">
      {formData.familyDetails.map((family, index) => (
        <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
          <i className="fas fa-user-friends text-green-500"></i> {family}
        </li>
      ))}
    </ul>
  </div>
)}


             {/* Social Work Images */}
{activeSection === "Social Work" && (
  <div className="mt-8 p-8 bg-white rounded-xl shadow-lg max-w-3xl mx-auto">
    <label className="text-2xl font-semibold text-gray-900 mb-6">Social Work Images</label>
    
    {/* File Input */}
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={(e) => handleMultipleFileChange(e, "socialWorkImages")}
      className="block w-full text-sm mt-6 text-gray-500 file:mr-4 file:py-3 file:px-5 file:border-2 file:border-gray-300 file:rounded-xl file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 mb-6"
    />
    
    {/* Images Preview */}
    <div className="flex flex-wrap gap-6 mt-6">
      {formData.socialWorkImages.map((image, index) => (
        <div key={index} className="relative group">
          <img
            src={image}
            alt={`social-work-${index}`}
            className="w-36 h-36 object-cover rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          />
          
          {/* Delete Button */}
          <button
            type="button"
            onClick={() => handleRemoveImage("socialWorkImages", index)}
            className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
  </div>
)}

              {/* Event Images */}
{activeSection === "Events" && (
  <div className="mt-8 p-8 bg-white rounded-xl shadow-lg max-w-3xl mx-auto">
    <label className="text-2xl font-semibold text-gray-900 mb-6">Event Images</label>
    
    {/* File Input */}
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={(e) => handleMultipleFileChange(e, "eventImages")}
      className="block w-full text-sm mt-6 text-gray-500 file:mr-4 file:py-3 file:px-5 file:border-2 file:border-gray-300 file:rounded-xl file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 mb-6"
    />
    
    {/* Images Preview */}
    <div className="flex flex-wrap gap-6 mt-6">
      {formData.eventImages.map((image, index) => (
        <div key={index} className="relative group">
          <img
            src={image}
            alt={`event-${index}`}
            className="w-36 h-36 object-cover rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          />
          
          {/* Delete Button */}
          <button
            type="button"
            onClick={() => handleRemoveImage("eventImages", index)}
            className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
  </div>
)}


                {/* News Center Images */}
{activeSection === "News Center" && (
  <div className="mt-8 p-8 bg-white rounded-xl shadow-lg max-w-3xl mx-auto">
    <label className="text-2xl font-semibold text-gray-900 mb-6">News Center Images</label>
    
    {/* File Input */}
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={(e) => handleMultipleFileChange(e, "newsCenterImages")}
      className="block w-full text-sm mt-6 text-gray-500 file:mr-4 file:py-3 file:px-5 file:border-2 file:border-gray-300 file:rounded-xl file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 mb-6"
    />
    
    {/* Images Preview */}
    <div className="flex flex-wrap gap-6 mt-6">
      {formData.newsCenterImages.map((image, index) => (
        <div key={index} className="relative group">
          <img
            src={image}
            alt={`news-center-${index}`}
            className="w-36 h-36 object-cover rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          />
          
          {/* Delete Button */}
          <button
            type="button"
            onClick={() => handleRemoveImage("newsCenterImages", index)}
            className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
  </div>
)}
            </div>
          </div>

          {/* Save and Reset Buttons */}
<div className="mt-6 flex justify-end">
  <button
    className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4 hover:bg-red-600"
    onClick={handleReset}
  >
    Reset
  </button>
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    onClick={handleSave}
  >
    Save
  </button>
</div>

        </div>
      </div>
    </div>
  </div>
  );
};

export default EditVCard;