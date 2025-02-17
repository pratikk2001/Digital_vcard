import React from "react";
import PropTypes from "prop-types";

const SocialLinks = ({ formData, setFormData }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w]{2,}(\/\S*)?$/;

    // Validate URL format or allow empty value
    if (value === "" || urlPattern.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
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
              value={formData[field] || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              aria-label={`${label} URL`}
            />
          </div>
        ))}
      </div>
    </fieldset>
  );
};

SocialLinks.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default SocialLinks;
