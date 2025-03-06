import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Sidenav from "../../components/multiadmin_nav/sidenav";
import TopNavbar from "../../components/multiadmin_nav/Topnavbar";

const themes = [
  { 
    id: 1, 
    title: "भारतीय जनता पार्टी", 
    bgColor: "bg-white", 
    previewImage: "Temp-1.png",
    primaryColor: "orange"
  },
  { 
    id: 2, 
    title: "Bhartiya Janata Party", 
    bgColor: "bg-white", 
    previewImage: "Temp-2.png",
    primaryColor: "orange"
  },
  { 
    id: 3, 
    title: "Shivsena", 
    bgColor: "bg-orange-200", 
    previewImage: "Temp-3.png",
    primaryColor: "saffron"
  },
  { 
    id: 4, 
    title: "शिवसेना", 
    bgColor: "bg-orange-200", 
    previewImage: "Temp-4.png",
    primaryColor: "saffron"
  },
  { 
    id: 5, 
    title: "National Congress Party", 
    bgColor: "bg-blue-100", 
    previewImage: "Temp-5.png",
    primaryColor: "blue"
  },
  { 
    id: 6, 
    title: "राष्ट्रीय काँग्रेस पार्टी", 
    bgColor: "bg-blue-100", 
    previewImage: "Temp-6.png",
    primaryColor: "blue"
  },
];

export default function Theme() {
  const [activeThemeId, setActiveThemeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Define sidebar state
  const navigate = useNavigate();

  // Memoized theme selection handler (no navigation)
  const handleThemeSelection = useCallback((id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      setActiveThemeId(id);
      setTimeout(() => {
        setIsLoading(false); // Simulate a slight delay for UX, then stop loading
      }, 500);
    } catch (err) {
      setError("Failed to select theme. Please try again.");
      setIsLoading(false);
    }
  }, []);

  // Reset selection handler
  const handleReset = () => {
    setActiveThemeId(null);
    setError(null);
  };

  // Save handler (placeholder for actual save logic)
  const handleSave = () => {
    if (activeThemeId) {
      const selectedTheme = themes.find((theme) => theme.id === activeThemeId);
      console.log("Theme saved:", selectedTheme);
      alert(`Theme "${selectedTheme.title}" has been saved!`);
    } else {
      setError("Please select a theme to save.");
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
                Select Your Theme
              </h1>
              {activeThemeId && (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-sm font-medium text-black bg-blue-500 rounded-lg hover:bg-blue-500"
                >
                  Reset Selection
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
                    activeThemeId === theme.id
                      ? "ring-4 ring-blue-500 scale-102"
                      : "hover:shadow-xl hover:scale-105"
                  } ${theme.bgColor} cursor-pointer`}
                  onClick={() => !isLoading && handleThemeSelection(theme.id)}
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
                      {isLoading && activeThemeId === theme.id && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <CircularProgress size={24} color="inherit" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <button
                      className={`w-full py-3 text-lg font-semibold rounded-lg shadow-sm transition-all duration-300 ${
                        activeThemeId === theme.id
                          ? "bg-green-600 text-white"
                          : "bg-blue-500 text-white"
                      } disabled:opacity-50`}
                      disabled={isLoading}
                    >
                      {activeThemeId === theme.id ? "Selected ✅" : "Select Theme"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Theme Preview */}
            {activeThemeId !== null && !isLoading && (
              <div className="mt-12 text-center animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  🎉 Selected Theme Preview
                </h2>
                <div className="p-6 bg-white rounded-xl shadow-lg inline-block">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {themes.find((theme) => theme.id === activeThemeId)?.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {themes.find((theme) => theme.id === activeThemeId)?.description}
                  </p>
                  <img
                    src={themes.find((theme) => theme.id === activeThemeId)?.previewImage}
                    alt="Selected Theme Preview"
                    className="w-full max-w-md mx-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            )}

            {/* Save and Reset Buttons */}
            <div className="mt-12 flex justify-center space-x-4">
              <button
                onClick={handleSave}
                className="px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-white transition-all duration-300"
                disabled={isLoading || !activeThemeId}
              >
                Save Theme
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 text-lg font-bold text-gray-800 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Custom CSS for animation */}
          <style jsx>{`
            .animate-fade-in {
              animation: fadeIn 0.5s ease-in;
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
        </Box>
      </Box>
    </Box>
  );
}