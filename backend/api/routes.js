const express = require("express");
const router = express.Router();

// Import sub-routers (ensure paths are correct)
const templateRoutes = require("./template/template.routes");
const superAdminRoutes = require("./super_admin/super_admin.routes");
const adminRoutes = require("./admin/admin.routes");

// Mount sub-routers with consistent naming

router.use("/template", templateRoutes);
router.use("/super_admin", superAdminRoutes); // Changed to case for consistency
router.use("/admin", adminRoutes);


// Optional: Add a root route for debugging
router.get("/", (req, res) => {
  res.status(200).json({
    status_code: 200,
    message: "API root",
    available_routes: {
      template: "/api/template",
      "super-admin": "/api/super_admin",
      admin: "/api/admin",
    },
  });
});

module.exports = router;