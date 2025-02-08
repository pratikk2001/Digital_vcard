import React, { useState } from "react";
import Sidenav from "../../components/customer_nav/Customersidenav";
import TopNavbar from "../../components/customer_nav/Topnavbar"; // Import the new Navbar component

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* Navbar */}
      <TopNavbar />

      <div className="flex">
        {/* Sidebar */}
        <Sidenav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <div
          className={`flex-1 p-6 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <main className="bg-gray-50 p-6 rounded-lg shadow-md">
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[  
                { label: "Total Active VCards", value: 1, color: "bg-blue-500" },
                { label: "Total Deactivated VCards", value: 0, color: "bg-green-500" },
                { label: "Today Inquiries", value: 0, color: "bg-blue-400" },
                { label: "Today Appointments", value: 0, color: "bg-yellow-400" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg shadow-lg text-white ${stat.color}`}
                >
                  <p className="text-lg font-semibold">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
