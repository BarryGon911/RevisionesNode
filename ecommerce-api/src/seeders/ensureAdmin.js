import mongoose from "mongoose";
import { connectDB } from "#config/db.js";
import User from "#models/User.js";

import dotenv from "dotenv";
dotenv.config();

(async () => {
  try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "password123";

    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = await User.create({
        name: "Admin",
        email: adminEmail,
        password: adminPassword,
        role: "admin",
      });
      console.log("✓ Admin creado:", adminEmail);
    }
    else if (admin.role !== "admin") {
      admin.role = "admin";
      await admin.save();
      console.log("✓ Usuario promovido a admin:", adminEmail);
    }
    else {
      console.log("✓ Admin existente:", adminEmail);
    }

    await mongoose.connection.close();
    process.exit(0);
  }
  catch (err) {
    console.error("ensureAdmin error:", err);
    process.exit(1);
  }
})();