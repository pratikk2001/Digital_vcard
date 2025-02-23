import React, { useState } from "react";
import axios from "axios"; // You'll need to install axios: npm install axios

const FamilyDetailsComponent = () => {
  const [familyDetails, setFamilyDetails] = useState([{ name: "", email: "" }]);
  const userId = "6799205044bf1cf19496061a"; // Hardcoded for now; replace with dynamic value if needed

  const handleInputChange = (index, field, value) => {
    const updatedDetails = [...familyDetails];
    updatedDetails[index][field] = value;
    setFamilyDetails(updatedDetails);
  };

  const addNewPoint = () => {
    setFamilyDetails([...familyDetails, { name: "", email: "" }]);
  };

  const removePoint = (index) => {
    const updatedDetails = familyDetails.filter((_, i) => i !== index);
    setFamilyDetails(updatedDetails);
  };

  const  saveDetails =async () => {
    console.log("Saved Description:", description);

    const userId = localStorage.getItem("userId");

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500"; // Match backend port
    const response = await fetch(`${apiBaseUrl}/api/template/save/familyDetails/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        familyDetails: description,
      }),
    })

    const data = await response.json();

    if (response.ok && data.status_code === 200) {

    alert("Description saved successfully!");  

    } else {
      alert("Error saving description. Please try again.");

    }

  };

  const resetDetails = () => {
    setFamilyDetails([{ name: "", email: "" }]);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Description</h2>

      {/* Family Details Inputs */}
      <div className="flex flex-col gap-4">
        {familyDetails.map((detail, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-lg font-bold">{index + 1}.</span>
            <input
              type="text"
              value={detail.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-blue-500"
              placeholder={`Name ${index + 1}`}
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