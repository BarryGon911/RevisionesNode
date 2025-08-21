// /seeds/showCart.js
import { connect, disconnect } from "./_db.js";
import User from "../src/models/user.js";
import Cart from "../src/models/cart.js";

async function main() {
  await connect();
  const email = (process.argv.find(a => a.startsWith("--email=")) || "").split("=")[1];
  const userId = (process.argv.find(a => a.startsWith("--userId=")) || "").split("=")[1];

  let user = null;
  if (email) user = await User.findOne({ email });
  if (!user && userId) user = await User.findById(userId);
  if (!user) throw new Error("Provide --email or --userId to select a user.");

  const cart = await Cart.findOne({ user: user._id }).populate("items.product");
  console.log(JSON.stringify({ user: { id: user._id, email: user.email, displayName: user.displayName }, cart }, null, 2));
  await disconnect();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(async (e)=>{ console.error(e); await disconnect(); process.exit(1); });
}
