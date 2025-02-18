import React, { useState } from "react";

const FamilyDetailsComponent = () => {
  const [formData, setFormData] = useState({
    familyDetails: "",
    fatherName: "",
    motherName: "",
    siblings: "",
    address: "",
    designation: ""  // Add this field to formData
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveDetails = () => {
    console.log("Saved Family Details:", formData);
  };

  const resetDetails = () => {
    setFormData({
      familyDetails: "",
      fatherName: "",
      motherName: "",
      siblings: "",
      address: "",
      designation: "", // Reset "designation" field as well
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">👨‍👩‍👧‍👦 Family Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Father's Name */}
        <div className="flex flex-col">
          <label htmlFor="fatherName" className="text-gray-700 font-medium mb-2">👨‍👦 Father's Name:</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter father's name"
          />
        </div>

        {/* Mother's Name */}
        <div className="flex flex-col">
          <label htmlFor="motherName" className="text-gray-700 font-medium mb-2">👩‍👧 Last Name:</label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter mother's name"
          />
        </div>

        {/* Siblings */}
        <div className="flex flex-col">
          <label htmlFor="siblings" className="text-gray-700 font-medium mb-2">🧑‍🤝‍🧑 Siblings Name:</label>
          <input
            type="text"
            name="siblings"
            value={formData.siblings}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of siblings"
          />
        </div>

        {/* Designation */}
        <div className="flex flex-col">
          <label htmlFor="designation" className="text-gray-700 font-medium mb-2">💼 Designation:</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your designation"
          />
        </div>
      </div>

      {/* Save and Reset Buttons */}
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
