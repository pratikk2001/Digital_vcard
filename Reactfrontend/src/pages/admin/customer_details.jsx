import React, { useState } from "react";
import Sidenav from "../../components/admin_nav/SuperadminSidenav";
import TopNavbar from "../../components/admin_nav/topnav"; // Import the Navbar component

const CostomerDetails = () => {
  const [users, setUsers] = useState([
    { name: "Karan Sharma", email: "karanmitash@gmail.com", theme: "Political 1", status: "Active" },
    { name: "Sinan Mintaş", email: "sinanmintas04@gmail.com", theme: "Political 2", status: "Inactive" },
    { name: "Mondesign Web", email: "mondesignweb.agency@gmail.com", theme: "Personal 1", status: "Active" },
    { name: "Hebron Lot", email: "karomfinger@gmail.com", theme: "Personal 2", status: "Inactive" },
    { name: "Vineeth Kumar", email: "printfastme@gmail.com", theme: "Personal 2", status: "Active" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [editUser, setEditUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleEdit = (user) => { setEditUser(user); setShowModal(true); };
  const handleSave = () => { setUsers((prev) => prev.map((u) => (u.email === editUser.email ? editUser : u))); setShowModal(false); };
  const handleToggleStatus = (email) => { setUsers((prev) => prev.map((u) => u.email === email ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u)); };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavbar />
      <div className="flex flex-col md:flex-row">
        <Sidenav className="hidden md:block" />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">All Customers</h1>
          <div className="overflow-hidden rounded-lg shadow-md bg-white">
            <table className="w-full text-left text-gray-700">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-4">User Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Theme</th>
                  <th classname="p-4">View</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="p-4 flex items-center gap-2">
                      <div className="bg-blue-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center">
                        {user.name[0]}
                      </div>
                      {user.name}
                    </td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.theme}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(user.email)}
                        className={`px-3 py-1 rounded-full text-white text-sm ${user.status === "Active" ? "bg-green-500" : "bg-red-500"}`}
                      >
                        {user.status}
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-gray-600">Showing {itemsPerPage * (currentPage - 1) + 1} to {Math.min(itemsPerPage * currentPage, users.length)} of {users.length} entries</span>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-md ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input type="text" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} className="w-full p-2 border rounded-md mb-3" />
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" value={editUser.email} disabled className="w-full p-2 border rounded-md bg-gray-200 cursor-not-allowed mb-3" />
                <label className="block text-sm font-medium mb-2">Theme</label>
                <input type="text" value={editUser.theme} onChange={(e) => setEditUser({ ...editUser, theme: e.target.value })} className="w-full p-2 border rounded-md mb-3" />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">Cancel</button>
                  <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CostomerDetails;
