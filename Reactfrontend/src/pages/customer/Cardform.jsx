import React, { useState } from "react";

const VCard = ({ profileData }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Banner Section */}
        <div className="relative">
          <img
            src={profileData.bannerImage || "/assets/5.jpg"}
            alt="banner"
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Profile Section */}
        <div className="relative text-center mt-[-4rem]">
          <img
            src={profileData.profilePicture || "/assets/default-profile.png"}
            alt="profile-img"
            className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
          />
          <h4 className="mt-4 text-lg font-bold">{profileData.name || "User Name"}</h4>
          <p className="text-sm text-gray-600">{profileData.address || "User Address"}</p>
        </div>

        {/* Details Section */}
        <div className="p-6">
          <blockquote className="text-justify text-gray-800">
          <p>
              <strong>Contact:</strong> {profileData.phone || "Enter a Phone Number"}
            </p>
            <p>
              <strong>Email:</strong> {profileData.email || "Enter a Email Address"}
            </p>
            <p>
              <strong>Education:</strong> {profileData.education || "Enter a Education"}
            </p>
            <p>
              <strong>Date of Birth:</strong> {profileData.dob || "Date Of Birth"}
            </p>
            <p>
              <strong>Awards:</strong>
              <ul className="list-disc pl-6">
                {profileData.awards.length > 0 ? (
                  profileData.awards.map((award, index) => (
                    <li key={index}>{award}</li>
                  ))
                ) : (
                  <li>No awards added</li>
                )}
              </ul>
            </p>
            <p>
              <strong>Family:</strong>
              <ul className="list-disc pl-6">
                {profileData.familyDetails.length > 0 ? (
                  profileData.familyDetails.map((family, index) => (
                    <li key={index}>{family}</li>
                  ))
                ) : (
                  <li>No family details added</li>
                )}
              </ul>
            </p>
            <p>
              <strong>Social Work Images:</strong>
              <div className="flex flex-wrap gap-2">
                {profileData.socialWorkImages.length > 0 ? (
                  profileData.socialWorkImages.map((image, index) => (
                    <img key={index} src={image} alt={`social-work-${index}`} className="w-16 h-16 object-cover rounded" />
                  ))
                ) : (
                  <p>No social work images added</p>
                )}
              </div>
            </p>
            <p>
              <strong>Event Images:</strong>
              <div className="flex flex-wrap gap-2">
                {profileData.eventImages.length > 0 ? (
                  profileData.eventImages.map((image, index) => (
                    <img key={index} src={image} alt={`event-${index}`} className="w-16 h-16 object-cover rounded" />
                  ))
                ) : (
                  <p>No event images added</p>
                )}
              </div>
            </p>
            <p>
              <strong>News Center Images:</strong>
              <div className="flex flex-wrap gap-2">
                {profileData.newsCenterImages.length > 0 ? (
                  profileData.newsCenterImages.map((image, index) => (
                    <img key={index} src={image} alt={`news-center-${index}`} className="w-16 h-16 object-cover rounded" />
                  ))
                ) : (
                  <p>No news center images added</p>
                )}
              </div>
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const [formData, setFormData] = useState({
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

  const [feedback, setFeedback] = useState({
    successMessage: "",
    errorMessage: "",
  });

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setFormData({ ...formData, [field]: URL.createObjectURL(file) });
    } else {
      setFeedback({ ...feedback, errorMessage: "File size exceeds 5MB." });
    }
  };

  const handleMultipleFileChange = (e, field) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const imageUrls = [];
    let isValid = true;

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        isValid = false;
      } else {
        imageUrls.push(URL.createObjectURL(file));
      }
    });

    if (isValid) {
      setFormData({ ...formData, [field]: imageUrls });
      setFeedback({ ...feedback, errorMessage: "" });
    } else {
      setFeedback({ ...feedback, errorMessage: "One or more files exceed 5MB." });
    }
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
    setFeedback({ successMessage: "", errorMessage: "" });
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setFeedback({ ...feedback, errorMessage: "Name, Email, and Phone are required." });
      return;
    }

    if (!validateEmail(formData.email)) {
      setFeedback({ ...feedback, errorMessage: "Invalid email address." });
      return;
    }

    if (!validatePhone(formData.phone)) {
      setFeedback({ ...feedback, errorMessage: "Invalid phone number." });
      return;
    }

    setFeedback({ ...feedback, successMessage: "Profile saved successfully!" });
    console.log("Saved Data:", formData);
  };

  const addToList = (field, currentField) => {
    if (formData[currentField]) {
      setFormData({
        ...formData,
        [field]: [...formData[field], formData[currentField]],
        [currentField]: "",
      });
      setFeedback({ ...feedback, successMessage: `${currentField} added successfully!` });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative bg-gradient-to-r from-pink-500 to-purple-500 text-white py-6 px-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Create Your Profile</h1>
      </div>

      {feedback.successMessage && (
        <div className="text-green-500 text-center py-2">{feedback.successMessage}</div>
      )}
      {feedback.errorMessage && (
        <div className="text-red-500 text-center py-2">{feedback.errorMessage}</div>
      )}

      <div className="container mx-auto px-4 py-6 grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Form Section */}
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
            <label className="block text-sm font-medium mb-2">Description</label>
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
                <li key={index} className="text-sm text-gray-700">
                  {award}
                </li>
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
                <li key={index} className="text-sm text-gray-700">
                  {family}
                </li>
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
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded-lg"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Profile Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <VCard profileData={formData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
