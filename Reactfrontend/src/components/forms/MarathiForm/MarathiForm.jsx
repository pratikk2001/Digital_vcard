import React, { useState } from "react";
import Topnav from "../../customer_nav/Topnavbar";
import Sidenav from "../../customer_nav/Customersidenav";
import { FaInfoCircle, FaImage, FaAward, FaUsers, FaHandsHelping, FaCalendarAlt, FaNewspaper } from "react-icons/fa";
import BasicDetails from "./MarathiFormBasicDetails";
import ProfileBanner from "./MarathiProfileandBanner";
import AwardsComponent from "./MarathiAwards";
import FamilyDetailsComponent from "./MarathiFamily";
import SocialImage from "./SocialImage";
import EventImage from "./EventImage";
import NewsImage from "./NewsImage";
import SocialLink from "./SocialLink";

const EditVCard = () => {
  const [activeSection, setActiveSection] = useState("Basic Details");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    education: "",
    awards: [],
    currentAward: "",
    familyDetails: [],
    currentFamilyDetail: "",
    profilePicture: null,
    bannerImage: null,
    socialWorkImages: [],
    eventImages: [],
    newsCenterImages: [],
    previewImage: null,
    websiteURL: "",
    facebookURL: "",
    twitterURL: "",
    instagramURL: "",
    redditURL: "",
    tumblrURL: "",
    youtubeURL: "",
    linkedinURL: "",
    whatsappURL: "",
    pinterestURL: "",
    tiktokURL: "",
    snapchatURL: ""
  });

  const sidebarItems = [
    { name: "Basic Details", icon: <FaInfoCircle /> },
    { name: "Profile and Banner", icon: <FaImage /> },
    { name: "Awards", icon: <FaAward /> },
    { name: "Family Details", icon: <FaUsers /> },
    { name: "Social Work", icon: <FaHandsHelping /> },
    { name: "Events", icon: <FaCalendarAlt /> },
    { name: "News Center", icon: <FaNewspaper /> },
    { name: "Social Links", icon: <FaImage /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <div className="w-full bg-blue-600 text-white shadow-md">
        <Topnav />
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-64 w-full lg:block hidden">
          <Sidenav />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 justify-center p-4 lg:p-6">
          <div className="w-full max-w-7xl">
            <div className="w-full bg-white shadow-lg rounded-lg p-6 lg:p-8">
              <h1 className="text-2xl font-bold">Edit VCard</h1>
            </div>

            {/* Sidebar and Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              {/* Sidebar */}
              <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
                <ul className="space-y-4">
                  {sidebarItems.map((item) => (
                    <li
                      key={item.name}
                      className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg text-lg font-medium transition duration-200 ${
                        activeSection === item.name
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSection(item.name)}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-9 p-6 bg-gray-50 rounded-lg shadow-md">
                {/* Section Render Logic */}
                {activeSection === "Basic Details" && <BasicDetails formData={formData} setFormData={setFormData} />}
                {activeSection === "Profile and Banner" && <ProfileBanner formData={formData} setFormData={setFormData} />}
                {activeSection === "Awards" && <AwardsComponent formData={formData} setFormData={setFormData} />}
                {activeSection === "Family Details" && <FamilyDetailsComponent formData={formData} setFormData={setFormData} />}
                {activeSection === "Social Work" && <SocialImage formData={formData} setFormData={setFormData} />}
                {activeSection === "Events" && <EventImage formData={formData} setFormData={setFormData} />}
                {activeSection === "News Center" && <NewsImage formData={formData} setFormData={setFormData} />}
                {activeSection === "Social Links" && <SocialLink formData={formData} setFormData={setFormData} />}
                {activeSection === "Fonts" && <SocialLink formData={formData} setFormData={setFormData} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVCard;
