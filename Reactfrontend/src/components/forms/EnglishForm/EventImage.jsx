import React, { useState, useEffect } from "react";

const EventImageForm = ({ initialImages = [], onImagesChange = () => {} }) => {
  const [formData, setFormData] = useState({ images: initialImages });

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
    if (files.length > 0) {
      const newImages = files.map(file => URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
      onImagesChange([...formData.images, ...files]); // Pass array of files to parent
    } else {
      alert('Please select image files');
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

  useEffect(() => {
    return () => {
      formData.images.forEach(url => URL.revokeObjectURL(url));
    };
  }, [formData.images]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Event Images</h2>
      <div className="mb-4">
        <input 
          type="file"
          accept="image/*"
          multiple
          onChange={handleMultipleFileChange}
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {formData.images.map((image, index) => (
          <div key={index} className="relative group">
            <img src={image} alt={`event-${index}`} className="w-32 h-32 object-cover rounded-md border-2 border-gray-300 shadow-md" />
            <button 
              type="button" 
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-sm hover:bg-red-600"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventImageForm;
