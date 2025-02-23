const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define upload directories
const profileFolder = "./uploads/profileImages";
const bannerFolder = "./uploads/bannerImages";

// Ensure folders exist
[profileFolder, bannerFolder].forEach((folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
});

// Configure storage for profile and banner images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profilePicture") {
      cb(null, profileFolder);
    } else if (file.fieldname === "bannerImage") {
      cb(null, bannerFolder);
    } else {
      cb(new Error("Invalid field name"), null);
    }
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generate 4 random numbers
    const extension = path.extname(file.originalname);
    const newFilename = `${timestamp}${randomNumbers}${extension}`;
    cb(null, newFilename);
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (jpeg, jpg, png)."));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
