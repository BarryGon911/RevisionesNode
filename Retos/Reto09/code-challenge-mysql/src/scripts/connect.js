import { connectDB } from "../config/database.js";

import "dotenv/config";
dotenv.config();

const args = new Set(process.argv.slice(2));
const sync = args.has("--sync");
const alter = args.has("--alter");
const force = args.has("--force");

connectDB({ sync, alter, force }).then(() => {
  console.log("Conexión finalizada.");
  process.exit(0);
}).catch((e) => {
  console.error("Error en app:connect:", e);
  process.exit(1);
});