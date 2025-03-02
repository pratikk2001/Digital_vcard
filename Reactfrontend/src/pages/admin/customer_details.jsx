import React, { useState } from "react";
import Sidenav from "../../components/admin_nav/SuperadminSidenav";
import TopNavbar from "../../components/admin_nav/topnav"; // Import the Navbar component

const CustomerDetails = () => {
  const [users, setUsers] = useState([
    { name: "Karan Sharma", email: "karanmitash@gmail.com", status: "Active" },
    { name: "Sinan Mintaş", email: "sinanmintas04@gmail.com", status: "Inactive" },
    { name: "Mondesign Web", email: "mondesignweb.agency@gmail.com", status: "Active" },
    { name: "Hebron Lot", email: "karomfinger@gmail.com", status: "Inactive" },
    { name: "Vineeth Kumar", email: "printfastme@gmail.com", status: "Active" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewUserModal, setViewUserModal] = useState(false);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleEdit = (user) => { setEditUser(user); setShowModal(true); };
  const handleSave = () => { 
    setUsers((prev) => prev.map((u) => (u.email === editUser.email ? editUser : u))); 
    setShowModal(false); 
  };
  const handleToggleStatus = (email) => { 
    setUsers((prev) => prev.map((u) => u.email === email ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u)); 
  };
  const handleViewUser = (user) => { setSelectedUser(user); setViewUserModal(true); };

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
              
                  <th className="p-4">View</th>
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
                    
                    <td className="p-4">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                      >
                        View
                      </button>
                    </td>
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

          {/* View User Modal */}
          {viewUserModal && selectedUser && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-4">User Details</h2>
                <div className="border p-4 rounded-lg">
                  <p><strong>Name:</strong> {selectedUser.name}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>

                  <p><strong>Status:</strong> {selectedUser.status}</p>
                </div>
                <button onClick={() => setViewUserModal(false)} className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Edit User Modal */}
          {showModal && editUser && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input type="text" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} className="w-full p-2 border rounded-md mb-3" />
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" value={editUser.email} disabled className="w-full p-2 border rounded-md bg-gray-200 cursor-not-allowed mb-3" />
                
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

export default CustomerDetails;
