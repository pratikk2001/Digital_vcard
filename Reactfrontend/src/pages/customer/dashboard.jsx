import React, { useState, useEffect } from "react";
import Sidenav from "../../components/customer_nav/Customersidenav";
import BarAnimation from "./graph/Bar";
import Product from "../../components/product";
import CommunityFeedback from "./graph/feedback";
import TopNavbar from "../../components/customer_nav/Topnavbar"; // Import the new Navbar component 

export default function Home() {
  const [purchases, setPurchases] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [refunds, setRefunds] = useState(null);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await fetch("http://3.227.101.169:8020/api/v1/sample_assignment_api_1/", {
          headers: {
            Authorization: "Basic " + btoa("trial:assignment123"),
          },
        });
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
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Add Navbar */}
      <TopNavbar />
      <div className="flex flex-grow">
        <Sidenav />
        <main className="flex-grow p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
