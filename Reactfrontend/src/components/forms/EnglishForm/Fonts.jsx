import React, { useState } from "react";
import { FaSave, FaRedo } from "react-icons/fa"; // ✅ Import icons

const Fonts = ({ onStyleChange }) => {
  const [fontSettings, setFontSettings] = useState({
    fontFamily: "Arial",
    fontSize: "16px",
    fontColor: "#000000",
  });

  // Ensure onStyleChange is a function before calling it
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFontSettings = { ...fontSettings, [name]: value };

    setFontSettings(newFontSettings);

    if (typeof onStyleChange === "function") {
      onStyleChange(newFontSettings);
    } else {
      console.error("onStyleChange is not a function:", onStyleChange);
    }
  };

  // ✅ Function to save details
  const saveDetails = () => {
    console.log("Font settings saved:", fontSettings);
    alert("Font settings saved successfully!");
  };

  // ✅ Function to reset details
  const resetDetails = () => {
    const defaultSettings = {
      fontFamily: "Arial",
      fontSize: "16px",
      fontColor: "#000000",
    };

    setFontSettings(defaultSettings);
    onStyleChange(defaultSettings);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Customize Your Font</h2>

      {/* Font Family Selector */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Font Family:</label>
        <select
          name="fontFamily"
          value={fontSettings.fontFamily}
          onChange={handleChange}
          className="p-2 border rounded-md w-full"
        >
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
      </div>

      {/* Font Size Selector */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Font Size:</label>
        <input
          type="number"
          name="fontSize"
          value={parseInt(fontSettings.fontSize)}
          onChange={(e) => handleChange({ target: { name: "fontSize", value: `${e.target.value}px` } })}
          className="p-2 border rounded-md w-full"
          min="8"
          max="48"
        />
      </div>

      {/* Font Color Picker */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Font Color:</label>
        <input
          type="color"
          name="fontColor"
          value={fontSettings.fontColor}
          onChange={handleChange}
          className="w-full h-10 cursor-pointer"
        />
      </div>

      {/* Save and Reset Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={saveDetails}
          className="p-3 bg-green-500 hover:bg-green-400 rounded-md text-white flex items-center gap-2"
        >
          <FaSave /> Save
        </button>
        <button
          onClick={resetDetails}
          className="p-3 bg-gray-500 hover:bg-gray-400 rounded-md text-white flex items-center gap-2"
        >
          <FaRedo /> Reset
        </button>
      </div>
    </div>
  );
};

export default Fonts;
