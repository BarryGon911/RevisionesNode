// /seeds/seeds.js
// Orquestador de seeding idempotente.
// Uso:
//   node -r dotenv/config seeds/seeds.js           # seed sin limpiar colecciones
//   node -r dotenv/config seeds/seeds.js --clean   # limpia y reseed
import { connect, disconnect } from "./_db.js";
import User from "../src/models/user.js";
import Category from "../src/models/category.js";
import Product from "../src/models/product.js";
import Cart from "../src/models/cart.js";
import Order from "../src/models/order.js";
import { seedUsers } from "./seedUsers.js";
import { seedCategories } from "./seedCategories.js";
import { seedProducts } from "./seedProducts.js";
import { seedCarts } from "./seedCarts.js";
import { seedOrders } from "./seedOrders.js";

const shouldClean = process.argv.includes("--clean") || process.argv.includes("--drop");

async function cleanAll() {
  await Promise.all([
    User.deleteMany({}),
    Category.deleteMany({}),
    Product.deleteMany({}),
    Cart.deleteMany({}),
    Order.deleteMany({}),
  ]);
}

async function main() {
  await connect();
  if (shouldClean) {
    console.log("Cleaning collections...");
    await cleanAll();
  }

  const usersRes = await seedUsers();
  const categoriesRes = await seedCategories();
  const productsRes = await seedProducts();
  const cartsRes = await seedCarts();
  const ordersRes = await seedOrders();

  console.log("Seeding summary:");
  console.log({
    users: (usersRes.customers?.length || 0) + (usersRes.admin ? 1 : 0),
    categories: categoriesRes.categories?.length,
    products: productsRes.products?.length,
    carts: cartsRes.count,
    orders: ordersRes.count,
  });

  await disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await disconnect();
  process.exit(1);
});
