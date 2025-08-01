import Autor from "./Autor.js";
import Libro from "./Libro.js";
import Resena from "./Reseña.js";

// Relaciones
Autor.hasMany(Libro, {
  foreignKey: "autorId",
  onDelete: "CASCADE",
});

Libro.belongsTo(Autor, {
  foreignKey: "autorId",
});

Libro.hasMany(Resena, {
  foreignKey: "libroId",
  onDelete: "CASCADE",
});

Resena.belongsTo(Libro, {
  foreignKey: "libroId",
});

export { Libro, Autor, Resena };