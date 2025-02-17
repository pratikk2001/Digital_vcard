import React, { useState, useEffect } from "react";

const EventImage = ({ initialImages = [], onImagesChange = () => {} }) => {
  const [imagesPreview, setImagesPreview] = useState(initialImages);

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
    if (files.length > 0) {
      const newImages = files.map(file => URL.createObjectURL(file));
      setImagesPreview(prevImages => [...prevImages, ...newImages]);
      onImagesChange([...imagesPreview, ...files]); // Pass array of files to parent
    } else {
      alert('Please select image files');
    }
  };

  const handleRemoveImage = (index) => {
    setImagesPreview(prevImages => {
      const updatedImages = [...prevImages];
      URL.revokeObjectURL(updatedImages[index]); // Clean up the URL
      updatedImages.splice(index, 1);
      onImagesChange(updatedImages);
      return updatedImages;
    });
  };

  useEffect(() => {
    // Cleanup function when component unmounts or when images change
    return () => {
      imagesPreview.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagesPreview]);

  return (
    <div className="mt-8 p-8 bg-white rounded-xl shadow-lg max-w-3xl mx-auto">
      <label className="text-2xl font-bold text-gray-900 mb-6">Event Images</label>
      
      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleMultipleFileChange}
        className="block w-full text-sm mt-6 text-gray-500 file:mr-4 file:py-3 file:px-5 file:border-2 file:border-gray-300 file:rounded-xl file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 mb-6"
      />
      
      {/* Images Preview */}
      <div className="flex flex-wrap gap-6 mt-6">
        {imagesPreview.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
              alt={`event-${index}`}
              className="w-36 h-36 object-cover rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            />
            
            {/* Delete Button */}
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventImage;