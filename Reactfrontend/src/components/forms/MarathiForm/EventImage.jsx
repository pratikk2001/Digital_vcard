import React, { useState } from "react";

const EventImage = ({ formData: parentFormData, setFormData: setParentFormData }) => {
  const initialImages = parentFormData.eventImages || [];
  const [images, setImages] = useState(initialImages);
  const [captions, setCaptions] = useState(parentFormData.captions || {});
  const [captionErrors, setCaptionErrors] = useState({}); // New state for caption errors
  const [isSubmitting, setIsSubmitting] = useState(false);
  const UserId = localStorage.getItem("userId");

  const MAX_CAPTION_LENGTH = 100; // Max characters for captions

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length === 0) {
      alert("कृपया वैध प्रतिमा फाइल्स निवडा.");
      return;
    }

    const totalImages = images.length + files.length;
    if (totalImages > 5) {
      alert("तुम्ही कमाल 5 इमेजेस अपलोड करू शकता.");
      return;
    }

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`फाइल "${file.name}" 5MB मर्यादेपेक्षा जास्त आहे.`);
        return;
      }
    });

    const updatedImages = [...images, ...files];
    setImages(updatedImages);

    const updatedCaptions = { ...captions };
    files.forEach((_, index) => {
      updatedCaptions[images.length + index] = "";
    });
    setCaptions(updatedCaptions);
    setParentFormData((prev) => ({
      ...prev,
      eventImages: updatedImages,
      captions: updatedCaptions,
    }));
  };

  const handleCaptionChange = (index, text) => {
    if (text.length <= MAX_CAPTION_LENGTH) {
      const updatedCaptions = { ...captions, [index]: text };
      setCaptions(updatedCaptions);
      setCaptionErrors((prev) => ({ ...prev, [index]: "" })); // Clear error if valid
      setParentFormData((prev) => ({ ...prev, captions: updatedCaptions }));
    } else {
      setCaptionErrors((prev) => ({
        ...prev,
        [index]: `कॅप्शन ${MAX_CAPTION_LENGTH} अक्षरांपेक्षा जास्त नसावे.`,
      }));
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedCaptions = { ...captions };
    delete updatedCaptions[index];
    const reIndexedCaptions = {};
    updatedImages.forEach((_, i) => {
      reIndexedCaptions[i] = updatedCaptions[i] || ""; // Fixed indexing bug
    });

    // Update caption errors
    const updatedErrors = { ...captionErrors };
    delete updatedErrors[index];
    const reIndexedErrors = {};
    updatedImages.forEach((_, i) => {
      if (updatedErrors[i]) reIndexedErrors[i] = updatedErrors[i];
    });

    setImages(updatedImages);
    setCaptions(reIndexedCaptions);
    setCaptionErrors(reIndexedErrors);
    setParentFormData((prev) => ({
      ...prev,
      eventImages: updatedImages,
      captions: reIndexedCaptions,
    }));
  };

  const handleSave = async () => {
    if (images.length === 0) {
      alert("कृपया किमान एक इव्हेंट इमेज अपलोड करा.");
      return;
    }

    // Check for caption errors before saving
    if (Object.values(captionErrors).some((error) => error)) {
      alert("जतन करण्यापूर्वी कृपया कॅप्शन त्रुटी सुधारा.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    images.forEach((file) => {
      formData.append("events", file);
    });

    const captionsArray = images.map((_, index) => captions[index] || "");
    formData.append("captions", JSON.stringify(captionsArray));

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const response = await fetch(
        `${apiBaseUrl}/api/template/save/eventImages/${UserId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok && result.status_code === 200) {
        alert("इव्हेंट इमेजेस आणि कॅप्शन्स यशस्वीरित्या जतन झाल्या!");
      } else {
        throw new Error(result.message || "इव्हेंट इमेजेस जतन करण्यात अयशस्वी");
      }
    } catch (error) {
      console.error("इव्हेंट इमेजेस अपलोड करताना त्रुटी:", error);
      alert(`त्रुटी: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("तुम्ही सर्व इव्हेंट इमेजेस आणि कॅप्शन्स रीसेट करायचे आहात याची खात्री आहे का?")) {
      setImages([]);
      setCaptions({});
      setCaptionErrors({});
      setParentFormData((prev) => ({ ...prev, eventImages: [], captions: {} }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">🎉 इव्हेंट इमेजेस</h2>

      <div className="flex flex-col mb-6">
        <label htmlFor="eventImages" className="text-gray-700 font-medium mb-2">
          📷 इव्हेंट इमेजेस अपलोड करा (कमाल 5):
        </label>
        <input
          id="eventImages"
          type="file"
          accept="image/*"
          multiple
          onChange={handleMultipleFileChange}
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isSubmitting}
        />
        <p className="text-sm text-gray-500 mt-1">
          फाइलचा कमाल आकार: 5MB. सध्याचा: {images.length}/5 इमेजेस.
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
          {images.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);
            return (
              <div key={index} className="relative group">
                <img
                  src={imageUrl}
                  alt={`event-${index}`}
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
                  placeholder="कॅप्शन प्रविष्ट करा..."
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
            );
          })}
        </div>
      )}

      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={handleSave}
          className="p-3 bg-green-500 hover:bg-green-400 rounded-md text-white disabled:bg-gray-400"
          disabled={isSubmitting || images.length === 0}
        >
          {isSubmitting ? "सेव्हिंग..." : "💾 जतन करा"}
        </button>
        <button
          onClick={handleReset}
          className="p-3 bg-gray-500 hover:bg-gray-400 rounded-md text-white disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          🔄 रीसेट
        </button>
      </div>
    </div>
  );
};

export default EventImage;