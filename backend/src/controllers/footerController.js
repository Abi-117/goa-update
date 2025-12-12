const Footer = require("../models/footer.model");

const getFooter = async (req, res) => {
  try {
    let data = await Footer.findOne();

    if (!data) {
      data = await Footer.create({
        logo: "",
        address: "",
        phone: "",
        email: "",
        facebook: "",
        instagram: "",
        youtube: "",
        links: {
          home: "/",
          about: "/about",
          packages: "/packages",
          services: "/services",
          contact: "/contact",
        },
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateFooter = async (req, res) => {
  try {
    const file = req.file ? req.file.filename : undefined;

    const {
      address,
      phone,
      email,
      facebook,
      instagram,
      youtube,
      home,
      about,
      packages,
      services,
      contact,
    } = req.body;

    const updated = await Footer.findOneAndUpdate(
      {},
      {
        ...(file && { logo: `/uploads/${file}` }),
        address,
        phone,
        email,
        facebook,
        instagram,
        youtube,
        links: {
          home,
          about,
          packages,
          services,
          contact,
        },
      },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getFooter, updateFooter };
