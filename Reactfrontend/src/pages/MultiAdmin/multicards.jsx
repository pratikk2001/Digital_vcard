import React, { useState, useEffect } from "react";
import { FaUsers, FaChartBar, FaEdit } from "react-icons/fa";
import Sidenav from "../../components/multiadmin_nav/sidenav";
import TopNavbar from "../../components/multiadmin_nav/Topnavbar";
import ProfileForm from "./popupForm";

const Mycards = () => {
  const [selectedVCard, setSelectedVCard] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [vcards, setVcards] = useState([]);
  const [isNewVCardFormOpen, setIsNewVCardFormOpen] = useState(false); // For new VCard form
  const [newVCard, setNewVCard] = useState({ avatar: "", name: "", role: "", urlAlias: "" });

  // Fetch VCards on mount
  useEffect(() => {
    const fetchVCards = async () => {
      try {
        const token = localStorage.getItem("token"); // From login
        const response = await fetch("http://localhost:5000/api/multiadmin/vcards", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (response.ok && result.status_code === 200) {
          setVcards(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch VCards");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setVcards([]); // Fallback to empty array on error
      }
    };
    fetchVCards();
  }, []);

  // Handle Edit Button Click
  const handleEditClick = (vcard) => {
    setSelectedVCard(vcard);
    setIsFormOpen(true);
  };

  // Handle New VCard Submission
  const handleNewVCardSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/multiadmin/vcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newVCard),
      });
      const result = await response.json();
      if (response.ok && result.status_code === 201) {
        setVcards([...vcards, result.data]);
        setIsNewVCardFormOpen(false);
        setNewVCard({ avatar: "", name: "", role: "", urlAlias: "" });
      } else {
        throw new Error(result.message || "Failed to create VCard");
      }
    } catch (error) {
      console.error("Error creating VCard:", error);
    }
  };

  const baseUrl = "https://myviscards.xyz";

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <TopNavbar />
      <div className="flex flex-grow flex-col md:flex-row">
        <Sidenav />
        <main className="flex-grow p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">VCards</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b flex flex-col md:flex-row justify-between items-center gap-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full md:w-1/3 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setIsNewVCardFormOpen(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  New VCard
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left table-auto">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="p-4">VCARD NAME</th>
                      <th className="p-4">PREVIEW URL</th>
                      <th className="p-4">STATS</th>
                      <th className="p-4">SUBSCRIBERS</th>
                      <th className="p-4">STATUS</th>
                      <th className="p-4">CREATED AT</th>
                      <th className="p-4">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vcards.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4 flex items-center">
                          <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-semibold">
                            {item.avatar}
                          </div>
                          <div className="ml-4">
                            <p className="text-lg font-bold text-blue-600">{item.name}</p>
                            <p className="text-md text-gray-500">{item.role}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <a
                            href={`${baseUrl}/${item.urlAlias}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg text-blue-500 underline break-all"
                          >
                            {`${baseUrl}/${item.urlAlias}`}
                          </a>
                        </td>
                        <td className="p-4">
                          <FaChartBar className="text-blue-500" size={24} />
                        </td>
                        <td className="p-4">
                          <FaUsers className="text-blue-500" size={24} />
                        </td>
                        <td className="p-4">
                          <label className="switch">
                            <input type="checkbox" checked={item.isActive} readOnly />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td className="p-4 text-lg text-gray-600">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <FaEdit
                            className="text-blue-500 cursor-pointer transition-all duration-300 transform hover:scale-110"
                            size={24}
                            onClick={() => handleEditClick(item)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Edit Form */}
          {isFormOpen && <ProfileForm vcardData={selectedVCard} onClose={() => setIsFormOpen(false)} />}
          {/* New VCard Form */}
          {isNewVCardFormOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Create New VCard</h2>
                <form onSubmit={handleNewVCardSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700">Avatar</label>
                    <input
                      type="text"
                      value={newVCard.avatar}
                      onChange={(e) => setNewVCard({ ...newVCard, avatar: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      value={newVCard.name}
                      onChange={(e) => setNewVCard({ ...newVCard, name: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <input
                      type="text"
                      value={newVCard.role}
                      onChange={(e) => setNewVCard({ ...newVCard, role: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">URL Alias</label>
                    <input
                      type="text"
                      value={newVCard.urlAlias}
                      onChange={(e) => setNewVCard({ ...newVCard, urlAlias: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setIsNewVCardFormOpen(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Mycards;