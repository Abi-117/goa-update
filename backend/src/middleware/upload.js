// // const multer = require("multer");
// // const path = require("path");

// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, path.join(__dirname, "../uploads"));  // FIXED PATH
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, Date.now() + "-" + file.originalname);
// //   }
// // });

// // const upload = multer({ storage });

// // module.exports = upload;

// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Define the path to the 'uploads' folder, which is outside of `src`
// const uploadDir = path.join(__dirname, "../uploads");

// // Check if the 'uploads' directory exists, if not, create it
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true }); // { recursive: true } ensures parent directories are also created if needed
// }

// // Set the storage engine for Multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Log the directory being used (for debugging)
//     console.log("Saving file to:", uploadDir);
//     cb(null, uploadDir);  // Save the file in the 'uploads' directory
//   },
//   filename: function (req, file, cb) {
//     // Create a unique filename by prefixing with the current timestamp
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// // Create the Multer upload instance with the defined storage
// const upload = multer({ storage });

// module.exports = upload;


const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define the absolute path to the 'uploads' folder at the root of the project
const uploadDir = path.resolve("uploads");  // This will resolve to the 'uploads' folder in the root of your project

// Log the resolved path for debugging purposes
console.log("Resolved Upload Path:", uploadDir);

// Check if the 'uploads' directory exists, if not, create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the folder if it doesn't exist
}

// Set the storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Saving file to:", uploadDir);  // Log where Multer is saving the file
    cb(null, uploadDir);  // Save the file to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);  // Prefix with timestamp to avoid conflicts
  }
});

// Create the Multer upload instance with the defined storage
const upload = multer({ storage });

module.exports = upload;

