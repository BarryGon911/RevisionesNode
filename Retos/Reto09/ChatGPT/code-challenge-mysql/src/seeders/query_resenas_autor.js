// src/seeders/query_resenas_autor.js
import { sequelize } from "../config/database.js";
import { QueryTypes } from "sequelize";

const autorArg = process.argv.slice(2).join(" ") || "Gabriel García Márquez";

const SQL = `
SELECT 
    a.nombre        AS autor,
    l.titulo        AS libro,
    r.contenido     AS resena,
    r.calificacion,
    u.nombre        AS usuario,
    r.fecha         AS fecha
FROM Autor a
JOIN Libro l   ON l.autorId = a.id
JOIN Resena r  ON r.libroId = l.id
JOIN Usuario u ON r.usuarioId = u.id
WHERE a.nombre = :autor
ORDER BY r.fecha DESC;
`;

(async () => {
  try {
    const rows = await sequelize.query(SQL, {
      replacements: { autor: autorArg },
      type: QueryTypes.SELECT,
    });
    console.table(rows);
    process.exit(0);
  } catch (e) {
    console.error("Error en query_resenas_autor:", e);
    process.exit(1);
  }
})();
