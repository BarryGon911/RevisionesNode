import mongoose from "mongoose";
import connectDB from "#config/db.js";
import User from "#models/User.js";
import Category from "#models/Category.js";
import Product from "#models/Product.js";
import Cart from "#models/Cart.js";
import Order from "#models/Order.js";

import dotenv from "dotenv";
dotenv.config();

const isProd = (process.env.NODE_ENV || "").toLowerCase() === "production";
const argv = process.argv.slice(2);

const hasFlag = (f) => argv.includes(f);
const getFlagValue = (prefix) => {
  const found = argv.find(a => a.startsWith(prefix + "="));
  return found ? found.split("=").slice(1).join("=").trim() : null;
};

if (isProd && !hasFlag("--force")) {
  console.error("Seguridad: NODE_ENV=production. Agrega --force si realmente deseas limpiar.");
  process.exit(1);
}

const dropDb = hasFlag("--drop-db");
const onlyArg = getFlagValue("--only");
const exceptArg = getFlagValue("--except");
const doAll = hasFlag("--all") || (!onlyArg && !exceptArg && !dropDb);

const modelMap = {
  users: User,
  categories: Category,
  products: Product,
  carts: Cart,
  orders: Order,
};

function parseList(v) {
  return (v || "")
    .split(",")
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);
}

function resolveTargets() {
  const allKeys = Object.keys(modelMap);
  if (dropDb) return []; // no se usa
  if (onlyArg) {
    const list = parseList(onlyArg);
    const invalid = list.filter(k => !modelMap[k]);
    if (invalid.length) {
      throw new Error(`Colección(es) inválida(s) en --only: ${invalid.join(", ")}`);
    }
    return list;
  }
  let targets = doAll ? allKeys : allKeys;
  if (exceptArg) {
    const excl = parseList(exceptArg);
    const invalid = excl.filter(k => !modelMap[k]);
    if (invalid.length) {
      throw new Error(`Colección(es) inválida(s) en --except: ${invalid.join(", ")}`);
    }
    targets = targets.filter(k => !excl.includes(k));
  }
  return targets;
}

async function main() {
  await connectDB();

  if (dropDb) {
    const dbName = mongoose.connection.name;
    await mongoose.connection.db.dropDatabase();
    console.log(`dropDatabase() ejecutado. BD "${dbName}" eliminada.`);
    await mongoose.disconnect();
    process.exit(0);
  }

  const targets = resolveTargets();
  if (!targets.length) {
    console.log("No hay colecciones objetivo (revisa tus flags).");
    await mongoose.disconnect();
    process.exit(0);
  }

  // Conteo previo
  const before = {};
  for (const key of targets) {
    const Model = modelMap[key];
    before[key] = await Model.countDocuments();
  }

  // Borrado
  for (const key of targets) {
    const Model = modelMap[key];
    await Model.deleteMany({});
    console.log(`Limpieza completa de "${key}".`);
  }

  // Conteo posterior
  const after = {};
  for (const key of targets) {
    const Model = modelMap[key];
    after[key] = await Model.countDocuments();
  }

  console.log("Resumen:");
  for (const key of targets) {
    console.log(`   ${key.padEnd(11, " ")}: ${String(before[key]).padStart(4)} → ${String(after[key]).padStart(4)}`);
  }
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("Error en unseed:", err);
  mongoose.disconnect().finally(() => process.exit(1));
});