const Template = require("../template/template.model"); // Adjust the path as needed

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
        urlAlias
      } = req.body;

      const userId = req.params.id; // Assuming this is the Admin ID

      const template = await Template.findOneAndUpdate(
        { userId }, // Find by userId instead of _id
        {
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
        { new: true, upsert: true } // Create if not found
      );

      res.status(200).json({ message: "Basic details saved", status_code: 200, data: template });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Save or Update Profile and Banner
  async saveProfileBanner(req, res) {
    try {
      const { profilePicture, bannerImage } = req.body;
      const userId = req.params.id;

      const template = await Template.findOneAndUpdate(
        { userId },
        { profilePicture, bannerImage },
        { new: true, upsert: true }
      );

      res.status(200).json({ message: "Profile and banner updated", status_code: 200, data: template });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Save Awards
  async saveAwards(req, res) {
    try {
      const { awards, captions } = req.body;
      const userId = req.params.id;

      const formattedAwards = awards.map((award, index) => ({
        imageUrl: award,
        caption: captions[index] || ""
      }));

      const template = await Template.findOneAndUpdate(
        { userId },
        { $push: { awards: { $each: formattedAwards } } },
        { new: true, upsert: true }
      );  

      res.status(200).json({ message: "Awards updated Sucessfully", status_code: 200, data: template });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Save Family Details
  async saveFamilyDetails(req, res) {
    try {
      const { familyDetails } = req.body;
      const userId = req.params.id;

      const template = await Template.findOneAndUpdate(
        { userId },
        { $push: { familyDetails: { $each: familyDetails } } },
        { new: true, upsert: true }
      );

      res.status(200).json({
        message: "Family details updated successfully",
        status_code: 200,
        data: template
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Save Social Work Images
  async saveSocialWorkImages(req, res) {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required", status_code: 400 });
        }

        // If images are sent as base64 or URLs
        let { socialWorkImages } = req.body;
        if (!socialWorkImages || !Array.isArray(socialWorkImages) || socialWorkImages.length === 0) {
            return res.status(400).json({ message: "No social work images provided", status_code: 400 });
        }

        const updatedTemplate = await Template.findOneAndUpdate(
            { userId },
            { $push: { socialWorkImages: { $each: socialWorkImages } } },
            { new: true, upsert: true }
        );

        return res.status(200).json({
            message: "Social work images updated successfully",
            status_code: 200,
            data: updatedTemplate
        });
    } catch (error) {
        console.error("Error saving social work images:", error);
        return res.status(500).json({ error: error.message, status_code: 500 });
    }
}

  // Save Event Images
async saveEventImages(req, res) {
  try {
    const { eventImages } = req.body;
    const userId = req.params.id;

    // Validate request data
    if (!userId) {
      return res.status(400).json({ message: "User ID is required", status_code: 400 });
    }

    if (!Array.isArray(eventImages) || eventImages.length === 0) {
      return res.status(400).json({ message: "Invalid or empty event images array", status_code: 400 });
    }

    // Update or create the document
    const template = await Template.findOneAndUpdate(
      { userId },
      { $push: { eventImages: { $each: eventImages } } },
      { new: true, upsert: true }
    ).lean(); // Improves performance by returning a plain JS object

    res.status(200).json({ message: "Event images updated successfully", status_code: 200, data: template });
  } catch (error) {
    console.error("Error saving event images:", error); // Logs for debugging
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

  // Save News Center Images
async saveNewsCenterImages(req, res) {
  try {
    const { newsCenterImages, captions, youtubeLink } = req.body;
    const userId = req.params.id;

    // Validate request data
    if (!userId) {
      return res.status(400).json({ message: "User ID is required", status_code: 400 });
    }

    if (!Array.isArray(newsCenterImages) || newsCenterImages.length === 0) {
      return res.status(400).json({ message: "Invalid or empty news images", status_code: 400 });
    }

    if (typeof captions !== "object" || captions === null) {
      return res.status(400).json({ message: "Invalid captions format", status_code: 400 });
    }

    if (youtubeLink && typeof youtubeLink !== "string") {
      return res.status(400).json({ message: "Invalid YouTube link format", status_code: 400 });
    }

    // Update or create the document
    const template = await Template.findOneAndUpdate(
      { userId },
      {
        $push: { newsCenterImages: { $each: newsCenterImages } },
        $set: { captions, youtubeLink }
      },
      { new: true, upsert: true }
    ).lean(); // Improves performance by returning a plain JS object

    res.status(200).json({ message: "News center images updated successfully", status_code: 200, data: template });
  } catch (error) {
    console.error("Error saving news center images:", error); // Logs for debugging
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

  // Get Form Data by ID
  async getFormData(req, res) {
    try {
      const userId = req.params.id;

      const template = await Template.findOne({ userId });
      if (!template) {
        return res.status(404).json({ message: "Form not found", status_code: 404 });
      }

      res.status(200).json({ message: "Form fetched successfully", status_code: 200, data: template });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TemplateController();
