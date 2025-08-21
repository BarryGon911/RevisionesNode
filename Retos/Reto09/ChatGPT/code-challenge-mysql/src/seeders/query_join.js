// src/seeders/query_join.js
import { sequelize } from "../config/database.js";
import { QueryTypes } from "sequelize";

const SQL = `
SELECT 
    r.id              AS resena_id,
    r.contenido       AS resena,
    r.calificacion,
    r.fecha           AS fecha_resena,
    u.nombre          AS usuario,
    l.titulo          AS libro,
    l.genero,
    a.nombre          AS autor,
    a.nacionalidad
FROM Resena r
JOIN Usuario u ON r.usuarioId = u.id
JOIN Libro l   ON r.libroId   = l.id
JOIN Autor a   ON l.autorId   = a.id
ORDER BY r.fecha DESC;
`;

(async () => {
  try {
    const rows = await sequelize.query(SQL, { type: QueryTypes.SELECT });
    console.table(rows);
    process.exit(0);
  } catch (e) {
    console.error("Error en query_join:", e);
    process.exit(1);
  }
})();
