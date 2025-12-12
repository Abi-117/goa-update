const mongoose = require("mongoose");

const homepageSchema = new mongoose.Schema({
  heroTitle: String,
  heroSubtitle: String,
  heroImage: String,
  offers: [String],
  ctaImage: String,
  ctaTitle: String,
  ctaSubtitle: String,
});

module.exports = mongoose.model("Homepage", homepageSchema);