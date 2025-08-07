import express from "express";
import registroRoutes from "./routes/registro.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.SRV_PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", registroRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});