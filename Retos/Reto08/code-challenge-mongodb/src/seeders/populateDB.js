/**
 * Script para poblar MongoDB con datos reales (basado en poblar_db.sql).
 * Ejecuta: node populateDB.js
 * Requiere: MONGO_URI en .env ó usará mongodb://localhost:27017/biblioteca
 */
import "dotenv/config.js";
import mongoose from "mongoose";
import Autor from "../models/\1";
import Usuario from "../models/\1";
import Libro from "../models/\1";
import Resena from "../models/\1";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/biblioteca";

const autoresSQL = [
  { id: 1,  nombre: "Gabriel García Márquez", nacionalidad: "Colombiana", fechaNacimiento: "1927-03-06" },
  { id: 2,  nombre: "Isabel Allende",         nacionalidad: "Chilena",    fechaNacimiento: "1942-08-02" },
  { id: 3,  nombre: "Jorge Luis Borges",      nacionalidad: "Argentina",  fechaNacimiento: "1899-08-24" },
  { id: 4,  nombre: "Mario Vargas Llosa",     nacionalidad: "Peruana",    fechaNacimiento: "1936-03-28" },
  { id: 5,  nombre: "Julio Cortázar",         nacionalidad: "Argentina",  fechaNacimiento: "1914-08-26" },
  { id: 6,  nombre: "Carlos Fuentes",         nacionalidad: "Mexicana",   fechaNacimiento: "1928-11-11" },
  { id: 7,  nombre: "Laura Esquivel",         nacionalidad: "Mexicana",   fechaNacimiento: "1950-09-30" },
  { id: 8,  nombre: "Juan Rulfo",             nacionalidad: "Mexicana",   fechaNacimiento: "1917-05-16" },
  { id: 9,  nombre: "Rosario Castellanos",    nacionalidad: "Mexicana",   fechaNacimiento: "1925-05-25" },
  { id: 10, nombre: "Elena Poniatowska",      nacionalidad: "Mexicana",   fechaNacimiento: "1932-05-19" },
  { id: 11, nombre: "Arturo Pérez-Reverte",   nacionalidad: "Española",   fechaNacimiento: "1951-11-25" },
  { id: 12, nombre: "Javier Marías",          nacionalidad: "Española",   fechaNacimiento: "1951-09-20" },
  { id: 13, nombre: "Carlos Ruiz Zafón",      nacionalidad: "Española",   fechaNacimiento: "1964-09-25" },
  { id: 14, nombre: "Miguel de Cervantes",    nacionalidad: "Española",   fechaNacimiento: "1547-09-29" },
  { id: 15, nombre: "Federico García Lorca",  nacionalidad: "Española",   fechaNacimiento: "1898-06-05" },
  { id: 16, nombre: "Ana María Matute",       nacionalidad: "Española",   fechaNacimiento: "1925-07-26" },
  { id: 17, nombre: "Eduardo Galeano",        nacionalidad: "Uruguaya",   fechaNacimiento: "1940-09-03" },
  { id: 18, nombre: "Roberto Bolaño",         nacionalidad: "Chilena",    fechaNacimiento: "1953-04-28" },
  { id: 19, nombre: "Clarice Lispector",      nacionalidad: "Brasileña",  fechaNacimiento: "1920-12-10" },
  { id: 20, nombre: "Pablo Neruda",           nacionalidad: "Chilena",    fechaNacimiento: "1904-07-12" },
];

const librosSQL = [
  { id: 1,  titulo: "Cien Años de Soledad",                 genero: "Realismo Mágico", fechaPublicacion: "1967-05-30", autorId: 1 },
  { id: 2,  titulo: "El Amor en los Tiempos del Cólera",    genero: "Romance",         fechaPublicacion: "1985-09-05", autorId: 1 },
  { id: 3,  titulo: "La Casa de los Espíritus",             genero: "Realismo Mágico", fechaPublicacion: "1982-01-01", autorId: 2 },
  { id: 4,  titulo: "Ficciones",                            genero: "Cuentos",         fechaPublicacion: "1944-01-01", autorId: 3 },
  { id: 5,  titulo: "La Ciudad y los Perros",               genero: "Ficción",         fechaPublicacion: "1963-01-01", autorId: 4 },
  { id: 6,  titulo: "Rayuela",                              genero: "Ficción",         fechaPublicacion: "1963-01-01", autorId: 5 },
  { id: 7,  titulo: "La Muerte de Artemio Cruz",            genero: "Ficción",         fechaPublicacion: "1962-01-01", autorId: 6 },
  { id: 8,  titulo: "Como Agua para Chocolate",             genero: "Romance",         fechaPublicacion: "1989-01-01", autorId: 7 },
  { id: 9,  titulo: "Pedro Páramo",                         genero: "Ficción",         fechaPublicacion: "1955-01-01", autorId: 8 },
  { id: 10, titulo: "Balún Canán",                          genero: "Ficción",         fechaPublicacion: "1957-01-01", autorId: 9 },
  { id: 11, titulo: "La Noche de Tlatelolco",               genero: "Crónica",         fechaPublicacion: "1971-01-01", autorId: 10 },
  { id: 12, titulo: "La Reina del Sur",                     genero: "Novela Negra",    fechaPublicacion: "2002-01-01", autorId: 11 },
  { id: 13, titulo: "Corazón Tan Blanco",                   genero: "Ficción",         fechaPublicacion: "1992-01-01", autorId: 12 },
  { id: 14, titulo: "La Sombra del Viento",                 genero: "Misterio",        fechaPublicacion: "2001-01-01", autorId: 13 },
  { id: 15, titulo: "Don Quijote de la Mancha",             genero: "Clásico",         fechaPublicacion: "1605-01-16", autorId: 14 },
  { id: 16, titulo: "Bodas de Sangre",                      genero: "Teatro",          fechaPublicacion: "1933-01-01", autorId: 15 },
  { id: 17, titulo: "Primera Memoria",                      genero: "Ficción",         fechaPublicacion: "1959-01-01", autorId: 16 },
  { id: 18, titulo: "Las Venas Abiertas de América Latina", genero: "Ensayo",          fechaPublicacion: "1971-01-01", autorId: 17 },
  { id: 19, titulo: "Los Detectives Salvajes",              genero: "Ficción",         fechaPublicacion: "1998-01-01", autorId: 18 },
  { id: 20, titulo: "La Hora de la Estrella",               genero: "Ficción",         fechaPublicacion: "1977-01-01", autorId: 19 },
];

const usuariosSQL = [
  { id: 1,  nombre: "Juan Camaney Shingón",  email: "jcamaney@mail.com",   password: "misuperpassword1" },
  { id: 2,  nombre: "Mauricio Garcés Elú",   email: "mgarces@mail.com",    password: "misuperpassword2" },
  { id: 3,  nombre: "Lupita González",       email: "lgonzalez@mail.com",  password: "pwd3" },
  { id: 4,  nombre: "Carlos Méndez",         email: "cmendez@mail.com",    password: "pwd4" },
  { id: 5,  nombre: "Ana Rodríguez",         email: "arodriguez@mail.com", password: "pwd5" },
  { id: 6,  nombre: "Pedro Hernández",       email: "phernandez@mail.com", password: "pwd6" },
  { id: 7,  nombre: "María Fernanda Ruiz",   email: "mfruiz@mail.com",     password: "pwd7" },
  { id: 8,  nombre: "Jorge Castillo",        email: "jcastillo@mail.com",  password: "pwd8" },
  { id: 9,  nombre: "Sofía Morales",         email: "smorales@mail.com",   password: "pwd9" },
  { id: 10, nombre: "Ricardo Pérez",         email: "rperez@mail.com",     password: "pwd10" },
  { id: 11, nombre: "Daniela López",         email: "dlopez@mail.com",     password: "pwd11" },
  { id: 12, nombre: "Arturo Sánchez",        email: "asanchez@mail.com",   password: "pwd12" },
  { id: 13, nombre: "Paola Jiménez",         email: "pjimenez@mail.com",   password: "pwd13" },
  { id: 14, nombre: "Héctor Flores",         email: "hflores@mail.com",    password: "pwd14" },
  { id: 15, nombre: "Claudia Navarro",       email: "cnavarro@mail.com",   password: "pwd15" },
  { id: 16, nombre: "Diego Torres",          email: "dtorres@mail.com",    password: "pwd16" },
  { id: 17, nombre: "Fernanda Salas",        email: "fsalas@mail.com",     password: "pwd17" },
  { id: 18, nombre: "Emilio Ramos",          email: "eramos@mail.com",     password: "pwd18" },
  { id: 19, nombre: "Ximena Chávez",         email: "xchavez@mail.com",    password: "pwd19" },
  { id: 20, nombre: "Rodrigo Martínez",      email: "rmartinez@mail.com",  password: "pwd20" },
];

const resenasSQL = [
  { id: 1,  contenido: "Una obra maestra",                    calificacion: 5, fecha: "2025-07-01",  libroId: 1,  usuarioId: 1 },
  { id: 2,  contenido: "Muy imaginativa",                     calificacion: 5, fecha: "2025-07-10",  libroId: 2,  usuarioId: 2 },
  { id: 3,  contenido: "Hipnótica y entrañable",              calificacion: 4, fecha: "2025-07-12",  libroId: 3,  usuarioId: 3 },
  { id: 4,  contenido: "Brillante colección de cuentos",      calificacion: 5, fecha: "2025-07-14",  libroId: 4,  usuarioId: 4 },
  { id: 5,  contenido: "Cruda y poderosa",                    calificacion: 4, fecha: "2025-07-15",  libroId: 5,  usuarioId: 5 },
  { id: 6,  contenido: "Innovadora estructura narrativa",     calificacion: 5, fecha: "2025-07-16",  libroId: 6,  usuarioId: 6 },
  { id: 7,  contenido: "Profunda y crítica",                  calificacion: 4, fecha: "2025-07-18",  libroId: 7,  usuarioId: 7 },
  { id: 8,  contenido: "Tierna y deliciosa",                  calificacion: 5, fecha: "2025-07-19",  libroId: 8,  usuarioId: 8 },
  { id: 9,  contenido: "Poética y fantasmagórica",            calificacion: 5, fecha: "2025-07-21",  libroId: 9,  usuarioId: 9 },
  { id: 10, contenido: "Retrato social contundente",          calificacion: 4, fecha: "2025-07-22",  libroId: 10, usuarioId: 10 },
  { id: 11, contenido: "Testimonio imprescindible",           calificacion: 5, fecha: "2025-07-24",  libroId: 11, usuarioId: 11 },
  { id: 12, contenido: "Ágil y adictiva",                     calificacion: 4, fecha: "2025-07-25",  libroId: 12, usuarioId: 12 },
  { id: 13, contenido: "Intrigante y elegante",               calificacion: 4, fecha: "2025-07-27",  libroId: 13, usuarioId: 13 },
  { id: 14, contenido: "Atmosférica y emotiva",               calificacion: 5, fecha: "2025-07-28",  libroId: 14, usuarioId: 14 },
  { id: 15, contenido: "Clásico eterno",                      calificacion: 5, fecha: "2025-07-30",  libroId: 15, usuarioId: 15 },
  { id: 16, contenido: "Trágica y luminosa",                  calificacion: 4, fecha: "2025-08-01",  libroId: 16, usuarioId: 16 },
  { id: 17, contenido: "Madura y sensible",                   calificacion: 4, fecha: "2025-08-03",  libroId: 17, usuarioId: 17 },
  { id: 18, contenido: "Ensayo imprescindible",               calificacion: 5, fecha: "2025-08-05",  libroId: 18, usuarioId: 18 },
  { id: 19, contenido: "Vibrante y audaz",                    calificacion: 5, fecha: "2025-08-07",  libroId: 19, usuarioId: 19 },
  { id: 20, contenido: "Breve y poderosa",                    calificacion: 4, fecha: "2025-08-10",  libroId: 20, usuarioId: 20 },
];

function yearFrom(dateStr) {
  // Devuelve el año (número) desde "YYYY-MM-DD"
  const d = new Date(dateStr);
  return d.getUTCFullYear();
}

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Conectado a", MONGO_URI);

  // Limpieza
  await Promise.all([Resena.deleteMany({}), Libro.deleteMany({}), Usuario.deleteMany({}), Autor.deleteMany({})]);
  console.log("🧹 Colecciones vaciadas");

  // Insertar autores
  const autorMap = new Map();
  for (const a of autoresSQL) {
    const doc = await Autor.create({
      nombre: a.nombre,
      nacionalidad: a.nacionalidad,
      fechaNacimiento: a.fechaNacimiento ? new Date(a.fechaNacimiento) : undefined,
    });
    autorMap.set(a.id, doc._id);
  }
  console.log(`📝 Autores insertados: ${autorMap.size}`);

  // Insertar usuarios
  const usuarioMap = new Map();
  for (const u of usuariosSQL) {
    const doc = await Usuario.create({
      nombre: u.nombre,
      email: u.email,
      password: u.password,
    });
    usuarioMap.set(u.id, doc._id);
  }
  console.log(`👤 Usuarios insertados: ${usuarioMap.size}`);

  // Insertar libros (mapear autorId y convertir fechaPublicacion -> anio)
  const libroMap = new Map();
  for (const l of librosSQL) {
    const doc = await Libro.create({
      titulo: l.titulo,
      genero: l.genero,
      anio: yearFrom(l.fechaPublicacion),
      autorId: autorMap.get(l.autorId),
    });
    libroMap.set(l.id, doc._id);
  }
  console.log(`📚 Libros insertados: ${libroMap.size}`);

  // Insertar reseñas (contenido->comentario, calificacion->puntuacion)
  let countResenas = 0;
  for (const r of resenasSQL) {
    await Resena.create({
      comentario: r.contenido,
      puntuacion: r.calificacion,
      fecha: new Date(r.fecha),
      libroId: libroMap.get(r.libroId),
      usuarioId: usuarioMap.get(r.usuarioId),
    });
    countResenas++;
  }
  console.log(`⭐ Reseñas insertadas: ${countResenas}`);

  console.log("🎉 Poblado completo.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("❌ Error al poblar:", err);
  process.exit(1);
});