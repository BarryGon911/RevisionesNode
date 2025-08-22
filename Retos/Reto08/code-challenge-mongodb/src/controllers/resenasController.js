import mongoose from "mongoose";
import Resena from "#models/Resena.js";
import Libro from "#models/Libro.js";
import Usuario from "#models/Usuario.js";

export const obtenerResenas = async (req, res) => {
  try {
    const { libroId, libroTitulo } = req.query;
    let filtro = {};
    if (libroId) {
      if (!mongoose.Types.ObjectId.isValid(libroId)) {
        return res.status(400).json({ error: "libroId inválido" });
      }
      filtro.libroId = libroId;
    } else if (libroTitulo) {
      const libro = await Libro.findOne({ titulo: libroTitulo });
      if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
      filtro.libroId = libro.id;
    }
    const resenas = await Resena.find(filtro)
      .sort({ fecha: -1 })
      .populate({ path: "libroId", select: "titulo anio fechaPublicacion genero autorId" })
      .populate({ path: "usuarioId", select: "nombre email" });
    res.json(resenas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const crearResena = async (req, res) => {
  try {
    const { comentario, puntuacion, fecha, libroId, libroTitulo, usuarioId, usuarioEmail } = req.body;

    if (!comentario || !puntuacion) {
      return res.status(400).json({ error: "Faltan campos requeridos (comentario, puntuacion)" });
    }
    if (puntuacion < 1 || puntuacion > 5) {
      return res.status(400).json({ error: "puntuacion debe estar entre 1 y 5" });
    }

    let libro;
    if (libroId) {
      if (!mongoose.Types.ObjectId.isValid(libroId)) {
        return res.status(400).json({ error: "libroId inválido" });
      }
      libro = await Libro.findById(libroId);
    } else if (libroTitulo) {
      libro = await Libro.findOne({ titulo: libroTitulo });
    }
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

    let usuario;
    if (usuarioId) {
      if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
        return res.status(400).json({ error: "usuarioId inválido" });
      }
      usuario = await Usuario.findById(usuarioId);
    } else if (usuarioEmail) {
      usuario = await Usuario.findOne({ email: usuarioEmail });
    }
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    const resena = await Resena.create({
      comentario,
      puntuacion,
      fecha: fecha ? new Date(fecha) : undefined,
      libroId: libro.id,
      usuarioId: usuario.id,
    });

    const creada = await Resena.findById(resena.id)
      .populate({ path: "libroId", select: "titulo anio fechaPublicacion genero autorId" })
      .populate({ path: "usuarioId", select: "nombre email" });

    res.status(201).json(creada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};