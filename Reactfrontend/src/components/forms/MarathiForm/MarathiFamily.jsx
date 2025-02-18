import React, { useState } from "react";

const FamilyDetailsComponent = () => {
  const [formData, setFormData] = useState({
    familyDetails: "",
    fatherName: "",
    motherName: "",
    siblings: "",
    address: "",
    designation: ""
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
      designation: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">👨‍👩‍👧‍👦 कुटुंबाची माहिती</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Father's Name */}
        <div className="flex flex-col">
          <label htmlFor="fatherName" className="text-gray-700 font-medium mb-2">👨‍👦 वडिलांचे नाव:</label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="वडिलांचे नाव प्रविष्ट करा"
          />
        </div>

        {/* Mother's Name */}
        <div className="flex flex-col">
          <label htmlFor="motherName" className="text-gray-700 font-medium mb-2">👩‍👧 आईचे नाव:</label>
          <input
            type="text"
            id="motherName"
            name="motherName"
            value={formData.motherName}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="आईचे नाव प्रविष्ट करा"
          />
        </div>

        {/* Siblings */}
        <div className="flex flex-col">
          <label htmlFor="siblings" className="text-gray-700 font-medium mb-2">🧑‍🤝‍🧑 भावंडांची संख्या:</label>
          <input
            type="number" // Changed to type="number" for count input
            id="siblings"
            name="siblings"
            value={formData.siblings}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="भावंडांची संख्या प्रविष्ट करा"
          />
        </div>

        {/* Designation */}
        <div className="flex flex-col">
          <label htmlFor="designation" className="text-gray-700 font-medium mb-2">💼 पदनाम:</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="तुमचा पदनाम प्रविष्ट करा"
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