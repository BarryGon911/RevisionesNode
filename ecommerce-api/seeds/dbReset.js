// /seeds/dbReset.js
// ⚠️ PELIGRO: elimina todas las colecciones de la base configurada.
import { connect, disconnect } from "./_db.js";
import mongoose from "mongoose";

async function main() {
  const force = process.argv.includes("--force");
  if (!force) {
    console.error("Refused. Run with --force to drop the database.");
    process.exit(1);
  }
  const conn = await connect();
  const dbName = conn.name;
  await mongoose.connection.dropDatabase();
  console.log(`Database dropped: ${dbName}`);
  await disconnect();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(async (e)=>{ console.error(e); await disconnect(); process.exit(1); });
}
