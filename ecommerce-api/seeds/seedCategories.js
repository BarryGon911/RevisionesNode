// /seeds/seedCategories.js
import { connect, disconnect } from "./_db.js";
import Category from "../src/models/category.js";

export async function seedCategories({ drop = false } = {}) {
  await connect();

  if (drop) {
    await Category.deleteMany({});
  }

  const names = Array.from({ length: 10 }, (_, i) => `Category ${i + 1}`);
  const upserts = [];
  for (const name of names) {
    const exists = await Category.findOne({ name });
    if (!exists) {
      upserts.push(Category.create({ name, description: `${name} description` }));
    }
  }
  const created = await Promise.all(upserts);
  const all = await Category.find().sort({ name: 1 });

  if (drop) await disconnect();

  return { categories: all, created: created.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedCategories({ drop: process.argv.includes("--clean") || process.argv.includes("--drop") })
    .then(({ categories, created }) => {
      console.log(`Categories ready: total=${categories.length}, created=${created}`);
      return disconnect();
    })
    .catch(async (err) => { console.error(err); await disconnect(); process.exit(1); });
}
