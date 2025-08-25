// postman/run-tests-and-log.js
// Pipeline: env-from-dotenv -> verificación de colección -> newman (html/json)
// -> generateCompliance -> (opcional) open-report
// Con log acumulado y rotación (5MB o 7 días).
// Fallback: si la colección está vacía y se ejecuta con --open, abre el último
// reporte disponible (dashboard/HTML) antes de abortar.

import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import newman from 'newman';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const REPORTS_DIR = path.join(ROOT, 'reports');
const LOGS_DIR = path.join(REPORTS_DIR, 'logs');
const LOG_FILE = path.join(LOGS_DIR, 'reports.log');

const MAX_BYTES = 5 * 1024 * 1024;                 // 5 MB
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;        // 7 días

const COLLECTION = path.join(ROOT, 'postman', 'Ecommerce.baseUrl.fullrunner.max.postman_collection.json');
const ENV_FROM_DOTENV = path.join(ROOT, 'postman', 'env-from-dotenv.js');
const ENV_RUNTIME = path.join(REPORTS_DIR, 'env.runtime.json');
const HTML_OUT = path.join(REPORTS_DIR, 'Ecommerce-api-report.html');
const JSON_OUT = path.join(REPORTS_DIR, 'Ecommerce-api-report.json');
const COMPLIANCE_SCRIPT = path.join(ROOT, 'postman', 'generateCompliance.js');
const OPEN_SCRIPT = path.join(ROOT, 'postman', 'open-report.js');

const args = process.argv.slice(2);
const SHOULD_OPEN = args.includes('--open');

// ───────── helpers de log + rotación ─────────
function ensureDirs() {
  if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });
  if (!fs.existsSync(LOGS_DIR)) fs.mkdirSync(LOGS_DIR, { recursive: true });
}
function tsForName(d = new Date()) {
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}
function nowStamp() {
  const d = new Date(); const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}
function shouldRotate() {
  try {
    if (!fs.existsSync(LOG_FILE)) return false;
    const st = fs.statSync(LOG_FILE);
    return st.size >= MAX_BYTES || (Date.now() - st.mtimeMs) >= MAX_AGE_MS;
  } catch { return false; }
}
function rotateLog() {
  if (!fs.existsSync(LOG_FILE)) return;
  let dest = path.join(LOGS_DIR, `reports-${tsForName()}.log`);
  let i = 1;
  while (fs.existsSync(dest)) dest = path.join(LOGS_DIR, `reports-${tsForName()}-${i++}.log`);
  try { fs.renameSync(LOG_FILE, dest); }
  catch { try { fs.copyFileSync(LOG_FILE, dest); fs.truncateSync(LOG_FILE, 0); } catch {} }
}
function appendLog(lines) {
  ensureDirs();
  if (shouldRotate()) rotateLog();
  const text = Array.isArray(lines) ? lines.join(os.EOL) : String(lines);
  fs.appendFileSync(LOG_FILE, text + os.EOL, 'utf8');
}
function header(title) {
  appendLog([
    '',
    '────────────────────────────────────────────────────────────────',
    `# ${title}  @ ${nowStamp()}`,
    `node: ${process.version} | os: ${os.platform()}-${os.arch()} | pid: ${process.pid}`
  ]);
}
function runNode(file, fileArgs = []) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [file, ...fileArgs], { cwd: ROOT });
    let out = '', err = '';
    child.stdout.on('data', d => out += d.toString());
    child.stderr.on('data', d => err += d.toString());
    child.on('close', code => {
      if (out.trim()) appendLog(out.trim());
      if (err.trim()) appendLog(err.trim());
      resolve({ code, out, err });
    });
  });
}

// ───────── verificación de colección ─────────
function safeReadJSON(file) {
  try {
    if (!fs.existsSync(file)) return { ok: false, err: 'NO_EXISTS' };
    const raw = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(raw);
    return { ok: true, json, raw };
  } catch (e) {
    return { ok: false, err: String(e) };
  }
}
function countRequests(node) {
  if (!node) return 0;
  let c = 0;
  if (Array.isArray(node)) return node.reduce((acc, n) => acc + countRequests(n), 0);
  if (node.request && node.request.method) c += 1;
  if (Array.isArray(node.item)) c += countRequests(node.item);
  return c;
}

// ───────── ejecución ─────────
(async function main() {
  header('Ecommerce API — Test Run');

  // 1) env-from-dotenv
  appendLog('▶ Paso 1: Generando environment runtime (postman/env-from-dotenv.js)…');
  const envRun = await runNode(ENV_FROM_DOTENV);
  if (envRun.code !== 0) appendLog(`❌ env-from-dotenv terminó con code=${envRun.code}`);

  let baseUrl = '(desconocido)';
  try {
    if (fs.existsSync(ENV_RUNTIME)) {
      const envObj = JSON.parse(fs.readFileSync(ENV_RUNTIME, 'utf8'));
      const v = (envObj.values || []).find(x => x.key === 'baseUrl');
      if (v && v.value) baseUrl = v.value;
    }
  } catch (e) {
    appendLog(`⚠️ No se pudo leer env.runtime.json: ${String(e)}`);
  }
  appendLog(`➡️ baseUrl en runtime: ${baseUrl}`);

  // 1.5) Verificar colección ANTES de correr Newman
  appendLog(`▶ Verificando colección: ${COLLECTION}`);
  const col = safeReadJSON(COLLECTION);
  if (!col.ok) {
    appendLog([
      `❌ No pude leer la colección.`,
      `   Motivo: ${col.err}`,
      `   Revisa la ruta o el nombre del archivo.`
    ]);
    // Fallback: abre dashboard/HTML si se pidió --open
    if (SHOULD_OPEN && fs.existsSync(OPEN_SCRIPT)) {
      appendLog('↪ Intentando abrir el último reporte disponible (aunque no haya nueva corrida)…');
      await runNode(OPEN_SCRIPT, []);
    }
    appendLog('✖ Abortando ejecución para evitar reporte en ceros.');
    process.exitCode = 1;
    return;
  }
  const totalReqs = countRequests(col.json.item);
  appendLog(`ℹ️ Requests detectados en colección: ${totalReqs}`);
  if (totalReqs === 0) {
    appendLog([
      '❌ La colección no contiene requests ejecutables.',
      '   Causas típicas:',
      '   - JSON quedó mal al editar y se perdieron los items',
      '   - Pegaste sólo un item y borraste el array superior',
      '   - Todos los folders/items quedaron vacíos',
      '   Soluciones:',
      '   - Abre el JSON y verifica que exista "item": [ ... ] con requests dentro',
      '   - Importa la colección en Postman y revisa que veas todas las carpetas',
      '   - Vuelve a pegar el contenido completo de la colección (no sólo un item)',
    ]);
    // Fallback: abre dashboard/HTML si se pidió --open
    if (SHOULD_OPEN && fs.existsSync(OPEN_SCRIPT)) {
      appendLog('↪ Intentando abrir el último reporte disponible (aunque no haya nueva corrida)…');
      await runNode(OPEN_SCRIPT, []);
    }
    appendLog('✖ Abortando ejecución para evitar reporte en ceros.');
    process.exitCode = 1;
    return;
  }

  // 2) Newman
  appendLog('▶ Paso 2: Ejecutando Newman…');
  let summaryForExit = null;
  try {
    await new Promise((resolve, reject) => {
      newman.run(
        {
          collection: COLLECTION,
          environment: ENV_RUNTIME,
          reporters: ['json', 'htmlextra'],
          reporter: {
            json: { export: JSON_OUT },
            htmlextra: {
              export: HTML_OUT,
              title: 'Ecommerce API Test Report',
              browserTitle: 'Ecommerce API — Newman Report'
            }
          },
          delayRequest: 200
        },
        (err, summary) => {
          summaryForExit = summary;
          if (err) return reject(err);

          const s = summary.run.stats;
          appendLog([
            '— Newman stats —',
            `iterations: ${s.iterations.total}`,
            `requests:   ${s.requests.total}`,
            `scripts:    test=${s.testScripts.total} | pre=${s.prerequestScripts.total}`,
            `assertions: ${s.assertions.total} (failed=${s.assertions.failed})`,
            `html: ${HTML_OUT}`,
            `json: ${JSON_OUT}`
          ]);

          if (summary.run.failures && summary.run.failures.length) {
            appendLog(`✗ Failures (${summary.run.failures.length}):`);
            summary.run.failures.forEach((f, i) => {
              const itemName = f.source?.name || f.source || f.error?.name || '(sin nombre)';
              const msg = f.error?.message || f.error?.test || JSON.stringify(f.error);
              appendLog(`${String(i + 1).padStart(2, '0')}. ${itemName} -> ${msg}`);
            });
          } else {
            appendLog('✓ Sin failures en assertions.');
          }
          resolve();
        }
      );
    });
  } catch (e) {
    appendLog(`❌ Error ejecutando Newman: ${String(e)}`);
  }

  // 3) Compliance
  appendLog('▶ Paso 3: Generando Compliance-Postman.md …');
  const compRun = await runNode(COMPLIANCE_SCRIPT, [JSON_OUT]);
  if (compRun.code !== 0) appendLog(`❌ generateCompliance salió con code=${compRun.code}`);
  else appendLog('✓ Compliance generado.');

  // 4) (opcional) abrir navegador
  if (SHOULD_OPEN && fs.existsSync(OPEN_SCRIPT)) {
    appendLog('▶ Paso 4: Abriendo reporte en navegador…');
    await runNode(OPEN_SCRIPT, []);
  }

  appendLog('✔️ Fin del run.');
  appendLog('────────────────────────────────────────────────────────────────');

  const failed = summaryForExit?.run?.stats?.assertions?.failed ?? 0;
  process.exitCode = failed > 0 ? 1 : 0;
})();


// ÉSTA OPCIÓN, MEDIO SIRVE
// // postman/run-tests-and-log.js
// // Pipeline: env-from-dotenv -> newman (html/json) -> generateCompliance -> (opcional) open-report
// // Además: log acumulado con ROTACIÓN por tamaño (5 MB) y/o antigüedad (7 días).

// import fs from 'fs';
// import path from 'path';
// import os from 'os';
// import { fileURLToPath } from 'url';
// import { spawn } from 'child_process';
// import newman from 'newman';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const ROOT = path.resolve(__dirname, '..');            // …/ecommerce-api
// const REPORTS_DIR = path.join(ROOT, 'reports');
// const LOGS_DIR = path.join(REPORTS_DIR, 'logs');
// const LOG_FILE = path.join(LOGS_DIR, 'reports.log');

// // Umbrales de rotación
// const MAX_BYTES   = 5 * 1024 * 1024;            // 5 MB
// const MAX_AGE_DAYS = 7;
// const MAX_AGE_MS   = MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

// // Entradas/Salidas
// const COLLECTION        = path.join(ROOT, 'postman', 'Ecommerce.baseUrl.fullrunner.max.postman_collection.json');
// const ENV_FROM_DOTENV   = path.join(ROOT, 'postman', 'env-from-dotenv.js');
// const ENV_RUNTIME       = path.join(REPORTS_DIR, 'env.runtime.json');
// const HTML_OUT          = path.join(REPORTS_DIR, 'Ecommerce-api-report.html');
// const JSON_OUT          = path.join(REPORTS_DIR, 'Ecommerce-api-report.json');
// const COMPLIANCE_SCRIPT = path.join(ROOT, 'postman', 'generateCompliance.js');
// const OPEN_SCRIPT       = path.join(ROOT, 'postman', 'open-report.js');

// const args = process.argv.slice(2);
// const SHOULD_OPEN = args.includes('--open');

// // Helpers de log y rotación
// function ensureDirs() {
//   if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });
//   if (!fs.existsSync(LOGS_DIR)) fs.mkdirSync(LOGS_DIR, { recursive: true });
// }
// function tsForName(d = new Date()) {
//   const p = n => String(n).padStart(2, '0');
//   return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
// }
// function nowStamp() {
//   const d = new Date();
//   const p = n => String(n).padStart(2, '0');
//   return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
// }
// function shouldRotate() {
//   try {
//     if (!fs.existsSync(LOG_FILE)) return false;
//     const st = fs.statSync(LOG_FILE);
//     const tooBig = st.size >= MAX_BYTES;
//     const tooOld = (Date.now() - st.mtimeMs) >= MAX_AGE_MS;
//     return tooBig || tooOld;
//   } catch {
//     return false;
//   }
// }
// function rotateLog() {
//   if (!fs.existsSync(LOG_FILE)) return;
//   const baseName = `reports-${tsForName()}.log`;
//   let dest = path.join(LOGS_DIR, baseName);
//   let i = 1;
//   while (fs.existsSync(dest)) {
//     dest = path.join(LOGS_DIR, `reports-${tsForName()}-${i++}.log`);
//   }
//   try {
//     fs.renameSync(LOG_FILE, dest);
//   } catch (e) {
//     try { fs.copyFileSync(LOG_FILE, dest); fs.truncateSync(LOG_FILE, 0); } catch(_) {}
//   }
// }
// function appendLog(lines) {
//   ensureDirs();
//   if (shouldRotate()) rotateLog();
//   const text = Array.isArray(lines) ? lines.join(os.EOL) : String(lines);
//   fs.appendFileSync(LOG_FILE, text + os.EOL, 'utf8');
// }
// function header(title) {
//   const ts = nowStamp();
//   appendLog([
//     '',
//     '────────────────────────────────────────────────────────────────',
//     `# ${title}  @ ${ts}`,
//     `node: ${process.version} | os: ${os.platform()}-${os.arch()} | pid: ${process.pid}`
//   ]);
// }
// function runNode(file, fileArgs = []) {
//   return new Promise((resolve) => {
//     const child = spawn(process.execPath, [file, ...fileArgs], { cwd: ROOT });
//     let out = '', err = '';
//     child.stdout.on('data', d => out += d.toString());
//     child.stderr.on('data', d => err += d.toString());
//     child.on('close', code => {
//       if (out.trim()) appendLog(out.trim());
//       if (err.trim()) appendLog(err.trim());
//       resolve({ code, out, err });
//     });
//   });
// }

// // Ejecución
// (async function main() {
//   header('Ecommerce API — Test Run');

//   // 1) env-from-dotenv
//   appendLog('▶ Paso 1: Generando environment runtime (postman/env-from-dotenv.js)…');
//   const envRun = await runNode(ENV_FROM_DOTENV);
//   if (envRun.code !== 0) appendLog(`❌ env-from-dotenv terminó con code=${envRun.code}`);

//   // baseUrl para el log
//   let baseUrl = '(desconocido)';
//   try {
//     if (fs.existsSync(ENV_RUNTIME)) {
//       const envObj = JSON.parse(fs.readFileSync(ENV_RUNTIME, 'utf8'));
//       const v = (envObj.values || []).find(x => x.key === 'baseUrl');
//       if (v && v.value) baseUrl = v.value;
//     }
//   } catch (e) {
//     appendLog(`⚠️ No se pudo leer env.runtime.json: ${String(e)}`);
//   }
//   appendLog(`➡️ baseUrl en runtime: ${baseUrl}`);

//   // 2) Newman
//   appendLog('▶ Paso 2: Ejecutando Newman…');
//   let summaryForExit = null;
//   try {
//     await new Promise((resolve, reject) => {
//       newman.run(
//         {
//           collection: COLLECTION,
//           environment: ENV_RUNTIME,
//           reporters: ['json', 'htmlextra'],
//           reporter: {
//             json: { export: JSON_OUT },
//             htmlextra: {
//               export: HTML_OUT,
//               title: 'Ecommerce API Test Report',
//               browserTitle: 'Ecommerce API — Newman Report'
//             }
//           },
//           delayRequest: 200
//         },
//         (err, summary) => {
//           summaryForExit = summary;
//           if (err) return reject(err);

//           const s = summary.run.stats;
//           appendLog([
//             '— Newman stats —',
//             `iterations: ${s.iterations.total}`,
//             `requests:   ${s.requests.total}`,
//             `scripts:    test=${s.testScripts.total} | pre=${s.prerequestScripts.total}`,
//             `assertions: ${s.assertions.total} (failed=${s.assertions.failed})`,
//             `html: ${HTML_OUT}`,
//             `json: ${JSON_OUT}`
//           ]);

//           if (summary.run.failures && summary.run.failures.length) {
//             appendLog(`✗ Failures (${summary.run.failures.length}):`);
//             summary.run.failures.forEach((f, i) => {
//               const itemName = f.source?.name || f.source || f.error?.name || '(sin nombre)';
//               const msg = f.error?.message || f.error?.test || JSON.stringify(f.error);
//               appendLog(`${String(i + 1).padStart(2, '0')}. ${itemName} -> ${msg}`);
//             });
//           } else {
//             appendLog('✓ Sin failures en assertions.');
//           }

//           resolve();
//         }
//       );
//     });
//   } catch (e) {
//     appendLog(`❌ Error ejecutando Newman: ${String(e)}`);
//   }

//   // 3) Compliance
//   appendLog('▶ Paso 3: Generando Compliance-Postman.md …');
//   const compRun = await runNode(COMPLIANCE_SCRIPT, [JSON_OUT]);
//   if (compRun.code !== 0) appendLog(`❌ generateCompliance salió con code=${compRun.code}`);
//   else appendLog('✓ Compliance generado.');

//   // 4) (opcional) abrir navegador
//   if (SHOULD_OPEN && fs.existsSync(OPEN_SCRIPT)) {
//     appendLog('▶ Paso 4: Abriendo reporte en navegador…');
//     await runNode(OPEN_SCRIPT, []);
//   }

//   appendLog('✔️ Fin del run.');
//   appendLog('────────────────────────────────────────────────────────────────');

//   // Exit code 1 si hubo assertions fallidas
//   const failed = summaryForExit?.run?.stats?.assertions?.failed ?? 0;
//   process.exitCode = failed > 0 ? 1 : 0;
// })();