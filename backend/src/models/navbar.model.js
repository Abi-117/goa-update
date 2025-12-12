const mongoose = require("mongoose");

const NavbarSchema = new mongoose.Schema({
  logo: String,
  links: [
    {
      name: String,
      path: String, // <- use `path` because frontend expects `path`
    },
  ],
});

module.exports = mongoose.model("Navbar", NavbarSchema);
