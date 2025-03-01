import React, { useState } from "react";

const AwardsComponent = ({ initialAwards = [], onAwardsChange = () => {} }) => {
  const [awards, setAwards] = useState(initialAwards);
  const [captions, setCaptions] = useState({});
  const [captionErrors, setCaptionErrors] = useState({});

  const UserId = localStorage.getItem("userId");
  
  const MAX_CAPTION_LENGTH = 100;
  const MAX_IMAGES = 5;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length === 0) {
      alert("Please select valid image files.");
      return;
    }

    // Check total number of images
    const totalImages = awards.length + files.length;
    if (totalImages > MAX_IMAGES) {
      alert(`Maximum ${MAX_IMAGES} images allowed. You tried to upload ${files.length} additional images, but already have ${awards.length}.`);
      return;
    }

    // Check file sizes
    const oversizedFiles = files.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      alert(`The following files exceed 5MB limit: ${oversizedFiles.map(f => f.name).join(", ")}`);
      return;
    }

    const updatedAwards = [...awards, ...files];
    setAwards(updatedAwards);

    const updatedCaptions = { ...captions };
    files.forEach((_, index) => {
      updatedCaptions[awards.length + index] = "";
    });
    setCaptions(updatedCaptions);
    onAwardsChange(updatedAwards, updatedCaptions);
  };

  const handleCaptionChange = (index, text) => {
    if (text.length <= MAX_CAPTION_LENGTH) {
      setCaptions((prev) => ({ ...prev, [index]: text }));
      setCaptionErrors((prev) => ({ ...prev, [index]: "" }));
      onAwardsChange(awards, { ...captions, [index]: text });
    } else {
      setCaptionErrors((prev) => ({
        ...prev,
        [index]: `Caption must not exceed ${MAX_CAPTION_LENGTH} characters.`,
      }));
    }
  };

  const handleRemoveAward = (index) => {
    setAwards((prevAwards) => {
      const updatedAwards = prevAwards.filter((_, i) => i !== index);
      const updatedCaptions = { ...captions };
      delete updatedCaptions[index];
      setCaptions(updatedCaptions);
      setCaptionErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[index];
        return updatedErrors;
      });
      onAwardsChange(updatedAwards, updatedCaptions);
      return updatedAwards;
    });
  };

  const handleSave = async () => {
    if (awards.length === 0) {
      alert("Please upload at least one award image.");
      return;
    }

    const hasErrors = Object.values(captionErrors).some((error) => error);
    if (hasErrors) {
      alert("Please fix caption errors before saving.");
      return;
    }

    const formData = new FormData();
    awards.forEach((file) => {
      formData.append("awards", file);
    });

    const captionsArray = awards.map((_, index) => captions[index] || "");
    formData.append("captions", JSON.stringify(captionsArray));

    console.log("Awards FormData:", formData);

    try {
      const apiBaseUrl =
        process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const response = await fetch(
        `${apiBaseUrl}/api/template/save/awards/${UserId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Awards and captions saved successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error uploading awards:", error);
      alert("Failed to upload awards. Please try again.");
    }
  };

  const handleReset = () => {
    setAwards([]);
    setCaptions({});
    setCaptionErrors({});
    onAwardsChange([], {});
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">🏆 Awards Gallery</h2>

      <div className="flex flex-col">
        <label htmlFor="awardImages" className="text-gray-700 font-medium mb-2">
          🖼️ Upload Award Images (Max {MAX_IMAGES}):
        </label>
        <input
          id="awardImages"
          type="file"
          accept="image/*"
          multiple
          onChange={handleMultipleFileChange}
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-gray-500 text-sm mt-1">
          Max file size: 5MB. Current: {awards.length}/{MAX_IMAGES} images
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
        {awards.map((file, index) => {
          const imageUrl = URL.createObjectURL(file);
          return (
            <div key={index} className="relative group">
              <img
                src={imageUrl}
                alt={`award-${index}`}
                className="w-full h-36 object-cover rounded-md shadow-md transition-transform duration-300 hover:scale-105"
              />
              <button
                type="button"
                onClick={() => handleRemoveAward(index)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
              >
                ❌
              </button>
              <input
                type="text"
                placeholder="Enter caption..."
                value={captions[index] || ""}
                onChange={(e) => handleCaptionChange(index, e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {captionErrors[index] && (
                <span className="text-red-500 text-sm mt-1">{captionErrors[index]}</span>
              )}
              <div className="text-gray-500 text-sm mt-1">
                {captions[index]?.length || 0}/{MAX_CAPTION_LENGTH}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-4 mt-4">
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
    </div>
  );
};

export default AwardsComponent;