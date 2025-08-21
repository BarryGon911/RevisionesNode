// /seeds/listProducts.js
import { connect, disconnect } from "./_db.js";
import Product from "../src/models/product.js";

async function main() {
  await connect();
  const limit = Math.max(parseInt(process.argv.find(a => a.startsWith("--limit="))?.split("=")[1] || "20", 10), 1);
  const page = Math.max(parseInt(process.argv.find(a => a.startsWith("--page="))?.split("=")[1] || "1", 10), 1);
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Product.find().populate("category").skip(skip).limit(limit),
    Product.countDocuments(),
  ]);
  console.log(JSON.stringify({ page, limit, total, items }, null, 2));
  await disconnect();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(async (e)=>{ console.error(e); await disconnect(); process.exit(1); });
}
