import React, { useState } from "react";
import { FaSave, FaRedo, FaFont, FaTextHeight, FaPalette } from "react-icons/fa";

// Function to convert CMYK to HEX (approximation)
const cmykToHex = (c, m, y, k) => {
  let c_ = c / 100;
  let m_ = m / 100;
  let y_ = y / 100;
  let k_ = k / 100;

  let r = 255 * (1 - c_) * (1 - k_);
  let g = 255 * (1 - m_) * (1 - k_);
  let b = 255 * (1 - y_) * (1 - k_);

  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
};

const Fonts = ({ formData: parentFormData, setFormData: setParentFormData }) => {
  const initialFontSettings = {
    fontFamily: parentFormData.fontFamily || "Arial",
    fontSize: parentFormData.fontSize || "16px",
    fontColor: parentFormData.fontColor || "#000000", // Default to black in HEX
    cmyk: parentFormData.cmyk || { c: 0, m: 0, y: 0, k: 100 }, // Default to black in CMYK
  };

  const [fontSettings, setFontSettings] = useState(initialFontSettings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const UserId = localStorage.getItem("userId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFontSettings = { ...fontSettings };

    if (name === "c" || name === "m" || name === "y" || name === "k") {
      // Update CMYK values
      newFontSettings.cmyk = { ...newFontSettings.cmyk, [name]: parseInt(value, 10) || 0 };
      // Convert CMYK to HEX for fontColor
      newFontSettings.fontColor = cmykToHex(
        newFontSettings.cmyk.c,
        newFontSettings.cmyk.m,
        newFontSettings.cmyk.y,
        newFontSettings.cmyk.k
      );
    } else {
      newFontSettings = { ...newFontSettings, [name]: value };
    }

    setFontSettings(newFontSettings);
    setParentFormData((prev) => ({ ...prev, ...newFontSettings }));
  };

  const saveDetails = async () => {
    setIsSubmitting(true);
    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const endpoint = `${apiBaseUrl}/api/template/save/fontSettings/${UserId}`; // Adjust this if needed
      console.log("Sending request to:", endpoint); // Log the URL for debugging

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
        cmyk: { c: 0, m: 0, y: 0, k: 100 }, // Default to black in CMYK
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
          <option value="Arial"></option>
          <option value="Times New Roman"></option>
          <option value="Open Sans"></option>
        </select>
      </div>

      {/* <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
          <FaTextHeight className="text-blue-500" /> 
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
      </div> */}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
          <FaPalette className="text-blue-500" /> 
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600">Cyan (%)</label>
            <input
              type="number"
              name="c"
              value={fontSettings.cmyk.c}
              onChange={handleChange}
              className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              min="0"
              max="100"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Magenta (%)</label>
            <input
              type="number"
              name="m"
              value={fontSettings.cmyk.m}
              onChange={handleChange}
              className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              min="0"
              max="100"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Yellow (%)</label>
            <input
              type="number"
              name="y"
              value={fontSettings.cmyk.y}
              onChange={handleChange}
              className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              min="0"
              max="100"
              disabled={isSubmitting}
            />
          </div>
          {/* <div>
            <label className="block text-sm text-gray-600">Black (%)</label>
            <input
              type="number"
              name="k"
              value={fontSettings.cmyk.k}
              onChange={handleChange}
              className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              min="0"
              max="100"
              disabled={isSubmitting}
            />
          </div> */}
        </div>
        {/* <div className="mt-2 text-sm text-gray-600">
          Converted HEX: {fontSettings.fontColor}
        </div> */}
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