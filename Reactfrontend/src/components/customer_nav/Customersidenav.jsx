import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dashboard, MoveToInbox, BarChart, AccountTree, Menu } from "@mui/icons-material";

export default function Sidenav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  // Sidebar links stored in useMemo for optimization
  const sidebarLinks = React.useMemo(() => [
    { name: "Dashboard", path: "/CustomerDashboard", icon: <Dashboard /> },
    { name: "Add Details", path: "/FormDashboard", icon: <MoveToInbox /> },
    { name: "My Cards", path: "/CustomerCard", icon: <BarChart /> },
    { name: "Themes", path: "/CustomerThemes", icon: <AccountTree /> },
  ], []);

  // Optimized navigation function
  const handleNavigation = React.useCallback((path) => {
    navigate(path);
    setIsOpen(false);
  }, [navigate]);

  return (
    <div className="flex">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-black bg-blue-100 fixed top-4 right-5 z-30 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
        aria-expanded={isOpen}
        aria-controls="sidebar"
      >
        <Menu />
      </button>

      {/* Sidebar Navigation */}
      <nav
        id="sidebar"
        className={`fixed top-0 left-0 h-screen bg-white text-gray-700 shadow-lg transition-transform duration-300 ease-in-out z-20 w-64 sm:w-56 md:w-64 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        role="navigation"
      >
        <div className="mt-0 space-y-3">
          {/* Sidebar Header */}
          <div className=" h-10 my-4 flex items-center justify-center text-black font-bold text-2xl">Digital VCard</div>


          {/* Divider */}
          <div className="border-t-2 border-black my-2"></div>

          {/* Sidebar Links */}
          {sidebarLinks.map((item) => (
            <SidebarLink
              key={item.path}
              item={item}
              isActive={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            />
          ))}
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <div className={`md:ml-64 flex-1 p-6 transition-all duration-300 ${isOpen ? 'ml-64' : ''}`}>
        {/* Main content goes here */}
      </div>
    </div>
  );
}

// Sidebar Link Component
const SidebarLink = React.memo(({ item, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center space-x-3 px-6 py-4 cursor-pointer rounded-lg mx-3 transition-all duration-300 ease-in-out
      ${isActive ? "bg-blue-500 text-white shadow-md transform scale-105" : "hover:bg-blue-500 hover:text-white"}`}
  >
    {item.icon}
    <span className="text-lg font-medium">{item.name}</span>
  </div>
));
