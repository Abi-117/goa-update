//import mongoose from "mongoose";
const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  heroTitle: String,
  heroImage: String,
  companyTitle: String,
  companyDesc1: String,
  companyDesc2: String,
  companyDesc3: String,
  companyImage: String,
  disclaimer1: String,
  disclaimer2: String,
  services: [String]
});

//export default mongoose.model("AboutPage", aboutSchema);
module.exports = mongoose.model("AboutPage", aboutSchema);
