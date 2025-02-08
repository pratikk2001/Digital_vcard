import React from "react";
import Sidenav from "../../components/admin_nav/SuperadminSidenav";
import Box from "@mui/material/Box";
import TopNavbar from "../../components/admin_nav/topnav"; // Import the new Navbar component

const themes = [
  {
    id: 1,
    title: "Theme One",
    bgColor: "bg-white",
    previewImage: "https://via.placeholder.com/200", // Replace with actual image
  },
  {
    id: 2,
    title: "Theme Two",
    bgColor: "bg-gray-200",
    previewImage: "https://via.placeholder.com/200", // Replace with actual image
  },
  {
    id: 3,
    title: "Theme Three",
    bgColor: "bg-blue-100",
    previewImage: "https://via.placeholder.com/200", // Replace with actual image
  },
  {
    id: 4,
    title: "Theme Four",
    bgColor: "bg-white",
    previewImage: "https://via.placeholder.com/200", // Replace with actual image
  },
  {
    id: 5,
    title: "Theme Five",
    bgColor: "bg-black text-white",
    previewImage: "https://via.placeholder.com/200", // Replace with actual image
  },
  {
    id: 6,
    title: "Theme Six",
    bgColor: "bg-gray-300",
    previewImage: "https://via.placeholder.com/200", // Replace with actual image
  },
  {
    id: 7,
    title: "Theme Seven",
    bgColor: "bg-pink-500 text-white",
    previewImage: "https://via.placeholder.com/200", // Replace with actual image
  },
  {
    id: 8,
    title: "Theme Eight",
    bgColor: "bg-gray-100",
    previewImage: "https://via.placeholder.com/200", // Replace with actual image
  },
];

export default function Themes() {
  return (
    <div>
      <TopNavbar />
  
      <Box sx={{ display: "flex" }}>
        {/* Sidenav */}
        <Sidenav />
  
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Themes</h1>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`relative rounded-lg shadow-md overflow-hidden ${theme.bgColor}`}
              >
                <div className="p-4">
                  <h3 className="font-bold text-lg sm:text-xl mb-2">{theme.title}</h3>
                  <img
                    src={theme.previewImage}
                    alt={`Preview of ${theme.title}`}
                    className="rounded-md w-full h-40 sm:h-48 lg:h-56 object-cover"
                  />
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md shadow">
                    Preview
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