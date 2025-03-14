import React, { useState } from "react";
import { FaSave, FaRedo, FaFont, FaTextHeight, FaPalette } from "react-icons/fa";

const Fonts = ({ formData: parentFormData, setFormData: setParentFormData }) => {
  const initialFontSettings = {
    fontFamily: parentFormData.fontFamily || "Arial",
    fontSize: parentFormData.fontSize || "16px",
    fontColor: parentFormData.fontColor || "#000000", // Default to black in HEX
  };

  const [fontSettings, setFontSettings] = useState(initialFontSettings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const UserId = localStorage.getItem("userId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFontSettings = { ...fontSettings, [name]: value };
    
    setFontSettings(newFontSettings);
    setParentFormData((prev) => ({ ...prev, ...newFontSettings }));
  };

  const saveDetails = async () => {
    setIsSubmitting(true);
    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const endpoint = `${apiBaseUrl}/api/template/save/fontSettings/${UserId}`;
      console.log("Sending request to:", endpoint);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fontSettings),
      });

      const result = await response.json();
      if (response.ok && result.status_code === 200) {
        setParentFormData((prev) => ({ ...prev, ...fontSettings }));
        alert("Font settings saved successfully!");
      } else {
        throw new Error(result.message || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error saving font settings:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetDetails = () => {
    if (window.confirm("Are you sure you want to reset font settings?")) {
      const defaultSettings = {
        fontFamily: "Arial",
        fontSize: "16px",
        fontColor: "#000000",
      };
      setFontSettings(defaultSettings);
      setParentFormData((prev) => ({ ...prev, ...defaultSettings }));
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaFont className="text-blue-500" /> Customize Your Font
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
          <FaFont className="text-blue-500" /> Font Family:
        </label>
        <select
          name="fontFamily"
          value={fontSettings.fontFamily}
          onChange={handleChange}
          className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isSubmitting}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Open Sans">Open Sans</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
          <FaTextHeight className="text-blue-500" /> Font Size (px):
        </label>
        <input
          type="number"
          name="fontSize"
          value={parseInt(fontSettings.fontSize)}
          onChange={(e) => handleChange({ target: { name: "fontSize", value: `${e.target.value}px` } })}
          className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          min="8"
          max="16"
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
          <FaPalette className="text-blue-500" /> Font Color:
        </label>
        <div className="flex items-center gap-4">
          <input
            type="color"
            name="fontColor"
            value={fontSettings.fontColor}
            onChange={handleChange}
            className="w-12 h-12 p-1 border rounded-md cursor-pointer disabled:opacity-50"
            disabled={isSubmitting}
          />
          <span className="text-sm text-gray-600">
            Selected: {fontSettings.fontColor}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
          <FaFont className="text-blue-500" /> Preview:
        </label>
        <div
          style={{
            fontFamily: fontSettings.fontFamily,
            fontSize: fontSettings.fontSize,
            color: fontSettings.fontColor,
            padding: "10px",
            border: "1px solid #e5e7eb",
            borderRadius: "4px",
          }}
        >
          Sample Text: The quick brown fox jumps over the lazy dog.
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={saveDetails}
          className="p-3 bg-green-500 hover:bg-green-400 rounded-md text-white flex items-center gap-2 disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          <FaSave /> {isSubmitting ? "Saving..." : "Save"}
        </button>
        <button
          onClick={resetDetails}
          className="p-3 bg-gray-500 hover:bg-gray-400 rounded-md text-white flex items-center gap-2 disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          <FaRedo /> Reset
        </button>
      </div>
    </div>
  );
};

export default Fonts;