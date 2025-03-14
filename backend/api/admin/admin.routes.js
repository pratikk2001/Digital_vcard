const express = require("express");
const router = express.Router();
const AdminController = require("./admin.controller");
const { body } = require("express-validator");
const asyncHandler = require("../../middlewares/asyncHandler");
const authMiddleware = require("../../middlewares/authMiddleware");

const adminController = new AdminController();

router.post(
  "/register",
  [
    body("first_name").trim().notEmpty().withMessage("First name is required").isString(),
    body("last_name").trim().notEmpty().withMessage("Last name is required").isString(),
    body("email").trim().isEmail().withMessage("Invalid email format").normalizeEmail().toLowerCase(),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters").isString(),
  ],
  asyncHandler(adminController.createAdmin.bind(adminController))
);

router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Invalid email format").normalizeEmail().toLowerCase(),
    body("password").trim().notEmpty().withMessage("Password is required").isString(),
  ],
  asyncHandler(adminController.loginAdmin.bind(adminController))
);

router.get("/", authMiddleware, asyncHandler(adminController.getAllAdmins.bind(adminController)));
router.get("/:id", authMiddleware, asyncHandler(adminController.getAdminById.bind(adminController)));
router.put("/:userId", authMiddleware, asyncHandler(adminController.updateAdminProfile.bind(adminController))); // Ensure this line exists
router.post("/change-password/:userId", authMiddleware, asyncHandler(adminController.changePassword.bind(adminController)));

module.exports = router;