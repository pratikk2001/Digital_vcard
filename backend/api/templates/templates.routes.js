const express = require('express');
const router = express.Router();
const TemplateController = require('./templates.controller');

router.post("/save/basicDetails/id:", TemplateController.saveBasicDetails);
router.get("/save/profileBanner/:id", TemplateController.saveProfileBanner);
router.get("/save/awards/:id", TemplateController.saveAwards);
router.put("/save/familyDetails/:id", TemplateController.saveFamilyDetails);
router.post("/save/socialWorkImages/:id", TemplateController.saveSocialWorkImages);
router.post("/save/saveEventImages/:id", TemplateController.saveEventImages);
router.post("/save/saveNewsCenterImages/:id", TemplateController.saveNewsCenterImages);
router.post("getFormData/:id", TemplateController.getFormData);


module.exports = router;