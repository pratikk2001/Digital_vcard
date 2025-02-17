import React from "react";
import PropTypes from 'prop-types';

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

  return (
    <div className="mt-4">
      <label className="text-xl font-bold mb-4">Social Links</label>
      <div className="grid grid-cols-2 gap-4">
        {socialPlatforms.map((social, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-xl">{social.icon}</span>
            <input
              type="text"
              placeholder={`${social.label} URL`}
              // Use optional chaining to safely access formData properties
              value={formData?.[social.field] || ""}
              onChange={(e) => 
                // Check if formData exists before updating
                formData && setFormData({ ...formData, [social.field]: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Define PropTypes for type checking
SocialLinks.propTypes = {
  formData: PropTypes.shape({
    websiteURL: PropTypes.string,
    facebookURL: PropTypes.string,
    twitterURL: PropTypes.string,
    instagramURL: PropTypes.string,
    redditURL: PropTypes.string,
    tumblrURL: PropTypes.string,
    youtubeURL: PropTypes.string,
    linkedinURL: PropTypes.string,
    whatsappURL: PropTypes.string,
    pinterestURL: PropTypes.string,
    tiktokURL: PropTypes.string,
    snapchatURL: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func.isRequired
};

// Define defaultProps to provide a fallback if formData is not provided
SocialLinks.defaultProps = {
  formData: {
    websiteURL: "",
    facebookURL: "",
    twitterURL: "",
    instagramURL: "",
    redditURL: "",
    tumblrURL: "",
    youtubeURL: "",
    linkedinURL: "",
    whatsappURL: "",
    pinterestURL: "",
    tiktokURL: "",
    snapchatURL: ""
  }
};

export default SocialLinks;