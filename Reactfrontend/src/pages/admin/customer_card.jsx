import React, { useState } from "react";
import TopNavbar from "../../components/admin_nav/topnav";
import Sidenav from "../../components/admin_nav/SuperadminSidenav";

const SubscribersTable = () => {
  const initialData = [
    {
      vCard: "PK",
      name: "Pratik Kankarej",
      email: "pratikkankarej2211@gmail.com",
      views: 20,
      scans: 0,
      theme: "Default Theme"
    },
    {
      vCard: "SM",
      name: "Sinan Mintas",
      email: "sinanmintas04@gmail.com",
      views: 9,
      scans: 0,
      theme: "Light Theme"
    },
    {
      vCard: "KS",
      name: "Karan Sharma",
      email: "karanmntash@gmail.com",
      views: 29,
      scans: 5,
      theme: "Dark Theme"
    },
  ];

  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    theme: ""
  });

  const handleViewClick = (user) => {
    setEditUser({
      name: user.name,
      email: user.email,
      theme: user.theme
    });
    setShowModal(true);
  };

  const handleSave = () => {
    setData(data.map(item => 
      item.name === editUser.name ? { ...item, name: editUser.name, theme: editUser.theme } : item
    ));
    setShowModal(false);
  };

  return (
    <div> {/* Outermost div */}
      <TopNavbar />
      <div className="bg-blue-50 min-h-screen flex flex-col md:flex-row p-5">
        <Sidenav />
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-5">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Customers Card</h1>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse text-sm md:text-base">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">vCards</th>
                  <th className="px-4 py-2 text-left">Subscribers</th>
                  <th className="px-4 py-2 text-left">Stats</th>
                  <th className="px-4 py-2 text-center">Action</th>
                  <th className="px-4 py-2 text-center">View</th> {/* Clear "View" column header */}
                </tr>
              </thead>
              <tbody>
                {data.map((subscriber, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-blue-100" : "bg-white hover:bg-blue-200"}
                  >
                    <td className="px-4 py-3 flex items-center">
                      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                        {subscriber.vCard}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold">{subscriber.name}</p>
                      <p className="text-sm text-gray-600">{subscriber.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p>Views: {subscriber.views}</p>
                      <p>Scans: {subscriber.scans}</p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
                        View
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        onClick={() => handleViewClick(subscriber)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 bg-gray-100 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-700 text-sm md:text-base">
              Showing 1 to {data.length} of 40 rows
            </p>
            <div className="flex space-x-2 mt-2 md:mt-0">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow">
                {"<"}
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow">
                1
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow">
                2
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow">
                {">"}
              </button>
            </div>
          </div>
        </div>

        {/* Modal inside the inner div */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input 
                type="text" 
                value={editUser.name} 
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} 
                className="w-full p-2 border rounded-md mb-3" 
              />
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                value={editUser.email} 
                disabled 
                className="w-full p-2 border rounded-md bg-gray-200 cursor-not-allowed mb-3" 
              />
              <label className="block text-sm font-medium mb-2">Theme</label>
              <input 
                type="text" 
                value={editUser.theme} 
                onChange={(e) => setEditUser({ ...editUser, theme: e.target.value })} 
                className="w-full p-2 border rounded-md mb-3" 
              />
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setShowModal(false)} 
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave} 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  
      )
};

export default SubscribersTable;