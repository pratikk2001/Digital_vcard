const express = require("express");
const router = express.Router();
const MultiAdminController = require("./multiadmin.controller"); // Import the class
const { body, validationResult } = require("express-validator");
const asyncHandler = require("../../middlewares/asyncHandler");

// Create a new instance of MultiAdminController
const multiAdminController = new MultiAdminController(); // Instantiate the class

// Multi Admin registration
router.post(
  "/register",
  [
    body("first_name")
      .trim()
      .notEmpty()
      .withMessage("First name is required")
      .isString(),
    body("last_name")
      .trim()
      .notEmpty()
      .withMessage("Last name is required")
      .isString(),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail()
      .toLowerCase(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .isString(),
  ],
  asyncHandler(multiAdminController.createMultiAdmin.bind(multiAdminController))
);

// Multi Admin login
router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail()
      .toLowerCase(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isString(),
  ],
  asyncHandler(multiAdminController.loginMultiAdmin.bind(multiAdminController))
);

// Fetch all Multi Admins
router.get("/", asyncHandler(multiAdminController.getAllMultiAdmins.bind(multiAdminController)));

// Fetch a specific Multi Admin by ID
router.get("/:id", asyncHandler(multiAdminController.getMultiAdminById.bind(multiAdminController)));

// Fetch all end users for Multi Admin
router.get("/admins", asyncHandler(multiAdminController.getAllEndUsers.bind(multiAdminController)));

module.exports = router;