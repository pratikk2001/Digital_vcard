import React, { useState, useEffect } from "react";

const ProfileForm = ({ vcardData, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    education: "",
    awards: [],
    familyDetails: [],
  });

  useEffect(() => {
    if (vcardData) {
      setFormData({
        name: vcardData.name || "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        education: "",
        awards: [],
        familyDetails: [],
      });
    }
  }, [vcardData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md"
        />

        <label className="block text-sm font-medium mt-4">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md"
        />

        <label className="block text-sm font-medium mt-4">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md"
        />

        <label className="block text-sm font-medium mt-4">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md"
        />

        <div className="flex justify-between mt-6">
          <button onClick={handleSave} className="px-6 py-2 bg-green-500 text-white rounded-md">
            Save
          </button>
          <button onClick={onClose} className="px-6 py-2 bg-red-500 text-white rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
