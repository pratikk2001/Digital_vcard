const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String }, // Added phone field
  token: { type: String, required: true },
  role: {
    type: String,
    enum: ["superadmin", "admin", "user"],
    default: "superadmin",
  },
}, { timestamps: true });

module.exports = mongoose.model("SuperAdmin", superAdminSchema);