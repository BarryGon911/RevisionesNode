// postman/open-report.js
// Abre el dashboard http://localhost:PORT/api/test-reports/ui/
// Si la API no está levantada, abre el archivo HTML de Newman en /reports.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Raíz del proyecto (ecommerce-api/)
const ROOT = path.resolve(__dirname, '..');

function readPortFromDotEnv() {
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) return null;
  try {
    const raw = fs.readFileSync(envPath, 'utf8');
    // Busca una línea tipo PORT=4000 (ignora comentarios y espacios)
    const line = raw.split(/\r?\n/).find(l => /^\s*PORT\s*=/.test(l));
    if (!line) return null;
    const val = line.split('=')[1]?.trim().replace(/^"|"$/g, '');
    const n = Number(val);
    return Number.isFinite(n) ? n : (val || null);
  } catch {
    return null;
  }
}

const portFromEnv = process.env.PORT || readPortFromDotEnv();
const PORT = portFromEnv || 4000;

// URLs / rutas
const viewerUrl = `http://localhost:${PORT}/api/test-reports/ui/`;
const reportHtmlPath = path.join(ROOT, 'reports', 'Ecommerce-api-report.html');
const reportHtmlUrl = 'file://' + reportHtmlPath.replace(/\\/g, '/');

// Pequeño fetch con timeout (Node 18+ tiene fetch global)
async function ping(url, ms = 800) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { method: 'GET', signal: ctrl.signal });
    return res.ok || res.status >= 200; // si responde algo, nos sirve
  } catch {
    return false;
  } finally {
    clearTimeout(t);
  }
}

function openInBrowser(url) {
  const isWin = process.platform === 'win32';
  const isMac = process.platform === 'darwin';
  if (isWin) {
    // start "" "url"
    spawn('cmd', ['/c', 'start', '', url], { detached: true, stdio: 'ignore' });
  } else if (isMac) {
    spawn('open', [url], { detached: true, stdio: 'ignore' });
  } else {
    spawn('xdg-open', [url], { detached: true, stdio: 'ignore' });
  }
}

(async () => {
  // Primero intentamos el dashboard (requiere que tu API esté levantada)
  const ok = await ping(viewerUrl);
  if (ok) {
    console.log(`\n🔗 Dashboard listo:\n   ${viewerUrl}\n(Abriendo navegador predeterminado...)\n`);
    openInBrowser(viewerUrl);
    return;
  }

  // Fallback: abrir el HTML local de Newman
  if (fs.existsSync(reportHtmlPath)) {
    console.log(`\n🔗 Reporte HTML local:\n   ${reportHtmlUrl}\n(Abriendo navegador predeterminado...)\n`);
    openInBrowser(reportHtmlUrl);
  } else {
    console.log('\n⚠️ No encontré el dashboard ni el HTML de reportes.\n' +
                '   Asegúrate de que la API esté corriendo o que existan archivos en /reports.\n');
  }
})();
