const Navbar = require("../models/navbar.model");

// GET /api/navbar
exports.getNavbar = async (req, res) => {
  try {
    let navbar = await Navbar.findOne();

    if (!navbar) {
      navbar = await Navbar.create({
        logo: "",
        links: [
          { name: "HOME", path: "/" },
          { name: "ABOUT", path: "/about" },
          { name: "PACKAGE", path: "/packages" },
          { name: "SERVICES", path: "/services" },
          { name: "GALLERY", path: "/gallery" },
          { name: "CONTACT", path: "/contact" },
        ],
      });
    }

    res.json(navbar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/navbar
exports.updateNavbar = async (req, res) => {
  try {
    const { links } = req.body;

    const updated = await Navbar.findOneAndUpdate(
      {},
      { links },
      { new: true, upsert: true }
    );

    res.json({ logo: updated.logo });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/navbar/logo
exports.uploadLogo = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded" });

    const updated = await Navbar.findOneAndUpdate(
      {},
      { logo: req.file.filename },
      { new: true, upsert: true }
    );

    res.json({ message: "Logo uploaded", logo: updated.logo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
