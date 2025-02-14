const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String },
    dob: { type: Date },
    education: { type: String },
    awards: [{ type: String }],
    familyDetails: [{ type: String }],
    profilePicture: { type: String }, // URL of the uploaded image
    bannerImage: { type: String },
    socialWorkImages: [{ type: String }],
    eventImages: [{ type: String }],
    newsCenterImages: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Theme', themeSchema);
