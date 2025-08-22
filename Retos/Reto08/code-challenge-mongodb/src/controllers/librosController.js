import mongoose from "mongoose";
import Libro from "#models/Libro.js";
import Autor from "#models/Autor.js";
import Resena from "#models/Resena.js";

export const obtenerLibros = async (req, res) => {
  try {
    const query = {};

    if (req.query.genero) query.genero = req.query.genero;

    // Normaliza año -> anio para consultas
    if (req.query.anio ?? req.query["año"]) {
      const val = Number(req.query.anio ?? req.query["año"]);
      if (!Number.isNaN(val)) query.anio = val;
    }

    const libros = await Libro.find(query).populate("autorId");

    const resultado = libros.map((libro) => {
      const obj = libro.toObject();
      obj.autor = obj.autorId;
      delete obj.autorId;
      return obj;
    });
    res.json(resultado);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const obtenerLibroPorId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const libro = await Libro.findById(id).populate("autorId");
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

    const resenas = await Resena.find({ libroId: id }).select("-__v -createdAt -updatedAt");

    const obj = libro.toObject();
    obj.autor = obj.autorId;
    delete obj.autorId;
    obj.resenas = resenas;

    res.json(obj);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const crearLibro = async (req, res) => {
  try {
    const { titulo, genero, autorId } = req.body;
    const anio = req.body.anio ?? req.body["año"];

    if (!titulo || anio == null || !genero || !autorId) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    if (!mongoose.Types.ObjectId.isValid(autorId)) {
      return res.status(400).json({ error: "autorId inválido" });
    }

    const autor = await Autor.findById(autorId);
    if (!autor) return res.status(404).json({ error: "Autor no encontrado" });

    const nuevo = await Libro.create({
      titulo,
      anio: Number(anio),
      genero,
      autorId,
    });

    const creado = await Libro.findById(nuevo.id).populate("autorId");
    const obj = creado.toObject();
    obj.autor = obj.autorId;
    delete obj.autorId;

    res.status(201).json(obj);
  }
  catch (error) {
    console.error(error);
    if (error?.code === 11000) {
      return res.status(400).json({ error: "El título ya existe" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const actualizarLibro = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const updates = { ...req.body };

    if (Object.prototype.hasOwnProperty.call(updates, "año")) {
      const val = Number(updates["año"]);
      updates.anio = Number.isNaN(val) ? updates["año"] : val;
      delete updates["año"];
    }

    if (updates.autorId) {
      if (!mongoose.Types.ObjectId.isValid(updates.autorId)) {
        return res.status(400).json({ error: "autorId inválido" });
      }
      const autor = await Autor.findById(updates.autorId);
      if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
    }

    const libro = await Libro.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("autorId");

    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

    const obj = libro.toObject();
    obj.autor = obj.autorId;
    delete obj.autorId;

    res.json(obj);
  }
  catch (error) {
    console.error(error);
    if (error?.code === 11000) {
        return res.status(400).json({ error: "El título ya existe" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const eliminarLibro = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const libro = await Libro.findByIdAndDelete(id);
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

    res.json({ mensaje: "Libro eliminado" });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};