import React, { useState, useCallback } from "react";
import Sidenav from "../../components/admin_nav/SuperadminSidenav";
import TopNavbar from "../../components/admin_nav/topnav";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { 
  Box, 
  CircularProgress 
} from "@mui/material"; // Import MUI components

// Define themes with descriptions
const themes = [
  { 
    id: 1, 
    title: "भारतीय जनता पार्टी", 
    bgColor: "bg-white", 
    previewImage: "Temp-1.png",
    primaryColor: "orange",
  },
  { 
    id: 2, 
    title: "Bhartiya Janata Party", 
    bgColor: "bg-white", 
    previewImage: "Temp-2.png",
    primaryColor: "orange",
  },
  { 
    id: 3, 
    title: "Shivsena", 
    bgColor: "bg-orange-200", 
    previewImage: "Temp-3.png",
    primaryColor: "saffron",
  },
  { 
    id: 4, 
    title: "शिवसेना", 
    bgColor: "bg-orange-200", 
    previewImage: "Temp-4.png",
    primaryColor: "saffron",
  },
  { 
    id: 5, 
    title: "National Congress Party", 
    bgColor: "bg-blue-100", 
    previewImage: "Temp-5.png",
    primaryColor: "blue",
  },
  { 
    id: 6, 
    title: "राष्ट्रीय काँग्रेस पार्टी", 
    bgColor: "bg-blue-100", 
    previewImage: "Temp-6.png",
    primaryColor: "blue",
  },
];

export default function Theme() {
  const [activeThemeIds, setActiveThemeIds] = useState([]); // Use array to track multiple active themes
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const navigate = useNavigate(); // Initialize navigate

  // Memoized theme toggle handler (activate/deactivate individual themes)
  const handleThemeToggle = useCallback((id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      setActiveThemeIds((prevIds) => {
        if (prevIds.includes(id)) {
          // Deactivate the theme (remove from activeIds)
          return prevIds.filter((themeId) => themeId !== id);
        } else {
          // Activate the theme (add to activeIds)
          return [...prevIds, id];
        }
      });
      setTimeout(() => {
        setIsLoading(false); // Simulate a slight delay for UX, then stop loading
      }, 500);
    } catch (err) {
      setError("Failed to toggle theme. Please try again.");
      setIsLoading(false);
    }
  }, []);

  // Reset all themes to inactive
  const handleResetAll = () => {
    setActiveThemeIds([]);
    setError(null);
  };

  // Save handler (placeholder for actual save logic)
  const handleSave = () => {
    if (activeThemeIds.length > 0) {
      const selectedThemes = themes.filter((theme) => activeThemeIds.includes(theme.id));
      console.log("Themes saved:", selectedThemes);
      alert(`Themes ${selectedThemes.map(theme => theme.title).join(", ")} have been saved!`);
    } else {
      setError("Please select at least one theme to save.");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "grey.50" }}>
      {/* Top Navbar */}
      <TopNavbar />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <Sidenav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            width: { xs: "100%", sm: `calc(100% - ${isSidebarOpen ? "240px" : "60px"})` },
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-black sm:text-4xl">
                Manage Your Themes
              </h1>
              {activeThemeIds.length > 0 && (
                <button
                  onClick={handleResetAll}
                  className="px-4 py-2 text-sm font-medium text-black bg-blue-500 rounded-lg hover:bg-blue-500"
                >
                  Reset All
                </button>
              )}
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Theme Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`relative rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                    activeThemeIds.includes(theme.id)
                      ? "ring-4 ring-blue-500 scale-102"
                      : "hover:shadow-xl hover:scale-105"
                  } ${theme.bgColor} cursor-pointer`}
                  onClick={() => !isLoading && handleThemeToggle(theme.id)}
                >
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-2 text-gray-900">
                      {theme.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{theme.description}</p>
                    <div className="relative h-48 w-full overflow-hidden rounded-lg">
                      <img
                        src={theme.previewImage}
                        alt={`Preview of ${theme.title}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        onError={(e) => {
                          e.target.src = "/fallback-image.png";
                        }}
                      />
                      {isLoading && activeThemeIds.includes(theme.id) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <CircularProgress size={24} color="inherit" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <span
                      className={`w-full py-3 text-lg font-bold rounded-lg shadow-sm transition-all duration-300 ${
                        activeThemeIds.includes(theme.id)
                          ? "bg-green-600 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {activeThemeIds.includes(theme.id) ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="mt-8">
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
                disabled={activeThemeIds.length === 0 || isLoading}
              >
                Save Themes
              </button>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
}