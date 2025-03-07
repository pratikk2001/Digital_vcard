import React, { useState, useEffect } from "react";

const AwardsComponent = ({ initialAwards = [], onAwardsChange = () => {} }) => {
  const [existingAwards, setExistingAwards] = useState([]); // Store fetched awards (blobs with metadata)
  const [newAwards, setNewAwards] = useState([]); // Store newly uploaded files
  const [captions, setCaptions] = useState({});
  const [captionErrors, setCaptionErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const UserId = localStorage.getItem("userId");

  const MAX_CAPTION_LENGTH = 100;
  const MAX_IMAGES = 5;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  // Fetch existing awards when the component mounts
  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
        const response = await fetch(`${apiBaseUrl}/api/template/getFormData/${UserId}`);
        const result = await response.json();

        if (result.status_code === 200) {
          const { awards: fetchedAwards } = result.data;

          if (fetchedAwards && fetchedAwards.length > 0) {
            const awardPromises = fetchedAwards.map(async (award) => {
              const imageResponse = await fetch(
                `${apiBaseUrl}/api/template/getAwardsImage/${award.imageUrl}`
              );
              const imageBlob = await imageResponse.blob();
              return { file: imageBlob, originalUrl: award.imageUrl, caption: award.caption || "" };
            });

            const resolvedAwards = await Promise.all(awardPromises);
            setExistingAwards(resolvedAwards);

            const updatedCaptions = {};
            resolvedAwards.forEach((award, index) => {
              updatedCaptions[index] = award.caption;
            });
            setCaptions(updatedCaptions);

            onAwardsChange(resolvedAwards.map((award) => award.file), updatedCaptions);
          }
        }
      } catch (error) {
        console.error("Error fetching awards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, []);

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"));

    if (files.length === 0) {
      alert("Please select valid image files.");
      return;
    }

    const totalImages = existingAwards.length + newAwards.length + files.length;
    if (totalImages > MAX_IMAGES) {
      alert(
        `Maximum ${MAX_IMAGES} images allowed. You tried to upload ${files.length} additional images, but already have ${
          existingAwards.length + newAwards.length
        }.`
      );
      return;
    }

    const oversizedFiles = files.filter((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      alert(
        `The following files exceed 5MB limit: ${oversizedFiles.map((f) => f.name).join(", ")}`
      );
      return;
    }

    const updatedNewAwards = [...newAwards, ...files];
    setNewAwards(updatedNewAwards);

    const updatedCaptions = { ...captions };
    files.forEach((_, index) => {
      updatedCaptions[existingAwards.length + newAwards.length + index] = "";
    });

    setCaptions(updatedCaptions);
    onAwardsChange(
      [...existingAwards.map((award) => award.file), ...updatedNewAwards],
      updatedCaptions
    );
  };

  const handleCaptionChange = (index, text) => {
    if (text.length <= MAX_CAPTION_LENGTH) {
      setCaptions((prev) => ({ ...prev, [index]: text }));
      setCaptionErrors((prev) => ({ ...prev, [index]: "" }));
      onAwardsChange(
        [...existingAwards.map((award) => award.file), ...newAwards],
        { ...captions, [index]: text }
      );
    } else {
      setCaptionErrors((prev) => ({
        ...prev,
        [index]: `Caption must not exceed ${MAX_CAPTION_LENGTH} characters.`,
      }));
    }
  };

  const handleRemoveAward = (index) => {
    if (index < existingAwards.length) {
      // Remove from existing awards
      setExistingAwards((prev) => {
        const updated = prev.filter((_, i) => i !== index);
        const updatedCaptions = { ...captions };
        delete updatedCaptions[index];
        setCaptions(updatedCaptions);
        setCaptionErrors((prevErrors) => {
          const updatedErrors = { ...prevErrors };
          delete updatedErrors[index];
          return updatedErrors;
        });
        onAwardsChange([...updated.map((award) => award.file), ...newAwards], updatedCaptions);
        return updated;
      });
    } else {
      // Remove from new awards
      setNewAwards((prev) => {
        const adjustedIndex = index - existingAwards.length;
        const updated = prev.filter((_, i) => i !== adjustedIndex);
        const updatedCaptions = { ...captions };
        delete updatedCaptions[index];
        setCaptions(updatedCaptions);
        setCaptionErrors((prevErrors) => {
          const updatedErrors = { ...prevErrors };
          delete updatedErrors[index];
          return updatedErrors;
        });
        onAwardsChange([...existingAwards.map((award) => award.file), ...updated], updatedCaptions);
        return updated;
      });
    }
  };

  const handleSave = async () => {
    if (existingAwards.length + newAwards.length === 0) {
      alert("Please upload at least one award image.");
      return;
    }

    const hasErrors = Object.values(captionErrors).some((error) => error);
    if (hasErrors) {
      alert("Please fix caption errors before saving.");
      return;
    }

    // Only send new awards to the backend
    const formData = new FormData();
    newAwards.forEach((file) => {
      formData.append("awards", file);
    });

    const captionsArray = [...existingAwards, ...newAwards].map((_, index) => captions[index] || "");
    formData.append("captions", JSON.stringify(captionsArray.slice(existingAwards.length))); // Only new captions

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const response = await fetch(`${apiBaseUrl}/api/template/save/awards/${UserId}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("New awards and captions saved successfully!");
        // After successful save, move newAwards to existingAwards
        setExistingAwards((prev) => [
          ...prev,
          ...newAwards.map((file, i) => ({
            file,
            originalUrl: result.data?.newImageUrls?.[i] || "unknown", // Assuming backend returns new URLs
            caption: captions[existingAwards.length + i] || "",
          })),
        ]);
        setNewAwards([]); // Clear new awards
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error uploading awards:", error);
      alert("Failed to upload awards. Please try again.");
    }
  };

  const handleReset = () => {
    setExistingAwards([]);
    setNewAwards([]);
    setCaptions({});
    setCaptionErrors({});
    onAwardsChange([], {});
  };

  const allAwards = [...existingAwards.map((award) => award.file), ...newAwards];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">🏆 Awards Gallery</h2>

      {loading ? (
        <p className="text-gray-600">Loading awards...</p>
      ) : (
        <>
          <div className="flex flex-col">
            <label htmlFor="awardImages" className="text-gray-700 font-medium mb-2">
              🖼️ Upload Award Images (Max {MAX_IMAGES}):
            </label>
            <input
              id="awardImages"
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultipleFileChange}
              className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-gray-500 text-sm mt-1">
              Max file size: 5MB. Current: {allAwards.length}/{MAX_IMAGES} images
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
            {allAwards.map((file, index) => {
              const imageUrl = URL.createObjectURL(file);
              return (
                <div key={index} className="relative group">
                  <img
                    src={imageUrl}
                    alt={`award-${index}`}
                    className="w-full h-36 object-cover rounded-md shadow-md transition-transform duration-300 hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveAward(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
                  >
                    ❌
                  </button>
                  <input
                    type="text"
                    placeholder="Enter caption..."
                    value={captions[index] || ""}
                    onChange={(e) => handleCaptionChange(index, e.target.value)}
                    className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  {captionErrors[index] && (
                    <span className="text-red-500 text-sm mt-1">{captionErrors[index]}</span>
                  )}
                  <div className="text-gray-500 text-sm mt-1">
                    {captions[index]?.length || 0}/{MAX_CAPTION_LENGTH}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={handleSave}
              className="p-3 bg-green-500 hover:bg-green-400 rounded-md text-white"
            >
              💾 Save
            </button>
            <button
              onClick={handleReset}
              className="p-3 bg-gray-500 hover:bg-gray-400 rounded-md text-white"
            >
              🔄 Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AwardsComponent;