import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Sidenav from "../../components/multiadmin_nav/sidenav";
import TopNavbar from "../../components/multiadmin_nav/Topnavbar";
import axios from "axios"; // For API calls
import jwtDecode from "jwt-decode"; // For role-based access

const Theme = () => {
  const [themes, setThemes] = useState([]); // State for themes fetched from backend
  const [activeThemeId, setActiveThemeId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const navigate = useNavigate();

  // Fetch themes from backend on component mount
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/multiadmin/login"); // Redirect to Multi Admin login if no token
          return;
        }

        const decoded = jwtDecode(token);
        if (decoded.role !== "multiadmin") {
          navigate("/multiadmin/login"); // Restrict access to Multi Admins only
          return;
        }

        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
        const response = await axios.get(`${apiBaseUrl}/api/multiadmin/themes`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setThemes(response.data.data || []);
      } catch (err) {
        setError("Failed to load themes. Please try again.");
        console.error("Error fetching themes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemes();
  }, [navigate]);

  // Memoized theme selection handler
  const handleThemeSelection = useCallback((id) => {
    setIsLoading(true);
    setError(null);

    try {
      setActiveThemeId(id);
      setTimeout(() => setIsLoading(false), 500); // Simulate a slight delay for UX
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

  // Save selected theme to backend
  const handleSave = async () => {
    if (!activeThemeId) {
      setError("Please select a theme to save.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const selectedTheme = themes.find((theme) => theme.id === activeThemeId);

      await axios.post(
        `${apiBaseUrl}/api/multiadmin/themes/save`,
        { themeId: activeThemeId, userId: jwtDecode(token).userId }, // Adjust payload as needed
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Theme "${selectedTheme.title}" has been saved successfully!`);
    } catch (err) {
      setError("Failed to save theme. Please try again.");
      console.error("Error saving theme:", err);
    }
  };

  if (isLoading && !error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", bgcolor: "grey.50" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, bgcolor: "grey.50" }}>
        <div className="max-w-6xl mx-auto p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      </Box>
    );
  }

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
            transition: "width 0.3s ease-in-out",
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
                  className="px-4 py-2 text-sm font-medium text-black bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Reset Selection
                </button>
              )}
            </div>

            {/* Theme Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`relative rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                    activeThemeId === theme.id
                      ? "ring-4 ring-blue-500 scale-102"
                      : "hover:shadow-xl hover:scale-105"
                  } ${theme.bgColor || "bg-white"} cursor-pointer`}
                  onClick={() => !isLoading && handleThemeSelection(theme.id)}
                >
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-2 text-gray-900">
                      {theme.title}
                    </h3>
                    <div className="relative h-48 w-full overflow-hidden rounded-lg">
                      <img
                        src={theme.previewImage ? `/themes/${theme.previewImage}` : "/fallback-image.png"}
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
                  <img
                    src={themes.find((theme) => theme.id === activeThemeId)?.previewImage ? `/themes/${themes.find((theme) => theme.id === activeThemeId)?.previewImage}` : "/fallback-image.png"}
                    alt="Selected Theme Preview"
                    className="w-full max-w-md mx-auto rounded-lg shadow-md"
                    onError={(e) => {
                      e.target.src = "/fallback-image.png";
                    }}
                  />
                </div>
              </div>
            )}

            {/* Save and Reset Buttons */}
            <div className="mt-12 flex justify-center space-x-4">
              <button
                onClick={handleSave}
                className="px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
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
};

export default Theme;