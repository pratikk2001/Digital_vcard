import React, { useState } from "react";

const NewsImage = ({ formData: parentFormData, setFormData: setParentFormData }) => {
  const initialPaperImages = parentFormData.paperNewsImages || [];
  const initialElectronicImages = parentFormData.electronicNewsImages || [];
  const initialYouTubeLinks = parentFormData.youTubeLinks || [];
  const initialCaptions = parentFormData.captions || {};

  const [paperNewsImages, setPaperNewsImages] = useState(initialPaperImages);
  const [electronicNewsImages, setElectronicNewsImages] = useState(initialElectronicImages);
  const [youTubeLinks, setYouTubeLinks] = useState(initialYouTubeLinks);
  const [captions, setCaptions] = useState(initialCaptions);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = localStorage.getItem("userId");

  const maxImagesPerCategory = 5;
  const captionMaxLength = 100;

  const handleFileChange = (type, e) => {
    const files = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"));
    if (files.length === 0) {
      alert("Please select valid image files.");
      return;
    }

    const currentImages = type === "paper" ? paperNewsImages : electronicNewsImages;
    const totalImages = currentImages.length + files.length;
    if (totalImages > maxImagesPerCategory) {
      alert(`You can upload a maximum of ${maxImagesPerCategory} ${type} news images.`);
      return;
    }

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds 2MB limit.`);
        return;
      }
    });

    const updatedImages = [...currentImages, ...files];
    const setImages = type === "paper" ? setPaperNewsImages : setElectronicNewsImages;
    setImages(updatedImages);

    const updatedCaptions = { ...captions };
    files.forEach((_, index) => {
      updatedCaptions[`${type}-${currentImages.length + index}`] = "";
    });
    setCaptions(updatedCaptions);

    setParentFormData((prev) => ({
      ...prev,
      ...(type === "paper" ? { paperNewsImages: updatedImages } : { electronicNewsImages: updatedImages }),
      captions: updatedCaptions,
    }));
  };

  const handleCaptionChange = (key, text) => {
    const updatedCaptions = { ...captions, [key]: text };
    setCaptions(updatedCaptions);
    setParentFormData((prev) => ({ ...prev, captions: updatedCaptions }));
  };

  const handleYouTubeLinkChange = (index, value) => {
    const updatedLinks = [...youTubeLinks];
    updatedLinks[index] = value;
    setYouTubeLinks(updatedLinks);

    const updatedCaptions = { ...captions, [`youtube-${index}`]: value };
    setCaptions(updatedCaptions);

    setParentFormData((prev) => ({
      ...prev,
      youTubeLinks: updatedLinks,
      captions: updatedCaptions,
    }));
  };

  const addYouTubeLink = () => {
    if (youTubeLinks.length >= 5) {
      alert("You can add a maximum of 5 YouTube links.");
      return;
    }
    setYouTubeLinks([...youTubeLinks, ""]);
  };

  const handleRemoveItem = (type, index) => {
    const currentItems = type === "paper" ? paperNewsImages : type === "electronic" ? electronicNewsImages : youTubeLinks;
    const updatedItems = currentItems.filter((_, i) => i !== index);
    const setItems =
      type === "paper" ? setPaperNewsImages : type === "electronic" ? setElectronicNewsImages : setYouTubeLinks;

    const updatedCaptions = { ...captions };
    delete updatedCaptions[`${type}-${index}`];
    const reIndexedCaptions = {};
    updatedItems.forEach((_, i) => {
      reIndexedCaptions[`${type}-${i}`] = updatedCaptions[`${type}-${i}`] || "";
    });

    setItems(updatedItems);
    setCaptions(reIndexedCaptions);
    setParentFormData((prev) => ({
      ...prev,
      ...(type === "paper"
        ? { paperNewsImages: updatedItems }
        : type === "electronic"
        ? { electronicNewsImages: updatedItems }
        : { youTubeLinks: updatedItems }),
      captions: reIndexedCaptions,
    }));
  };

  const handleSave = async () => {
    if (paperNewsImages.length === 0 && electronicNewsImages.length === 0 && youTubeLinks.length === 0) {
      alert("Please add at least one item (paper news, electronic news, or YouTube link).");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();

    paperNewsImages.forEach((file) => formData.append("paperNews", file));
    electronicNewsImages.forEach((file) => formData.append("electronicNews", file));

    const paperCaptions = paperNewsImages.map((_, index) => captions[`paper-${index}`] || "");
    const electronicCaptions = electronicNewsImages.map((_, index) => captions[`electronic-${index}`] || "");
    const youtubeCaptions = youTubeLinks.map((_, index) => captions[`youtube-${index}`] || "");

    formData.append("paperCaptions", JSON.stringify(paperCaptions));
    formData.append("electronicCaptions", JSON.stringify(electronicCaptions));
    formData.append("youTubeLinks", JSON.stringify(youTubeLinks));

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const endpoint = `${apiBaseUrl}/api/template/save/newsCenterContent/${userId}`;
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok && result.status_code === 200) {
        setParentFormData((prev) => ({
          ...prev,
          paperNewsImages: result.data.paperNewsImages || [],
          electronicNewsImages: result.data.electronicNewsImages || [],
          youTubeLinks: result.data.youTubeLinks || [],
          captions: {
            ...paperCaptions.reduce((acc, caption, i) => ({ ...acc, [`paper-${i}`]: caption }), {}),
            ...electronicCaptions.reduce((acc, caption, i) => ({ ...acc, [`electronic-${i}`]: caption }), {}),
            ...youtubeCaptions.reduce((acc, caption, i) => ({ ...acc, [`youtube-${i}`]: caption }), {}),
          },
        }));
        alert("News content saved successfully!");
      } else {
        throw new Error(result.message || "Failed to save news content");
      }
    } catch (error) {
      console.error("Error uploading news content:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all news content?")) {
      setPaperNewsImages([]);
      setElectronicNewsImages([]);
      setYouTubeLinks([]);
      setCaptions({});
      setParentFormData((prev) => ({
        ...prev,
        paperNewsImages: [],
        electronicNewsImages: [],
        youTubeLinks: [],
        captions: {},
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">📰 News Center</h2>

      {/* Paper News Section */}
      <div className="mb-8">
        <label htmlFor="paperNewsImages" className="text-gray-700 font-medium mb-2 block">
          📜 Paper News Images (Max 5):
        </label>
        <input
          id="paperNewsImages"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileChange("paper", e)}
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isSubmitting}
        />
        <p className="text-sm text-gray-500 mt-1">
          Max file size: 2MB. Current: {paperNewsImages.length}/{maxImagesPerCategory} images.
        </p>
        {paperNewsImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4">
            {paperNewsImages.map((file, index) => (
              <NewsItem
                key={`paper-${index}`}
                file={file}
                index={index}
                type="paper"
                captions={captions}
                handleCaptionChange={handleCaptionChange} // Pass the function as a prop
                handleRemoveItem={handleRemoveItem}
                isSubmitting={isSubmitting}
                captionMaxLength={captionMaxLength}
              />
            ))}
          </div>
        )}
      </div>

      {/* Electronic News Section */}
      <div className="mb-8">
        <label htmlFor="electronicNewsImages" className="text-gray-700 font-medium mb-2 block">
          📱 Electronic News Images (Max 5):
        </label>
        <input
          id="electronicNewsImages"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileChange("electronic", e)}
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isSubmitting}
        />
        <p className="text-sm text-gray-500 mt-1">
          Max file size: 2MB. Current: {electronicNewsImages.length}/{maxImagesPerCategory} images.
        </p>
        {electronicNewsImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4">
            {electronicNewsImages.map((file, index) => (
              <NewsItem
                key={`electronic-${index}`}
                file={file}
                index={index}
                type="electronic"
                captions={captions}
                handleCaptionChange={handleCaptionChange} // Pass the function as a prop
                handleRemoveItem={handleRemoveItem}
                isSubmitting={isSubmitting}
                captionMaxLength={captionMaxLength}
              />
            ))}
          </div>
        )}
      </div>

      {/* YouTube Links Section */}
      <div className="mb-8">
        <label className="text-gray-700 font-medium mb-2 block">🎥 YouTube Links (Max 5):</label>
        {youTubeLinks.map((link, index) => (
          <div key={`youtube-${index}`} className="flex items-center gap-4 mb-4">
            <input
              type="url"
              placeholder="Enter YouTube URL"
              value={link}
              onChange={(e) => handleYouTubeLinkChange(index, e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isSubmitting}
            />
            <button
              onClick={() => handleRemoveItem("youtube", index)}
              className="bg-red-600 text-white rounded-full p-2 shadow-md hover:bg-red-700 "
              disabled={isSubmitting}
            >
              ❌
            </button>
          </div>
        ))}
        <button
          onClick={addYouTubeLink}
          className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 "
          disabled={isSubmitting || youTubeLinks.length >= 5}
        >
          + Add YouTube Link
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={handleSave}
          className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-md  transition duration-300"
          disabled={isSubmitting || (paperNewsImages.length === 0 && electronicNewsImages.length === 0 && youTubeLinks.length === 0)}
        >
          {isSubmitting ? "Saving..." : "💾 Save"}
        </button>
        <button
          onClick={handleReset}
          className="p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-md  transition duration-300"
          disabled={isSubmitting}
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
};

// Reusable NewsItem component for images
const NewsItem = ({ file, index, type, captions, handleCaptionChange, handleRemoveItem, isSubmitting, captionMaxLength }) => {
  const imageUrl = URL.createObjectURL(file);
  return (
    <div className="relative group">
      <img
        src={imageUrl}
        alt={`${type}-news-${index}`}
        className="w-full h-36 object-cover rounded-md shadow-md transition-transform duration-300 hover:scale-105"
      />
      <button
        type="button"
        onClick={() => handleRemoveItem(type, index)}
        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700 "
        disabled={isSubmitting}
      >
        ❌
      </button>
      <div className="mt-2">
        <input
          type="text"
          placeholder={`Caption (max ${captionMaxLength} chars)`}
          value={captions[`${type}-${index}`] || ""}
          onChange={(e) => handleCaptionChange(`${type}-${index}`, e.target.value)} // Use the prop here
          maxLength={captionMaxLength}
          className="w-full h-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isSubmitting}
        />
        <p className="text-xs text-gray-500 mt-1">
          {captions[`${type}-${index}`]?.length || 0}/{captionMaxLength} characters
        </p>
      </div>
    </div>
  );
};

export default NewsImage;