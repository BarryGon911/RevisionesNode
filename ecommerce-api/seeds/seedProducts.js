// /seeds/seedProducts.js
import { connect, disconnect } from "./_db.js";
import Product from "../src/models/product.js";
import Category from "../src/models/category.js";

export async function seedProducts({ drop = false } = {}) {
  await connect();

  if (drop) {
    await Product.deleteMany({});
  }

  const categories = await Category.find().sort({ name: 1 });
  if (!categories.length) {
    throw new Error("No categories found. Seed categories first.");
  }

  const toCreate = [];
  for (let i = 1; i <= 10; i++) {
    const name = `Product ${i}`;
    const exists = await Product.findOne({ name });
    if (!exists) {
      const category = categories[(i - 1) % categories.length];
      toCreate.push(Product.create({
        name,
        price: 10 * i,
        stock: 50 + i,
        category: category._id,
        description: `${name} description`,
      }));
    }
  }
  const created = await Promise.all(toCreate);
  const all = await Product.find().populate("category").sort({ createdAt: 1 });

  if (drop) await disconnect();

  return { products: all, created: created.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedProducts({ drop: process.argv.includes("--clean") || process.argv.includes("--drop") })
    .then(({ products, created }) => {
      console.log(`Products ready: total=${products.length}, created=${created}`);
      return disconnect();
    })
    .catch(async (err) => { console.error(err); await disconnect(); process.exit(1); });
}
