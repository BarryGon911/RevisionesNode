// /seeds/seedCarts.js
import { connect, disconnect } from "./_db.js";
import Cart from "../src/models/cart.js";
import User from "../src/models/user.js";
import Product from "../src/models/product.js";

export async function seedCarts({ drop = false } = {}) {
  await connect();

  if (drop) {
    await Cart.deleteMany({});
  }

  const users = await User.find({ role: "customer" }).sort({ createdAt: 1 }).limit(5);
  const products = await Product.find().sort({ createdAt: 1 }).limit(3);
  if (!users.length || products.length < 2) {
    throw new Error("Need users and at least 2 products to seed carts.");
  }

  const results = [];
  for (const u of users) {
    let cart = await Cart.findOne({ user: u._id });
    if (!cart) {
      cart = await Cart.create({ user: u._id, items: [] });
    }
    const toEnsure = [
      { product: products[0]._id, quantity: 1 },
      { product: products[1]._id, quantity: 2 },
    ];
    for (const item of toEnsure) {
      const idx = cart.items.findIndex(i => i.product.toString() === String(item.product));
      if (idx === -1) cart.items.push(item);
      else cart.items[idx].quantity = item.quantity;
    }
    await cart.save();
    results.push(cart);
  }

  if (drop) await disconnect();

  return { carts: results, count: results.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedCarts({ drop: process.argv.includes("--clean") || process.argv.includes("--drop") })
    .then(({ count }) => { console.log(`Carts ready: ${count}`); return disconnect(); })
    .catch(async (err) => { console.error(err); await disconnect(); process.exit(1); });
}
