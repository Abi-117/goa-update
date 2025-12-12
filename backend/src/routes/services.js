// import express from "express";
// import multer from "multer";
// import Service from "../models/Service.js";
const express = require("express");
const multer = require("multer");
const Service = require("../models/Service");

const router = express.Router();

// Upload (multer)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Add Service
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newService = new Service({
      title: req.body.title,
      timing: req.body.timing,
      items: JSON.parse(req.body.items),
      image: req.file?.filename || "",
    });

    await newService.save();
    res.json({ message: "Service Added" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all services
router.get("/", async (req, res) => {
  const data = await Service.find();
  res.json(data);
});

// Get single
router.get("/:id", async (req, res) => {
  const data = await Service.findById(req.params.id);
  res.json(data);
});

// Update
router.put("/:id", upload.single("image"), async (req, res) => {
  let updatedData = {
    title: req.body.title,
    timing: req.body.timing,
    items: JSON.parse(req.body.items),
  };

  if (req.file) updatedData.image = req.file.filename;

  await Service.findByIdAndUpdate(req.params.id, updatedData);
  res.json({ message: "Updated Successfully" });
});

// Delete
router.delete("/:id", async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

//export default router;
module.exports = router;
