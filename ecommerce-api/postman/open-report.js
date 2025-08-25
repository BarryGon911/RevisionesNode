// postman/open-report.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

function readPortFromDotEnv() {
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) return null;
  try {
    const raw = fs.readFileSync(envPath, 'utf8');
    const line = raw.split(/\r?\n/).find(l => /^\s*PORT\s*=/.test(l));
    if (!line) return null;
    const val = line.split('=')[1]?.trim().replace(/^"|"$/g, '');
    const n = Number(val);
    return Number.isFinite(n) ? n : (val || null);
  } catch { return null; }
}

const PORT = process.env.PORT || readPortFromDotEnv() || 4000;
const dashboardUrl = `http://localhost:${PORT}/api/test-reports/ui/`;
const httpHtmlUrl  = `http://localhost:${PORT}/api/test-reports/reports/Ecommerce-api-report.html`;
const fileHtmlPath = path.join(ROOT, 'reports', 'Ecommerce-api-report.html');
const fileHtmlUrl  = 'file://' + fileHtmlPath.replace(/\\/g, '/');

async function ping(url, ms = 800) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try { const res = await fetch(url, { signal: ctrl.signal }); return res.ok || res.status >= 200; }
  catch { return false; }
  finally { clearTimeout(t); }
}

function open(url) {
  const isWin = process.platform === 'win32';
  const isMac = process.platform === 'darwin';
  if (isWin) spawn('cmd', ['/c', 'start', '', url], { detached: true, stdio: 'ignore' });
  else if (isMac) spawn('open', [url], { detached: true, stdio: 'ignore' });
  else spawn('xdg-open', [url], { detached: true, stdio: 'ignore' });
}

(async () => {
  if (await ping(dashboardUrl)) {
    console.log(`\n🔗 Dashboard: ${dashboardUrl}`);
    open(dashboardUrl);
    // abrir también el HTML por HTTP (sin caché gracias a app.js)
    console.log(`🔗 Reporte HTML (HTTP): ${httpHtmlUrl}\n`);
    open(httpHtmlUrl);
    return;
  }
  // Fallback a file:// si la API no está arriba
  if (fs.existsSync(fileHtmlPath)) {
    console.log(`\n🔗 Reporte HTML (file): ${fileHtmlUrl}\n`);
    open(fileHtmlUrl);
  } else {
    console.log('\n⚠️ No encontré el HTML. Corre primero los tests.\n');
  }
})();