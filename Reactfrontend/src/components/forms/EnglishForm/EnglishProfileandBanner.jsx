import React, { useState } from "react";

const ProfileBanner = () => {
  // Initialize state with formData which might include other fields as well
  const [formData, setFormData] = useState({
    profilePicture: null,
    bannerImage:null
    // other fields can be added here
  });

  const handleMultipleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        [field]: URL.createObjectURL(file)
      }));
    }
  };

  const removeImage = (field) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: null
    }));
  };

  return (
    <div className="mt-4">
      <label className="text-xl font-bold mb-4 flex items-center gap-2">
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

<div className="mt-8">
      <label className="text-xl font-bold mb-4 flex items-center gap-2">
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
  );
};

export default ProfileBanner;