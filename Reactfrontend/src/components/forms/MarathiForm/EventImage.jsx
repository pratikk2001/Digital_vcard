import React, { useState, useEffect } from "react";
import { FaSave, FaRedo, FaTrashAlt } from "react-icons/fa";

const EventImageForm = ({ initialImages = [], onImagesChange = () => {} }) => {
  const [formData, setFormData] = useState({ images: initialImages });

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files).filter(file => file.type.startsWith("image/"));
    if (files.length > 0) {
      const newImages = files.map(file => URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
      onImagesChange([...formData.images, ...files]); // Pass array of files to parent
    } else {
      alert("Please select image files");
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => {
      const updatedImages = [...prev.images];
      URL.revokeObjectURL(updatedImages[index]); // Clean up the URL
      updatedImages.splice(index, 1);
      onImagesChange(updatedImages);
      return { ...prev, images: updatedImages };
    });
  };

  const saveDetails = () => {
    console.log("Saved Event Images:", formData.images);
    alert("Event images saved successfully!");
  };

  const resetDetails = () => {
    setFormData({ images: [] });
    onImagesChange([]);
  };

  useEffect(() => {
    return () => {
      formData.images.forEach(url => URL.revokeObjectURL(url)); // Clean up URL when component unmounts
    };
  }, [formData.images]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
         📸 प्रसंगी फोटो
      </h2>

      {/* File Upload Input */}
      <div className="flex flex-col mb-4">
        <label htmlFor="eventImages" className="text-gray-700 font-medium mb-2">🖼️ प्रसंगी फोटो अपलोड करा:</label>
        <input
          id="eventImages"
          type="file"
          accept="image/*"
          multiple
          onChange={handleMultipleFileChange}
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Image Previews */}
      <div className="flex flex-wrap gap-4 mt-6">
        {formData.images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
              alt={`event-${index}`}
              className="w-32 h-32 object-cover rounded-md border-2 border-gray-300 shadow-md"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>

      {/* Save and Reset Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={saveDetails}
          className="p-3 bg-green-500 hover:bg-green-400 rounded-md text-white flex items-center gap-2"
        >
          <FaSave /> Save
        </button>
        <button
          onClick={resetDetails}
          className="p-3 bg-gray-500 hover:bg-gray-400 rounded-md text-white flex items-center gap-2"
        >
          <FaRedo /> Reset
        </button>
      </div>
    </div>
  );
};

export default EventImageForm;
