import React, { useState } from "react";
import { FaUsers, FaChartBar, FaEdit } from "react-icons/fa";
import Sidenav from "../../components/customer_nav/Customersidenav";
import TopNavbar from "../../components/customer_nav/Topnavbar";
import ProfileForm from "./popupForm"; // Import Profile Form

const Mycards = () => {
  const [selectedVCard, setSelectedVCard] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const data = [
    {
      avatar: "PK",
      name: "Pratik Kankarej",
      role: "Software Engineer",
      url: "https://myviscards.xyz/pratikkankarej",
      createdAt: "12 Sep 2024",
    },
  ];

  // Handle Edit Button Click
  const handleEditClick = (vcard) => {
    setSelectedVCard(vcard);
    setIsFormOpen(true);
  };

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
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
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
                    {data.map((item, index) => (
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
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-500 underline">
                            {item.url}
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
                            <input type="checkbox" defaultChecked />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td className="p-4 text-lg text-gray-600">{item.createdAt}</td>
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
          {/* Open Form when Editing */}
          {isFormOpen && <ProfileForm vcardData={selectedVCard} onClose={() => setIsFormOpen(false)} />}
        </main>
      </div>
    </div>
  );
};

export default Mycards;
