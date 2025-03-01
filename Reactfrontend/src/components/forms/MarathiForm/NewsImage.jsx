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
      alert("कृपया वैध प्रतिमा फाइल्स निवडा.");
      return;
    }

    const totalImages = newsImages.length + files.length;
    if (totalImages > 5) {
      alert("तुम्ही कमाल 5 बातम्या इमेजेस अपलोड करू शकता.");
      return;
    }

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`फाइल "${file.name}" 5MB मर्यादेपेक्षा जास्त आहे.`);
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
      alert("कृपया किमान एक बातम्या इमेज अपलोड करा.");
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
      const endpoint = `${apiBaseUrl}/api/template/save/newsCenterImages/${userId}`;
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
        alert("बातम्या इमेजेस आणि कॅप्शन्स यशस्वीरित्या जतन झाल्या!");
      } else {
        throw new Error(result.message || "बातम्या इमेजेस जतन करण्यात अयशस्वी");
      }
    } catch (error) {
      console.error("बातम्या इमेजेस अपलोड करताना त्रुटी:", error);
      alert(`त्रुटी: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("तुम्ही सर्व बातम्या इमेजेस आणि कॅप्शन्स रीसेट करायचे आहात याची खात्री आहे का?")) {
      setNewsImages([]);
      setCaptions({});
      setParentFormData((prev) => ({ ...prev, newsCenterImages: [], captions: {} }));
    }
  };

  const captionMaxLength = 100;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">📰 बातम्या सेंटर गॅलरी</h2>

      <div className="flex flex-col mb-6">
        <label htmlFor="newsImages" className="text-gray-700 font-medium mb-2">
          🖼️ बातम्या इमेजेस अपलोड करा (कमाल 5):
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
          फाइलचा कमाल आकार: 5MB. सध्याचा: {newsImages.length}/5 इमेजेस.
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
                    placeholder={`कॅप्शन (कमाल ${captionMaxLength} अक्षरे)`}
                    value={captions[index] || ""}
                    onChange={(e) => handleCaptionChange(index, e.target.value)}
                    maxLength={captionMaxLength}
                    className="w-full h-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {captions[index]?.length || 0}/{captionMaxLength} अक्षरे
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

export default NewsImage;