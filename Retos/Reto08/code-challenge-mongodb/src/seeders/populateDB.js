import mongoose from "mongoose";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import Autor from "#models/Autor.js";
import Usuario from "#models/Usuario.js";
import Libro from "#models/Libro.js";
import Resena from "#models/Resena.js";

import dotenv from "dotenv";
dotenv.config();

// Acepta ambas variantes para no romper flujos existentes
const MONGO_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/biblioteca";

// Ruta a populate.json en el MISMO directorio que este archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const POPULATE_PATH = path.resolve(__dirname, "populate.json");

function yearFrom(dateStr) {
  const d = new Date(dateStr);
  return Number.isFinite(d.getUTCFullYear()) ? d.getUTCFullYear() : undefined;
}

async function loadPopulateData() {
  const raw = await fs.readFile(POPULATE_PATH, "utf8");
  const json = JSON.parse(raw);

  // Validaciones básicas para evitar sorpresas
  if (!json.autores || !Array.isArray(json.autores)) throw new Error("populate.json: 'autores' inválido");
  if (!json.usuarios || !Array.isArray(json.usuarios)) throw new Error("populate.json: 'usuarios' inválido");
  if (!json.libros || !Array.isArray(json.libros)) throw new Error("populate.json: 'libros' inválido");
  if (!json.resenas || !Array.isArray(json.resenas)) throw new Error("populate.json: 'resenas' inválido");

  return json;
}

// db:reset
export async function populateDB() {
  const hadConnection = mongoose.connection.readyState === 1;
  if (!hadConnection) {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("✅ Conectado a", MONGO_URI);
  }
  try {
    const data = await loadPopulateData();
    // 1) Limpiar colecciones (idempotente)
    await Promise.all([
      Resena.deleteMany({}),
      Libro.deleteMany({}),
      Usuario.deleteMany({}),
      Autor.deleteMany({}),
    ]);
    console.log("🧹 Colecciones vaciadas");
    // 2) Insertar autores
    const autoresDocs = await Autor.insertMany(
      data.autores.map((a) => ({
        nombre: a.nombre,
        nacionalidad: a.nacionalidad,
        fechaNacimiento: a.fechaNacimiento ? new Date(a.fechaNacimiento) : undefined,
      })),
      { ordered: true }
    );
    const autorByNombre = new Map(autoresDocs.map((a) => [a.nombre, a._id]));
    console.log(`📚 Autores insertados: ${autoresDocs.length}`);
    // 3) Insertar usuarios
    const usuariosDocs = await Usuario.insertMany(
      data.usuarios.map((u) => ({
        nombre: u.nombre,
        email: u.email,
        password: u.password,
      })),
      { ordered: true }
    );
    const usuarioByEmail = new Map(usuariosDocs.map((u) => [u.email, u._id]));
    console.log(`👥 Usuarios insertados: ${usuariosDocs.length}`);
    // 4) Insertar libros (resuelve autor por nombre)
    const librosDocs = [];
    for (const l of data.libros) {
      const autorId = autorByNombre.get(l.autorNombre);
      if (!autorId) throw new Error(`Autor no encontrado para libro "${l.titulo}": ${l.autorNombre}`);

      const anio = l.anio ?? yearFrom(l.fechaPublicacion);
      const doc = await Libro.create({
        titulo: l.titulo,
        genero: l.genero,
        anio,
        autorId,
      });
      librosDocs.push(doc);
    }
    const libroByTitulo = new Map(librosDocs.map((b) => [b.titulo, b._id]));
    console.log(`📖 Libros insertados: ${librosDocs.length}`);
    // 5) Insertar reseñas (resuelve libro por título y usuario por email)
    let reseCount = 0;
    for (const r of data.resenas) {
      const libroId = libroByTitulo.get(r.libroTitulo);
      if (!libroId) throw new Error(`Libro no encontrado para reseña: "${r.libroTitulo}"`);
      const usuarioId = usuarioByEmail.get(r.usuarioEmail);
      if (!usuarioId) throw new Error(`Usuario no encontrado para reseña: "${r.usuarioEmail}"`);

      await Resena.create({
        comentario: r.comentario,
        puntuacion: r.puntuacion,
        fecha: r.fecha ? new Date(r.fecha) : undefined,
        libroId,
        usuarioId,
      });
      reseCount++;
    }
    console.log(`⭐ Reseñas insertadas: ${reseCount}`);

    console.log("✅ Poblado de BD desde populate.json completado.");
    return {
      autores: autoresDocs.length,
      usuarios: usuariosDocs.length,
      libros: librosDocs.length,
      resenas: reseCount,
    };
  }
  finally {
    if (!hadConnection) {
      await mongoose.disconnect();
    }
  }
}

// `npm run seed`
const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isDirectRun) {
  populateDB()
    .then((r) => {
      if (r) console.log("📊 Resultado del seed:", r);
    })
    .catch((err) => {
      console.error("❌ Error al poblar:", err?.stack || err);
      process.exit(1);
    });
}
