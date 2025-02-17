const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name :{type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["superadmin", "admin", "user"],
    default: "admin",
  },
}, { timestamps: true });

module.exports = mongoose.model("Admin", superAdminSchema);
