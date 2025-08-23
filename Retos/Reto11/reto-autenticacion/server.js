import express from "express";
import authRoutes from "./routes/auth.js";
import perfilRoutes from "./routes/perfil.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.SRV_PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", perfilRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "🔑 Servidor de autenticación JWT funcionando",
    endpoints: {
      login: "POST /api/auth/login",
      perfil: "GET /api/perfil",
    },
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
  });
});

app.listen(port, () => {
  console.log(`NodeJS Server running on http://localhost:${port}`);
});