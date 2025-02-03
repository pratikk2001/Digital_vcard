import React, { useState } from 'react';
import Sidenav from "../../components/admin_nav/SuperadminSidenav";
import TopNavbar from "../../components/admin_nav/topnav";

const AdminProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstName) formErrors.firstName = 'First name is required';
    if (!formData.lastName) formErrors.lastName = 'Last name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.phone) formErrors.phone = 'Phone number is required';
    if (formData.password && formData.password !== formData.confirmPassword) {
      formErrors.password = 'Passwords do not match';
    }
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Handle form submission, such as saving the data or making an API call
      setTimeout(() => {
        alert("Changes saved!");
        setIsSubmitting(false);
      }, 1000);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Top Navbar */}
      <TopNavbar />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidenav */}
        <div className="lg:block hidden">
          <Sidenav />
        </div>

        {/* Profile Section */}
        <div className="flex-1 max-w-4xl mx-auto bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-xl w-full mt-4 sm:mt-6 lg:mt-10">
          {/* Header */}
          <div className="flex items-center flex-wrap space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full text-white text-2xl flex items-center justify-center">
              SA
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-blue-800">Profile</h1>
            </div>
            <div className="ml-auto">
              <span className="px-4 py-2 text-base bg-green-500 text-white rounded-full">
                Active
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Fields */}
              {[ 
                { label: "First Name", placeholder: "First Name", name: "firstName" },
                { label: "Last Name", placeholder: "Last Name", name: "lastName" },
                { label: "Email", placeholder: "Email Address", name: "email" },
                { label: "Phone", placeholder: "Enter your phone number", name: "phone" },
                { label: "Password", placeholder: "Password", name: "password", type: "password" },
                { label: "Confirm Password", placeholder: "Confirm Password", name: "confirmPassword", type: "password" },
              ].map((field, index) => (
                <div key={index} className="flex flex-col">
                  <label className="block text-large font-semibold text-blue-800 mb-2">{field.label}</label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="w-full p-2 border border-blue-300 rounded-md mt-2 focus:ring-2 focus:ring-blue-500 text-lg"
                  />
                  {errors[field.name] && <span className="text-red-500 text-sm">{errors[field.name]}</span>}
                </div>
              ))}

              {/* User Profile Image */}
              <div className="flex flex-col">
                <label className="block text-large font-semibold text-blue-800 mb-2">User Profile</label>
                <div className="flex flex-wrap items-center mt-2">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    id="profilePic"
                  />
                  <label
                    htmlFor="profilePic"
                    className="cursor-pointer py-3 px-5 bg-blue-600 text-white text-lg font-semibold rounded-md transition-colors duration-200 hover:bg-blue-700"
                  >
                    Browse
                  </label>
                  {profileImage && (
                    <div className="ml-4 w-20 h-20 rounded-full overflow-hidden mt-4 sm:mt-0">
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 sm:mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-blue-700 transition duration-200"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
