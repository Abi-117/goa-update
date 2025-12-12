const express = require("express");
const multer = require("multer");
const { getFooter, updateFooter } = require("../controllers/footerController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getFooter);
router.put("/update", upload.single("logo"), updateFooter);

module.exports = router;
