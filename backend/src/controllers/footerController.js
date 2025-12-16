const Footer = require("../models/footer.model");

// Default links (VERY IMPORTANT)
const DEFAULT_LINKS = {
  home: "/",
  about: "/about",
  packages: "/packages",
  services: "/services",
  contact: "/contact",
};

/**
 * GET FOOTER
 */
exports.getFooter = async (req, res) => {
  try {
    let footer = await Footer.findOne();

    // If footer not exists, create default one
    if (!footer) {
      footer = new Footer({
        address: "",
        phone: "",
        email: "",
        facebook: "",
        instagram: "",
        youtube: "",
        links: DEFAULT_LINKS,
      });
      await footer.save();
    }

    // 🔥 FORCE links always
    if (!footer.links) {
      footer.links = DEFAULT_LINKS;
      await footer.save();
    }

    res.json(footer);
  } catch (err) {
    console.error("Get footer error:", err);
    res.status(500).json({ message: "Failed to fetch footer" });
  }
};

/**
 * UPDATE FOOTER
 */
exports.updateFooter = async (req, res) => {
  try {
    let footer = await Footer.findOne();

    if (!footer) {
      footer = new Footer();
    }

    const {
      address,
      phone,
      email,
      facebook,
      instagram,
      youtube,
    } = req.body;

    // ✅ Parse links safely
    let links = DEFAULT_LINKS;
    if (req.body.links) {
      try {
        links = JSON.parse(req.body.links);
      } catch {
        links = DEFAULT_LINKS;
      }
    }

    // Assign fields
    footer.address = address ?? footer.address;
    footer.phone = phone ?? footer.phone;
    footer.email = email ?? footer.email;
    footer.facebook = facebook ?? footer.facebook;
    footer.instagram = instagram ?? footer.instagram;
    footer.youtube = youtube ?? footer.youtube;
    footer.links = links;

    // Handle logo upload
    if (req.file) {
      footer.logo = req.file.filename;
    }

    await footer.save();

    res.json({
      success: true,
      message: "Footer updated successfully",
      data: footer,
    });
  } catch (err) {
    console.error("Update footer error:", err);
    res.status(500).json({ message: "Failed to update footer" });
  }
};
