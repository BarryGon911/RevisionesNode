import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

const {
    MONGODB_URI,
    DB_NAME,
    COLLECTIONS,
} = process.env;

if (!MONGODB_URI || !DB_NAME) {
  console.erroror("Faltan variables de entorno MONGODB_URI o DB_NAME en .env");
  process.exit(1);
}

const DRY_RUN = process.argv.includes("--dry-run");
const OUT_DIR = path.join(process.cwd(), "scripts", "out");
const ts = new Date().toISOString().replace(/[:.]/g, "-");

function normalizeIndex(idx) {
    const {
        key,
        unique = false,
        sparse = false,
        collation,
        partialFilterExpression,
        expireAfterSeconds,
    } = idx;

    const sortedKey = Object.fromEntries(Object.entries(key).sort(([a],[b]) => a.localeCompare(b)));

    const normCollation = collation
    ? Object.fromEntries(Object.entries(collation).sort(([a],[b]) => a.localeCompare(b)))
    : undefined;

    const normPartial = partialFilterExpression
    ? Object.fromEntries(Object.entries(partialFilterExpression).sort(([a],[b]) => a.localeCompare(b)))
    : undefined;

    return JSON.stringify({
        key: sortedKey,
        unique,
        sparse,
        collation: normCollation,
        partialFilterExpression: normPartial,
        expireAfterSeconds: expireAfterSeconds ?? undefined,
    });
}

async function main() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  try {
    let collections = [];
    if (COLLECTIONS && COLLECTlONS !== "") {
      collections = COLLECTIONS.split(",").map(s => s.trim()).filter(Boolean);
    }
    else {
        const infos = await db.listCollections().toArray();
        collections = infos.map(i => i.name);
    }
    if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

    const backup = {};
    const plan = [];

    for (const collName of collections) {
        const coll = db.collection(collName);
        let indexes = [];
        try {
            indexes = await coll.indexes();
        }
        catch (e) {
            console.warn(`No se pudieron leer índices de ${collName}: ${e.message}`);
            continue;
        }
        
        backup[collName] = indexes;
        
        const seen = new Map();
        
        for (const idx of indexes) {
            if (idx.name === "_id_") continue;
            const sig = normalizeIndex(idx);
            
            if (!seen.has(sig)) {
                seen.set(sig, [idx]);
            }
            else {
                seen.get(sig).push(idx);
            }
        }

        for (const [sig, group] of seen.entries()) {
            if (group.length <= 1) continue;
            
            let keep = group[0];
            
            if (group.some(i => i.unique)) {
                keep = group.find(i => i.unique) || group[0];
            }

        const toDrop = group.filter(i => i.name !== keep.name);
            for (const idx of toDrop) {
                plan.push({ collection: collName, keep: keep.name, drop: idx.name, key: idx.key });
            }
        }
    }

    const backupPath = path.join(OUT_DIR, `indexes-backup-${DB_NAME}-${ts}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));
    console.log(`Backup de índices guardado en: ${backupPath}`);

    if (plan.length === 0) {
        console.log("No se detectaron índices duplicados. Ninguna acción a realizar.");
        return;
    }

    console.log("Plan de limpieza (duplicados detectados):");
    for (const step of plan) {
        console.log(` - ${step.collection}: conservar "${step.keep}" y eliminar duplicado "${step.drop}" (key=${JSON.stringify(step.key)})`);
    }

    if (DRY_RUN) {
      console.log("Modo dry-run: no se eliminará nada. Revisa el plan arriba.");
      return;
    }

    for (const step of plan) {
        const coll = db.collection(step.collection);
        try {
            await coll.dropIndex(step.drop);
            console.log(`${step.collection}: Eliminado índice "${step.drop}"`);
        }
        catch (e) {
            console.error(`Error al eliminar "${step.drop}" en ${step.collection}: ${e.message}`);
        }
    }

    console.log("Limpieza completada.");
    console.log("Sugerencia: tras ajustar tus esquemas Mongoose, ejecuta una vez el arranque para que se (re)creen índices necesarios.");
  }
  finally {
    await client.close();
  }
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});