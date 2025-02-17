
const Admin = require("./admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


class AdminController {

getAllUsers = async (req, res) => {
        try {
          const users = await Admin.find();
          res.json({
            status_code:200,
            massage:"all the admin fetch successfully",
            data:users
          });
        } catch (error) {
          res.status(500).json({ message: "Error fetching users", error });
        }
 };

// Signup API: createAdmin
createAdmin = async (req, res) => {
  const { first_name,last_name, email, password } = req.body;

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)

    // Create a new Admin
    const newAdmin = new Admin({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: "admin",
    });


    // Generate JWT token
    const token = jwt.sign(
      { userId: newAdmin._id, email: newAdmin.email, role: newAdmin.role },
      process.env.JWT_SECRET,
      { expiresIn: "5d" } // Token expires in 2 days
    );

    newAdmin.token = token;

    // Save to the database
    await newAdmin.save();

    res.status(200).json({ status_code:200, message: "Admin created successfully", data: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error });
  }
};


loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Verify the password
    const isPasswordValid = bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    // Update token in the database
    admin.token = token;
    await admin.save();

    res.status(200).json({ message: "Login successful", status_code:200 , data: admin });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};


 getUserById = async (req, res) => {
        const { id } = req.params;
      
        try {
          const user = await Admin.findById(id);
      
          if (!user) {
            return res.status(404).json({ message: "User not found" , status_code:404,data:null });
          }
      
          res.json({ message: "User fetched successfully", status_code:200,  data:user });
        } catch (error) {
          res.status(500).json({ message: "Error fetching user", error });
        }
};

}

module.exports = new AdminController();