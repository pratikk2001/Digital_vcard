import React, { useState } from "react";
import Sidenav from "../../components/multiadmin_nav/sidenav";
import TopNavbar from "../../components/multiadmin_nav/Topnavbar";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Navbar */}
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
          <main className="bg-blue-300 p-6 rounded-xl shadow-md">
            {/* Header */}
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
              Admin Dashboard
            </h1>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Active VCards", value: 1, color: "bg-blue-600" },
                { label: "Total Deactivated VCards", value: 0, color: "bg-green-500" },
                { label: "Today Inquiries", value: 0, color: "bg-indigo-500" },
                { label: "Today Appointments", value: 0, color: "bg-yellow-500" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl shadow-lg text-white ${stat.color} hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
                >
                  <p className="text-lg font-semibold">{stat.label}</p>
                  <p className="text-4xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
