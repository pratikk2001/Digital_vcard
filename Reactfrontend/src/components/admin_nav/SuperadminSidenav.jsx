import * as React from "react";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MenuIcon from "@mui/icons-material/Menu";
import PowerIcon from "@mui/icons-material/Power";
import InboxIcon from "@mui/icons-material/MoveToInbox";

export default function Sidenav() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen fixed top-0 left-0 ${
          isSidebarOpen ? "w-64" : "w-0"
        } sm:w-64 transition-all duration-300 z-50 overflow-hidden`}
      >
        <div className="p-4 flex items-center space-x-2">
          <SettingsIcon />
          <h1 className="text-lg font-bold">E-CARD ADMIN</h1>
        </div>
        <div className="mt-6 space-y-2">
          {["Dashboard", "Customers", "Customers Card", "Themes"].map(
            (text, index) => (
              <div
                key={text}
                onClick={() => navigate("/" + text)}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer rounded flex items-center space-x-2"
              >
                {index === 0 && <DashboardIcon />}
                {index === 1 && <InboxIcon />}
                {index === 2 && <BarChartIcon />}
                {index === 3 && <AccountTreeIcon />}
                <span className="text-gray-400 text-sm">{text}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Sidebar toggle button for mobile */}
      <div className="sm:hidden fixed top-2 right-2 z-50">
        <button
          className="p-2 bg-gray-800 text-white rounded-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <MenuIcon />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0 sm:ml-64 transition-all duration-300">
        {/* Content here */}
      </div>
    </div>
  );
}
