import React from "react";
import { useNavigate } from "react-router-dom";



const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-100">
      {/* Navbar */}
      <nav className="bg-blue-600 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Digital VCard</h1>
          <div className="flex space-x-4">
            <button onClick={()=>{navigate("./CustomerLogin")}} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition">
              Login
            </button>
            <button onClick={()=>{navigate("./AdminLogin")}} className="px-4 py-2 bg-gray-200 text-blue-600 rounded-lg hover:bg-gray-300 transition">
              Admin Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Create Your Digital Visiting Card</h1>
          <p className="text-lg mb-6">
            Stand out and make a great impression with customizable card themes.
          </p>
          <button onClick={()=>{navigate("./Adminsignup")}} className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-200 transition">
            Get Started
          </button>
        </div>
      </header>

      {/* Card Themes Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Choose Your Card Theme</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://mir-s3-cdn-cf.behance.net/projects/404/6b2a61183248679.Y3JvcCw4MDgsNjMyLDAsMA.jpg"
              alt="Card Theme"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">Classic Design</h3>
              <p className="text-gray-600 text-sm mt-2">
                A clean and professional design for any business type.
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition">
                Select Theme
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://static.vecteezy.com/system/resources/previews/036/062/140/non_2x/modern-and-clean-business-id-card-template-vector.jpg"
              alt="Card Theme"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">Modern Design</h3>
              <p className="text-gray-600 text-sm mt-2">
                Sleek and minimal design for contemporary businesses.
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition">
                Select Theme
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://thumbs.dreamstime.com/z/premium-employee-id-card-photo-placeholder-name-position-company-profile-template-premium-employee-id-card-photo-218475916.jpg"
              alt="Card Theme"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">Creative Design</h3>
              <p className="text-gray-600 text-sm mt-2">
                Vibrant and eye-catching designs for creative professionals.
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition">
                Select Theme
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2025 Digital VCard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
