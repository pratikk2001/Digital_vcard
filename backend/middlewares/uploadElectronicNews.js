const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define the folder where you want to store product images
const uploadFolder = "./uploads/electronicImages";

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });a
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder); // Directory to store product images
  },
  filename: function (req, file, cb) {  
    const timestamp = Date.now();
    const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generate 4 random numbers
    const extension = path.extname(file.originalname);
    const newFilename = `${timestamp}${randomNumbers}${extension}`;
    cb(null, newFilename); // Use current timestamp and random numbers as filename
  },
});

const upload = multer({
  storage: storage,

  fileFilter: function (req, file, cb) {
    console.log(`File received: ${file.originalname}, Size: ${file.size}`);
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      console.log("File accepted");
      cb(null, true);
    } else {
      console.log("File rejected");
      cb(new Error("Only images are allowed (jpeg, jpg, png)."));
    }
  },
  
});


module.exports = upload;
