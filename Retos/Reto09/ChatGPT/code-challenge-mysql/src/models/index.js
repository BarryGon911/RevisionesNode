import Autor from "./Autor.js";
import Usuario from "./Usuario.js";
import Libro from "./Libro.js";
import Resena from "./Resena.js";

// Autor 1─* Libro
Autor.hasMany(Libro, {
  as: "libros",
  foreignKey: { name: "autorId", allowNull: false },
  onDelete: "CASCADE",
});
Libro.belongsTo(Autor, {
  as: "autor",
  foreignKey: { name: "autorId", allowNull: false },
  onDelete: "CASCADE",
});

// Libro 1─* Resena
Libro.hasMany(Resena, {
  as: "resenas",
  foreignKey: { name: "libroId", allowNull: false },
  onDelete: "CASCADE",
});
Resena.belongsTo(Libro, {
  as: "libro",
  foreignKey: { name: "libroId", allowNull: false },
  onDelete: "CASCADE",
});

// Usuario 1─* Resena
Usuario.hasMany(Resena, {
  as: "resenas",
  foreignKey: { name: "usuarioId", allowNull: false },
  onDelete: "CASCADE",
});
Resena.belongsTo(Usuario, {
  as: "usuario",
  foreignKey: { name: "usuarioId", allowNull: false },
  onDelete: "CASCADE",
});

export { Libro, Autor, Resena, Usuario };
