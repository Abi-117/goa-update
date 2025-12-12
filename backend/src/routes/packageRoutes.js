// const express = require("express");
// const {
//   addPackage,
//   getPackages,
//   getPackageById,
//   updatePackage,
//   deletePackage,
// } = require("../controllers/packageController");

// const router = express.Router();

// router.post("/add", addPackage);
// router.get("/all", getPackages);
// router.get("/:id", getPackageById);
// router.put("/update/:id", updatePackage);
// router.delete("/delete/:id", deletePackage);

// module.exports = router;
// routes/packageRoutes.js
const express = require("express");
const upload = require("../middleware/upload"); // Importing the upload middleware
const {
  addPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} = require("../controllers/packageController");

const router = express.Router();

// Add package route using Multer middleware
router.post("/add", upload.single("image"), addPackage);  // Handles file upload

// Other routes
router.get("/all", getPackages);
router.get("/:id", getPackageById);
// Update package route with Multer middleware for file upload
router.put("/update/:id", upload.single("image"), updatePackage);
router.delete("/delete/:id", deletePackage);

module.exports = router;
