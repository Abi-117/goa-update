// import express from "express";
// import multer from "multer";
// import { addImage, getGallery, deleteImage } from "../controllers/galleryController.js";
const express = require("express");
const multer = require("multer");
const {
  addImage,
  getGallery,
  deleteImage,
} = require("../controllers/galleryController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/add", upload.single("image"), addImage);
router.get("/", getGallery);
router.delete("/:id", deleteImage);

//export default router;
module.exports = router;
