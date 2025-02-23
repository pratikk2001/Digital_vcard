const express = require("express");
const router = express.Router();

const TemplateController = require("./template.controller");

const uploadProfilePictureBanner = require("../../middlewares/uploadProfileBanner"); // Import the multer config
const uploadAwards = require("../../middlewares/uploadAwardsImage"); // Import the multer config
const uploadEvent = require("../../middlewares/uploadEventImage"); // Import the multer config
const uploadSocialImages = require("../../middlewares/uploadSocialworkImages"); // Import the multer config
const uploadNewsCenterImages = require("../../middlewares/uploadNewsImages"); // Import the multer config
// Define the exact route from your request
router.post("/save/basicDetails/:id", TemplateController.saveBasicDetails);

// Other routes (adjust as needed)
router.post(
    "/save/profileBanner/:id", uploadProfilePictureBanner.fields([{ name: "profilePicture", maxCount: 1 },
         { name: "bannerImage", maxCount: 1 },
    ]),
    TemplateController.saveProfileBanner
  );

router.post("/save/awards/:id",uploadAwards.array("awards", 5), TemplateController.saveAwards);  // Changed to POST

router.post("/save/familyDetails/:id", TemplateController.saveFamilyDetails);

router.post("/save/socialWorkImages/:id",uploadSocialImages.array("socialwork",5), TemplateController.saveSocialWorkImages);

router.post("/save/eventImages/:id",uploadEvent.array("events",5), TemplateController.saveEventImages);

router.post("/save/newsCenterImages/:id",uploadNewsCenterImages.array("news",5), TemplateController.saveNewsCenterImages);

router.get("/getFormData/:id", TemplateController.getFormData);

module.exports = router;

// saveNewsCenterImages