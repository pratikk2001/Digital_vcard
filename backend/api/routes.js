const express = require("express");

const template = require("./template/template.routes");
const superAdmin = require("./super_admin/super_admin.routes")
const admin = require("./admin/admin.routes")

const router = express.Router();

router.use("/template", template);
router.use("/superAdmin",superAdmin);
router.use("/admin",admin);


module.exports = router;