const Template = require("../template/template.model"); // Adjust path as needed

class TemplateController {
  // Save or Update Basic Details
  async saveBasicDetails(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        positionTitle,
        address,
        education,
        showQrCode,
        whatsappShare,
        urlAlias,
      } = req.body;
      const userId = req.params.id;

      // Enhanced validation
      if (!userId) {
        return res.status(400).json({ status_code: 400, message: "User ID is required" });
      }
      if (!email || !firstName) {
        return res.status(400).json({ status_code: 400, message: "Email and first name are required" });
      }

      const template = await Template.findOneAndUpdate(
        { userId },
        {
          $set: {
            firstName,
            lastName,
            email,
            phone,
            dob,
            positionTitle,
            address,
            education,
            showQrCode,
            whatsappShare,
            urlAlias,
          },
        },
        { new: true, upsert: true }
      );

      return res.status(200).json({
        status_code: 200,
        message: "Basic details saved successfully",
        data: template,
      });
    } catch (error) {
      console.error("Error in saveBasicDetails:", error);
      return res.status(500).json({
        status_code: 500,
        message: "Failed to save basic details",
        error: error.name === "ValidationError" ? error.message : "Internal server error",
      });
    }
  }

  // Save or Update Profile and Banner
  async saveProfileBanner(req, res) {
    try {
      const { profilePicture, bannerImage } = req.body;
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({ status_code: 400, message: "User ID is required" });
      }

      const template = await Template.findOneAndUpdate(
        { userId },
        { $set: { profilePicture, bannerImage } },
        { new: true, upsert: true }
      );

      return res.status(200).json({
        status_code: 200,
        message: "Profile and banner updated successfully",
        data: template,
      });
    } catch (error) {
      console.error("Error in saveProfileBanner:", error);
      return res.status(500).json({
        status_code: 500,
        message: "Failed to update profile and banner",
        error: error.message,
      });
    }
  }

  // Save Awards
  async saveAwards(req, res) {
    try {
      const { awards, captions } = req.body;
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({ status_code: 400, message: "User ID is required" });
      }
      if (!Array.isArray(awards) || awards.length === 0) {
        return res.status(400).json({ status_code: 400, message: "Awards must be a non-empty array" });
      }

      const formattedAwards = awards.map((award, index) => {
        if (typeof award !== "string") {
          throw new Error("Each award must be a string (image URL)");
        }
        return {
          imageUrl: award,
          caption: captions?.[index] || "",
        };
      });

      const template = await Template.findOneAndUpdate(
        { userId },
        { $push: { awards: { $each: formattedAwards } } },
        { new: true, upsert: true }
      );

      return res.status(200).json({
        status_code: 200,
        message: "Awards updated successfully",
        data: template,
      });
    } catch (error) {
      console.error("Error in saveAwards:", error);
      return res.status(500).json({
        status_code: 500,
        message: "Failed to update awards",
        error: error.message,
      });
    }
  }

// Save Family Details
async saveFamilyDetails(req, res) {
  try {
    const { familyDetails } = req.body;
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ status_code: 400, message: "User ID is required" });
    }
    if (!Array.isArray(familyDetails) || familyDetails.length === 0) {
      return res.status(400).json({ status_code: 400, message: "Family details must be a non-empty array" });
    }

    // Validate familyDetails structure: only name is required
    for (const detail of familyDetails) {
      if (!detail.name) {
        return res.status(400).json({
          status_code: 400,
          message: "Each family detail must have a name",
        });
      }
      // Email is optional, no need to check
    }

    const template = await Template.findOneAndUpdate(
      { userId },
      { $push: { familyDetails: { $each: familyDetails } } },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      status_code: 200,
      message: "Family details updated successfully",
      data: template,
    });
  } catch (error) {
    console.error("Error in saveFamilyDetails:", error);
    return res.status(500).json({
      status_code: 500,
      message: "Failed to update family details",
      error: error.name === "CastError" ? "Invalid family details format" : error.message,
    });
  }
}

  // Save Social Work Images
  async saveSocialWorkImages(req, res) {
    try {
      const { socialWorkImages } = req.body;
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({ status_code: 400, message: "User ID is required" });
      }
      if (!Array.isArray(socialWorkImages) || socialWorkImages.length === 0) {
        return res.status(400).json({ status_code: 400, message: "Social work images must be a non-empty array" });
      }

      const template = await Template.findOneAndUpdate(
        { userId },
        { $push: { socialWorkImages: { $each: socialWorkImages } } },
        { new: true, upsert: true }
      );

      return res.status(200).json({
        status_code: 200,
        message: "Social work images updated successfully",
        data: template,
      });
    } catch (error) {
      console.error("Error in saveSocialWorkImages:", error);
      return res.status(500).json({
        status_code: 500,
        message: "Failed to update social work images",
        error: error.message,
      });
    }
  }

  // Save Event Images
  async saveEventImages(req, res) {
    try {
      const { eventImages } = req.body;
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({ status_code: 400, message: "User ID is required" });
      }
      if (!Array.isArray(eventImages) || eventImages.length === 0) {
        return res.status(400).json({ status_code: 400, message: "Event images must be a non-empty array" });
      }

      const template = await Template.findOneAndUpdate(
        { userId },
        { $push: { eventImages: { $each: eventImages } } },
        { new: true, upsert: true }
      ).lean();

      return res.status(200).json({
        status_code: 200,
        message: "Event images updated successfully",
        data: template,
      });
    } catch (error) {
      console.error("Error in saveEventImages:", error);
      return res.status(500).json({
        status_code: 500,
        message: "Failed to update event images",
        error: error.message,
      });
    }
  }

  // Save News Center Images
  async saveNewsCenterImages(req, res) {
    try {
      const { newsCenterImages, captions, youtubeLink } = req.body;
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({ status_code: 400, message: "User ID is required" });
      }
      if (!Array.isArray(newsCenterImages) || newsCenterImages.length === 0) {
        return res.status(400).json({ status_code: 400, message: "News center images must be a non-empty array" });
      }

      const template = await Template.findOneAndUpdate(
        { userId },
        {
          $push: { newsCenterImages: { $each: newsCenterImages } },
          $set: { captions, youtubeLink },
        },
        { new: true, upsert: true }
      ).lean();

      return res.status(200).json({
        status_code: 200,
        message: "News center images updated successfully",
        data: template,
      });
    } catch (error) {
      console.error("Error in saveNewsCenterImages:", error);
      return res.status(500).json({
        status_code: 500,
        message: "Failed to update news center images",
        error: error.message,
      });
    }
  }

  // Get Form Data by ID
  async getFormData(req, res) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({ status_code: 400, message: "User ID is required" });
      }

      const template = await Template.findOne({ userId }).lean();
      if (!template) {
        return res.status(404).json({
          status_code: 404,
          message: "Template not found",
        });
      }

      return res.status(200).json({
        status_code: 200,
        message: "Form data fetched successfully",
        data: template,
      });
    } catch (error) {
      console.error("Error in getFormData:", error);
      return res.status(500).json({
        status_code: 500,
        message: "Failed to fetch form data",
        error: error.message,
      });
    }
  }
}

module.exports = new TemplateController();