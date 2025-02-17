import React, { useState } from "react";

const FamilyDetailsComponent = () => {
  const [formData, setFormData] = useState({
    familyDetails: [],
    currentFamilyDetail: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, currentFamilyDetail: e.target.value });
  };

  const addFamilyDetail = () => {
    if (formData.currentFamilyDetail.trim()) {
      setFormData({
        ...formData,
        familyDetails: [...formData.familyDetails, formData.currentFamilyDetail],
        currentFamilyDetail: ""
      });
    }
  };

  const removeFamilyDetail = (index) => {
    setFormData({
      ...formData,
      familyDetails: formData.familyDetails.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Family Details</h2>
      <div className="mb-4">
        <input 
          type="text"
          value={formData.currentFamilyDetail}
          onChange={handleInputChange}
          placeholder="Family member details"
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={addFamilyDetail}
          className="p-3 bg-blue-500 text-white rounded-md mt-2"
        >
          Add Family Detail
        </button>
      </div>
      <ul>
        {formData.familyDetails.map((detail, index) => (
          <li key={index} className="mb-1 flex items-center justify-between text-gray-700">
            {detail}
            <button 
              onClick={() => removeFamilyDetail(index)}
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

export default FamilyDetailsComponent;