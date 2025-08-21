import Autor from "./Autor.js";
import Libro from "./Libro.js";
import Resena from "./Resena.js";
import Usuario from "./Usuario.js";

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