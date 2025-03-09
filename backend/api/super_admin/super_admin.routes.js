const express = require("express");
const router = express.Router();
const SuperAdminController = require("./super_admin.controller");

router.post("/create", SuperAdminController.createAdmin);
router.post("/login", SuperAdminController.loginAdmin);
router.get("/super_admin/:id", SuperAdminController.getUserById);
router.put("/super_admin/:id", SuperAdminController.updateUserById); 

module.exports = router;