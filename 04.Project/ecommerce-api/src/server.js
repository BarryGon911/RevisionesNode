import app from './app.js';
import express from "express";
import colors from "colors";
import connectDB from "./src/config/db.js";

import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.SRV_PORT || 3000;

// await connectDB(process.env.MONGODB_URI);
(async () => {
  try {
    await connectDB();
    console.log("BD connection OK");
  } catch (error) {
    console.error("BD connection failed:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
})();

app.listen(port, () => {
  // console.log(`Servidor ejecutándose en http://localhost:${port}`));
  console.log(colors.bgMagenta.magenta.italic.bold(`🚀🟢🚀 NodeJS Server running on http://localhost:${port}`));
});