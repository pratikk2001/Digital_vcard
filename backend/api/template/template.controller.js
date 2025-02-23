const Template = require("../template/template.model"); // Adjust path if needed (e.g., "./template.model" if in same dir)

const fs = require("fs");
const path = require("path");
const mime = require("mime-types");



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
  
      // Basic validation
      if (!userId) {
        return res.status(400).json({ status_code: 400, message: "User ID is required" });
      }
  
      // Ensure firstName & lastName start with uppercase
      const formattedFirstName = firstName.trim().charAt(0).toUpperCase() + firstName.trim().slice(1).toLowerCase();
      const formattedLastName = lastName.trim().charAt(0).toUpperCase() + lastName.trim().slice(1).toLowerCase();
  
      // Upsert (update if exists, else create)
      const template = await Template.findOneAndUpdate(
        { userId }, // Search by userId
        {
          firstName: formattedFirstName,
          lastName: formattedLastName,
          userId,
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
        { new: true, upsert: true, setDefaultsOnInsert: true } // Return new doc if updated, insert if not exists
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
        error: error.message,
      });
    }
  }
  
async getByUrlAlias(req, res) {
  try {
    const { urlAlias } = req.params;

    // Find the template by urlAlias
    const theme = await Template.findOne({ urlAlias });

    if (!theme) {
      return res.status(404).json({
        status_code: 404,
        message: "Theme not found",
      });
    }

    res.status(200).json({
      status_code: 200,
      message: "Theme retrieved successfully",
      data: theme,
    });
  } catch (error) {
    console.error("Error fetching theme:", error);
    res.status(500).json({
      status_code: 500,
      error: "Internal server error",
    });
  }
}


  // Save or Update Profile and Banner
saveProfileBanner=async(req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ status_code: 400, message: "User ID is required" });
    }

    // Store only the unique file names, not the full path
    const profilePicture = req.files?.profilePicture ? req.files.profilePicture[0].filename : null;
    const bannerImage = req.files?.bannerImage ? req.files.bannerImage[0].filename : null;

    // Update or insert the record
    const template = await Template.findOneAndUpdate(
      { userId },
      { profilePicture, bannerImage },
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
saveAwards = async (req, res) => {
      try {

        const userId = req.params.id;
        const captions = req.body.captions ? JSON.parse(req.body.captions) : [];
    
        if (!userId) {
          return res.status(400).json({ status_code: 400, message: "User ID is required" });
        }
    
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ status_code: 400, message: "At least one award image is required" });
        }
    
        const formattedAwards = req.files.map((file, index) => ({
          imageUrl:file.filename, // Store relative path
          caption: captions[index] || "",
        }));
    
        const template = await Template.findOneAndUpdate(
          { userId },
          { $push: { awards: { $each: formattedAwards } } },
          { new: true, upsert: true }
        );
    
        return res.status(200).json({

          status_code: 200,
          message: "Awards uploaded successfully",
          data: template,

        });
      } catch (error) {
        console.error("Error in saveAwards:", error);
        return res.status(500).json({
          status_code: 500,
          message: "Failed to upload awards",
          error: error.message,
        });
      }
    };

deleteAward = async (req, res) => {
      try {
        const { userId, awardId } = req.params;

        const template = await Template.findOne({ userId });
    
        if (!template) {
          return res.status(404).json({ status_code: 404, message: "User not found" });
        }
    
        const awardIndex = template.awards.findIndex((award) => award._id.toString() === awardId);
        if (awardIndex === -1) {
          return res.status(404).json({ status_code: 404, message: "Award not found" });
        }
    
        const removedAward = template.awards.splice(awardIndex, 1)[0];
    
        // Delete image file from storage
        const filePath = path.join(__dirname, "..", removedAward.imageUrl);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
    
        await template.save();
    
        return res.status(200).json({
          status_code: 200,
          message: "Award deleted successfully",
          deletedAward: removedAward,
        });
      } catch (error) {
        console.error("Error in deleteAward:", error);
        return res.status(500).json({
          status_code: 500,
          message: "Failed to delete award",
          error: error.message,
        });
      }
    };    

  // Save Family Details
async saveFamilyDetails(req, res) {
    try {
      const { familyDetails } = req.body;
      const userId = req.params. id;

      if (!userId) {
        return res.status(400).json({ status_code: 400, message: "User ID is required" });
      }
      if (!Array.isArray(familyDetails)) {
        return res.status(400).json({ status_code: 400, message: "Family details must be an array" });
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
        error: error.message,
      });
    }
  }

  // Save Social Work Images
async saveSocialWorkImages(req, res) {
  try {
    const userId = req.params.id;
    const captions = req.body.captions ? JSON.parse(req.body.captions) : [];

    if (!userId) {
      return res.status(400).json({ status_code: 400, message: "User ID is required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ status_code: 400, message: "At least one event image is required" });
    }

    const formattedEventImages = req.files.map((file, index) => ({
      imageUrl: file.filename, // Store relative path
      caption: captions[index] || "",
    }));

    const template = await Template.findOneAndUpdate(
      { userId },
      { $push: { socialWorkImages: { $each: formattedEventImages } } },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      status_code: 200,
      message: "Event images uploaded successfully",
      data: template,
    });
  } catch (error) {
    console.error("Error in saveEventImages:", error);
    return res.status(500).json({
      status_code: 500,
      message: "Failed to upload event images",
      error: error.message,
    });
  }

  }

  // Save Event Images
saveEventImages = async (req, res) => {
    try {
      const userId = req.params.id;
      const captions = req.body.captions ? JSON.parse(req.body.captions) : [];
  
      if (!userId) {
        return res.status(400).json({ status_code: 400, message: "User ID is required" });
      }
  
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ status_code: 400, message: "At least one event image is required" });
      }
  
      const formattedEventImages = req.files.map((file, index) => ({
        imageUrl: file.filename, // Store relative path
        caption: captions[index] || "",
      }));
  
      const template = await Template.findOneAndUpdate(
        { userId },
        { $push: { eventImages: { $each: formattedEventImages } } },
        { new: true, upsert: true }
      );
  
      return res.status(200).json({
        status_code: 200,
        message: "Event images uploaded successfully",
        data: template,
      });
    } catch (error) {
      console.error("Error in saveEventImages:", error);
      return res.status(500).json({
        status_code: 500,
        message: "Failed to upload event images",
        error: error.message,
      });
    }
  };


  // Save News Center Images
async saveNewsCenterImages(req, res) {
  try {
    const userId = req.params.id;
    const captions = req.body.captions ? JSON.parse(req.body.captions) : [];

    if (!userId) {
      return res.status(400).json({ status_code: 400, message: "User ID is required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ status_code: 400, message: "At least one event image is required" });
    }

    const formattedEventImages = req.files.map((file, index) => ({
      imageUrl: file.filename, // Store relative path
      caption: captions[index] || "",
    }));

    const template = await Template.findOneAndUpdate(
      { userId },
      { $push: { newsCenterImages: { $each: formattedEventImages } } },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      status_code: 200,
      message: "Event images uploaded successfully",
      data: template,
    });
  } catch (error) {
    console.error("Error in saveEventImages:", error);
    return res.status(500).json({
      status_code: 500,
      message: "Failed to upload event images",
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



getProfileImage = async (req, res) => {
    try {

      const { imageId } = req.params;
      
      // console.log("Product ID:", productId);

      const imagePath = path.resolve(
        __dirname,
        `../../uploads/profileImages/${imageId}`
      );

      // console.log("Image path:", imagePath);

      const document = await this.getDocument(imagePath);

      if (!document) {
        return res.status(200).json({
          status_code: 200,
          message: "Image not found",
        });
      }

      const mimeType = mime.lookup(imagePath) || "application/octet-stream";
      res.set("Content-Type", mimeType);
      res.send(document);
    } catch (error) {
      res.status(500).json({
        status_code: 500,
        error: "Internal server error",
      });
    }

   };

getBanerImage = async (req, res) => {
    try {

      const { imageId } = req.params;
      
      // console.log("Product ID:", productId);

      const imagePath = path.resolve(
        __dirname,
        `../../uploads/bannerImages/${imageId}`
      );

      // console.log("Image path:", imagePath);

      const document = await this.getDocument(imagePath);

      if (!document) {
        return res.status(200).json({
          status_code: 200,
          message: "Image not found",
        });
      }

      const mimeType = mime.lookup(imagePath) || "application/octet-stream";
      res.set("Content-Type", mimeType);
      res.send(document);
    } catch (error) {
      res.status(500).json({
        status_code: 500,
        error: "Internal server error",
      });
    }

   };   

getAwardsImage = async (req, res) => {
    try {
      const { imageId } = req.params;
      
      // console.log("Product ID:", productId);

      const imagePath = path.resolve(
        __dirname,
        `../../uploads/awardsImages/${imageId}`
      );

      // console.log("Image path:", imagePath);

      const document = await this.getDocument(imagePath);

      if (!document) {
        return res.status(200).json({
          status_code: 200,
          message: "Image not found",
        });
      }

      const mimeType = mime.lookup(imagePath) || "application/octet-stream";
      res.set("Content-Type", mimeType);
      res.send(document);
    } catch (error) {
      res.status(500).json({
        status_code: 500,
        error: "Internal server error",
      });
    }

   };   

getEventImage = async (req, res) => {
    try {
      const { imageId } = req.params;
      
      // console.log("Product ID:", productId);

      const imagePath = path.resolve(
        __dirname,
        `../../uploads/eventImages/${imageId}`
      );

      // console.log("Image path:", imagePath);

      const document = await this.getDocument(imagePath);

      if (!document) {
        return res.status(200).json({
          status_code: 200,
          message: "Image not found",
        });
      }

      const mimeType = mime.lookup(imagePath) || "application/octet-stream";
      res.set("Content-Type", mimeType);
      res.send(document);
    } catch (error) {
      res.status(500).json({
        status_code: 500,
        error: "Internal server error",
      });
    }

   };   

getNewsImage = async (req, res) => {
    try {
      const { imageId } = req.params;
      
      // console.log("Product ID:", productId);

      const imagePath = path.resolve(
        __dirname,
        `../../uploads/newsImages/${imageId}`
      );

      // console.log("Image path:", imagePath);

      const document = await this.getDocument(imagePath);

      if (!document) {
        return res.status(200).json({
          status_code: 200,
          message: "Image not found",
        });
      }

      const mimeType = mime.lookup(imagePath) || "application/octet-stream";
      res.set("Content-Type", mimeType);
      res.send(document);
    } catch (error) {
      res.status(500).json({
        status_code: 500,
        error: "Internal server error",
      });
    }

   };   

getSocialImage = async (req, res) => {
    try {
      const { imageId } = req.params;
      
      // console.log("Product ID:", productId);

      const imagePath = path.resolve(
        __dirname,
        `../../uploads/socialImages/${imageId}`
      );

      // console.log("Image path:", imagePath);

      const document = await this.getDocument(imagePath);

      if (!document) {
        return res.status(200).json({
          status_code: 200,
          message: "Image not found",
        });
      }

      const mimeType = mime.lookup(imagePath) || "application/octet-stream";
      res.set("Content-Type", mimeType);
      res.send(document);
    } catch (error) {
      res.status(500).json({
        status_code: 500,
        error: "Internal server error",
      });
    }

   };   



   async getDocument(filePath) {
    try {
      const file = fs.readFileSync(filePath);
      return file;
    } catch (error) {
      console.error("Error reading file:", error);
      return null;
    }
  }
  


}

module.exports = new TemplateController();