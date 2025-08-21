import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../src/models/user.js";
import Category from "../src/models/category.js";
import Product from "../src/models/product.js";
import Order from "../src/models/order.js";

dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const db = process.env.MONGODB_DB || "ecommerce-db";

const run = async () => {
  await mongoose.connect(`${uri}/${db}`);
  console.log("Connected for seeding");

  await Promise.all([User.deleteMany({}), Category.deleteMany({}), Product.deleteMany({}), Order.deleteMany({})]);

  const admin = await User.create({ displayName: "Admin", email: "admin@example.com", password: await bcrypt.hash("Admin123!",10), role: "admin" });
  const customers = await User.insertMany(
    Array.from({length:9}).map((_,i)=>({ displayName:`User ${i+1}`, email:`user${i+1}@example.com`, password: bcrypt.hashSync("Password1!",10), role:"customer" }))
  );

  const categories = await Category.insertMany(
    Array.from({length:10}).map((_,i)=>({ name: `Category ${i+1}`, description: `Category ${i+1} description` }))
  );

  const products = await Product.insertMany(
    Array.from({length:10}).map((_,i)=>({ 
      name:`Product ${i+1}`,
      price: (i+1)*10,
      stock: 100,
      category: categories[i % categories.length]._id,
      description: `Product ${i+1} description`
    }))
  );

  // create 10 simple orders for first 5 users
  const someUsers = [admin, ...customers.slice(0,4)];
  for (const u of someUsers) {
    const items = [
      { product: products[0]._id, quantity: 1, price: products[0].price },
      { product: products[1]._id, quantity: 2, price: products[1].price }
    ];
    const total = items.reduce((s,i)=>s+i.quantity*i.price,0);
    await Order.create({ user: u._id, items, total, status: "pending" });
  }

  console.log("Seeding done");
  await mongoose.disconnect();
};

run().catch(e=>{ console.error(e); process.exit(1); });
