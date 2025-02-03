import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

      const response = await fetch(`${apiBaseUrl}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const resp = await response.json();

      if (resp.status_code === 200) {
        setErrorMessage("");
        navigate("/CustomerDashboard");
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96 transform hover:scale-105 transition-all duration-300">
        <h1 className="text-4xl font-extrabold text-indigo-600 text-center mb-4">
          Digital Vcard
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Sign in to your account
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center font-medium">
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold text-lg hover:from-indigo-600 hover:to-blue-700 shadow-md transition-all duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            Forgot Password?
          </a>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/CustomerSignup"
              className="text-indigo-600 font-medium hover:text-indigo-800"
              onClick={() => navigate("/CustomerSignup")}
            >
              Create One
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
