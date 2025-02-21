const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, required: true, ref: "Admin" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10,15}$/, "Invalid phone number format"], // Validating phone number
    },
    address: { type: String },
    dob: { type: Date },
    education: { type: String },
    positionTitle: { type: String },

    // Additional Fields
    showQrCode: { type: Boolean, default: false },
    whatsappShare: { type: Boolean, default: false },
    urlAlias: { type: String, unique: true },

    // Images & Awards
    profilePicture: { type: String }, // URL of the uploaded image
    bannerImage: { type: String },
    awards: [{ type: String }],
    familyDetails: [{ type: String }],
    socialWorkImages: [{ type: String }],
    eventImages: [{ type: String }],
    newsCenterImages: [{ type: String }],
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

module.exports = mongoose.model("Template", themeSchema);
