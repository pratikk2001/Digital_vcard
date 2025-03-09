import React, { useState, useEffect } from "react";

const NewsImage = ({ formData: parentFormData, setFormData: setParentFormData }) => {
  const [paperNewsImages, setPaperNewsImages] = useState([]); // Array of { file: File, caption: string } or { url: string, caption: string }
  const [electronicNewsImages, setElectronicNewsImages] = useState([]); // Same as above
  const [youTubeLinks, setYouTubeLinks] = useState([]);
  const [captions, setCaptions] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const userId = "678e2f60f4880e1e477c2e7f"; // Hardcoded as per API endpoints; replace with localStorage.getItem("userId") if dynamic
  const userId = localStorage.getItem("userId");


  const maxImagesPerCategory = 5;
  const captionMaxLength = 100;
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";

  // ### Fetch Existing Data on Mount
  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/template/getFormData/${userId}`);
        const result = await response.json();
        if (result.status_code === 200) {
          const { newsCenterImages: paperImages, electronicNewsImages: electronicImages, youTubeLinks: links } = result.data;

          // Process paper news images
          const existingPaperNewsImages = (paperImages || []).map((img) => ({
            url: `${apiBaseUrl}/api/template/getNewsImage/${img.imageUrl}`,
            caption: img.caption || "",
          }));
          setPaperNewsImages(existingPaperNewsImages);

          // Process electronic news images
          const existingElectronicNewsImages = (electronicImages || []).map((img) => ({
            url: `${apiBaseUrl}/api/template/getElectronicNewsImage/${img.imageUrl}`,
            caption: img.caption || "",
          }));
          setElectronicNewsImages(existingElectronicNewsImages);

          // Set YouTube links
          setYouTubeLinks(links || []);

          // Populate captions
          const updatedCaptions = {};
          existingPaperNewsImages.forEach((img, index) => {
            updatedCaptions[`paper-${index}`] = img.caption;
          });
          existingElectronicNewsImages.forEach((img, index) => {
            updatedCaptions[`electronic-${index}`] = img.caption;
          });
          setCaptions(updatedCaptions);

          // Update parent form data
          setParentFormData((prev) => ({
            ...prev,
            newsCenterImages: existingPaperNewsImages,
            electronicNewsImages: existingElectronicNewsImages,
            youTubeLinks: links || [],
            captions: updatedCaptions,
          }));
        }
      } catch (error) {
        console.error("Error fetching news content:", error);
      }
    };
    fetchExistingData();
  }, [userId, apiBaseUrl, setParentFormData]);

  // ### Handle File Uploads
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

    const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`Files exceeding 5MB: ${oversizedFiles.map((f) => f.name).join(", ")}`);
      return;
    }

    const newImages = files.map((file) => ({ file, caption: "" }));
    const setImages = type === "paper" ? setPaperNewsImages : setElectronicNewsImages;
    setImages((prev) => [...prev, ...newImages]);

    const updatedCaptions = { ...captions };
    newImages.forEach((_, index) => {
      updatedCaptions[`${type}-${currentImages.length + index}`] = "";
    });
    setCaptions(updatedCaptions);

    setParentFormData((prev) => ({
      ...prev,
      ...(type === "paper" ? { paperNewsImages: [...prev.paperNewsImages, ...newImages] } : { electronicNewsImages: [...prev.electronicNewsImages, ...newImages] }),
      captions: updatedCaptions,
    }));
  };

  // ### Handle Caption Changes
  const handleCaptionChange = (key, text) => {
    const updatedCaptions = { ...captions, [key]: text };
    setCaptions(updatedCaptions);
    setParentFormData((prev) => ({ ...prev, captions: updatedCaptions }));
  };

  // ### Handle YouTube Link Changes
  const handleYouTubeLinkChange = (index, value) => {
    const updatedLinks = [...youTubeLinks];
    updatedLinks[index] = value;
    setYouTubeLinks(updatedLinks);
    setParentFormData((prev) => ({ ...prev, youTubeLinks: updatedLinks }));
  };

  // ### Add New YouTube Link
  const addYouTubeLink = () => {
    if (youTubeLinks.length >= 5) {
      alert("You can add a maximum of 5 YouTube links.");
      return;
    }
    setYouTubeLinks((prev) => [...prev, ""]);
    setParentFormData((prev) => ({ ...prev, youTubeLinks: [...prev.youTubeLinks, ""] }));
  };

  // ### Remove Items
  const handleRemoveItem = (type, index) => {
    const currentItems = type === "paper" ? paperNewsImages : type === "electronic" ? electronicNewsImages : youTubeLinks;
    const updatedItems = currentItems.filter((_, i) => i !== index);
    const setItems =
      type === "paper" ? setPaperNewsImages : type === "electronic" ? setElectronicNewsImages : setYouTubeLinks;

    const updatedCaptions = { ...captions };
    delete updatedCaptions[`${type}-${index}`];
    const reIndexedCaptions = {};
    updatedItems.forEach((item, i) => {
      reIndexedCaptions[`${type}-${i}`] = updatedCaptions[`${type}-${i}`] || item.caption || "";
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

  // ### Save Data to Server
  const handleSave = async () => {
    if (paperNewsImages.length === 0 && electronicNewsImages.length === 0 && youTubeLinks.length === 0) {
   
      alert("Please add at least one item (paper news, electronic news, or YouTube link).");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save Paper News Images
      if (paperNewsImages.length > 0) {
        const paperFormData = new FormData();
        const paperCaptions = paperNewsImages.map((item, index) => captions[`paper-${index}`] || item.caption || "");
        paperNewsImages.forEach((item) => {
          if (item.file) paperFormData.append("news", item.file);
        });
        paperFormData.append("paperCaptions", JSON.stringify(paperCaptions));
        
        const paperResponse = await fetch(`${apiBaseUrl}/api/template/save/newsCenterImages/${userId}`, {
          method: "POST",
          body: paperFormData,
        });
        if (!paperResponse.ok) throw new Error("Failed to save paper news images");
      }

      // Save Electronic News Images
      if (electronicNewsImages.length > 0) {
        const electronicFormData = new FormData();
        const electronicCaptions = electronicNewsImages.map((item, index) => captions[`electronic-${index}`] || item.caption || "");
        electronicNewsImages.forEach((item) => {
          if (item.file) electronicFormData.append("electroniNews", item.file);
        });
        electronicFormData.append("electronicCaptions", JSON.stringify(electronicCaptions));
        const electronicResponse = await fetch(`${apiBaseUrl}/api/template/save/electronicNewsCenterImages/${userId}`, {
          method: "POST",
          body: electronicFormData,
        });
        if (!electronicResponse.ok) throw new Error("Failed to save electronic news images");
      }

      // Save YouTube Links
      if (youTubeLinks.length > 0) {
        const youtubeResponse = await fetch(`${apiBaseUrl}/api/template/save/youtubeLinks/${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ youtubeLink: youTubeLinks }),
        });
        if (!youtubeResponse.ok) throw new Error("Failed to save YouTube links");
      }

      alert("News content saved successfully!");
      // Optionally, refetch data here to update state with server response
    } catch (error) {
      console.error("Error saving news content:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ### Reset Form
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

  // // ### Render Component
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
          Max file size: 5MB. Current: {paperNewsImages.length}/{maxImagesPerCategory} images.
        </p>
        {paperNewsImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4">
            {paperNewsImages.map((item, index) => (
              <NewsItem
                key={`paper-${index}`}
                item={item}
                index={index}
                type="paper"
                captions={captions}
                handleCaptionChange={handleCaptionChange}
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
          Max file size: 5MB. Current: {electronicNewsImages.length}/{maxImagesPerCategory} images.
        </p>
        {electronicNewsImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4">
            {electronicNewsImages.map((item, index) => (
              <NewsItem
                key={`electronic-${index}`}
                item={item}
                index={index}
                type="electronic"
                captions={captions}
                handleCaptionChange={handleCaptionChange}
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
              className="bg-red-600 text-white rounded-full p-2 shadow-md hover:bg-red-700"
              disabled={isSubmitting}
            >
              ❌
            </button>
          </div>
        ))}
        <button
          onClick={addYouTubeLink}
          className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={isSubmitting || youTubeLinks.length >= 5}
        >
          + Add YouTube Link
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={handleSave}
          className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-300"
          disabled={isSubmitting || (paperNewsImages.length === 0 && electronicNewsImages.length === 0 && youTubeLinks.length === 0)}
        >
          {isSubmitting ? "Saving..." : "💾 Save"}
        </button>
        <button
          onClick={handleReset}
          className="p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition duration-300"
          disabled={isSubmitting}
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
};

// ### NewsItem Component
const NewsItem = ({ item, index, type, captions, handleCaptionChange, handleRemoveItem, isSubmitting, captionMaxLength }) => {
  const imageUrl = item.file ? URL.createObjectURL(item.file) : item.url;
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
        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
        disabled={isSubmitting}
      >
        ❌
      </button>
      <div className="mt-2">
        <input
          type="text"
          placeholder={`Caption (max ${captionMaxLength} chars)`}
          value={captions[`${type}-${index}`] || ""}
          onChange={(e) => handleCaptionChange(`${type}-${index}`, e.target.value)}
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