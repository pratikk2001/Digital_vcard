import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PowerIcon from '@mui/icons-material/Power';
import InboxIcon from '@mui/icons-material/MoveToInbox';

export default function Sidenav() {
  const navigate = useNavigate();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-48 bg-white text-black
               h-screen fixed top-0 left-0">
        <div className="p-4 flex items-center space-x-2">
          <SettingsIcon />
          <h1 className="text-lg font-bold">E-CARD</h1>
        </div>
        <div className="mt-10">
          <div className="mt-6 space-y-2">
            {/* Dashboard route */}
            <div onClick={() => navigate("/CustomerDashboard")} className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded">
              <div className="flex items-center space-x-2">
                <DashboardIcon />
                <span className="text-gray-700 text-sm">Dashboard</span>
              </div>
            </div>

            {/* Customers route */}
            <div onClick={() => navigate("/CustomersForm")} className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded">
              <div className="flex items-center space-x-2">
                <InboxIcon />
                <span className="text-gray-700 text-sm">Add Details</span>
              </div>
            </div>

            {/* Customers Card route */}
            <div onClick={() => navigate("/CustomerCard")} className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded">
              <div className="flex items-center space-x-2">
                <BarChartIcon />
                <span className="text-gray-700 text-sm">My Cards</span>
              </div>
            </div>  

            {/* Themes route */}
            <div onClick={() => navigate("/CustomerThemes")} className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded">
              <div className="flex items-center space-x-2">
                <AccountTreeIcon />
                <span className="text-gray-700 text-sm">Themes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-60 flex-1 p-6">
        {/* Your main content goes here */}
      </div>
    </div>
  );

  
}
