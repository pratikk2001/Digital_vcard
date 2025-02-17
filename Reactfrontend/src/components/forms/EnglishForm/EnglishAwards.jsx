import React, { useState } from "react";

const AwardsComponent = () => {
  const [formData, setFormData] = useState({
    awards: [],
    currentAward: ""
  });

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

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Awards</h2>
      <div className="mb-4">
        <input 
          type="text"
          value={formData.currentAward}
          onChange={handleInputChange}
          placeholder="Enter an award"
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={addAward}
          className="p-3 bg-blue-500 text-white rounded-md mt-2"
        >
          Add Award
        </button>
      </div>
      <ul>
        {formData.awards.map((award, index) => (
          <li key={index} className="mb-1 flex items-center justify-between text-gray-700">
            {award}
            <button 
              onClick={() => removeAward(index)}
              className="text-red-500 ml-2"
            >
              Remove
            </button>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default AwardsComponent;