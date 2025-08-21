import express from "express";
import rutas from "./src/routes/index.js";
import connectDB from "./src/config/database.js";
import colors from "colors";
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/", rutas);

const port = process.env.SRV_PORT || 3000;

(async () => {
  try {
    await connectDB();
    console.log(colors.bgGrey.black.bold((" 🟢  BD connection OK ")));
  } catch (error) {
    // console.error(colors.bgRed.white.bold("🔴 MongoBD connection failed:", error instanceof Error ? error.message : String(error)));
    console.error(colors.bgRed.white.bold("🔴 MongoDB connection failed", `→ ${error instanceof Error ? error.message : String(error)}`));
    process.exit(1);
  }
})();

app.listen(port, () => {
  // console.log(`Servidor ejecutándose en http://localhost:${port}`));
  console.log(colors.bgMagenta.magenta.italic.bold(` 🚀 🟢 🚀  NodeJS Server running on http://localhost:${port}`));
});