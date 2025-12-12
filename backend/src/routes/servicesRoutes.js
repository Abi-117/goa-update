const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getServices,
  createService,
} = require("../controllers/services.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.get("/", getServices);
router.post("/", upload.single("image"), createService);

module.exports = router;
