import React, { useState } from "react";
import axios from "axios"; // Ensure axios is installed: npm install axios

const Family = () => {
  const [familyDetails, setFamilyDetails] = useState([{ name: "", email: "" }]);
  const [description, setDescription] = useState(""); // State for description
  const userId = "6799205044bf1cf19496061a"; // Hardcoded for now; replace with dynamic value if needed

  // Handle input change for the name field
  const handleInputChange = (index, value) => {
    const updatedDetails = [...familyDetails];
    updatedDetails[index].name = value;
    setFamilyDetails(updatedDetails);
  };

  // Add new family member input field
  const addNewPoint = () => {
    setFamilyDetails([...familyDetails, { name: "" }]);
  };

  // Remove a family member input field
  const removePoint = (index) => {
    const updatedDetails = familyDetails.filter((_, i) => i !== index);
    setFamilyDetails(updatedDetails.length ? updatedDetails : [{ name: "" }]); // Ensure at least one input remains
  };

  // Handle description change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Save family details and description to the API
  const saveDetails = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4500/api/template/save/familyDetails/${userId}`,
        { familyDetails, description }, // Include description in the payload
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Response:", response.data);
      alert("Family details and description saved successfully!");
    } catch (error) {
      console.error("Error saving details:", error);
      alert("Failed to save family details: " + (error.response?.data?.message || error.message));
    }
  };

  // Reset family details and description
  const resetDetails = () => {
    setFamilyDetails([{ name: "" }]);
    setDescription(""); // Reset description
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📜 Family Details</h2>

      {/* Description Box */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <span className="text-lg font-semibold text-gray-700">Description:</span>
        </div>
        <div className="border border-gray-300 p-4 rounded-md bg-gray-50 shadow-inner">
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter description here..."
            className="w-full h-32 p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
      </div>
     
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

export default Family;