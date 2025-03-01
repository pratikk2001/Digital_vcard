import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "multiadmin", // Default role for multi-admin signup (can be modified or selected)
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const response = await fetch(`${apiBaseUrl}/api/multiadmin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          email: formData.email.toLowerCase().trim(),
          password: formData.password.trim(),
          role: formData.role, // Include role in the signup request
        }),
      });

      const data = await response.json();

      if (response.ok && data.status_code === 201) {
        const token = data.data?.token;
        if (token) {
          localStorage.setItem("authToken", token);
          localStorage.setItem("role", formData.role); // Store the role
          localStorage.setItem("userId", data.data?._id); // Store user ID if available
        }
        alert("Multi-Admin Registration Successful!");
        navigate("/MultiAdminLogin"); // Redirect to multi-admin login page
      } else {
        setErrorMessage(
          data.status_code === 400
            ? "Email already exists."
            : data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-pink-300">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-6">Digital VCard</h1>
        <h2 className="text-lg font-medium text-gray-700 text-center mb-6">Multi-Admin Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700">
                First Name
              </label>
              <input
                id="first_name"
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your first name"
                required
                autoComplete="given-name"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700">
                Last Name
              </label>
              <input
                id="last_name"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your last name"
                required
                autoComplete="family-name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                placeholder="••••••••"
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 top-6 flex items-center"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
              </button>
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                placeholder="••••••••"
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 top-6 flex items-center"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              name="terms"
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree to the <a href="/terms" className="text-blue-600 hover:underline">terms and conditions</a>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !formData.first_name || !formData.last_name || !formData.email || !formData.password || !formData.confirmPassword}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/MultiAdminLogin")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Login Here
            </span>
          </p>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center font-medium mt-4">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;