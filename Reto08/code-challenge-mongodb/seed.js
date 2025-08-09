import mongoose from "mongoose";
import dotenv from "dotenv";
import Autor from "./src/models/Autor.js";
import Libro from "./src/models/Libro.js";
import Reseña from "./src/models/Reseña.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB");

    // Limpiar colecciones
    await Autor.deleteMany({});
    await Libro.deleteMany({});
    await Reseña.deleteMany({});

    // Crear autores
    const autores = await Autor.insertMany([
      { nombre: "Gabriel García Márquez", nacionalidad: "Colombiana", fechaNacimiento: new Date("1927-03-06") },
      { nombre: "Isabel Allende", nacionalidad: "Chilena", fechaNacimiento: new Date("1942-08-02") }
    ]);

    // Crear libros
    const libros = await Libro.insertMany([
      { titulo: "Cien años de soledad", año: 1967, genero: "Realismo mágico", autorId: autores[0]._id },
      { titulo: "La casa de los espíritus", año: 1982, genero: "Realismo mágico", autorId: autores[1]._id }
    ]);

    // Crear reseñas
    await Reseña.insertMany([
      { comentario: "Obra maestra", puntuacion: 5, libroId: libros[0]._id },
      { comentario: "Muy emotivo", puntuacion: 4, libroId: libros[1]._id }
    ]);

    console.log("Datos de prueba insertados correctamente");
    process.exit();
  } catch (error) {
    console.error("Error al insertar datos de prueba:", error);
    process.exit(1);
  }
};

seed();