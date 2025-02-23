const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, required: true, ref: "Admin" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, sparse: true },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10,15}$/, "Invalid phone number format"],
    },
    address: { type: String },
    dob: { type: Date },
    education: { type: String },
    positionTitle: { type: String },

    // Additional Fields
    showQrCode: { type: Boolean, default: false },
    whatsappShare: { type: Boolean, default: false },
    urlAlias: { type: String, unique: true, sparse: true },

    // Images & Awards
    profilePicture: { type: String },
    bannerImage: { type: String },
    awards: [{
      imageUrl: { type: String },
      caption: { type: String, default: "" }
    }],
    familyDetails: [{ type: String }], // Update to subdocument if needed
    socialWorkImages: [{
      imageUrl: { type: String },
      caption: { type: String, default: "" }
    }],
    eventImages: [{
      imageUrl: { type: String },
      caption: { type: String, default: "" }
    }],
    newsCenterImages: [{
      imageUrl: { type: String },
      caption: { type: String, default: "" }
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", themeSchema);