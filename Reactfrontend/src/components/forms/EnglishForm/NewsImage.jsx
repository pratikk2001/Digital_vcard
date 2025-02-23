import React, { useState } from "react";

const NewsImage = ({ initialImages = [], onImagesChange = () => {} }) => {
  const [newsImages, setNewsImages] = useState(initialImages);
  const [captions, setCaptions] = useState({});
  const userId = localStorage.getItem("userId");

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length === 0) {
      alert("Please select valid image files.");
      return;
    }

    const updatedImages = [...newsImages, ...files];
    setNewsImages(updatedImages);

    const updatedCaptions = { ...captions };
    files.forEach((_, index) => {
      updatedCaptions[newsImages.length + index] = "";
    });
    setCaptions(updatedCaptions);
    onImagesChange(updatedImages, updatedCaptions);
  };

  const handleCaptionChange = (index, text) => {
    setCaptions((prev) => ({ ...prev, [index]: text }));
  };

  const handleRemoveImage = (index) => {
    setNewsImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      const updatedCaptions = { ...captions };
      delete updatedCaptions[index];
      setCaptions(updatedCaptions);
      onImagesChange(updatedImages, updatedCaptions);
      return updatedImages;
    });
  };


  const handleSave = async () => {
    if (newsImages.length === 0) {
      alert("Please upload at least one news image.");
      return;
    }

    const formData = new FormData();
    newsImages.forEach((file) => {
      formData.append("news", file);
    });

    const captionsArray = newsImages.map((_, index) => captions[index] || "");
    formData.append("captions", JSON.stringify(captionsArray));

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const response = await fetch(
        `${apiBaseUrl}/api/template/save/newsCenterImages/${userId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("News images and captions saved successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error uploading news images:", error);
      alert("Failed to upload news images. Please try again.");
    }

  };

  const handleReset = () => {
    setNewsImages([]);
    setCaptions({});
    onImagesChange([], {});
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">📰 News Center Gallery</h2>

      <div className="flex flex-col">
        <label htmlFor="newsImages" className="text-gray-700 font-medium mb-2">
          🖼️ Upload News Images:
        </label>
        <input
          id="newsImages"
          type="file"
          accept="image/*"
          multiple
          onChange={handleMultipleFileChange}
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
        {newsImages.map((file, index) => {
          const imageUrl = URL.createObjectURL(file);
          return (
            <div key={index} className="relative group">
              <img
                src={imageUrl}
                alt={`news-${index}`}
                className="w-full h-36 object-cover rounded-md shadow-md transition-transform duration-300 hover:scale-105"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
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

export default NewsImage;
