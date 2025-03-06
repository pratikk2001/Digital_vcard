import React, { useState, useEffect } from "react";
import { FaUsers, FaChartBar, FaEdit } from "react-icons/fa";
import Sidenav from "../../components/customer_nav/Customersidenav";
import TopNavbar from "../../components/customer_nav/Topnavbar";
import ProfileForm from "./popupForm";

const Mycards = () => {
  const [selectedVCard, setSelectedVCard] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [vcards, setVcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch VCARDs from backend
  useEffect(() => {
    const fetchVCards = async () => {
      try {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found. Please log in again.");

        const response = await fetch(`${apiBaseUrl}/api/template/getUserVCards/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        if (response.ok && result.status_code === 200) {
          setVcards(result.data);
          console.log("VCards:", result.data);
        } else {
          throw new Error(result.message || "Failed to fetch VCards");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVCards();
  }, []);

  // Handle Edit Button Click
  const handleEditClick = (vcard) => {
    setSelectedVCard(vcard);
    setIsFormOpen(true);
  };

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const baseUrl = "http://localhost:3000";

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <TopNavbar />
      <div className="flex flex-grow flex-col md:flex-row">
        <Sidenav />
        <main className="flex-grow p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">My VCards</h1>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-lg text-blue-600">Loading your VCards...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6">
                <p className="font-semibold">Error:</p>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && (
              <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
                <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                  <input
                    type="text"
                    placeholder="Search VCards..."
                    className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left table-auto">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-lg">
                      <tr>
                        <th className="p-4 font-semibold">VCard Name</th>
                        <th className="p-4 font-semibold">Preview URL</th>
                        <th className="p-4 font-semibold">Created On</th>
                        <th className="p-4 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vcards.length > 0 ? (
                        vcards.map((item, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50 transition-all">
                            <td className="p-4 flex items-center">
                              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                <img
                                  src={
                                    item?.profilePicture
                                      ? `http://localhost:4500/api/template/getprofileImage/${item.profilePicture}`
                                      : "/default-profile.jpg"
                                  }
                                  alt={item.firstName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <p className="text-lg font-bold text-blue-600">{item.firstName}</p>
                                <p className="text-lg text-blue-600 ">{item.lastName}</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <a
                                href={`${baseUrl}/${item.urlAlias}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline break-all text-lg"
                              >
                                {`${baseUrl}/${item.urlAlias}`}
                              </a>
                            </td>
                            <td className="p-4 text-lg text-gray-600">
                              {formatDate(item.createdAt)}
                            </td>
                            <td className="p-4">
                              <button
                                onClick={() => handleEditClick(item)}
                                className="text-blue-500 hover:text-blue-700 transition-all duration-200"
                              >
                                <FaEdit size={28} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center p-6 text-gray-500 text-lg">
                            No VCards found. Create your first VCard!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Edit Form Modal */}
          {isFormOpen && (
            <ProfileForm vcardData={selectedVCard} onClose={() => setIsFormOpen(false)} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Mycards;