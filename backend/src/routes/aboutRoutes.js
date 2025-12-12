// import express from "express";
// import multer from "multer";
// import AboutPage from "../models/aboutModel.js";
const express = require("express");
const multer = require("multer");
const AboutPage = require("../models/aboutModel");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });


// GET ABOUT DATA
router.get("/", async (req, res) => {
  const data = await AboutPage.findOne();
  res.json(data || {});
});

// UPDATE ABOUT DATA
router.put(
  "/update",
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "companyImage", maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      heroTitle,
      companyTitle,
      companyDesc1,
      companyDesc2,
      companyDesc3,
      disclaimer1,
      disclaimer2,
      services
    } = req.body;

    let data = await AboutPage.findOne();

    if (!data) data = new AboutPage();

    data.heroTitle = heroTitle;
    data.companyTitle = companyTitle;
    data.companyDesc1 = companyDesc1;
    data.companyDesc2 = companyDesc2;
    data.companyDesc3 = companyDesc3;
    data.disclaimer1 = disclaimer1;
    data.disclaimer2 = disclaimer2;
    data.services = JSON.parse(services); // array

    if (req.files.heroImage)
      data.heroImage = "/uploads/" + req.files.heroImage[0].filename;

    if (req.files.companyImage)
      data.companyImage = "/uploads/" + req.files.companyImage[0].filename;

    await data.save();
    res.json({ success: true, message: "About page updated" });
  }
);

//export default router;
module.exports = router;
