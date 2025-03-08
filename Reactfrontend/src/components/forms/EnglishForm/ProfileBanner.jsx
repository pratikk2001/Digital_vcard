import React, { useState, useEffect } from "react";

const ProfileBanner = ({ formData: parentFormData, setFormData: setParentFormData }) => {
  const [localFormData, setLocalFormData] = useState({
    profilePicture: null,
    bannerImage: null,
  });
  const [existingProfilePictureUrl, setExistingProfilePictureUrl] = useState(null);
  const [existingBannerImageUrl, setExistingBannerImageUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to fetch existing images from the server
  const fetchExistingImages = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const response = await fetch(`${apiBaseUrl}/api/template/getFormData/${userId}`);
      const result = await response.json();
      if (result.status_code === 200) {
        const { profilePicture, bannerImage } = result.data;
        // Set URLs for existing images if filenames exist
        setExistingProfilePictureUrl(
          profilePicture ? `${apiBaseUrl}/api/template/getprofileImage/${profilePicture}` : null
        );
        setExistingBannerImageUrl(
          bannerImage ? `${apiBaseUrl}/api/template/getBanerImage/${bannerImage}` : null
        );
        // Update parent form data with filenames
        setParentFormData((prev) => ({
          ...prev,
          profilePicture: profilePicture || prev.profilePicture,
          bannerImage: bannerImage || prev.bannerImage,
        }));
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  // Fetch existing images when the component mounts
  useEffect(() => {
    fetchExistingImages();
  }, []);

  // Handle file selection and validation
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB.");
        return;
      }
      setLocalFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    }
  };

  // Remove a newly selected image
  const removeImage = (field) => {
    setLocalFormData((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  // Save new images to the server
  const saveDetails = async () => {
    if (!localFormData.profilePicture && !localFormData.bannerImage) {
      alert("Please select at least one image to save.");
      return;
    }

    setIsSubmitting(true);
    const userId = localStorage.getItem("userId");
    const formDataToSend = new FormData();

    if (localFormData.profilePicture) {
      formDataToSend.append("profilePicture", localFormData.profilePicture);
    }
    if (localFormData.bannerImage) {
      formDataToSend.append("bannerImage", localFormData.bannerImage);
    }

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const response = await fetch(`${apiBaseUrl}/api/template/save/ProfileBanner/${userId}`, {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok && result.status_code === 200) {
        alert("Profile and banner updated successfully!");
        // Refetch images to update display
        await fetchExistingImages();
        // Clear new uploads
        setLocalFormData({
          profilePicture: null,
          bannerImage: null,
        });
      } else {
        throw new Error(result.message || "Failed to upload images");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset to clear new selections
  const resetDetails = () => {
    setLocalFormData({
      profilePicture: null,
      bannerImage: null,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">📸 Profile & Banner</h2>

      {/* Profile Picture Section */}
      <div className="flex flex-col mb-6">
        <label className="text-gray-700 font-medium mb-2">👤 Profile Picture:</label>
        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleFileChange}
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isSubmitting}
        />
        {localFormData.profilePicture ? (
          <div className="mt-4 relative">
            <img
              src={URL.createObjectURL(localFormData.profilePicture)}
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300 shadow-md"
            />
            <button
              onClick={() => removeImage("profilePicture")}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1.5 text-sm hover:bg-red-600 disabled:bg-gray-400"
              disabled={isSubmitting}
            >
              ✕
            </button>
          </div>
        ) : existingProfilePictureUrl ? (
          <div className="mt-4 relative">
            <img
              src={existingProfilePictureUrl}
              alt="Existing Profile"
              className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300 shadow-md"
            />
          </div>
        ) : null}
      </div>

      {/* Banner Image Section */}
      <div className="flex flex-col mb-6">
        <label className="text-gray-700 font-medium mb-2">🖼️ Banner Image:</label>
        <input
          type="file"
          name="bannerImage"
          accept="image/*"
          onChange={handleFileChange}
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isSubmitting}
        />
        {localFormData.bannerImage ? (
          <div className="mt-4 relative">
            <img
              src={URL.createObjectURL(localFormData.bannerImage)}
              alt="Banner Preview"
              className="w-full h-32 object-cover rounded-lg border-2 border-gray-300 shadow-md"
            />
            <button
              onClick={() => removeImage("bannerImage")}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1.5 text-sm hover:bg-red-600 disabled:bg-gray-400"
              disabled={isSubmitting}
            >
              ✕
            </button>
          </div>
        ) : existingBannerImageUrl ? (
          <div className="mt-4 relative">
            <img
              src={existingBannerImageUrl}
              alt="Existing Banner"
              className="w-full h-32 object-cover rounded-lg border-2 border-gray-300 shadow-md"
            />
          </div>
        ) : null}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={saveDetails}
          className="p-3 bg-green-500 hover:bg-green-400 rounded-md text-white disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "💾 Save"}
        </button>
        <button
          onClick={resetDetails}
          className="p-3 bg-gray-500 hover:bg-gray-400 rounded-md text-white disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
};

export default ProfileBanner;