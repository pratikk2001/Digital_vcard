import React, { useState } from "react";

const FamilyDetailsComponent = () => {
  const [description, setDescription] = useState([""]);

  const handleInputChange = (index, value) => {
    const updatedDescription = [...description];
    updatedDescription[index] = value;
    setDescription(updatedDescription);
  };

  const addNewPoint = () => {
    setDescription([...description, ""]);
  };

  const removePoint = (index) => {
    const updatedDescription = description.filter((_, i) => i !== index);
    setDescription(updatedDescription);
  };

  const saveDetails = () => {
    console.log("Saved Description:", description);
    alert("Description saved successfully!");
  };

  const resetDetails = () => {
    setDescription([""]);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📜 Description</h2>

      {/* Description Input */}
      <div className="flex flex-col gap-4">
        {description.map((point, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-lg font-bold">{index + 1}.</span>
            <input
              type="text"
              value={point}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter Family Details ${index + 1}`}
            />
            {description.length > 1 && (
              <button
                onClick={() => removePoint(index)}
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                ❌
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add New Point Button */}
      <button
        onClick={addNewPoint}
        className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        ➕ Add Details
      </button>

      {/* Save & Reset Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={saveDetails}
          className="p-3 bg-green-500 hover:bg-green-400 rounded-md text-white"
        >
          💾 Save
        </button>
        <button
          onClick={resetDetails}
          className="p-3 bg-gray-500 hover:bg-gray-400 rounded-md text-white"
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
};

export default FamilyDetailsComponent;
