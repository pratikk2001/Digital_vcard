import React, { useState, useEffect } from "react";

const NewsImage = ({ initialImages = [], onImagesChange = () => {} }) => {
  const [imagesPreview, setImagesPreview] = useState(initialImages);
  const [captions, setCaptions] = useState({});
  const [youtubeLink, setYoutubeLink] = useState("");

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files).filter(file => file.type.startsWith("image/"));
    
    if (files.length === 0) {
      alert("Please select valid image files.");
      return;
    }

    const newImageURLs = files.map(file => URL.createObjectURL(file));
    setImagesPreview((prevImages) => [...prevImages, ...newImageURLs]);

    const updatedCaptions = { ...captions };
    newImageURLs.forEach((_, index) => {
      updatedCaptions[imagesPreview.length + index] = "";
    });
    setCaptions(updatedCaptions);
    onImagesChange([...imagesPreview, ...files], updatedCaptions, youtubeLink);
  };

  const handleCaptionChange = (index, text) => {
    setCaptions(prev => {
      const updatedCaptions = { ...prev, [index]: text };
      return updatedCaptions;
    });
  };

  const handleRemoveImage = (index) => {
    setImagesPreview((prevImages) => {
      const updatedImages = [...prevImages];
      URL.revokeObjectURL(updatedImages[index]);
      updatedImages.splice(index, 1);

      const updatedCaptions = { ...captions };
      delete updatedCaptions[index];
      setCaptions(updatedCaptions);

      onImagesChange(updatedImages, updatedCaptions, youtubeLink);
      return updatedImages;
    });
  };

  const handleSave = () => {
    console.log("Saved Images:", imagesPreview);
    console.log("Saved Captions:", captions);
    console.log("YouTube Link:", youtubeLink);
    alert("Images, captions, and YouTube link saved successfully!");
  };

  const handleReset = () => {
    imagesPreview.forEach(url => URL.revokeObjectURL(url));
    setImagesPreview([]);
    setCaptions({});
    setYoutubeLink("");
    onImagesChange([], {}, "");
  };

  useEffect(() => {
    return () => {
      imagesPreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagesPreview]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">📸 News Center Images</h2>

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
        {imagesPreview.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
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
        ))}
      </div>

      {/* YouTube Link Input */}
      <div className="mt-6">
        <label className="text-gray-700 font-medium mb-2">📹 Add YouTube Link:</label>
        <input
          type="text"
          placeholder="Enter YouTube link..."
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end gap-4 mt-6">
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
