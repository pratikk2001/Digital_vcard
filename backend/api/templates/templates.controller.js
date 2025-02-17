// controllers/TemplateController.js
const Template = require("./templates.model");

class TemplateController {  
  // Basic Details
  async saveBasicDetails(req, res) {  
    try {
      const { name, email, phone, address, dob, education } = req.body;
      
      const userId = req.params.id; // Assuming this is the Admin ID
  
      const theme = await Template.findOneAndUpdate(
        { userId }, // Find by userId instead of _id
        { name, email, phone, address, dob, education }, 
        { new: true, upsert: true } // Create if not found
      );
  
      res.status(200).json({ message: "Basic details saved", status_code: 200, data: theme });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

  // Profile and Banner
  async saveProfileBanner(req, res) {
    try {
      const { profilePicture, bannerImage } = req.body;
      const userId = req.params.id; // Assuming this is the Admin ID
  
      const template = await Template.findByIdAndUpdate(
        {userId}, 
        { profilePicture, bannerImage }, 
        { new: true, upsert: true }
      );
      res.status(200).json({ message: "Profile and banner updated", status_code: 200, data: template });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Awards
  async saveAwards(req, res) {
    try {
      const { awards } = req.body;
      const userId = req.params.id; // Assuming this is the Admin ID
  
      const template = await Template.findByIdAndUpdate(
        {userId}, 
        { $push: { awards: { $each: awards } } }, 
        { new: true, upsert: true }
      );
      res.status(200).json({ message: "Awards updated", status_code: 200, data: template });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Family Details
  async saveFamilyDetails(req, res) {
    try {
      const { familyDetails } = req.body;
      const userId = req.params.id; // Assuming this is the Admin ID
  
      const template = await Template.findByIdAndUpdate(
        {userId}, 
        { $push: { familyDetails: { $each: familyDetails } } }, 
        { new: true, upsert: true }
      );
      res.status(200).json({ message: "Family details updated", status_code: 200, data: template });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Social Work Images
  async saveSocialWorkImages(req, res) {
    try {
      const { socialWorkImages } = req.body;
      const userId = req.params.id; // Assuming this is the Admin ID

      const template = await Template.findByIdAndUpdate(
        {userId}, 
        { $push: { socialWorkImages: { $each: socialWorkImages } } }, 
        { new: true, upsert: true }
      );
      res.status(200).json({ message: "Social work images updated", status_code: 200, data: template });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Events Images
  async saveEventImages(req, res) {
    try {
      const { eventImages } = req.body;
      const userId = req.params.id; // Assuming this is the Admin ID

      const template = await Template.findByIdAndUpdate(
        {userId}, 
        { $push: { eventImages: { $each: eventImages } } }, 
        { new: true, upsert: true }
      );
      res.status(200).json({ message: "Event images updated", status_code: 200, data: template });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // News Center Images
  async saveNewsCenterImages(req, res) {
    try {
      const userId = req.params.id; // Assuming this is the Admin ID

      const { newsCenterImages } = req.body;
      const template = await Template.findByIdAndUpdate(
        {userId}, 
        { $push: { newsCenterImages: { $each: newsCenterImages } } }, 
        { new: true, upsert: true }
      );
      res.status(200).json({ message: "News center images updated", status_code: 200, data: template });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get Form Data by ID
  async getFormData(req, res) {
    try {
      const userId = req.params.id; // Assuming this is the Admin ID

      const template = await Template.findById(userId);
      if (!template) return res.status(404).json({ message: "Form not found", status_code: 404 });
      res.status(200).json({ message: "Form fetched successfully", status_code: 200, data: template });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TemplateController();
