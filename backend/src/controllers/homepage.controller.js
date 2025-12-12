const Homepage = require("../models/homepage.model");

exports.getHomepage = async (req, res) => {
  try {
    const data = await Homepage.findOne();
    res.json(data || {});
  } catch (error) {
    console.error("GET Homepage Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateHomepage = async (req, res) => {
  try {
    let homepage = await Homepage.findOne();
    if (!homepage) homepage = new Homepage();

    homepage.heroTitle = req.body.heroTitle;
    homepage.heroSubtitle = req.body.heroSubtitle;
    homepage.ctaTitle = req.body.ctaTitle;
    homepage.ctaSubtitle = req.body.ctaSubtitle;

    if (req.body.offers) {
      homepage.offers = JSON.parse(req.body.offers);
    }

    if (req.files.heroImage) {
      homepage.heroImage = req.files.heroImage[0].filename;
    }

    if (req.files.ctaImage) {
      homepage.ctaImage = req.files.ctaImage[0].filename;
    }

    await homepage.save();

    res.json({
      success: true,
      message: "Homepage updated",
      data: homepage,
    });
  } catch (error) {
    console.error("UPDATE Homepage Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
