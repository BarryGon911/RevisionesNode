// /seeds/_db.js
import mongoose from "mongoose";
import "dotenv/config";

function buildMongoUri() {
  const base = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const hasDbInUri = /^mongodb(?:\+srv)?:\/\/[^/]+\/[\w-]+/i.test(base);
  if (hasDbInUri) return base; // ya incluye nombre de DB
  const db = process.env.MONGODB_DB || "ecommerce-db";
  return base.replace(/\/$/, "") + "/" + db;
}

export const MONGO_URI = buildMongoUri();

export async function connect() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  await mongoose.connect(MONGO_URI);
  return mongoose.connection;
}

export async function disconnect() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
