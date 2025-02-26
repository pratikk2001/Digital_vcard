import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const themes = [
    { img: "Temp-1.png", title: "भारतीय जनता पार्टी", desc: "" }, 
    { img: "Temp-4.png", title: "शिवसेना", desc: "" }, 
    { img: "Temp-6.png", title: "राष्ट्रीय काँग्रेस पक्ष", desc: "" },
    { img: "Temp-2.png", title: "Bhartiya Janata Party", desc: "" }, 
    { img: "Temp-3.png", title: "Shivsena", desc: "" }, 
    { img: "Temp-5.png", title: "National Congress Party", desc: "" }, 
  ];

  const handleThemeSelect = (theme) => {
    navigate(`/theme/${theme.title}`);
  };

  return (
    <div className="min-h-screen text-white">
      {/* Navbar */}
      <nav className="text-white bg-blue-500 shadow-lg py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-extrabold text-white">Web Visiting Card</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("./CustomerLogin")}
              className="px-5 py-2 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-pink-400 transition-all duration-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate("./AdminLogin")}
              className="px-5 py-2 bg-gray-100 text-blue-700 font-bold rounded-full shadow-lg hover:bg-pink-400 transition-all duration-300"
            >
              Admin Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gray-100 text-black py-24 text-center shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-5xl font-extrabold mb-6">Create Your Digital Visiting Card</h1>
          <p className="text-lg mb-8">Stand out and make a great impression with customizable card themes.</p>
          <button
            onClick={() => navigate("./Adminsignup")}
            className="px-8 py-3 bg-blue-700 text-white font-bold rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Card Themes Section */}
      <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-12">Choose Your Card Theme</h2>        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {themes.map((theme, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 group p-4 sm:p-6"
            >
              <div className="h-52 w-full overflow-hidden">
                <img
                  src={theme.img}
                  alt={`${theme.title} - ${theme.desc}`}
                  className="w-full h-auto transform transition-transform duration-500 group-hover:translate-y-[-20%]"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{theme.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{theme.desc}</p>
                <button
                  onClick={() => handleThemeSelect(theme)}
                  className="mt-4 px-5 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-pink-400 transition-all duration-300"
                >
                  Select Theme
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-500 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2025 Web Visiting Card. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;