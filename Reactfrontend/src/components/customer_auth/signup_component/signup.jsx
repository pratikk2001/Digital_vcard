import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-pink-300">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-8 sm:p-10">
        {/* Brand Name */}
        <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-6">Digital VCard</h1>
        <h2 className="text-lg font-medium text-gray-700 text-center mb-6">Create Your Account</h2>

        <form>
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">First Name</label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Last Name</label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center mb-4">
            <input type="checkbox" className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <label className="ml-2 text-sm text-gray-600">I agree to the <span className="text-blue-600 hover:underline">terms and conditions</span></label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300"
          >
            Register
          </button>

          {/* Login Redirect */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span onClick={() => navigate("/CustomerLogin")} className="text-blue-600 hover:underline cursor-pointer">
              Login Here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
