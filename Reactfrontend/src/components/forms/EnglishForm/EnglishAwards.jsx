import React, { useState, useEffect } from "react";

const AwardsComponent = ({ initialAwards = [], onAwardsChange = () => {} }) => {
  const [awardsPreview, setAwardsPreview] = useState(initialAwards);
  const [captions, setCaptions] = useState({});

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files).filter(file => file.type.startsWith("image/"));

    if (files.length === 0) {
      alert("Please select valid image files.");
      return;
    }

    const newImageURLs = files.map(file => URL.createObjectURL(file));
    setAwardsPreview((prevAwards) => [...prevAwards, ...newImageURLs]);

    const updatedCaptions = { ...captions };
    newImageURLs.forEach((_, index) => {
      updatedCaptions[awardsPreview.length + index] = "";
    });
    setCaptions(updatedCaptions);
    onAwardsChange([...awardsPreview, ...files], updatedCaptions);
  };

  const handleCaptionChange = (index, text) => {
    setCaptions(prev => {
      const updatedCaptions = { ...prev, [index]: text };
      return updatedCaptions;
    });
  };

  const handleRemoveAward = (index) => {
    setAwardsPreview((prevAwards) => {
      const updatedAwards = [...prevAwards];
      URL.revokeObjectURL(updatedAwards[index]);
      updatedAwards.splice(index, 1);

      const updatedCaptions = { ...captions };
      delete updatedCaptions[index];
      setCaptions(updatedCaptions);

      onAwardsChange(updatedAwards, updatedCaptions);
      return updatedAwards;
    });
  };

  const handleSave = () => {
    console.log("Saved Awards:", awardsPreview);
    console.log("Saved Captions:", captions);
    alert("Awards and captions saved successfully!");
  };

  const handleReset = () => {
    awardsPreview.forEach(url => URL.revokeObjectURL(url));
    setAwardsPreview([]);
    setCaptions({});
    onAwardsChange([], {});
  };

  useEffect(() => {
    return () => {
      awardsPreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [awardsPreview]);

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
        {awardsPreview.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
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
        ))}
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
