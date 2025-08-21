// /seeds/listCounts.js
import { connect, disconnect } from "./_db.js";
import User from "../src/models/user.js";
import Category from "../src/models/category.js";
import Product from "../src/models/product.js";
import Cart from "../src/models/cart.js";
import Order from "../src/models/order.js";

async function main() {
  await connect();
  const [users, categories, products, carts, orders] = await Promise.all([
    User.countDocuments(),
    Category.countDocuments(),
    Product.countDocuments(),
    Cart.countDocuments(),
    Order.countDocuments(),
  ]);
  console.log({ users, categories, products, carts, orders });
  await disconnect();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(async (e)=>{ console.error(e); await disconnect(); process.exit(1); });
}
