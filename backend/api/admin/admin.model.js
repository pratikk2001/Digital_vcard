const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
  phone: { type: String }, // Add phone field
  profileImage: { type: String }, // Add profile image field
  status: { type: String, default: "Active" }, // Add status field
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);