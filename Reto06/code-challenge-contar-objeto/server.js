import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { contarPropiedades } from "./controllers/contarController.js";

dotenv.config();

const port = process.env.SRV_PORT || 4000;// Default port if not specified by Hosting Provider when deploying the application
const app = express();

app.use(express.json());

app.post("/contar", contarPropiedades);

app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

app.listen(port, () => {
  console.log(colors.bgMagenta.magenta.italic.bold(`🚀 NodeJS server is running on http://localhost:${port}`));
});
