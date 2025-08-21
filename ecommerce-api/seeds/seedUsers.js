// /seeds/seedUsers.js
import bcrypt from "bcrypt";
import { connect, disconnect } from "./_db.js";
import User from "../src/models/user.js";

export async function seedUsers({ drop = false } = {}) {
  await connect();

  if (drop) {
    await User.deleteMany({});
  }

  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
  const adminPass = process.env.SEED_ADMIN_PASSWORD || "Admin123!";

  const existingAdmin = await User.findOne({ email: adminEmail }).select("+password");
  const admin =
    existingAdmin ||
    await User.create({
      displayName: "Admin",
      email: adminEmail,
      password: await bcrypt.hash(adminPass, 10),
      role: "admin",
    });

  const customers = [];
  for (let i = 1; i <= 9; i++) {
    const email = `user${i}@example.com`;
    const exists = await User.findOne({ email }).select("_id");
    if (exists) { customers.push(exists); continue; }
    const u = await User.create({
      displayName: `User ${i}`,
      email,
      password: await bcrypt.hash("Password1!", 10),
      role: "customer",
    });
    customers.push(u);
  }

  if (drop) await disconnect();

  return { admin, customers };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedUsers({ drop: process.argv.includes("--clean") || process.argv.includes("--drop") })
    .then(({ admin, customers }) => {
      console.log("Users ready:", { admin: admin.email, customers: customers.length });
      return disconnect();
    })
    .catch(async (err) => {
      console.error(err);
      await disconnect();
      process.exit(1);
    });
}
