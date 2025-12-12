const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Load .env
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Serve Uploads Folder
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ---------------- ROUTES ----------------

// Auth Route
app.use("/api/auth", require("./routes/auth"));

// Admin Pages Combined Route
app.use("/api/pages", require("./routes/adminPages"));

// Homepage
app.use("/api/homepage", require("./routes/homepage.routes"));

// Footer
app.use("/api/footer", require("./routes/footer.routes"));

// Navbar
app.use("/api/navbar", require("./routes/navbar.routes"));

// About Page
app.use("/api/about", require("./routes/aboutRoutes")); // FIXED

// Services Page
app.use("/api/services", require("./routes/services")); // FIXED

// Gallery
app.use("/api/gallery", require("./routes/galleryRoutes"));

// Packages
app.use("/api/packages", require("./routes/packageRoutes"));

// Contact
app.use("/api/contact", require("./routes/contact.routes"));



// -----------------------------------------


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
