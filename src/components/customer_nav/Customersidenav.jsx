import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MenuIcon from "@mui/icons-material/Menu";

export default function Sidenav() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path
  const [isOpen, setIsOpen] = React.useState(false);

  // Sidebar Links
  const sidebarLinks = [
    { name: "Dashboard", path: "/CustomerDashboard", icon: <DashboardIcon /> },
    { name: "Add Details", path: "/FormDashboard", icon: <InboxIcon /> },
    { name: "My Cards", path: "/CustomerCard", icon: <BarChartIcon /> },
    { name: "Themes", path: "/CustomerThemes", icon: <AccountTreeIcon /> },
  ];

  return (
    <div className="flex">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 text-black bg-gray-300 fixed top-1 right-2 z-30 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-18 left-0 h-screen bg-gray-300 text-black-500 shadow-lg transition-transform duration-300 ease-in-out z-20 w-64 sm:w-56 md:w-64 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* <div className="p-6 flex items-center space-x-3 border-b border-blue-500"> */}
          {/* <SettingsIcon className="text-black text-2xl" /> */}
          {/* <h1 className="text-2xl font-bold">Digital Vcard</h1> */}
        {/* </div> */}

        {/* Navigation Links */}
        <div className="mt-10 space-y-4">
          {sidebarLinks.map((item, index) => (
            <div
              key={index}
              onClick={() => { navigate(item.path); setIsOpen(false); }}
              className={`flex items-center space-x-3 px-6 py-4 cursor-pointer rounded-lg mx-3 transition-all duration-300 ease-in-out
              ${location.pathname === item.path ? "bg-blue-500 text-white shadow-md transform scale-105" : "hover:bg-blue-500 hover:text-white"}`}
            >
              {item.icon}
              <span className="text-lg font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Padding */}
      <div className="md:ml-64 flex-1 p-6 transition-all duration-300">
        {/* Your main content goes here */}
      </div>
    </div>
  );
}
