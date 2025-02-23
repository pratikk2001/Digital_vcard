import React, { useState, useEffect } from "react";

const AwardsComponent = ({ initialAwards = [], onAwardsChange = () => {} }) => {

  const [awards, setAwards] = useState(initialAwards);
  const [captions, setCaptions] = useState({});
  const UserId = localStorage.getItem("userId");

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length === 0) {
      alert("Please select valid image files.");
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
    setCaptions((prev) => ({ ...prev, [index]: text }));
  };

  const handleRemoveAward = (index) => {
    setAwards((prevAwards) => {
      const updatedAwards = prevAwards.filter((_, i) => i !== index);
      const updatedCaptions = { ...captions };
      delete updatedCaptions[index];
      setCaptions(updatedCaptions);
      onAwardsChange(updatedAwards, updatedCaptions);
      return updatedAwards;
    });
  };

  const handleSave = async () => {
    if (awards.length === 0) {
      alert("Please upload at least one award image.");
      return;
    }

    const formData = new FormData();
  awards.forEach((file) => {
    formData.append("awards", file);
  });

  const captionsArray = awards.map((_, index) => captions[index] || "");
  formData.append("captions", JSON.stringify(captionsArray)); // Send as JSON array



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
    onAwardsChange([], {});
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">🏆 Awards Gallery</h2>

      <div className="flex flex-col">
        <label htmlFor="awardImages" className="text-gray-700 font-medium mb-2">
          🖼️ Upload Award Images:
        </label>
        <input
          id="awardImages"
          type="file"
          accept="image/*"
          multiple
          onChange={handleMultipleFileChange}
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
        />
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
            </div>
          );
        })}
      </div>

      {/* Save and Reset Buttons */}
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