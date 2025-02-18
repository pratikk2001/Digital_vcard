import React, { useState, useEffect } from "react";

const SocialImage = ({ initialImage = null, onImageChange = () => {} }) => {
  const [imagePreview, setImagePreview] = useState(initialImage ? [initialImage] : []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).filter(file => file.type.startsWith("image/"));

    if (files.length === 0) {
      alert("Please select valid image files.");
      return;
    }

    const newImageURLs = files.map(file => URL.createObjectURL(file));

    setImagePreview((prevImages) => [...prevImages, ...newImageURLs]);
    onImageChange([...imagePreview, ...files]); // Send files to parent
  };

  const handleRemoveImage = (index) => {
    setImagePreview((prevImages) => {
      const updatedImages = [...prevImages];
      URL.revokeObjectURL(updatedImages[index]); // Clean up memory
      updatedImages.splice(index, 1);
      onImageChange(updatedImages);
      return updatedImages;
    });
  };

  const handleSave = () => {
    console.log("Saved Images:", imagePreview);
    alert("Images saved successfully!"); // Replace with actual save logic
  };

  const handleReset = () => {
    imagePreview.forEach(url => URL.revokeObjectURL(url)); // Clean up memory
    setImagePreview([]);
    onImageChange([]);
  };

  useEffect(() => {
    return () => {
      imagePreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreview]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">📸 सामाजिक फोटो</h2>

      {/* File Upload Input */}
      <div className="flex flex-col">
        <label htmlFor="socialImages" className="text-gray-700 font-medium mb-2">
        🖼️ सामाजिक फोटो अपलोड करा:
        </label>
        <input
          id="socialImages"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Images Preview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
        {imagePreview.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
              alt={`social-image-${index}`}
              className="w-full h-36 object-cover rounded-md shadow-md transition-transform duration-300 hover:scale-105"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      {/* Buttons */}
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

export default SocialImage;
