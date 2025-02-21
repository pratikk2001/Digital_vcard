const express = require("express");
const router = express.Router();
const TemplateController = require("./template.controller");

// Define the exact route from your request
router.post("/save/basicDetails/:id", TemplateController.saveBasicDetails);

// Other routes (adjust as needed)
router.post("/save/profileBanner/:id", TemplateController.saveProfileBanner); // Changed to POST
router.post("/save/awards/:id", TemplateController.saveAwards);              // Changed to POST
router.put("/save/familyDetails/:id", TemplateController.saveFamilyDetails);
router.post("/save/socialWorkImages/:id", TemplateController.saveSocialWorkImages);
router.post("/save/eventImages/:id", TemplateController.saveEventImages);
router.post("/save/newsCenterImages/:id", TemplateController.saveNewsCenterImages);
router.get("/getFormData/:id", TemplateController.getFormData);

module.exports = router;