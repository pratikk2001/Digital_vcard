import React, { useState } from "react";
import Box from "@mui/material/Box";
import Sidenav from "../../components/customer_nav/Customersidenav";
import TopNavbar from "../../components/customer_nav/Topnavbar";

const themes = [
  {
    id: 1,
    title: "Theme One",
    bgColor: "bg-white",
    previewImage:
      "https://img.freepik.com/free-vector/general-business-id-card_23-2148646549.jpg?w=826&t=st=1695389828~exp=1695390428~hmac=7337168daf2d912a988d7a06209e1ae529533d7604d14321615f1639ee95f50a",
  },
  {
    id: 2,
    title: "Theme Two",
    bgColor: "bg-gray-200",
    previewImage:
      "https://mir-s3-cdn-cf.behance.net/projects/404/6b2a61183248679.Y3JvcCw4MDgsNjMyLDAsMA.jpg",
  },
  {
    id: 3,
    title: "Theme Three",
    bgColor: "bg-blue-100",
    previewImage:
      "https://static.vecteezy.com/system/resources/previews/036/062/140/non_2x/modern-and-clean-business-id-card-template-vector.jpg",
  },
  {
    id: 4,
    title: "Theme Four",
    bgColor: "bg-white",
    previewImage:
      "https://thumbs.dreamstime.com/z/premium-employee-id-card-photo-placeholder-name-position-company-profile-template-premium-employee-id-card-photo-218475916.jpg",
  },
  {
    id: 5,
    title: "Theme Five",
    bgColor: "bg-pink text-white",
    previewImage:
      "https://img.freepik.com/free-vector/modern-id-card-template_23-2148205972.jpg",
  },
  {
    id: 6,
    title: "Theme Six",
    bgColor: "bg-gray-300",
    previewImage:
      "https://static.vecteezy.com/system/resources/previews/004/957/037/non_2x/professional-id-card-template-vector.jpg",
  },
];

export default function Themes() {
  const [activeThemeId, setActiveThemeId] = useState(null);

  const handleThemeSelection = (id) => {
    setActiveThemeId(id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <TopNavbar />

      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Sidebar - Visible only on large screens */}
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
          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center sm:text-left">
            Select Your Theme
          </h1>

          {/* Theme Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-0">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`relative rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform ${
                  activeThemeId === theme.id
                    ? "ring-4 ring-pink-600 scale-105"
                    : "hover:scale-105"
                } ${theme.bgColor}`}
              >
                <div className="p-5 text-center">
                  {/* Theme Title */}
                  <h3 className="font-semibold text-2xl mb-4 text-gray-900">
                    {theme.title}
                  </h3>
                  {/* Theme Image */}
                  <img
                    src={theme.previewImage}
                    alt={`Preview of ${theme.title}`}
                    className="rounded-md w-full h-48 object-cover transition-all duration-300 transform hover:scale-105"
                  />
                </div>
                {/* Select Button */}
                <div className="flex justify-center pb-5">
                  <button
                    className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ${
                      activeThemeId === theme.id
                        ? "bg-pink-600 text-white"
                        : "bg-pink-500 text-white hover:bg-pink-600"
                    }`}
                    onClick={() => handleThemeSelection(theme.id)}
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
