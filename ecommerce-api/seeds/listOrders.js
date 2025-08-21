// /seeds/listOrders.js
import { connect, disconnect } from "./_db.js";
import User from "../src/models/user.js";
import Order from "../src/models/order.js";

async function main() {
  await connect();
  const email = (process.argv.find(a => a.startsWith("--email=")) || "").split("=")[1];
  const userId = (process.argv.find(a => a.startsWith("--userId=")) || "").split("=")[1];

  let userFilter = {};
  if (email || userId) {
    let user = null;
    if (email) user = await User.findOne({ email });
    if (!user && userId) user = await User.findById(userId);
    if (!user) throw new Error("User not found for provided --email/--userId.");
    userFilter = { user: user._id };
  }

  const orders = await Order.find(userFilter).populate("items.product").sort({ createdAt: -1 });
  console.log(JSON.stringify({ count: orders.length, orders }, null, 2));
  await disconnect();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(async (e)=>{ console.error(e); await disconnect(); process.exit(1); });
}
