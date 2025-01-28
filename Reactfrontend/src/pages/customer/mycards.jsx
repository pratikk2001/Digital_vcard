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
      <div className="flex flex-grow">
        <Sidenav />
        <main className="flex-grow p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">VCards</h1>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-1/3 p-2 border rounded-md"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  New VCard
                </button>
              </div>
              <table className="w-full text-left">
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
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="p-4 flex items-center">
                        <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
                          {item.avatar}
                        </div>
                        <div className="ml-3">
                          <p className="font-semibold text-blue-600">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.role}</p>
                        </div>
                      </td>
                      <td className="p-4 text-blue-500 underline cursor-pointer">{item.url}</td>
                      <td className="p-4"><FaChartBar className="text-blue-500" /></td>
                      <td className="p-4"><FaUsers className="text-blue-500" /></td>
                      <td className="p-4">
                        <label className="switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider round"></span>
                        </label>
                      </td>
                      <td className="p-4 text-gray-500">{item.createdAt}</td>
                      <td className="p-4">
                        <FaEdit className="text-blue-500 cursor-pointer" onClick={() => handleEditClick(item)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
