const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("./admin.model");

class AdminController {
  async getAllAdmins(req, res) {
    try {
      const admins = await Admin.find().select("-password");
      res.status(200).json({
        status_code: 200,
        message: "All admins fetched successfully",
        data: admins,
      });
    } catch (error) {
      res.status(500).json({
        status_code: 500,
        message: "Error fetching admins",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async createAdmin(req, res) {
    const { first_name, last_name, email, password } = req.body;

    try {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({
          status_code: 400,
          message: "Admin with this email already exists",
          data: null,
        });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(String(password), saltRounds); // Ensure string

      const newAdmin = new Admin({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role: "admin",
      });

      await newAdmin.save();

      const token = jwt.sign(
        { userId: newAdmin._id, email: newAdmin.email, role: newAdmin.role },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "5d" }
      );

      res.status(201).json({
        status_code: 201,
        message: "Admin created successfully",
        data: {
          _id: newAdmin._id,
          first_name: newAdmin.first_name,
          last_name: newAdmin.last_name,
          email: newAdmin.email,
          role: newAdmin.role,
          token,
        },
      });
    } catch (error) {
      res.status(500).json({
        status_code: 500,
        message: "Error creating admin",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async loginAdmin(req, res) {
    const { email, password } = req.body;

    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(404).json({
          status_code: 404,
          message: "Admin not found",
          data: null,
        });
      }

      if (!admin.password) {
        return res.status(500).json({
          status_code: 500,
          message: "Internal server error: Admin account is corrupted (missing password)",
          data: null,
        });
      }

      const isPasswordValid = await bcrypt.compare(String(password), admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          status_code: 401,
          message: "Invalid email or password",
          data: null,
        });
      }

      const token = jwt.sign(
        { userId: admin._id, email: admin.email, role: admin.role },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "2d" }
      );

      res.status(200).json({
        status_code: 200,
        message: "Login successful",
        data: {
          _id: admin._id,
          first_name: admin.first_name,
          last_name: admin.last_name,
          email: admin.email,
          role: admin.role,
          token,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        status_code: 500,
        message: "Error logging in",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async getAdminById(req, res) {
    const { id } = req.params;

    try {
      const admin = await Admin.findById(id).select("-password");
      if (!admin) {
        return res.status(404).json({
          status_code: 404,
          message: "Admin not found",
          data: null,
        });
      }

      res.status(200).json({
        status_code: 200,
        message: "Admin fetched successfully",
        data: admin,
      });
    } catch (error) {
      res.status(500).json({
        status_code: 500,
        message: "Error fetching admin",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

module.exports = AdminController;