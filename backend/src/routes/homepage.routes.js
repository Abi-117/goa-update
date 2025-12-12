const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const {
  getHomepage,
  updateHomepage,
} = require("../controllers/homepage.controller");

router.get("/", getHomepage);

router.put(
  "/update",
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "ctaImage", maxCount: 1 },
  ]),
  updateHomepage
);

module.exports = router;
