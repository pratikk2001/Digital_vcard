import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import PowerIcon from "@mui/icons-material/Power";

export default function Sidenav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Define menu items with correct paths
  const menuItems = [
    { text: "Dashboard", path: "/dashboard" },
    { text: "Customers", path: "/customers" },
    { text: "Customers Card", path: "/customerscard" }, // Set the correct path
    { text: "Themes", path: "/themes" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-blue-100 text-black h-screen fixed top-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-50 shadow-2xl`}
      >
        <div className="p-5 flex items-center space-x-2 border-b-2 border-black">
          <SettingsIcon className="w-6 h-6" />
          <h1 className="text-xl font-bold">Digital Vcard Admin</h1>
        </div>

        {/* Sidebar menu items */}
        <div className="font-semibold mt-6 space-y-4">
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
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-10 left-0 w-full px-6">
          <div
            onClick={() => navigate("/")}
            className="px-6 py-3 hover:bg-red-600 cursor-pointer rounded-lg flex items-center space-x-3 transition duration-300 transform hover:scale-105"
          >
            <PowerIcon className="w-6 h-6 text-black" />
            <span className="text-black text-lg">Logout</span>
          </div>
        </div>
      </div>

      {/* Sidebar toggle button for mobile */}
      <div className="lg:hidden fixed top-5 right-5 z-50">
        <button
          className="p-3 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          <MenuIcon />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
        {/* Content here */}
      </div>
    </div>
  );
}

// SidebarLink Component
function SidebarLink({ text, path, index, navigate, location }) {
  const icons = [
    <DashboardIcon className="text-lg text-black" />,
    <InboxIcon className="text-lg text-black" />,
    <BarChartIcon className="text-lg text-black" />,
    <AccountTreeIcon className="text-lg text-black" />,
  ];

  // Check if the current path matches the menu path
  const isActive = location.pathname.toLowerCase() === path.toLowerCase();

  return (
    <div
      onClick={() => navigate(path)}
      className={`px-6 py-3 rounded-lg flex items-center space-x-3 transition duration-300 transform hover:scale-105 cursor-pointer ${
        isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500"
      }`}
    >
      {icons[index]}
      <span className="text-lg">{text}</span>
    </div>
  );
}
