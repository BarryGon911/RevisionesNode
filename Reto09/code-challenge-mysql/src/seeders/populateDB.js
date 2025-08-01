import { sequelize } from "../config/database.js";
import { Autor, Libro, Resena } from "../models/index.js";

const poblarBaseDeDatos = async () => {
  try {
    await sequelize.sync({ force: true }); // ⚠️ Esto elimina y recrea las tablas

    // Autores
    const gabriel = await Autor.create({
      nombre: "Gabriel García Márquez",
      nacionalidad: "Colombiana",
      fechaNacimiento: "1927-03-06",
    });

    const isabel = await Autor.create({
      nombre: "Isabel Allende",
      nacionalidad: "Chilena",
      fechaNacimiento: "1942-08-02",
    });

    // Libros
    const soledad = await Libro.create({
      titulo: "Cien Años de Soledad",
      anio: 1967,
      genero: "Realismo Mágico",
      autorId: gabriel.id,
    });

    const colera = await Libro.create({
      titulo: "El Amor en los Tiempos del Cólera",
      anio: 1985,
      genero: "Romance",
      autorId: gabriel.id,
    });

    const espiritus = await Libro.create({
      titulo: "La Casa de los Espíritus",
      anio: 1982,
      genero: "Ficción",
      autorId: isabel.id,
    });

    // Reseñas
    await Resena.create({
      comentario: "Una obra maestra",
      puntuacion: 5,
      fecha: "2025-07-01",
      libroId: soledad.id,
    });

    await Resena.create({
      comentario: "Emotiva y profunda",
      puntuacion: 4,
      fecha: "2025-07-05",
      libroId: colera.id,
    });

    await Resena.create({
      comentario: "Muy imaginativa",
      puntuacion: 5,
      fecha: "2025-07-10",
      libroId: espiritus.id,
    });

    console.log("✅ Base de datos poblada con éxito.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
    process.exit(1);
  }
};

poblarBaseDeDatos();
