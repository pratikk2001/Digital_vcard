const mongoose = require("mongoose");

const multiadminSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
    trim: true, // Automatically trim whitespace
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
    trim: true, // Automatically trim whitespace
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true, // Automatically trim whitespace
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"], // Basic email validation
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"], // Enforce minimum length
  },
  role: {
    type: String,
    enum: ["multiadmin"], // Restrict to only "multiadmin" for this model
    default: "multiadmin",
    required: true, // Ensure role is always set
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
  toJSON: { virtuals: true }, // Include virtuals when converting to JSON
  toObject: { virtuals: true }, // Include virtuals when converting to object
});

// Index for faster email lookups (already present, but emphasized)
multiadminSchema.index({ email: 1 });

// Optional: Add a virtual for full name (if needed)
multiadminSchema.virtual("fullName").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

// Optional: Pre-save middleware to hash password (handled in controller, but shown for reference)
/*
multiadminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
*/

module.exports = mongoose.model("MultiAdmin", multiadminSchema);