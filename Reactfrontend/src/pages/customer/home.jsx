import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const themes = [
    {
      img: "https://mir-s3-cdn-cf.behance.net/projects/404/6b2a61183248679.Y3JvcCw4MDgsNjMyLDAsMA.jpg",
      title: "Classic Design",
      desc: "A clean and professional design for any business type."
    },
    {
      img: "https://static.vecteezy.com/system/resources/previews/036/062/140/non_2x/modern-and-clean-business-id-card-template-vector.jpg",
      title: "Modern Design",
      desc: "Sleek and minimal design for contemporary businesses."
    },
    {
      img: "https://thumbs.dreamstime.com/z/premium-employee-id-card-photo-placeholder-name-position-company-profile-template-premium-employee-id-card-photo-218475916.jpg",
      title: "Creative Design",
      desc: "Vibrant and eye-catching designs for creative professionals."
    },
    {
      img: "https://i.pinimg.com/originals/6b/2c/3f/6b2c3f3d4bbf8a6f7c1f0d21ea2e26a7.jpg",
      title: "Corporate Design",
      desc: "A sleek and elegant theme for corporate professionals."
    },
    {
      img: "https://i.pinimg.com/originals/83/60/5f/83605fd859ae4e2c94b6f3aa47cc156d.jpg",
      title: "Tech Enthusiast",
      desc: "Futuristic and tech-inspired designs for digital professionals."
    },
    {
      img: "https://i.pinimg.com/originals/3c/16/ea/3c16eaedfc62dc58a3f5e235d3dcf6e2.jpg",
      title: "Minimalist Design",
      desc: "A clean and simple design for those who love minimalism."
    }
  ];

  return (
    <div className="min-h-screen  text-white bg-gradient-to-r from-pink-500 to-purple-500">
      {/* Navbar */}
      <nav className=" text-white bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-extrabold text-white">Digital VCard</h1>
          <div className="flex space-x-4">
            <button onClick={() => navigate("./CustomerLogin")} className="px-5 py-2 bg-white text-blue-700 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300">
              Login
            </button>
            <button onClick={() => navigate("./AdminLogin")} className="px-5 py-2 bg-gray-100 text-blue-700 font-semibold rounded-full shadow-lg hover:bg-gray-300 transition-all duration-300">
              Admin Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-400 text-black py-24 text-center shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-5xl font-extrabold mb-6">Create Your Digital Visiting Card</h1>
          <p className="text-lg mb-8">Stand out and make a great impression with customizable card themes.</p>
          <button onClick={() => navigate("./Adminsignup")} className="px-8 py-3 bg-blue-700 text-white font-bold rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300">
            Get Started
          </button>
        </div>
      </header>

      {/* Card Themes Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-12">Choose Your Card Theme</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {themes.map((theme, index) => (
            <div key={index} className="bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
              <img src={theme.img} alt={theme.title} className="w-full h-52 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{theme.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{theme.desc}</p>
                <button className="mt-4 px-5 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-400 transition-all duration-300">
                  Select Theme
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2025 Digital VCard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
