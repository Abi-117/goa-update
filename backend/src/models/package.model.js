// backend/models/Package.js
const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },

  items: { type: [String], default: [] },

  image: { type: String, default: "" }, // upload or URL

  priceText: { type: String },

  bottomText: { type: String, default: "" }, // ⭐ Added Bottom Field

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Package", PackageSchema);
