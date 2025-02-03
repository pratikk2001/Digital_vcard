import React from "react";
import TopNavbar from "../../components/admin_nav/topnav"; // Import the new Navbar component
import Sidenav from "../../components/admin_nav/SuperadminSidenav";

const SubscribersTable = () => {
  const data = [
    {
      vCard: "PK",
      name: "Pratik Kankarej",
      email: "pratikkankarej2211@gmail.com",
      views: 20,
      scans: 0,
    },
    {
      vCard: "SM",
      name: "Sinan Mintas",
      email: "sinanmintas04@gmail.com",
      views: 9,
      scans: 0,
    },
    {
      vCard: "KS",
      name: "Karan Sharma",
      email: "karanmntash@gmail.com",
      views: 29,
      scans: 5,
    },
  ];

  return (
    <div>
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
                </tr>
              </thead>
              <tbody>
                {data.map((subscriber, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-blue-100" : "bg-white"
                    } hover:bg-blue-200`}
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
                &lt;
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow">
                1
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow">
                2
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribersTable;
