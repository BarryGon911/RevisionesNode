import express from "express";
import { exec } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const router = express.Router();

function assertDevAndAuth(req, res, next) {
  if ((process.env.NODE_ENV || "development") === "production") {
    return res.status(403).json({ error: "Admin DB endpoints disabled in production" });
  }
  const requiredKey = process.env.ADMIN_KEY;
  if (requiredKey) {
    const got = req.get("x-admin-key") || "";
    if (got !== requiredKey) {
      return res.status(401).json({ error: "Invalid admin key" });
    }
  }
  next();
}

function runNodeScript(relativeToSeedersDir) {
  return new Promise((resolve, reject) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const projectRoot = path.resolve(__dirname, "../.."); // desde src/routes -> src -> raíz
    const scriptPath = path.join(projectRoot, "src", "seeders", relativeToSeedersDir);
    exec(`node "${scriptPath}"`, { cwd: projectRoot }, (err, stdout, stderr) => {
      if (err) return reject({ err, stdout, stderr });
      resolve({ stdout, stderr });
    });
  });
}

router.post("/db/drop", assertDevAndAuth, async (req, res) => {
  try {
    const { stdout, stderr } = await runNodeScript("dropDatabase.js");
    res.json({ ok: true, action: "drop", stdout, stderr });
  } catch (e) {
    res.status(500).json({
      ok: false,
      action: "drop",
      error: e?.err?.message || String(e),
      stdout: e?.stdout,
      stderr: e?.stderr,
    });
  }
});

router.post("/db/seed", assertDevAndAuth, async (req, res) => {
  try {
    const { stdout, stderr } = await runNodeScript("populateDB.js");
    res.json({ ok: true, action: "seed", stdout, stderr });
  } catch (e) {
    res.status(500).json({
      ok: false,
      action: "seed",
      error: e?.err?.message || String(e),
      stdout: e?.stdout,
      stderr: e?.stderr,
    });
  }
});

// POST /admin/db/reset  (drop + seed)
router.post("/db/reset", assertDevAndAuth, async (req, res) => {
  try {
    const { stdout, stderr } = await runNodeScript("resetAndSeed.js");
    res.json({ ok: true, action: "reset", stdout, stderr });
  } catch (e) {
    res.status(500).json({
      ok: false,
      action: "reset",
      error: e?.err?.message || String(e),
      stdout: e?.stdout,
      stderr: e?.stderr,
    });
  }
});

export default router;