import { useState } from "react";
import { FiSearch, FiUsers, FiBarChart2, FiEdit2 } from "react-icons/fi";
import { Switch } from "@headlessui/react";

export default function VCardDashboard() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 border-r hidden md:block">
        <h2 className="text-xl font-bold text-indigo-600 mb-4">My Viscards</h2>
        <nav className="space-y-2">
          <NavItem label="Dashboard" />
          <NavItem label="VCards" active />
          <NavItem label="Inquiries" />
          <NavItem label="Appointments" />
          <NavItem label="Product Orders" />
          <NavItem label="Virtual Backgrounds" />
          <NavItem label="Storage" />
          <NavItem label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <div className="relative">
            <FiSearch className="absolute left-2 top-3 text-gray-400" />
            <input type="text" placeholder="Search" className="pl-8 py-2 border rounded-lg w-72" />
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">New VCard</button>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        {/* VCard Table */}
        <div className="p-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-sm border-b">
                  <th className="p-2">VCard Name</th>
                  <th className="p-2">Preview URL</th>
                  <th className="p-2">Stats</th>
                  <th className="p-2">Subscribers</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Created At</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <span className="text-indigo-600 font-medium">Pratik</span>
                  </td>
                  <td className="p-2 text-indigo-500 cursor-pointer">https://myviscards.xyz/pratikkankarej</td>
                  <td className="p-2"><FiBarChart2 className="text-blue-500" /></td>
                  <td className="p-2"><FiUsers className="text-blue-500" /></td>
                  <td className="p-2">
                    <Switch checked={enabled} onChange={setEnabled} className={`${enabled ? 'bg-blue-600' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full`}>
                      <span className="sr-only">Enable notifications</span>
                      <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`} />
                    </Switch>
                  </td>
                  <td className="p-2 text-gray-500">12 Sep 2024</td>
                  <td className="p-2"><FiEdit2 className="text-gray-500 cursor-pointer" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ label, active }) {
  return (
    <div className={`p-2 rounded-lg cursor-pointer ${active ? 'bg-indigo-100 text-indigo-600 font-semibold' : 'text-gray-700 hover:bg-gray-200'}`}>{label}</div>
  );
}
