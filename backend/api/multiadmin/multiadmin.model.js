const mongoose = require("mongoose");

const multiadminSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // Ensure this is required
  role: { type: String, default: "multiadmin" },
}, { timestamps: true });

module.exports = mongoose.model("multiAdmin", multiadminSchema);