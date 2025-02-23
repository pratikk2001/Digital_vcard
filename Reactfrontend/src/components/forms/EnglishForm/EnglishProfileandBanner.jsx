import React, { useState } from "react";

const ProfileBanner = () => {
  const [formData, setFormData] = useState({
    profilePicture: null,
    bannerImage: null,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0], // Store the actual File object
      });
    }
  };
  

  const removeImage = (field) => {
    setFormData({
      ...formData,
      [field]: null,
    });
  };

  const saveDetails =async () => {
    console.log("Saved Profile & Banner Details:", formData);

    if (!formData.profilePicture && !formData.bannerImage) {
      alert("Please select at least one image.");
      return;
    }
  
    const userId = localStorage.getItem("userId");
    const formDataToSend = new FormData();
  
    if (formData.profilePicture) {
      formDataToSend.append("profilePicture", formData.profilePicture); // ✅ File object
    }
    if (formData.bannerImage) {
      formDataToSend.append("bannerImage", formData.bannerImage); // ✅ File object
    }
  
    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
  
      const response = await fetch(`${apiBaseUrl}/api/template/save/ProfileBanner/${userId}`, {
        method: "POST",
        body: formDataToSend,
      });

    const result = await response.json();
    if (response.ok) {
      alert("Profile and banner updated successfully!");
      // console.log("Response:", result);
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error uploading images:", error);
    alert("Failed to upload images. Please try again.");
  }

  };

  const resetDetails = () => {
    setFormData({
      profilePicture: null,
      bannerImage: null,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">📸 Profile & Banner</h2>

      {/* Profile Picture Upload */}
      <div className="flex flex-col mb-6">
        <label className="text-gray-700 font-medium mb-2">👤 Profile Picture:</label>
        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleFileChange}
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
        />
        {formData.profilePicture && (
          <div className="mt-4 relative">
            <img
              src={URL.createObjectURL(formData.profilePicture)}
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

      {/* Banner Image Upload */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-2">🖼️ Banner Image:</label>
        <input
          type="file"
          name="bannerImage"
          accept="image/*"
          onChange={handleFileChange}
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
        />
        {formData.bannerImage && (
          <div className="mt-4 relative">
            <img
              src={URL.createObjectURL(formData.bannerImage)}
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

      {/* Save and Reset Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={saveDetails}
          className="p-3 bg-green-500 hover:bg-green-400 rounded-md text-white"
        >
          💾 Save
        </button>
        <button
          onClick={resetDetails}
          className="p-3 bg-gray-500 hover:bg-gray-400 rounded-md text-white"
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );

  
};

export default ProfileBanner;
