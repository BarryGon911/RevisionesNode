import express from "express";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Raíz del proyecto (…/ecommerce-api)
const ROOT = path.resolve(__dirname, "..", "..");
// Carpeta donde Newman y el script dejan archivos
const REPORTS_DIR = path.join(ROOT, "reports");

// GET /api/test-reports/report => JSON de Newman
router.get("/report", (req, res) => {
  const p = path.join(REPORTS_DIR, "Ecommerce-api-report.json");
  if (!fs.existsSync(p)) return res.status(404).json({ error: "No existe reports/Ecommerce-api-report.json. Ejecuta los tests." });
  try {
    const json = JSON.parse(fs.readFileSync(p, "utf8"));
    res.json(json);
  }
  catch (e) {
    res.status(500).json({ error: "No se pudo leer el JSON", detail: String(e) });
  }
});

// POST /api/test-reports/run => ejecuta npm run test:api:report
router.post("/run", (req, res) => {
  const cmd = process.platform === "win32" ? "npm.cmd" : "npm";
  const child = spawn(cmd, ["run", "test:api:report"], { cwd: ROOT });

  let out = "";
  child.stdout.on("data", d => (out += d.toString()));
  child.stderr.on("data", d => (out += d.toString()));
  child.on("close", code => res.json({ ok: code === 0, code, log: out }));
});

export default router;