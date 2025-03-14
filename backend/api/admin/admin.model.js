const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
  phone: { type: String, trim: true },
  profileImage: { type: String, trim: true },
  status: { type: String, default: "Active" },
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);