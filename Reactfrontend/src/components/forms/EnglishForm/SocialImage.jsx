import React, { useState, useEffect } from "react";

const SocialImage = ({ formData: parentFormData, setFormData: setParentFormData }) => {
  const [existingImages, setExistingImages] = useState([]); // Stores fetched images with URLs and captions
  const [newImages, setNewImages] = useState([]); // Stores newly uploaded files
  const [captions, setCaptions] = useState({});
  const [captionErrors, setCaptionErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = localStorage.getItem("userId");

  const MAX_CAPTION_LENGTH = 100; // Max characters for captions
  const MAX_IMAGES = 5; // Max number of images allowed

  // ### Fetch Existing Images on Mount
  useEffect(() => {
    const fetchExistingImages = async () => {
      try {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
        const response = await fetch(`${apiBaseUrl}/api/template/getFormData/${userId}`);
        const result = await response.json();
        if (result.status_code === 200) {
          const { socialWorkImages } = result.data;
          if (socialWorkImages && socialWorkImages.length > 0) {
            const imagesWithUrls = socialWorkImages.map((img) => ({
              url: `${apiBaseUrl}/api/template/getSocialWorkImage/${img.imageUrl}`,
              caption: img.caption || "",
            }));
            setExistingImages(imagesWithUrls);
            const initialCaptions = {};
            imagesWithUrls.forEach((img, index) => {
              initialCaptions[index] = img.caption;
            });
            setCaptions(initialCaptions);
          }
        }
      } catch (error) {
        console.error("Error fetching social work images:", error);
      }
    };
    fetchExistingImages();
  }, [userId]);

  // ### Handle New Image Uploads
  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"));
    if (files.length === 0) {
      alert("Please select valid image files.");
      return;
    }

    const totalImages = existingImages.length + newImages.length + files.length;
    if (totalImages > MAX_IMAGES) {
      alert(`Maximum ${MAX_IMAGES} images allowed.`);
      return;
    }

    const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`Files exceeding 5MB: ${oversizedFiles.map((f) => f.name).join(", ")}`);
      return;
    }

    const updatedNewImages = [...newImages, ...files];
    setNewImages(updatedNewImages);

    const updatedCaptions = { ...captions };
    files.forEach((_, index) => {
      updatedCaptions[existingImages.length + newImages.length + index] = "";
    });
    setCaptions(updatedCaptions);
  };

  // ### Handle Caption Changes
  const handleCaptionChange = (index, text) => {
    if (text.length <= MAX_CAPTION_LENGTH) {
      setCaptions((prev) => ({ ...prev, [index]: text }));
      setCaptionErrors((prev) => ({ ...prev, [index]: "" }));
    } else {
      setCaptionErrors((prev) => ({
        ...prev,
        [index]: `Caption must not exceed ${MAX_CAPTION_LENGTH} characters.`,
      }));
    }
  };

  // ### Remove Images
  const handleRemoveImage = (index) => {
    if (index < existingImages.length) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const adjustedIndex = index - existingImages.length;
      setNewImages((prev) => prev.filter((_, i) => i !== adjustedIndex));
    }
    const updatedCaptions = { ...captions };
    delete updatedCaptions[index];
    setCaptions(updatedCaptions);
    setCaptionErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors[index];
      return updatedErrors;
    });
  };

  // ### Save Images and Captions
  const handleSave = async () => {
    if (existingImages.length + newImages.length === 0) {
      alert("Please upload at least one social work image.");
      return;
    }

    if (Object.values(captionErrors).some((error) => error)) {
      alert("Please fix caption errors before saving.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    newImages.forEach((file) => {
      formData.append("socialwork", file);
    });

    const captionsArray = [...existingImages, ...newImages].map((_, index) => captions[index] || "");
    formData.append("captions", JSON.stringify(captionsArray.slice(existingImages.length))); // Only new captions

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const response = await fetch(`${apiBaseUrl}/api/template/save/socialWorkImages/${userId}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok && result.status_code === 200) {
        alert("Social work images and captions saved successfully!");
        const fetchResponse = await fetch(`${apiBaseUrl}/api/template/getFormData/${userId}`);
        const fetchResult = await fetchResponse.json();
        if (fetchResult.status_code === 200) {
          const { socialWorkImages } = fetchResult.data;
          const imagesWithUrls = socialWorkImages.map((img) => ({
            url: `${apiBaseUrl}/api/template/getSocialWorkImage/${img.imageUrl}`,
            caption: img.caption || "",
          }));
          setExistingImages(imagesWithUrls);
          setNewImages([]);
          const updatedCaptions = {};
          imagesWithUrls.forEach((img, index) => {
            updatedCaptions[index] = img.caption;
          });
          setCaptions(updatedCaptions);
          setParentFormData((prev) => ({
            ...prev,
            socialWorkImages: imagesWithUrls.map((img) => img.url),
            captions: updatedCaptions,
          }));
        }
      } else {
        throw new Error(result.message || "Failed to save social work images");
      }
    } catch (error) {
      console.error("Error uploading social work images:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ### Reset Form
  const handleReset = () => {
    setNewImages([]);
    setCaptions((prev) => {
      const resetCaptions = {};
      existingImages.forEach((img, index) => {
        resetCaptions[index] = img.caption;
      });
      return resetCaptions;
    });
    setCaptionErrors({});
  };

  // ### Combine Images for Display
  const allImages = [
    ...existingImages.map((img) => img.url),
    ...newImages.map((file) => URL.createObjectURL(file)),
  ];

  // ### Cleanup Blob URLs
  useEffect(() => {
    return () => {
      newImages.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
    };
  }, [newImages]);

  // ### Render Component
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">📸 Social Work Gallery</h2>

      <div className="flex flex-col mb-6">
        <label htmlFor="socialImages" className="text-gray-700 font-medium mb-2">
          🖼️ Upload Social Work Images (Max {MAX_IMAGES}):
        </label>
        <input
          id="socialImages"
          type="file"
          accept="image/*"
          multiple
          onChange={handleMultipleFileChange}
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isSubmitting}
        />
        <p className="text-sm text-gray-500 mt-1">
          Max file size: 5MB. Current: {allImages.length}/{MAX_IMAGES} images.
        </p>
      </div>

      {allImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
          {allImages.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <img
                src={imageUrl}
                alt={`social-${index}`}
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
              <input
                type="text"
                placeholder="Enter caption..."
                value={captions[index] || ""}
                onChange={(e) => handleCaptionChange(index, e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={isSubmitting}
              />
              {captionErrors[index] && (
                <p className="text-red-500 text-sm mt-1">{captionErrors[index]}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                {captions[index]?.length || 0}/{MAX_CAPTION_LENGTH}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={handleSave}
          className="p-3 bg-green-500 hover:bg-green-400 rounded-md text-white disabled:bg-gray-400"
          disabled={isSubmitting || allImages.length === 0}
        >
          {isSubmitting ? "Saving..." : "💾 Save"}
        </button>
        <button
          onClick={handleReset}
          className="p-3 bg-gray-500 hover:bg-gray-400 rounded-md text-white"
          disabled={isSubmitting}
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
};

export default SocialImage;