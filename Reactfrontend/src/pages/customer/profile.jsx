import React, { useState } from "react";
import TopNavbar from "../../components/customer_nav/Topnavbar";
import Sidenav from "../../components/customer_nav/Customersidenav";
// import VCard from "./VCard"; 

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    profilePicture: "",
    bannerImage: "",
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
    socialWorkImages: [],
    eventImages: [],
    newsCenterImages: [],
  });

  const [feedback, setFeedback] = useState({
    successMessage: "",
    errorMessage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          [fieldName]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleFileChange = (e, fieldName) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: [...prevState[fieldName], ...fileUrls],
    }));
  };

  const addToList = (listName, inputField) => {
    const value = formData[inputField];
    if (value) {
      setFormData((prevState) => ({
        ...prevState,
        [listName]: [...prevState[listName], value],
        [inputField]: "", // Clear the input field after adding
      }));
    }
  };

  const handleSave = () => {
    // Handle save logic here
    setFeedback({ successMessage: "Profile saved successfully!", errorMessage: "" });
  };

  const handleReset = () => {
    // Reset all fields to default
    setFormData({
      profilePicture: "",
      bannerImage: "",
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
      socialWorkImages: [],
      eventImages: [],
      newsCenterImages: [],
    });
    setFeedback({ successMessage: "", errorMessage: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavbar />
      <Sidenav />

      {feedback.successMessage && (
        <div className="text-green-500 text-center py-2">{feedback.successMessage}</div>
      )}
      {feedback.errorMessage && (
        <div className="text-red-500 text-center py-2">{feedback.errorMessage}</div>
      )}

      <div className="container mx-auto px-4 py-6 grid md:grid-cols-2  ml-96 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "profilePicture")}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-white file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.profilePicture && (
                <img
                  src={formData.profilePicture}
                  alt="Profile Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-full"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "bannerImage")}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-white file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.bannerImage && (
                <img
                  src={formData.bannerImage}
                  alt="Banner Preview"
                  className="mt-2 w-full h-32 object-cover rounded-lg"
                />
              )}
            </div>
          </div>

          {/* Name, Email, Phone, Address Fields */}
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Date of Birth and Education */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              placeholder="Enter your education"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Awards Section */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Awards</label>
            <div className="flex items-center">
              <input
                type="text"
                name="currentAward"
                value={formData.currentAward}
                onChange={handleInputChange}
                placeholder="Enter award name"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                type="button"
                onClick={() => addToList("awards", "currentAward")}
                className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-lg"
              >
                Add
              </button>
            </div>
            <ul className="mt-2">
              {formData.awards.map((award, index) => (
                <li key={index} className="text-sm text-gray-700">{award}</li>
              ))}
            </ul>
          </div>

          {/* Family Details Section */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Family Details</label>
            <div className="flex items-center">
              <input
                type="text"
                name="currentFamilyDetail"
                value={formData.currentFamilyDetail}
                onChange={handleInputChange}
                placeholder="Enter family detail"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                type="button"
                onClick={() => addToList("familyDetails", "currentFamilyDetail")}
                className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-lg"
              >
                Add
              </button>
            </div>
            <ul className="mt-2">
              {formData.familyDetails.map((family, index) => (
                <li key={index} className="text-sm text-gray-700">{family}</li>
              ))}
            </ul>
          </div>

          {/* Social Work, Event, and News Center Images Section */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Social Work Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleMultipleFileChange(e, "socialWorkImages")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-white file:text-blue-700 hover:file:bg-blue-100"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.socialWorkImages.map((image, index) => (
                <img key={index} src={image} alt={`social-work-${index}`} className="w-16 h-16 object-cover rounded" />
              ))}
            </div>
          </div>

          {/* Event Images */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Event Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleMultipleFileChange(e, "eventImages")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-white file:text-blue-700 hover:file:bg-blue-100"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.eventImages.map((image, index) => (
                <img key={index} src={image} alt={`event-${index}`} className="w-16 h-16 object-cover rounded" />
              ))}
            </div>
          </div>

          {/* News Center Images */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">News Center Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleMultipleFileChange(e, "newsCenterImages")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-white file:text-blue-700 hover:file:bg-blue-100"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.newsCenterImages.map((image, index) => (
                <img key={index} src={image} alt={`news-center-${index}`} className="w-16 h-16 object-cover rounded" />
              ))}
            </div>
          </div>

          {/* Save and Reset Buttons */}
          <div className="flex mt-6 justify-between">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
