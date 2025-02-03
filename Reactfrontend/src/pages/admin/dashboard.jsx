import React, { useState, useEffect } from "react";
import Sidenav from "../../components/admin_nav/SuperadminSidenav";
import BarAnimation from "./graph/Bar";
import CommunityFeedback from "./graph/feedback";
import TopNavbar from "../../components/admin_nav/topnav";

export default function Home() {
  const [purchases, setPurchases] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [refunds, setRefunds] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://3.227.101.169:8020/api/v1/sample_assignment_api_1/",
          {
            headers: { Authorization: "Basic " + btoa("trial:assignment123") },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setPurchases(data.purchases);
        setRevenue(data.revenue);
        setRefunds(data.refunds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      {/* Navbar */}
      <TopNavbar />

      <div className="flex">
        {/* Sidebar */}
        <Sidenav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <div
          className={`flex-1 p-4 transition-all duration-300 ${
            isSidebarOpen ? "lg:ml md:ml sm:ml-0" : "ml-0"
          }`}
        >
          <main className="bg-white shadow-lg rounded-lg p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Users", value: 200, color: "bg-blue-500" },
                { label: "Active Users", value: 150, color: "bg-green-500" },
                { label: "Total Themes", value: 4, color: "bg-purple-500" },
              ].map((stat, index) => (
                <div key={index} className={`${stat.color} p-5 rounded-lg text-white shadow-md`}>
                  <p className="text-lg font-semibold">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Graph Section */}
            <div className="bg-gray-100 p-5 rounded-lg shadow-lg mb-6">
              <p className="text-lg font-semibold mb-3">User Growth Statistics</p>
              <BarAnimation />
            </div>

            {/* Feedback Section */}
            <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
              <p className="text-lg font-semibold mb-3">User Feedback</p>
              <CommunityFeedback />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
