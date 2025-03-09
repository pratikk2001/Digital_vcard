const SuperAdmin = require("./super_admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class SuperAdminController {
  getAllUsers = async (req, res) => {
    try {
      const users = await SuperAdmin.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  };

  createAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const existingAdmin = await SuperAdmin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);

      const newAdmin = new SuperAdmin({
        name,
        email,
        password: hashedPassword,
        role: "superadmin",
      });

      const token = jwt.sign(
        { userId: newAdmin._id, email: newAdmin.email, role: newAdmin.role },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
      );

      newAdmin.token = token;
      await newAdmin.save();

      res.status(201).json({ message: "Admin created successfully", data: newAdmin, status_code: 200 });
    } catch (error) {
      res.status(500).json({ message: "Error creating admin", error });
    }
  };

  loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
      const admin = await SuperAdmin.findOne({ email });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { userId: admin._id, email: admin.email, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
      );

      admin.token = token;
      await admin.save();

      res.status(200).json({ message: "Login successful", status_code: 200, data: admin });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  };

  getUserById = async (req, res) => {
    const { id } = req.params;

    try {
      const user = await SuperAdmin.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found", status_code: 404, data: null });
      }

      res.json({ message: "User fetched successfully", status_code: 200, data: user });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  };

  updateUserById = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    try {
      const admin = await SuperAdmin.findById(id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found", status_code: 404, data: null });
      }

      if (name) admin.name = name;
      if (email) admin.email = email;
      if (phone) admin.phone = phone;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        admin.password = hashedPassword;
      }

      const token = jwt.sign(
        { userId: admin._id, email: admin.email, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
      );
      admin.token = token;

      await admin.save();

      res.status(200).json({ message: "Profile updated successfully", status_code: 200, data: admin });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Error updating profile", error });
    }
  };
}

module.exports = new SuperAdminController();