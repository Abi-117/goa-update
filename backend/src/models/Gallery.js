//import mongoose from "mongoose";

const mongoose = require("mongoose");
const gallerySchema = new mongoose.Schema(
  {
    image: { type: String, required: true }
  },
  { timestamps: true }
);

//export default mongoose.model("Gallery", gallerySchema);

module.exports = mongoose.model("Gallery", gallerySchema);