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
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";

      const response = await fetch(`${apiBaseUrl}/api/super_admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const resp = await response.json();
      console.log("Login response:", resp); // Debug log

      if (resp.status_code === 200) {
        // Store user data in localStorage
        localStorage.setItem("userId", resp.data._id);
        localStorage.setItem("authToken", resp.data.token);
        const userData = {
          name: resp.data.name || "",
          email: resp.data.email || "",
          phone: resp.data.phone || "",
          password: "********",
          profileImage: resp.data.profileImage || null,
          status: resp.data.status || "Active",
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        setErrorMessage("");
        navigate("/AdminProfile");
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-800 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-6">Web Visiting Card</h1>
        <h2 className="text-2xl font-semibold text-black text-center mb-4">Super Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 px-4 py-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 px-4 py-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800 underline">Forgot Password?</a>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            <a
              href=""
              className="text-blue-600 hover:text-blue-800 underline"
              onClick={() => navigate("/AdminSignup")}
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