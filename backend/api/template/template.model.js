const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  whatsappNo: { type: String },
  dob: { type: String }, // Consider Date type if applicable
  positionTitle: [{ type: String }],
  homeAddress: { type: String },
  officeAddress: { type: String },
  education: { type: String },
  showEducation: { type: Boolean },
  partyAffiliation: { type: String },
  showPartyAffiliation: { type: Boolean },
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

  electronicNewsImages: [{
    imageUrl: { type: String },
    caption: { type: String, default: "" }
  }],

  youtubeLinks: [{ type: String }],
  
  createdAt: { type: Date, default: Date.now },


});

   
module.exports = mongoose.model("Template", TemplateSchema);
