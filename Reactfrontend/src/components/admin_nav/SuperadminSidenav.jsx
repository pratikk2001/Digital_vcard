import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import PowerIcon from "@mui/icons-material/Power";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"; // New icon for Super Admin

export default function Sidenav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Define menu items with correct paths
  const menuItems = [
    { text: "Dashboard", path: "/dashboard" },
    { text: "Customers", path: "/customers" },
    { text: "Themes", path: "/themes" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen fixed top-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 w-64 shadow-xl`}
      >
        {/* Header */}
        <div className="p-6 flex items-center space-x-3 border-b border-white">
          <AdminPanelSettingsIcon className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Super Admin</h1>
        </div>

        {/* Sidebar menu items */}
        <nav className="mt-8 space-y-2 px-3">
          {menuItems.map(({ text, path }, index) => (
            <SidebarLink
              key={text}
              text={text}
              path={path}
              index={index}
              navigate={navigate}
              location={location}
            />
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-0 w-full px-6">
          <div
            onClick={() => navigate("/")}
            className="group flex items-center space-x-3 px-4 py-3 mx-3 rounded-lg  hover:bg-red-700 cursor-pointer transition-all duration-300 transform hover:scale-105"
          >
            <PowerIcon className="w-6 h-6 text-white group-hover:text-red-200" />
            <span className="text-lg font-medium">Logout</span>
          </div>
        </div>
      </div>

      {/* Sidebar toggle button for mobile */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          className="p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
        {/* Placeholder for content */}
      </div>
    </div>
  );
}

// SidebarLink Component
function SidebarLink({ text, path, index, navigate, location }) {
  const icons = [
    <DashboardIcon className="w-5 h-5" />,
    <InboxIcon className="w-5 h-5" />,
    <BarChartIcon className="w-5 h-5" />,
    <AccountTreeIcon className="w-5 h-5" />,
  ];

  const isActive = location.pathname.toLowerCase() === path.toLowerCase();

  return (
    <div
      onClick={() => navigate(path)}
      className={`flex items-center space-x-3 px-4 py-3 mx-3 rounded-lg cursor-pointer transition-all duration-200 transform hover:bg-gray-700 hover:text-blue-300 ${
        isActive ? "bg-blue-600 text-white" : "text-gray-300"
      }`}
    >
      {React.cloneElement(icons[index], {
        className: `w-5 h-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-blue-300"}`,
      })}
      <span className="text-base font-medium">{text}</span>
    </div>
  );
}