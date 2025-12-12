const Package = require("../models/package.model");

// Add Package
// exports.addPackage = async (req, res) => {
//   try {
//     const newPackage = new Package(req.body);
//     const saved = await newPackage.save();

//     res.status(201).json({
//       success: true,
//       message: "Package added successfully",
//       data: saved,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };




// Add Package
exports.addPackage = async (req, res) => {
  try {
    const { title, items, priceText, bottomText } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : ""; // Handle image path

    // Create a new package with the data from req.body and the uploaded image path
    const newPackage = new Package({
      title,
      items: JSON.parse(items), // Assuming items is a JSON array
      priceText,
      bottomText,
      image, // Store image URL in DB
    });

    const saved = await newPackage.save();

    res.status(201).json({
      success: true,
      message: "Package added successfully",
      data: saved,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Packages
exports.getPackages = async (req, res) => {
  try {
    const data = await Package.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Single Package
exports.getPackageById = async (req, res) => {
  try {
    const data = await Package.findById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, message: "Not Found" });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Package
// exports.updatePackage = async (req, res) => {
//   try {
//     const updated = await Package.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updated)
//       return res.status(404).json({ success: false, message: "Not Found" });

//     res.json({
//       success: true,
//       message: "Package updated successfully",
//       data: updated,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


 
// Update Package
exports.updatePackage = async (req, res) => {
  try {
    // Handle image upload first
    const { title, items, priceText, bottomText } = req.body;

    // Ensure 'title' and other fields exist in 'req.body'
    if (!title || !items || !bottomText) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, items, or bottomText",
      });
    }

    // Handle image path if a new image is uploaded
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Only update image if new one is uploaded

    // Prepare the data to be updated
    const updatedData = {
      title,
      items: JSON.parse(items), // Assuming items is a JSON array
      priceText,
      bottomText,
    };

    // Update the image only if a new image is uploaded
    if (image) {
      updatedData.image = image;
    }

    const updated = await Package.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }

    res.json({
      success: true,
      message: "Package updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Delete Package
exports.deletePackage = async (req, res) => {
  try {
    const deleted = await Package.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ success: false, message: "Not Found" });

    res.json({ success: true, message: "Package deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
