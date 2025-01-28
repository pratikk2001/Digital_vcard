import React, { useState, useEffect } from "react";
import Sidenav from "../../components/customer_nav/Customersidenav";
import BarAnimation from "./graph/Bar";
// import Product from "../../components/product";
import CommunityFeedback from "./graph/feedback";
import TopNavbar from "../../components/customer_nav/Topnavbar"; // Import the new Navbar component

export default function Home() {
  const [purchases, setPurchases] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [refunds, setRefunds] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar toggle

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await fetch(
          "http://3.227.101.169:8020/api/v1/sample_assignment_api_1/",
          {
            headers: {
              Authorization: "Basic " + btoa("trial:assignment123"),
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setPurchases(responseData.purchases);
        setRevenue(responseData.revenue);
        setRefunds(responseData.refunds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData1();
  }, []);

  return (
    <div className="flex flex-col bg-gray-100">
      {/* Navbar */}
      <TopNavbar />

      <div className="flex">
        {/* Sidebar */}
        <Sidenav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <div
          className={`flex-1 p-2 sm:p-4 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <main className="bg-gray-50">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Dashboard
                </h1>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {[
                  { label: "Total Users", value: 200 },
                  { label: "Active Users", value: 150 },
                  { label: "Total Themes", value: 4 },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-lg text-center"
                  >
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-700">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Graph Section */}
              <div className="bg-white p-3 rounded-lg shadow mb-4">
                <p className="text-base font-semibold mb-2">Comparison</p>
                <BarAnimation />
              </div>

              {/* Product Section */}
              <div className="bg-white p-3 rounded-lg shadow mb-4">
                {/* <Product /> */}
              </div>

              {/* Feedback Section */}
              <div className="bg-white p-3 rounded-lg shadow">
                <CommunityFeedback />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
