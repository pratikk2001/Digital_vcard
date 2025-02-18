import React, { useState } from "react";

const AwardsComponent = () => {
  const [formData, setFormData] = useState({
    awards: [],
    currentAward: ""
  });
console.log("Form Data"+formData.awards)

  const handleInputChange = (e) => {
    setFormData({ ...formData, currentAward: e.target.value });
  };

  const addAward = () => {
    if (formData.currentAward.trim()) {
      setFormData({
        ...formData,
        awards: [...formData.awards, formData.currentAward],
        currentAward: ""
      });
    }
  };

  const removeAward = (index) => {
    setFormData({
      ...formData,
      awards: formData.awards.filter((_, i) => i !== index)
    });
  };

  const saveAwards = () => {
    console.log("Saved Awards:", formData.awards);
  };

  const resetAwards = () => {
    setFormData({ awards: [], currentAward: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">🏆 पुरस्कार</h2>
      <div className="flex flex-col gap-4">
        {/* Award Input */}
        <div className="flex flex-col">
          <label htmlFor="awardInput" className="text-gray-700 font-medium mb-2">
          🏅 पुरस्कार माहिती जोडा:
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              id="awardInput"
              value={formData.currentAward}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
              placeholder="पुरस्काराचे नाव प्रविष्ट करा"
            />
            <button
              type="button"
              onClick={addAward}
              className="p-3 bg-blue-500 hover:bg-blue-400 rounded-md text-white"
            >
              ➕ Add
            </button>
          </div>
        </div>

        {/* Award List */}
        <ul className="mt-4 space-y-2">
          {formData.awards.map((award, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-md text-gray-700"
            >
              {award}
              <button
                onClick={() => removeAward(index)}
                className="text-red-500 hover:text-red-700"
              >
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Save and Reset Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={saveAwards}
            className="p-3 bg-green-500 hover:bg-green-400 rounded-md text-white"
          >
            💾 Save
          </button>
          <button
            onClick={resetAwards}
            className="p-3 bg-gray-500 hover:bg-gray-400 rounded-md text-white"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AwardsComponent;
