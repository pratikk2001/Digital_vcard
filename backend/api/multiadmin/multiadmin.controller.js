const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MultiAdmin = require("./multiadmin.model"); // Ensure this path is correct
const Admin = require("../admin/admin.model"); // Ensure this path is correct

class MultiAdminController {
  /**
   * Fetch all Multi Admins (excluding passwords for security)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAllMultiAdmins(req, res) {
    try {
      const admins = await MultiAdmin.find().select("-password");
      res.status(200).json({
        status_code: 200,
        message: "All Multi Admins fetched successfully",
        data: admins,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status_code: 500,
        message: "Error fetching Multi Admins",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  /**
   * Create a new Multi Admin account
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createMultiAdmin(req, res) {
    const { first_name, last_name, email, password } = req.body;

    try {
      const existingAdmin = await MultiAdmin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({
          status_code: 400,
          message: "Multi Admin with this email already exists",
          data: null,
        });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(String(password), saltRounds);

      const newAdmin = new MultiAdmin({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role: "multiadmin",
      });

      await newAdmin.save();

      const token = jwt.sign(
        { userId: newAdmin._id, email: newAdmin.email, role: newAdmin.role },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "5d" }
      );

      res.status(201).json({
        status_code: 201,
        message: "Multi Admin created successfully",
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
      console.error(error);
      res.status(500).json({
        status_code: 500,
        message: "Error creating Multi Admin",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  /**
   * Multi Admin login
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async loginMultiAdmin(req, res) {
    const { email, password } = req.body;

    try {
      const admin = await MultiAdmin.findOne({ email });
      if (!admin) {
        return res.status(404).json({
          status_code: 404,
          message: "Multi Admin not found",
          data: null,
        });
      }

      if (!admin.password) {
        return res.status(500).json({
          status_code: 500,
          message: "Internal server error: Multi Admin account is corrupted (missing password)",
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

  /**
   * Fetch a specific Multi Admin by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getMultiAdminById(req, res) {
    const { id } = req.params;

    try {
      const admin = await MultiAdmin.findById(id).select("-password");
      if (!admin) {
        return res.status(404).json({
          status_code: 404,
          message: "Multi Admin not found",
          data: null,
        });
      }

      res.status(200).json({
        status_code: 200,
        message: "Multi Admin fetched successfully",
        data: admin,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status_code: 500,
        message: "Error fetching Multi Admin",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  /**
   * Fetch all end users (Admins) for Multi Admin
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAllEndUsers(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          status_code: 401,
          message: "Unauthorized: No token provided",
          data: null,
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
      if (decoded.role !== "multiadmin" && decoded.role !== "superadmin") {
        return res.status(403).json({
          status_code: 403,
          message: "Unauthorized: Only Multi Admins or Super Admins can access this resource",
          data: null,
        });
      }

      const endUsers = await Admin.find().select("-password");
      res.status(200).json({
        status_code: 200,
        message: "All end users fetched successfully",
        data: endUsers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status_code: 500,
        message: "Error fetching end users",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

module.exports = MultiAdminController; // Export the class, not an instance