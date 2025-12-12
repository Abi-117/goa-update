//import Gallery from "../models/Gallery.js";

const Gallery = require("../models/Gallery");
 const addImage = async (req, res) => {
  try {
    const image = req.file.filename;

    const newImg = await Gallery.create({ image });

    res.json({ success: true, image: newImg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getGallery = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 const deleteImage = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//export { addImage, getGallery, deleteImage }; --- IGNORE ---
module.exports = { addImage, getGallery, deleteImage };