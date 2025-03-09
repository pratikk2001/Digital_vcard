import React, { useState, useCallback, lazy, Suspense } from "react";
import Topnav from "../../customer_nav/Topnavbar";
import Sidenav from "../../customer_nav/Customersidenav";
import { 
  FaInfoCircle, FaImage, FaAward, FaUsers, FaHandsHelping, FaCalendarAlt, 
  FaNewspaper, FaFont, FaWpforms 
} from "react-icons/fa";

// Lazy-loaded components for better performance
const BasicDetails = lazy(() => import("./BasicDetails"));
const ProfileBanner = lazy(() => import("./ProfileBanner"));
const AwardsComponent = lazy(() => import("./Awards"));
const FamilyDetailsComponent = lazy(() => import("./Family"));
const SocialImage = lazy(() => import("./SocialImage"));
const EventImage = lazy(() => import("./EventImage"));
const NewsImage = lazy(() => import("./NewsImage"));
const SocialLink = lazy(() => import("./SocialLink"));
const Fonts = lazy(() => import("./Fonts"));
const Theme = lazy(() => import("./Theme"));

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
    familyDetails: [],
    profilePicture: null,
    bannerImage: null,
    socialWorkImages: [],
    eventImages: [],
    newsCenterImages: [],
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
    snapchatURL: "",
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
    { name: "Fonts", icon: <FaFont /> },
    { name: "Select Theme", icon: <FaWpforms /> }
  ];

  // Optimized function for setting active section
  const handleSectionClick = useCallback((name) => {
    setActiveSection(name);
  }, []);

  // Object mapping for dynamic section rendering
  const sectionComponents = {
    "Basic Details": BasicDetails,
    "Profile and Banner": ProfileBanner,
    "Awards": AwardsComponent,
    "Family Details": FamilyDetailsComponent,
    "Social Work": SocialImage,
    "Events": EventImage,
    "News Center": NewsImage,
    "Social Links": SocialLink,
    "Fonts": Fonts,
    "Select Theme": Theme
  };

  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <div className="w-full bg-blue-600 text-white shadow-md">
        <Topnav />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="lg:w-64 w-full lg:block hidden">
          <Sidenav />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 justify-center mt-4 lg:mt-0">
          <div className="w-full max-w-7xl p-4 lg:p-6">
            

            {/* Sidebar and Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              {/* Sidebar */}
              <div className="col-span-1 lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
                <ul className="space-y-4">
                  {sidebarItems.map((item) => (
                    <li
                      key={item.name}
                      className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg text-lg font-medium transition duration-200 ${
                        activeSection === item.name
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => handleSectionClick(item.name)}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Content */}
              <div className="col-span-1 lg:col-span-9 p-6 bg-gray-50 rounded-lg shadow-md">
                <Suspense fallback={<div>Loading...</div>}>
                  <ActiveComponent formData={formData} setFormData={setFormData} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVCard;