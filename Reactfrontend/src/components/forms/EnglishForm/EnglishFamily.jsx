import React, { useState } from "react";

const FamilyDetailsComponent = () => {
  const [formData, setFormData] = useState({
    familyDetails: "",
    fatherName: "",
    motherName: "",
    siblings: "",
    address: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
          <label htmlFor="motherName" className="text-gray-700 font-medium mb-2">👩‍👧 Mother's Name:</label>
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
          <label htmlFor="siblings" className="text-gray-700 font-medium mb-2">🧑‍🤝‍🧑 Siblings:</label>
          <input
            type="text"
            name="siblings"
            value={formData.siblings}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of siblings"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label htmlFor="address" className="text-gray-700 font-medium mb-2">🏠 Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter home address"
          />
        </div>
      </div>
    </div>
  );
};

export default FamilyDetailsComponent;
