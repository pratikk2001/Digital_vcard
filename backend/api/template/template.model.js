const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  dob: { type: String }, // Consider Date type if applicable
  positionTitle: { type: String },
  address: { type: String },
  education: { type: String },
  showQrCode: { type: Boolean },
  whatsappShare: { type: Boolean },
  urlAlias: { type: String },
  profilePicture: { type: String },
  bannerImage: { type: String },
  awards: [{
    imageUrl: { type: String, required: true },
    caption: { type: String, default: "" }
  }],
  familyDetails: [{
    name: { type: String, required: true },
  }],
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
  youtubeLink: { type: String },
});

   
module.exports = mongoose.model("Template", themeSchema);
