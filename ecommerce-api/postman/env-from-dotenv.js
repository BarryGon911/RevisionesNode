// postman/env-from-dotenv.js
// Lee .env (PORT / HOST / PROTOCOL) y genera reports/env.runtime.json
// para que newman use el baseUrl correcto: http://HOST:PORT/api

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..'); // carpeta del proyecto

const ENV_FILE = path.join(ROOT, '.env');
const BASE_ENV = path.join(ROOT, 'postman', 'Ecommerce.baseUrl.environment.json');
const OUT_DIR  = path.join(ROOT, 'reports');
const OUT_ENV  = path.join(OUT_DIR, 'env.runtime.json');

function parseDotEnv(filePath) {
  const out = {};
  if (!fs.existsSync(filePath)) return out;
  const raw = fs.readFileSync(filePath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i.exec(line);
    if (!m) continue;
    const key = m[1];
    let val = m[2].replace(/^['"]|['"]$/g, '').trim();
    // ignora comentarios inline
    val = val.replace(/\s+#.*$/, '').trim();
    out[key] = val;
  }
  return out;
}

function buildBaseUrl(env) {
  const PROTOCOL = (env.PROTOCOL || 'http').replace(/:\/\//, '');
  const HOST = env.HOST || 'localhost';
  const PORT = env.PORT || '4000';
  return `${PROTOCOL}://${HOST}:${PORT}/api`;
}

function readPostmanEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    // Crea uno mínimo si no existe
    return {
      id: 'runtime',
      name: 'runtime',
      values: [
        { key: 'baseUrl', value: 'http://localhost:4000/api', type: 'default' },
        { key: 'token',   value: '', type: 'default' }
      ]
    };
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.error('❌ No pude leer el environment base:', e.message);
    process.exit(1);
  }
}

function writeRuntimeEnv(envObj) {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_ENV, JSON.stringify(envObj, null, 2), 'utf8');
  console.log('✅ Environment runtime escrito en:', OUT_ENV);
}

(function main() {
  const dotenv = parseDotEnv(ENV_FILE);
  const baseUrl = buildBaseUrl(dotenv);
  console.log('➡️  baseUrl detectado desde .env:', baseUrl);

  const envObj = readPostmanEnv(BASE_ENV);

  // reemplaza / añade la variable baseUrl
  let found = false;
  envObj.values = (envObj.values || []).map(v => {
    if (v.key === 'baseUrl') {
      found = true;
      return { ...v, value: baseUrl };
    }
    return v;
  });
  if (!found) envObj.values.push({ key: 'baseUrl', value: baseUrl, type: 'default' });

  writeRuntimeEnv(envObj);
})();