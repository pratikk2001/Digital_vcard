import React from "react";
import Sidenav from "../../components/admin_nav/SuperadminSidenav";
import TopNavbar from "../../components/admin_nav/topnav";

const themes = [
  {
    id: 1,
    title: "Theme One",
    bgColor: "bg-white",
    previewImage: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    title: "Theme Two",
    bgColor: "bg-gray-200",
    previewImage: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    title: "Theme Three",
    bgColor: "bg-blue-100",
    previewImage: "https://via.placeholder.com/200",
  },
  {
    id: 4,
    title: "Theme Four",
    bgColor: "bg-white",
    previewImage: "https://via.placeholder.com/200",
  },
  {
    id: 5,
    title: "Theme Five",
    bgColor: "bg-black text-white",
    previewImage: "https://via.placeholder.com/200",
  },
  {
    id: 6,
    title: "Theme Six",
    bgColor: "bg-gray-300",
    previewImage: "https://via.placeholder.com/200",
  },
];

export default function Themes() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <div className="flex">
        <Sidenav className="hidden md:block w-1/5" />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Themes</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 ${theme.bgColor}`}
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-3">{theme.title}</h3>
                  <img
                    src={theme.previewImage}
                    alt={`Preview of ${theme.title}`}
                    className="rounded-md w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md w-full transition-all">
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
