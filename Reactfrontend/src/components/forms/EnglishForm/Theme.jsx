import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Box from "@mui/material/Box";


const themes = [
  { id: 1, title: "Theme One", bgColor: "bg-white", previewImage: "Temp-1.png" },
  { id: 2, title: "Theme Two", bgColor: "bg-gray-200", previewImage: "Temp-2.png" },
  { id: 3, title: "Theme Three", bgColor: "bg-blue-100", previewImage: "Temp-3.png" },
  { id: 4, title: "Theme Four", bgColor: "bg-white", previewImage: "Temp-4.png" },
  { id: 5, title: "Theme Five", bgColor: "bg-pink text-white", previewImage: "Temp-5.png" },
  { id: 6, title: "Theme Six", bgColor: "bg-gray-300", previewImage: "Temp-6.png" },
];

export default function Themes() {
  const [activeThemeId, setActiveThemeId] = useState(null);
  const navigate = useNavigate(); // React Router navigation function

  const handleThemeSelection = (id) => {
    setActiveThemeId(id);
    navigate(`/templates${id}`); // Redirect to the corresponding template page
  };

  return (

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center sm:text-left">
            Select Your Theme
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-0">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`relative rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform ${
                  activeThemeId === theme.id
                    ? "ring-4 ring-blue-600 scale-105"
                    : "hover:scale-105"
                } ${theme.bgColor}`}
              >
                <div className="p-5 text-center">
                  <h3 className="font-semibold text-2xl mb-4 text-gray-900">
                    {theme.title}
                  </h3>
                  {/* Image Scroll Effect on Hover */}
                  <div className="relative h-48 w-full overflow-hidden rounded-md">
                    <img
                      src={theme.previewImage}
                      alt={`Preview of ${theme.title}`}
                      className="w-full h-auto transition-transform duration-500 transform hover:translate-y-[-20%]"
                    />
                  </div>
                </div>
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
  );
}
