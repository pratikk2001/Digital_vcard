import React, { useState } from "react";

const NewsImage = ({ formData: parentFormData, setFormData: setParentFormData }) => {
  const initialImages = parentFormData.newsCenterImages || [];
  const initialCaptions = parentFormData.captions || {};
  const [newsImages, setNewsImages] = useState(initialImages);
  const [captions, setCaptions] = useState(initialCaptions);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length === 0) {
      alert("Please select valid image files.");
      return;
    }

    const totalImages = newsImages.length + files.length;
    if (totalImages > 5) {
      alert("You can upload a maximum of 5 news images.");
      return;
    }

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds 5MB limit.`);
        return;
      }
    });

    const updatedImages = [...newsImages, ...files];
    setNewsImages(updatedImages);

    const updatedCaptions = { ...captions };
    files.forEach((_, index) => {
      updatedCaptions[newsImages.length + index] = "";
    });
    setCaptions(updatedCaptions);

    setParentFormData((prev) => ({
      ...prev,
      newsCenterImages: updatedImages,
      captions: updatedCaptions,
    }));
  };

  const handleCaptionChange = (index, text) => {
    const updatedCaptions = { ...captions, [index]: text };
    setCaptions(updatedCaptions);
    setParentFormData((prev) => ({ ...prev, captions: updatedCaptions }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = newsImages.filter((_, i) => i !== index);
    const updatedCaptions = { ...captions };
    delete updatedCaptions[index];
    const reIndexedCaptions = {};
    updatedImages.forEach((_, i) => {
      reIndexedCaptions[i] = updatedCaptions[i] || "";
    });

    setNewsImages(updatedImages);
    setCaptions(reIndexedCaptions);
    setParentFormData((prev) => ({
      ...prev,
      newsCenterImages: updatedImages,
      captions: reIndexedCaptions,
    }));
  };

  const handleSave = async () => {
    if (newsImages.length === 0) {
      alert("Please upload at least one news image.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    newsImages.forEach((file) => {
      formData.append("news", file);
    });

    const captionsArray = newsImages.map((_, index) => captions[index] || "");
    formData.append("captions", JSON.stringify(captionsArray));

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const endpoint = `${apiBaseUrl}/save/newsCenterImages/${userId}`;
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok && result.status_code === 200) {
        setParentFormData((prev) => ({
          ...prev,
          newsCenterImages: result.data.newsCenterImages,
          captions: captionsArray.reduce((acc, caption, i) => ({ ...acc, [i]: caption }), {}),
        }));
        alert("News images and captions saved successfully!");
      } else {
        throw new Error(result.message || "Failed to save news images");
      }
    } catch (error) {
      console.error("Error uploading news images:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all news images and captions?")) {
      setNewsImages([]);
      setCaptions({});
      setParentFormData((prev) => ({ ...prev, newsCenterImages: [], captions: {} }));
    }
  };

  const captionMaxLength = 100;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">📰 News Center Gallery</h2>

      <div className="flex flex-col mb-6">
        <label htmlFor="newsImages" className="text-gray-700 font-medium mb-2">
          🖼️ Upload News Images (Max 5):
        </label>
        <input
          id="newsImages"
          type="file"
          accept="image/*"
          multiple
          onChange={handleMultipleFileChange}
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isSubmitting}
        />
        <p className="text-sm text-gray-500 mt-1">
          Max file size: 5MB. Current: {newsImages.length}/5 images.
        </p>
      </div>

      {newsImages.length > 0 && (
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
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700 disabled:bg-gray-400"
                  disabled={isSubmitting}
                >
                  ❌
                </button>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder={`Caption (max ${captionMaxLength} chars)`}
                    value={captions[index] || ""}
                    onChange={(e) => handleCaptionChange(index, e.target.value)}
                    maxLength={captionMaxLength}
                    className="w-full h-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {captions[index]?.length || 0}/{captionMaxLength} characters
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={handleSave}
          className="p-3 bg-green-500 hover:bg-green-400 rounded-md text-white disabled:bg-gray-400"
          disabled={isSubmitting || newsImages.length === 0}
        >
          {isSubmitting ? "Saving..." : "💾 Save"}
        </button>
        <button
          onClick={handleReset}
          className="p-3 bg-gray-500 hover:bg-gray-400 rounded-md text-white disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
};

export default NewsImage;