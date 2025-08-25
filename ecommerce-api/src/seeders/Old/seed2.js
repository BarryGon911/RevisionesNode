import connectDB from "#config/db.js";
import mongoose from "mongoose";
import User from "#models/User.js";
import Category from "#models/Category.js";
import Product from "#models/Product.js";
import Cart from "#models/Cart.js";
import Order from "#models/Order.js";

import dotenv from "dotenv";
dotenv.config();

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

async function seed() {
  await connectDB();
  
  await Promise.all([
    User.deleteMany({}),
    Category.deleteMany({}),
    Product.deleteMany({}),
    Cart.deleteMany({}),
    Order.deleteMany({})
  ]);
  
  const usersData = [
    { name: "Admin", email: "admin@example.com", password: "password123", role: "admin" },
    { name: "Ana", email: "ana@example.com", password: "password123" },
    { name: "Luis", email: "luis@example.com", password: "password123" },
    { name: "María", email: "maria@example.com", password: "password123" },
    { name: "Carlos", email: "carlos@example.com", password: "password123" },
    { name: "Sofía", email: "sofia@example.com", password: "password123" },
    { name: "Diego", email: "diego@example.com", password: "password123" },
    { name: "Lucía", email: "lucia@example.com", password: "password123" },
    { name: "Jorge", email: "jorge@example.com", password: "password123" },
    { name: "Elena", email: "elena@example.com", password: "password123" },
    { name: "Pablo", email: "pablo@example.com", password: "password123" },
    { name: "Marta", email: "marta@example.com", password: "password123" }
  ];
  
  const users = await User.insertMany(usersData);
  const nonAdminUsers = users.filter(u => u.role !== "admin");

  const categories = await Category.insertMany(
    Array.from({ length: 10 }).map((_, i) => ({
      name: `Categoría ${(i + 1).toString().padStart(2, "0")}`,
      description: `Descripción de la categoría ${(i + 1).toString().padStart(2, "0")}`
    }))
  );
  
  const products = await Product.insertMany(
    Array.from({ length: 20 }).map((_, i) => ({
      name: `Producto ${(i + 1).toString().padStart(2, "0")}`,
      description: `Descripción del producto ${(i + 1).toString().padStart(2, "0")}`,
      price: Math.round(100 + Math.random() * 900),
      stock: 10 + Math.floor(Math.random() * 40),
      category: pick(categories)._id
    }))
  );
  
  const carts = await Cart.insertMany(
    nonAdminUsers.slice(0, 10).map(u => {
      const itemCount = 1 + Math.floor(Math.random() * 3); // 1..3 items
      const items = Array.from({ length: itemCount }).map(() => {
        const p = pick(products);
        const quantity = 1 + Math.floor(Math.random() * 3); // 1..3
        return { product: p._id, quantity };
      });
      return { user: u._id, items };
    })
  );
  
  const ordersData = [];
  for (let i = 0; i < 10; i++) {
    const user = pick(nonAdminUsers);
    const itemCount = 1 + Math.floor(Math.random() * 3);
    const items = [];
    let total = 0;
    for (let j = 0; j < itemCount; j++) {
      const p = pick(products);
      const quantity = 1 + Math.floor(Math.random() * 2);
      items.push({ product: p._id, quantity, price: p.price });
      total += p.price * quantity;
    }
    ordersData.push({ user: user._id, items, total });
  }
  await Order.insertMany(ordersData);

  console.log("Seed completo");
  console.log({
    users: await User.countDocuments(),
    categories: await Category.countDocuments(),
    products: await Product.countDocuments(),
    carts: await Cart.countDocuments(),
    orders: await Order.countDocuments(),
  });
  
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "password123";
  let admin = await User.findOne({ email: adminEmail });
  
  if (!admin) {
    admin = await User.create({
    name: "Admin",
    email: adminEmail,
    password: adminPassword,
    role: "admin"
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

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seed falló", e);
  process.exit(1);
});