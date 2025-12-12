const dotenv = require("dotenv");
dotenv.config(); // Load .env from backend folder

const connectDB = require("./src/config/db");
const AdminUser = require("./src/models/AdminUser");

(async () => {
  try {
    await connectDB();
    console.log("Database connected!");

    console.log("Seeding admin user...");

    // Remove old admins (optional but ok)
    await AdminUser.deleteMany({});

    // Create new admin
    await AdminUser.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL || "admin@gmail.com",
      password: process.env.ADMIN_PASSWORD || "admin123",
    });

    console.log("Admin created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
})();
