# Models (Sequelize)

Este folder define los **modelos Sequelize** y centraliza sus **asociaciones**. Todo respeta el esquema SQL de `biblioteca`:

- **Autor** (id, nombre*, nacionalidad*, fechaNacimiento)
- **Usuario** (id, nombre*, email* único, password*)
- **Libro** (id, titulo*, genero, fechaPublicacion, autorId*)
- **Resena** (id, contenido*, calificacion [1–5]*, fecha, libroId*, usuarioId*)

(* = NOT NULL)

> Sin `createdAt` / `updatedAt`: todos los modelos usan `timestamps: false`.

## Estructura esperada

```
src/
  config/
    database.js           ← exporta `sequelize`
  models/
    Autor.js              ← default export
    Usuario.js            ← default export
    Libro.js              ← default export
    Resena.js             ← default export
    index.js              ← define asociaciones y re-exporta { Autor, Usuario, Libro, Resena }
```

> **Nota sobre nombres de archivo**: evita usar `ñ`/acentos en nombres de archivo (p. ej., usa `Resena.js`) para prevenir problemas en algunos SOs y shells. El **nombre de tabla/modelo** se mantiene como `Resena`.

## Convenciones de definición

- `DataTypes.DATEONLY` para fechas (`fechaNacimiento`, `fechaPublicacion`, `fecha`).
- `tableName` explícito (e.g., `"Libro"`) y `timestamps: false`.
- Validaciones:
  - `Usuario.email` → `unique: true`, `validate: { isEmail: true }`
  - `Resena.calificacion` → `min: 1`, `max: 5`

## Asociaciones (relaciones)

- **Autor 1─* Libro**

  - `Autor.hasMany(Libro, { as: "libros", foreignKey: { name: "autorId", allowNull: false }, onDelete: "CASCADE" })`
  - `Libro.belongsTo(Autor, { as: "autor", foreignKey: { name: "autorId", allowNull: false }, onDelete: "CASCADE" })`
- **Libro 1─* Resena**

  - `Libro.hasMany(Resena, { as: "resenas", foreignKey: { name: "libroId", allowNull: false }, onDelete: "CASCADE" })`
  - `Resena.belongsTo(Libro, { as: "libro", foreignKey: { name: "libroId", allowNull: false }, onDelete: "CASCADE" })`
- **Usuario 1─* Resena**

  - `Usuario.hasMany(Resena, { as: "resenas", foreignKey: { name: "usuarioId", allowNull: false }, onDelete: "CASCADE" })`
  - `Resena.belongsTo(Usuario, { as: "usuario", foreignKey: { name: "usuarioId", allowNull: false }, onDelete: "CASCADE" })`

## `index.js` (rol y ejemplo mínimo)

`index.js` **centraliza las asociaciones** y **re-exporta** los modelos:

```js
import Autor from "./Autor.js";
import Usuario from "./Usuario.js";
import Libro from "./Libro.js";
import Resena from "./Resena.js";

Autor.hasMany(Libro, { as: "libros", foreignKey: { name: "autorId", allowNull: false }, onDelete: "CASCADE" });
Libro.belongsTo(Autor, { as: "autor", foreignKey: { name: "autorId", allowNull: false }, onDelete: "CASCADE" });

Libro.hasMany(Resena, { as: "resenas", foreignKey: { name: "libroId", allowNull: false }, onDelete: "CASCADE" });
Resena.belongsTo(Libro, { as: "libro", foreignKey: { name: "libroId", allowNull: false }, onDelete: "CASCADE" });

Usuario.hasMany(Resena, { as: "resenas", foreignKey: { name: "usuarioId", allowNull: false }, onDelete: "CASCADE" });
Resena.belongsTo(Usuario, { as: "usuario", foreignKey: { name: "usuarioId", allowNull: false }, onDelete: "CASCADE" });

export { Autor, Usuario, Libro, Resena };
```

## Ejemplos de uso (include)

- **Autor con sus libros**:

  ```js
  const autor = await Autor.findByPk(1, { include: [{ model: Libro, as: "libros" }] });
  ```
- **Libro con su autor y reseñas (incluye usuario de cada reseña)**:

  ```js
  const libro = await Libro.findByPk(1, {
    include: [
      { model: Autor, as: "autor" },
      { model: Resena, as: "resenas", include: [{ model: Usuario, as: "usuario" }] }
    ]
  });
  ```
- **Crear una reseña**:

  ```js
  await Resena.create({ contenido: "Excelente", calificacion: 5, fecha: "2025-08-20", libroId: 1, usuarioId: 2 });
  ```
