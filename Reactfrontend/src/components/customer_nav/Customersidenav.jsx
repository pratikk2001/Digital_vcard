import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Settings, Dashboard, MoveToInbox, BarChart, AccountTree, Menu } from "@mui/icons-material";

export default function Sidenav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  // Memoized Sidebar Links
  const sidebarLinks = React.useMemo(() => [
    { name: "Dashboard", path: "/CustomerDashboard", icon: <Dashboard /> },
    { name: "Add Details", path: "/FormDashboard", icon: <MoveToInbox /> },
    { name: "My Cards", path: "/CustomerCard", icon: <BarChart /> },
    { name: "Themes", path: "/CustomerThemes", icon: <AccountTree /> },
  ], []);

  return (
    <div className="flex">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 text-black bg-gray-300 fixed top-4 right-5 z-30 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-18 left-0 h-screen bg-gray-300 text-gray-700 shadow-lg transition-transform duration-300 ease-in-out z-20 w-64 sm:w-56 md:w-64 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        role="navigation"
      >
        {/* Navigation Links */}
        <div className="mt-10 space-y-4">
          {sidebarLinks.map((item, index) => (
            <SidebarLink
              key={index}
              item={item}
              isActive={location.pathname === item.path}
              onClick={() => { navigate(item.path); setIsOpen(false); }}
            />
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="md:ml-64 flex-1 p-6 transition-all duration-300">
        {/* Your main content goes here */}
      </div>
    </div>
  );

  
}

// Extracted SidebarLink Component
function SidebarLink({ item, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-3 px-6 py-4 cursor-pointer rounded-lg mx-3 transition-all duration-300 ease-in-out
      ${isActive ? "bg-blue-500 text-white shadow-md transform scale-105" : "hover:bg-blue-500 hover:text-white"}`}
    >
      {item.icon}
      <span className="text-lg font-medium">{item.name}</span>
    </div>
  );
}
