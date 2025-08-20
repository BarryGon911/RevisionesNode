import express from "express";
import router from "./router";
import connectDB from "./config/db";
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();

const app = express();
connectDB();

// Leer datos del formulario
app.use(express.json());
app.use("/", router);

export default app;