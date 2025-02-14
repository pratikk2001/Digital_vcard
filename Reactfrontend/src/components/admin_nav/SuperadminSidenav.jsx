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
        className={`bg-gray-300 text-black h-screen fixed top-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-50 overflow-hidden shadow-2xl rounded-r-lg`}
      >
        <div className="p-6 flex items-center space-x-2 border-b border-gray-700">
          <SettingsIcon className="text-2xl" />
          <h1 className="text-xl font-bold">Digital Vcard Admin</h1>
        </div>
        <div className="font-semibold mt-6 space-y-4">
          {["Dashboard", "Customers", "Customers Card", "Themes"].map(
            (text, index) => (
              <div
                key={text}
                onClick={() => navigate("/" + text)}
                className="px-6 py-3 hover:bg-blue-600 cursor-pointer rounded-lg flex items-center space-x-3 transition duration-300 transform hover:scale-105"
              >
                {index === 0 && (
                  <DashboardIcon className="text-lg text-black" />
                )}
                {index === 1 && <InboxIcon className="text-lg text-blacck" />}
                {index === 2 && (
                  <BarChartIcon className="text-lg text-black" />
                )}
                {index === 3 && (
                  <AccountTreeIcon className="text-lg text-black" />
                )}
                <span className="text-black text-lg">{text}</span>
              </div>
            )
          )}
        </div>
        <div className="absolute bottom-10 left-0 w-full px-6">
          <div
            onClick={() => navigate("/")}
            className="px-6 py-3 hover:bg-red-600 cursor-pointer rounded-lg flex items-center space-x-3 transition duration-300 transform hover:scale-105"
          >
            <PowerIcon className="text-lg text-black" />
            <span className="text-black text-lg">Logout</span>
          </div>
        </div>
      </div>

      {/* Sidebar toggle button for mobile */}
      <div className="lg:hidden fixed top-5 right-5 z-50">
        <button
          className="p-3 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
