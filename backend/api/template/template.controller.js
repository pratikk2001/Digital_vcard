const Template = require('../template/template.model'); // Adjust path as needed
const fs = require('fs').promises; // Use promises for async/await compatibility
const path = require('path');
const mime = require('mime-types');

class TemplateController {
  // Save or Update Basic Details
  async saveBasicDetails(req, res) {
    try {
      const {
        firstName,
        middleName,
        lastName,
        email,
        phone,
        whatsappNumber,
        dob,
        positionTitles,
        homeAddress,
        officeAddress,
        education,
        showEducation,
        showQrCode,
        whatsappShare,
        urlAlias,
        partyAffiliation,
      } = req.body;
      const userId = req.params.id;

      // Validate User ID
      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({
          status_code: 400,
          message: 'User ID is required and must be a non-empty string',
        });
      }

      // Basic validation for required fields
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'whatsappNumber'];
      for (const field of requiredFields) {
        if (!req.body[field] || typeof req.body[field] !== 'string' || req.body[field].trim() === '') {
          return res.status(400).json({
            status_code: 400,
            message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required and must be a non-empty string`,
          });
        }
      }

      // Validate email format
      if (email && !/^\S+@\S+\.\S+$/.test(email.trim().toLowerCase())) {
        return res.status(400).json({
          status_code: 400,
          message: 'Enter a valid email address.',
        });
      }

      // Validate phone and WhatsApp numbers (10 digits)
      if (phone && !/^\d{10}$/.test(phone.trim())) {
        return res.status(400).json({
          status_code: 400,
          message: 'Phone number must be 10 digits.',
        });
      }

      if (whatsappNumber && !/^\d{10}$/.test(whatsappNumber.trim())) {
        return res.status(400).json({
          status_code: 400,
          message: 'WhatsApp number must be 10 digits.',
        });
      }

      // Validate Date of Birth format (optional, assuming ISO format from React or converted)
      if (dob) {
        const isIsoFormat = /^\d{4}-\d{2}-\d{2}$/.test(dob);
        const isMmDdFormat = /^\d{2}\/\d{2}$/.test(dob);
        if (!isIsoFormat && !isMmDdFormat) {
          return res.status(400).json({
            status_code: 400,
            message: 'Enter a valid date in MM/DD or YYYY-MM-DD format.',
          });
        }
      }

      // Validate positionTitles (array, non-empty strings)
      if (!Array.isArray(positionTitles) || positionTitles.length === 0 || positionTitles.some(title => !title || typeof title !== 'string' || title.trim() === '')) {
        return res.status(400).json({
          status_code: 400,
          message: 'Position titles must be a non-empty array of non-empty strings.',
        });
      }

      // Format data for consistency (matching React component behavior)
      const formattedData = {
        firstName: firstName.trim().charAt(0).toUpperCase() + firstName.trim().slice(1).toLowerCase(),
        middleName: middleName ? middleName.trim().charAt(0).toUpperCase() + middleName.trim().slice(1).toLowerCase() : '',
        lastName: lastName.trim().charAt(0).toUpperCase() + lastName.trim().slice(1).toLowerCase(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        whatsappNumber: whatsappNumber.trim(),
        dob, // Keep as-is (ISO or MM/DD format, handle in model if needed)
        positionTitles: positionTitles.map(title => title.trim()),
        homeAddress: homeAddress ? homeAddress.trim() : '',
        officeAddress: officeAddress ? officeAddress.trim() : '',
        education: education ? education.trim() : '',
        showEducation: showEducation === undefined ? false : Boolean(showEducation),
        showQrCode: showQrCode === undefined ? false : Boolean(showQrCode),
        whatsappShare: whatsappShare === undefined ? false : Boolean(whatsappShare),
        urlAlias: urlAlias ? urlAlias.trim() : '',
        partyAffiliation: partyAffiliation || 'BJP', // Default to BJP if not provided
      };

      // Ensure urlAlias is unique (optional, depending on your needs)
      const existingTemplate = await Template.findOne({ urlAlias: formattedData.urlAlias, userId: { $ne: userId } });
      if (existingTemplate) {
        return res.status(400).json({
          status_code: 400,
          message: 'URL alias must be unique for this user.',
        });
      }

      // Save or update the template in MongoDB
      const template = await Template.findOneAndUpdate(
        { userId },
        { $set: formattedData },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      return res.status(200).json({
        status_code: 200,
        message: 'Basic details saved successfully',
        data: template,
      });
    } catch (error) {
      console.error('Error in saveBasicDetails:', error);
      return res.status(500).json({
        status_code: 500,
        message: 'Failed to save basic details',
        error: error.name === 'ValidationError' ? error.message : 'Internal server error',
      });
    }
  }

  // Get Template by URL Alias
  async getByUrlAlias(req, res) {
    try {
      const { urlAlias } = req.params;

      if (!urlAlias || typeof urlAlias !== 'string' || urlAlias.trim() === '') {
        return res.status(400).json({
          status_code: 400,
          message: 'URL alias is required and must be a non-empty string',
        });
      }

      const template = await Template.findOne({ urlAlias }).lean(); // Use lean for performance
      if (!template) {
        return res.status(404).json({
          status_code: 404,
          message: 'Template not found',
        });
      }

      res.status(200).json({
        status_code: 200,
        message: 'Template retrieved successfully',
        data: template,
      });
    } catch (error) {
      console.error('Error fetching template:', error);
      res.status(500).json({
        status_code: 500,
        error: 'Internal server error',
      });
    }
  }

  // Save or Update Profile and Banner
  async saveProfileBanner(req, res) {
    try {
      const userId = req.params.id;

      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({
          status_code: 400,
          message: 'User ID is required and must be a non-empty string',
        });
      }

      const profilePicture = req.files?.profilePicture?.[0]?.filename || null;
      const bannerImage = req.files?.bannerImage?.[0]?.filename || null;

      if (!profilePicture && !bannerImage) {
        return res.status(400).json({
          status_code: 400,
          message: 'At least one of profile picture or banner image is required',
        });
      }

      const updateData = {};
      if (profilePicture) updateData.profilePicture = profilePicture;
      if (bannerImage) updateData.bannerImage = bannerImage;

      const template = await Template.findOneAndUpdate(
        { userId },
        { $set: updateData },
        { new: true, upsert: true }
      );

      return res.status(200).json({
        status_code: 200,
        message: 'Profile and banner updated successfully',
        data: template,
      });
    } catch (error) {
      console.error('Error in saveProfileBanner:', error);
      return res.status(500).json({
        status_code: 500,
        message: 'Failed to update profile and banner',
        error: error.message || 'Internal server error',
      });
    }
  }

  // Save Awards
  async saveAwards(req, res) {
    try {
      const userId = req.params.id;
      const captions = req.body.captions ? JSON.parse(req.body.captions) : [];

      if (!userId) {
        return res.status(400).json({ status_code: 400, message: 'User ID is required' });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ status_code: 400, message: 'At least one award image is required' });
      }

      const formattedAwards = req.files.map((file, index) => ({
        imageUrl: file.filename, // Store relative path
        caption: captions[index] || '',
      }));

      const template = await Template.findOneAndUpdate(
        { userId },
        { $push: { awards: { $each: formattedAwards } } },
        { new: true, upsert: true }
      );

      return res.status(200).json({
        status_code: 200,
        message: 'Awards uploaded successfully',
        data: template,
      });
    } catch (error) {
      console.error('Error in saveAwards:', error);
      return res.status(500).json({
        status_code: 500,
        message: 'Failed to upload awards',
        error: error.message,
      });
    }
  }

  // Delete Award
  async deleteAward(req, res) {
    try {
      const { userId, awardId } = req.params;

      const template = await Template.findOne({ userId });

      if (!template) {
        return res.status(404).json({ status_code: 404, message: 'User not found' });
      }

      const awardIndex = template.awards.findIndex((award) => award._id.toString() === awardId);
      if (awardIndex === -1) {
        return res.status(404).json({ status_code: 404, message: 'Award not found' });
      }

      const removedAward = template.awards.splice(awardIndex, 1)[0];

      // Delete image file from storage
      const filePath = path.join(__dirname, '..', removedAward.imageUrl);
      if (await fs.access(filePath).then(() => true).catch(() => false)) {
        await fs.unlink(filePath);
      }

      await template.save();

      return res.status(200).json({
        status_code: 200,
        message: 'Award deleted successfully',
        deletedAward: removedAward,
      });
    } catch (error) {
      console.error('Error in deleteAward:', error);
      return res.status(500).json({
        status_code: 500,
        message: 'Failed to delete award',
        error: error.message,
      });
    }
  }

  // Save Family Details
  async saveFamilyDetails(req, res) {
    try {
      const { familyDetails } = req.body;
      const userId = req.params.id;

      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({
          status_code: 400,
          message: 'User ID is required and must be a non-empty string',
        });
      }

      if (!Array.isArray(familyDetails)) {
        return res.status(400).json({
          status_code: 400,
          message: 'Family details must be an array',
        });
      }
      if (familyDetails.length === 0) {
        return res.status(400).json({
          status_code: 400,
          message: 'Family details array cannot be empty',
        });
      }

      for (const detail of familyDetails) {
        if (
          !detail ||
          typeof detail !== 'object' ||
          !detail.name ||
          typeof detail.name !== 'string' ||
          detail.name.trim() === ''
        ) {
          return res.status(400).json({
            status_code: 400,
            message: 'Each family detail must be an object with a non-empty string "name" property',
          });
        }
      }

      const template = await Template.findOneAndUpdate(
        { userId },
        { $push: { familyDetails: { $each: familyDetails } } },
        { new: true, upsert: true }
      );

      if (!template) {
        throw new Error('Failed to create or update template');
      }

      return res.status(200).json({
        status_code: 200,
        message: 'Family details updated successfully',
        data: template,
      });
    } catch (error) {
      console.error('Error in saveFamilyDetails:', error);
      return res.status(500).json({
        status_code: 500,
        message: 'Failed to update family details',
        error: error.name === 'CastError' ? 'Invalid family details format' : error.message || 'Internal server error',
      });
    }
  }

  // Save Social Work Images
  async saveSocialWorkImages(req, res) {
    try {
      const userId = req.params.id;
      const captions = req.body.captions ? JSON.parse(req.body.captions) : [];

      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({
          status_code: 400,
          message: 'User ID is required and must be a non-empty string',
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ status_code: 400, message: 'At least one social work image is required' });
      }

      const formattedSocialImages = req.files.map((file, index) => ({
        imageUrl: file.filename, // Store relative path
        caption: captions[index] || '',
      }));

      const template = await Template.findOneAndUpdate(
        { userId },
        { $push: { socialWorkImages: { $each: formattedSocialImages } } },
        { new: true, upsert: true }
      );

      return res.status(200).json({
        status_code: 200,
        message: 'Social work images uploaded successfully',
        data: template,
      });
    } catch (error) {
      console.error('Error in saveSocialWorkImages:', error);
      return res.status(500).json({
        status_code: 500,
        message: 'Failed to upload social work images',
        error: error.message,
      });
    }
  }

  // Save Event Images
  async saveEventImages(req, res) {
    try {
      const userId = req.params.id;
      const captions = req.body.captions ? JSON.parse(req.body.captions) : [];

      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({
          status_code: 400,
          message: 'User ID is required and must be a non-empty string',
        });
      }

      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        return res.status(400).json({
          status_code: 400,
          message: 'At least one event image is required',
        });
      }

      const formattedEventImages = req.files.map((file, index) => ({
        imageUrl: file.filename,
        caption: captions[index] || '',
      }));

      const template = await Template.findOneAndUpdate(
        { userId },
        { $push: { eventImages: { $each: formattedEventImages } } },
        { new: true, upsert: true }
      );

      return res.status(200).json({
        status_code: 200,
        message: 'Event images uploaded successfully',
        data: template,
      });
    } catch (error) {
      console.error('Error in saveEventImages:', error);
      return res.status(500).json({
        status_code: 500,
        message: 'Failed to upload event images',
        error: error.message || 'Internal server error',
      });
    }
  }

  // Save News Center Images
  async saveNewsCenterImages(req, res) {
    try {
      const userId = req.params.id;
      const captions = req.body.captions ? JSON.parse(req.body.captions) : [];

      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({
          status_code: 400,
          message: 'User ID is required and must be a non-empty string',
        });
      }

      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        return res.status(400).json({
          status_code: 400,
          message: 'At least one news image is required',
        });
      }

      const formattedNewsImages = req.files.map((file, index) => ({
        imageUrl: file.filename,
        caption: captions[index] || '',
      }));

      const template = await Template.findOneAndUpdate(
        { userId },
        { $push: { newsCenterImages: { $each: formattedNewsImages } } },
        { new: true, upsert: true }
      );

      return res.status(200).json({
        status_code: 200,
        message: 'News center images uploaded successfully',
        data: template,
      });
    } catch (error) {
      console.error('Error in saveNewsCenterImages:', error);
      return res.status(500).json({
        status_code: 500,
        message: 'Failed to upload news center images',
        error: error.message || 'Internal server error',
      });
    }
  }

  // Save Social Links
  async saveSocialLinks(req, res) {
    try {
      const userId = req.params.id;
      const socialLinks = req.body;

      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({
          status_code: 400,
          message: 'User ID is required and must be a non-empty string',
        });
      }

      if (!socialLinks || Object.keys(socialLinks).length === 0) {
        return res.status(400).json({
          status_code: 400,
          message: 'At least one social link is required',
        });
      }

      const template = await Template.findOneAndUpdate(
        { userId },
        { $set: socialLinks },
        { new: true, upsert: true }
      );

      return res.status(200).json({
        status_code: 200,
        message: 'Social links updated successfully',
        data: template,
      });
    } catch (error) {
      console.error('Error in saveSocialLinks:', error);
      return res.status(500).json({
        status_code: 500,
        message: 'Failed to update social links',
        error: error.message,
      });
    }
  }

  // Get Form Data by ID
  async getFormData(req, res) {
    try {
      const userId = req.params.id;

      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({
          status_code: 400,
          message: 'User ID is required and must be a non-empty string',
        });
      }

      const template = await Template.findOne({ userId }).lean();
      if (!template) {
        return res.status(404).json({
          status_code: 404,
          message: 'Template not found',
        });
      }

      return res.status(200).json({
        status_code: 200,
        message: 'Form data fetched successfully',
        data: template,
      });
    } catch (error) {
      console.error('Error in getFormData:', error);
      return res.status(500).json({
        status_code: 500,
        message: 'Failed to fetch form data',
        error: error.message || 'Internal server error',
      });
    }
  }

  // Get Profile Image
  async getProfileImage(req, res) {
    try {
      const { imageId } = req.params;
      const imagePath = path.resolve(__dirname, '../../uploads/profileImages', imageId);
      const document = await this.getDocument(imagePath);

      if (!document) {
        return res.status(404).json({
          status_code: 404,
          message: 'Image not found',
        });
      }

      const mimeType = mime.lookup(imagePath) || 'application/octet-stream';
      res.set('Content-Type', mimeType);
      res.send(document);
    } catch (error) {
      console.error('Error fetching profile image:', error);
      return res.status(500).json({
        status_code: 500,
        message: 'Failed to fetch profile image',
        error: 'Internal server error',
      });
    }
  }

  // Get Banner Image
  async getBanerImage(req, res) { // Corrected typo: 'Baner' to 'Banner'
    try {
      const { imageId } = req.params;
      const imagePath = path.resolve(__dirname, '../../uploads/bannerImages', imageId);
      const document = await this.getDocument(imagePath);

      if (!document) {
        return res.status(404).json({
          status_code: 404,
          message: 'Image not found',
        });
      }

      const mimeType = mime.lookup(imagePath) || 'application/octet-stream';
      res.set('Content-Type', mimeType);
      res.send(document);
    } catch (error) {
      console.error('Error fetching banner image:', error);
      return res.status(500).json({
        status_code: 500,
        message: 'Failed to fetch banner image',
        error: 'Internal server error',
      });
    }
  }

  // Get Awards Image
  async getAwardsImage(req, res) {
    try {
      const { imageId } = req.params;
      const folder = 'awards'; // Define the folder name
      const imagePath = path.resolve(__dirname, `../../uploads/${folder}/${imageId}`);
      const document = await this.getDocument(imagePath);

      if (!document) {
        return res.status(404).json({
          status_code: 404,
          message: 'Image not found',
        });
      }

      const mimeType = mime.lookup(imagePath) || 'application/octet-stream';
      res.set('Content-Type', mimeType);
      res.send(document);
    } catch (error) {
      console.error(`Error fetching image from ${folder}:`, error);
      return res.status(500).json({
        status_code: 500,
        message: 'Failed to fetch image',
        error: 'Internal server error',
      });
    }
  }

  // Get Event Image
  async getEventImage(req, res) {
    try {
      const { imageId } = req.params;
      const imagePath = path.resolve(__dirname, '../../uploads/eventImages', imageId);
      const document = await this.getDocument(imagePath);

      if (!document) {
        return res.status(404).json({
          status_code: 404,
          message: 'Image not found',
        });
      }

      const mimeType = mime.lookup(imagePath) || 'application/octet-stream';
      res.set('Content-Type', mimeType);
      res.send(document);
    } catch (error) {
      console.error('Error fetching event image:', error);
      return res.status(500).json({
        status_code: 500,
        message: 'Failed to fetch event image',
        error: 'Internal server error',
      });
    }
  }

  // Get News Image
  async getNewsImage(req, res) {
    try {
      const { imageId } = req.params;
      const imagePath = path.resolve(__dirname, '../../uploads/newsImages', imageId);
      const document = await this.getDocument(imagePath);

      if (!document) {
        return res.status(404).json({
          status_code: 404,
          message: 'Image not found',
        });
      }

      const mimeType = mime.lookup(imagePath) || 'application/octet-stream';
      res.set('Content-Type', mimeType);
      res.send(document);
    } catch (error) {
      console.error('Error fetching news image:', error);
      return res.status(500).json({
        status_code: 500,
        message: 'Failed to fetch news image',
        error: 'Internal server error',
      });
    }
  }

  // Get Social Work Image
  async getSocialImage(req, res) { // Renamed from getSocialImage to match method name
    try {
      const { imageId } = req.params;
      const imagePath = path.resolve(__dirname, '../../uploads/socialImages', imageId);
      const document = await this.getDocument(imagePath);

      if (!document) {
        return res.status(404).json({
          status_code: 404,
          message: 'Image not found',
        });
      }

      const mimeType = mime.lookup(imagePath) || 'application/octet-stream';
      res.set('Content-Type', mimeType);
      res.send(document);
    } catch (error) {
      console.error('Error fetching social work image:', error);
      return res.status(500).json({
        status_code: 500,
        message: 'Failed to fetch social work image',
        error: 'Internal server error',
      });
    }
  }

  // Helper method to read a file
  async getDocument(filePath) {
    try {
      const file = await fs.readFile(filePath);
      return file;
    } catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  }
}

module.exports = new TemplateController();