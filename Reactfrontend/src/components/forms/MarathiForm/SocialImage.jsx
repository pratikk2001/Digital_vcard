import React, { useState, useEffect } from "react";

const SocialImage = ({ formData: parentFormData, setFormData: setParentFormData }) => {
  const initialImages = parentFormData.socialWorkImages || [];
  const initialCaptions = parentFormData.captions || {};
  const [socialImages, setSocialImages] = useState(initialImages);
  const [captions, setCaptions] = useState(initialCaptions);
  const [captionErrors, setCaptionErrors] = useState({}); // New state for caption errors
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = localStorage.getItem("userId");

  const MAX_CAPTION_LENGTH = 100; // Max characters for captions

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length === 0) {
      alert("कृपया वैध प्रतिमा फाइल्स निवडा.");
      return;
    }

    const totalImages = socialImages.length + files.length;
    if (totalImages > 5) {
      alert("तुम्ही कमाल 5 सामाजिक कार्य इमेजेस अपलोड करू शकता.");
      return;
    }

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`फाइल "${file.name}" 5MB मर्यादेपेक्षा जास्त आहे.`);
        return;
      }
    });

    const updatedImages = [...socialImages, ...files];
    setSocialImages(updatedImages);

    const updatedCaptions = { ...captions };
    files.forEach((_, index) => {
      updatedCaptions[socialImages.length + index] = "";
    });
    setCaptions(updatedCaptions);

    setParentFormData((prev) => ({
      ...prev,
      socialWorkImages: updatedImages,
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
    const updatedImages = socialImages.filter((_, i) => i !== index);
    const updatedCaptions = { ...captions };
    delete updatedCaptions[index];
    const reIndexedCaptions = {};
    updatedImages.forEach((_, i) => {
      reIndexedCaptions[i] = updatedCaptions[i] || "";
    });

    // Update caption errors
    const updatedErrors = { ...captionErrors };
    delete updatedErrors[index];
    const reIndexedErrors = {};
    updatedImages.forEach((_, i) => {
      if (updatedErrors[i]) reIndexedErrors[i] = updatedErrors[i];
    });

    setSocialImages(updatedImages);
    setCaptions(reIndexedCaptions);
    setCaptionErrors(reIndexedErrors);
    setParentFormData((prev) => ({
      ...prev,
      socialWorkImages: updatedImages,
      captions: reIndexedCaptions,
    }));
  };

  const handleSave = async () => {
    if (socialImages.length === 0) {
      alert("कृपया किमान एक सामाजिक कार्य इमेज अपलोड करा.");
      return;
    }

    // Check for caption errors before saving
    if (Object.values(captionErrors).some((error) => error)) {
      alert("जतन करण्यापूर्वी कृपया कॅप्शन त्रुटी सुधारा.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    socialImages.forEach((file) => {
      formData.append("socialwork", file);
    });

    const captionsArray = socialImages.map((_, index) => captions[index] || "");
    formData.append("captions", JSON.stringify(captionsArray));

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const endpoint = `${apiBaseUrl}/api/template/save/socialWorkImages/${userId}`;
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok && result.status_code === 200) {
        setParentFormData((prev) => ({
          ...prev,
          socialWorkImages: result.data.socialWorkImages,
          captions: captionsArray.reduce((acc, caption, i) => ({ ...acc, [i]: caption }), {}),
        }));
        alert("सामाजिक कार्य इमेजेस आणि कॅप्शन्स यशस्वीरित्या जतन झाल्या!");
      } else {
        throw new Error(result.message || "सामाजिक कार्य इमेजेस जतन करण्यात अयशस्वी");
      }
    } catch (error) {
      console.error("सामाजिक कार्य इमेजेस अपलोड करताना त्रुटी:", error);
      alert(`त्रुटी: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("तुम्ही सर्व सामाजिक कार्य इमेजेस आणि कॅप्शन्स रीसेट करायचे आहात याची खात्री आहे का?")) {
      setSocialImages([]);
      setCaptions({});
      setCaptionErrors({});
      setParentFormData((prev) => ({ ...prev, socialWorkImages: [], captions: {} }));
    }
  };

  useEffect(() => {
    return () => {
      socialImages.forEach((img) => {
        if (typeof img === "string" && img.startsWith("blob:")) {
          URL.revokeObjectURL(img);
        }
      });
    };
  }, [socialImages]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">📸 सामाजिक कार्य गॅलरी</h2>

      <div className="flex flex-col mb-6">
        <label htmlFor="socialImages" className="text-gray-700 font-medium mb-2">
          🖼️ सामाजिक कार्य इमेजेस अपलोड करा (कमाल 5):
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
          फाइलचा कमाल आकार: 5MB. सध्याचा: {socialImages.length}/5 इमेजेस.
        </p>
      </div>

      {socialImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
          {socialImages.map((file, index) => {
            const imageUrl = typeof file === "string" ? file : URL.createObjectURL(file);
            return (
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
          disabled={isSubmitting || socialImages.length === 0}
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

export default SocialImage;