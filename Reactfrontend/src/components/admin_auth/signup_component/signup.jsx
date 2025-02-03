import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-blue-500 text-center">Digital Vcard</h1>
        <h2 className="text-xl font-medium text-gray-700 text-center mt-2 mb-6">
          Register Your Account
        </h2>

        <form>
          {/* First Name & Last Name */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your first name"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
            />
          </div>

          {/* Password & Confirmation */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm password"
              />
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center mb-4">
            <input type="checkbox" className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <label className="ml-2 text-sm text-gray-600">
              I agree to the <span className="text-blue-600 cursor-pointer hover:underline">terms and conditions</span>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300"
          >
            Register
          </button>

          {/* Login Redirect */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
              >
                Login Here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
