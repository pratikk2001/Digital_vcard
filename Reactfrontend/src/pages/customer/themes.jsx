import React, { useState } from "react";
import Box from "@mui/material/Box";
import Sidenav from "../../components/customer_nav/Customersidenav";
import TopNavbar from "../../components/customer_nav/Topnavbar"; // Import the Navbar component

const themes = [
  { 
    id: 1,
    title: "Theme One",
    bgColor: "bg-white",
    previewImage: "https://img.freepik.com/free-vector/general-business-id-card_23-2148646549.jpg?w=826&t=st=1695389828~exp=1695390428~hmac=7337168daf2d912a988d7a06209e1ae529533d7604d14321615f1639ee95f50a", // Replace with actual image
  },
  { 
    id: 2,
    title: "Theme Two",
    bgColor: "bg-gray-200",
    previewImage: "https://mir-s3-cdn-cf.behance.net/projects/404/6b2a61183248679.Y3JvcCw4MDgsNjMyLDAsMA.jpg", // Replace with actual image
  },
  {
    id: 3,
    title: "Theme Three",
    bgColor: "bg-blue-100",
    previewImage: "https://static.vecteezy.com/system/resources/previews/036/062/140/non_2x/modern-and-clean-business-id-card-template-vector.jpg", // Replace with actual image
  },
  {
    id: 4,
    title: "Theme Four",
    bgColor: "bg-white",
    previewImage: "https://thumbs.dreamstime.com/z/premium-employee-id-card-photo-placeholder-name-position-company-profile-template-premium-employee-id-card-photo-218475916.jpg", // Replace with actual image
  },
];

export default function Themes() {
  const [activeThemeId, setActiveThemeId] = useState(null); // State to track the active theme

  const handleThemeSelection = (id) => {
    setActiveThemeId(id); // Update the active theme ID
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopNavbar />

      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidenav />
        </div>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <h1 className="text-xl sm:text-2xl font-bold mb-6">Themes</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`relative rounded-lg shadow-md overflow-hidden ${theme.bgColor} ${
                  activeThemeId === theme.id ? "ring-4 ring-pink-500" : ""
                }`} // Highlight active theme with a ring
              >
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{theme.title}</h3>
                  <img
                    src={theme.previewImage}
                    alt={`Preview of ${theme.title}`}
                    className="rounded-md w-full h-40 object-cover"
                  />
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <button
                    className={`${
                      activeThemeId === theme.id
                        ? "bg-pink-600"
                        : "bg-pink-500 hover:bg-pink-600"
                    } text-white px-4 py-2 rounded-md shadow`}
                    onClick={() => handleThemeSelection(theme.id)} // Set the active theme
                  >
                    {activeThemeId === theme.id ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Box>
    </div>
  );
}
