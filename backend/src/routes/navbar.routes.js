const express = require("express");
const multer = require("multer");
const {
  getNavbar,
  updateNavbar,
  uploadLogo,
} = require("../controllers/navbar.controller");

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.get("/", getNavbar);
router.put("/", updateNavbar);
router.post("/logo", upload.single("logo"), uploadLogo);

module.exports = router;
