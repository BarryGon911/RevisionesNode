import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.SRV_PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Servidor de Node ejecutándose en el en puerto: ${port}`);
});