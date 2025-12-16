const express = require("express");
const multer = require("multer");
const { getFooter, updateFooter } = require("../controllers/footerController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", getFooter);
router.put("/update", upload.single("logo"), updateFooter);

module.exports = router;
