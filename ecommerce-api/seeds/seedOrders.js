// /seeds/seedOrders.js
import { connect, disconnect } from "./_db.js";
import Order from "../src/models/order.js";
import User from "../src/models/user.js";
import Product from "../src/models/product.js";

export async function seedOrders({ drop = false } = {}) {
  await connect();

  if (drop) {
    await Order.deleteMany({});
  }

  const users = await User.find({ role: { $in: ["customer", "admin"] } }).sort({ createdAt: 1 }).limit(5);
  const [p1, p2] = await Product.find().sort({ createdAt: 1 }).limit(2);
  if (!users.length || !p1 || !p2) {
    throw new Error("Need users and at least 2 products to seed orders.");
  }

  for (const u of users) {
    const items = [
      { product: p1._id, quantity: 1, price: p1.price },
      { product: p2._id, quantity: 2, price: p2.price },
    ];
    const total = items.reduce((sum, it) => sum + it.quantity * it.price, 0);
    await Order.create({ user: u._id, items, total, status: "pending" });
  }

  if (drop) await disconnect();

  const count = await Order.countDocuments();
  return { count };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedOrders({ drop: process.argv.includes("--clean") || process.argv.includes("--drop") })
    .then(({ count }) => { console.log(`Orders ready: total=${count}`); return disconnect(); })
    .catch(async (err) => { console.error(err); await disconnect(); process.exit(1); });
}
