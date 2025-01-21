const express = require('express');
const router = express.Router();
const SuperAdminController = require('./super_admin.controller');

router.post("/create",SuperAdminController.createAdmin);

router.post("/login",SuperAdminController.loginAdmin);




module.exports = router;