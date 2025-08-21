import Autor from "./Autor.js";
import Libro from "./Libro.js";
import Resena from "./Reseña.js";

// Relaciones
Autor.hasMany(Libro, {
  as: "libros",
  foreignKey: "autorId",
  onDelete: "CASCADE",
});

Libro.belongsTo(Autor, {
  as: "autor",
  foreignKey: "autorId",
});

Libro.hasMany(Resena, {
  as: "resenas",
  foreignKey: "libroId",
  onDelete: "CASCADE",
});

Resena.belongsTo(Libro, {
  as: "libro",
  foreignKey: "libroId",
});

export { Libro, Autor, Resena };