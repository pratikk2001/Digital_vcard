import React, { useState } from "react";
import PropTypes from "prop-types";

const SocialLinks = ({ formData: parentFormData, setFormData: setParentFormData }) => {
  const socialPlatforms = [
    { label: "Website", icon: "🌐", field: "websiteURL" },
    { label: "Facebook", icon: "📘", field: "facebookURL" },
    { label: "Twitter", icon: "𝕏", field: "twitterURL" },
    { label: "Instagram", icon: "📸", field: "instagramURL" },
    { label: "Reddit", icon: "👽", field: "redditURL" },
    { label: "Tumblr", icon: "🖤", field: "tumblrURL" },
    { label: "YouTube", icon: "▶️", field: "youtubeURL" },
    { label: "LinkedIn", icon: "🔗", field: "linkedinURL" },
    { label: "WhatsApp", icon: "💬", field: "whatsappURL" },
    { label: "Pinterest", icon: "📌", field: "pinterestURL" },
    { label: "TikTok", icon: "🎵", field: "tiktokURL" },
    { label: "Snapchat", icon: "👻", field: "snapchatURL" },
  ];

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w]{2,}(\/\S*)?$/;

    if (value === "" || urlPattern.test(value)) {
      setParentFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: `Invalid ${socialPlatforms.find(p => p.field === name).label} URL` }));
    }
  };

  const handleSave = async () => {
    const socialLinks = {};
    socialPlatforms.forEach(({ field }) => {
      if (parentFormData[field]) {
        socialLinks[field] = parentFormData[field];
      }
    });

    if (Object.keys(socialLinks).length === 0) {
      alert("Please add at least one social link to save.");
      return;
    }

    setIsSubmitting(true);
    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:4500";
      const endpoint = `${apiBaseUrl}/save/socialLinks/${userId}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(socialLinks),
      });

      const result = await response.json();
      if (response.ok && result.status_code === 200) {
        setParentFormData((prev) => ({ ...prev, ...socialLinks }));
        alert("Social links saved successfully!");
      } else {
        throw new Error(result.message || "Failed to save social links");
      }
    } catch (error) {
      console.error("Error saving social links:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all social links?")) {
      const resetData = {};
      socialPlatforms.forEach(({ field }) => {
        resetData[field] = "";
      });
      setParentFormData((prev) => ({ ...prev, ...resetData }));
      setErrors({});
    }
  };

  return (
    <fieldset className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-300">
      <legend className="text-2xl font-bold text-gray-800 mb-4">🔗 Social Links</legend>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {socialPlatforms.map(({ label, icon, field }) => (
          <div key={field} className="flex flex-col space-y-2">
            <label htmlFor={field} className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              {icon} {label}
            </label>
            <input
              id={field}
              name={field}
              type="url"
              placeholder={`Enter ${label} URL`}
              value={parentFormData[field] || ""}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 ${
                errors[field] ? "border-red-500" : "border-gray-300"
              }`}
              aria-label={`${label} URL`}
              disabled={isSubmitting}
            />
            {errors[field] && (
              <span className="text-red-500 text-sm">{errors[field]}</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handleSave}
          className="p-3 bg-green-500 hover:bg-green-400 rounded-md text-white disabled:bg-gray-400 flex items-center gap-2"
          disabled={isSubmitting}
        >
          💾 {isSubmitting ? "Saving..." : "Save"}
        </button>
        <button
          onClick={handleReset}
          className="p-3 bg-gray-500 hover:bg-gray-400 rounded-md text-white disabled:bg-gray-400 flex items-center gap-2"
          disabled={isSubmitting}
        >
          🔄 Reset
        </button>
      </div>
    </fieldset>
  );
};

SocialLinks.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default SocialLinks;