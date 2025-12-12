const About = require("../models/aboutModel");

// GET /api/about
exports.getAbout = async (req, res) => {
  try {
    let data = await About.findOne();
    if (!data) {
      // seed default if missing
      data = await About.create({
        heroTitle: "About Booking with GoaYatra",
        heroImage: "",
        companyTitle: "Crafting Extraordinary Journeys Since 2009",
        companyPara1: "Default para 1",
        companyPara2: "Default para 2",
        companyPara3: "Default para 3",
        disclaimers: [
          { title: "Natural Calamity Disclaimer", description: "Default", icon: "alert" },
          { title: "Manmade Disaster Disclaimer", description: "Default", icon: "shield" }
        ],
        services: [{ text: "North Goa Sightseeing (AC Coach Tour)" }],
        serviceBG: "",
        ctaTitle: "Ready to Start Your Journey?",
        ctaSubtitle: "Get Started Today!"
      });
    }
    res.json(data);
  } catch (err) {
    console.error("GET about error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/about/update  (multipart/form-data)
exports.updateAbout = async (req, res) => {
  try {
    const body = req.body;
    let about = await About.findOne();
    if (!about) about = new About();

    // Text fields
    about.heroTitle = body.heroTitle || about.heroTitle;
    about.companyTitle = body.companyTitle || about.companyTitle;
    about.companyPara1 = body.companyPara1 || about.companyPara1;
    about.companyPara2 = body.companyPara2 || about.companyPara2;
    about.companyPara3 = body.companyPara3 || about.companyPara3;
    about.ctaTitle = body.ctaTitle || about.ctaTitle;
    about.ctaSubtitle = body.ctaSubtitle || about.ctaSubtitle;

    // disclaimers and services sent as JSON string -> parse
    if (body.disclaimers) about.disclaimers = JSON.parse(body.disclaimers);
    if (body.services) about.services = JSON.parse(body.services);

    // images (multer stores files in req.files)
    if (req.files && req.files.heroImage) {
      about.heroImage = req.files.heroImage[0].filename;
    }
    if (req.files && req.files.companyImage) {
      about.companyImage = req.files.companyImage[0].filename;
    }
    if (req.files && req.files.serviceBG) {
      about.serviceBG = req.files.serviceBG[0].filename;
    }

    await about.save();
    res.json({ success: true, data: about });
  } catch (err) {
    console.error("UPDATE about error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
