// const mongoose = require("mongoose");

// const footerSchema = new mongoose.Schema({
//   logo: { type: String, default: "" },
//   address: { type: String, default: "" },
//   phone: { type: String, default: "" },
//   email: { type: String, default: "" },

//   facebook: { type: String, default: "" },
//   instagram: { type: String, default: "" },
//   youtube: { type: String, default: "" },

//   links: {
//     home: { type: String, default: "/" },
//     about: { type: String, default: "/about" },
//     packages: { type: String, default: "/packages" },
//     services: { type: String, default: "/services" },
//     contact: { type: String, default: "/contact" },
//   },
// });

// module.exports = mongoose.model("Footer", footerSchema);
const mongoose = require("mongoose");

const FooterSchema = new mongoose.Schema({
  logo: String,
  address: String,
  phone: String,
  email: String,
  facebook: String,
  instagram: String,
  youtube: String,
  links: {
    home: String,
    about: String,
    packages: String,
    services: String,
    contact: String,
  },
});

module.exports = mongoose.model("Footer", FooterSchema);
