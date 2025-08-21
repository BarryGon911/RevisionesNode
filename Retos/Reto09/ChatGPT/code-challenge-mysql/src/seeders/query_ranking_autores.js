// src/seeders/query_ranking_autores.js
import { sequelize } from "../config/database.js";
import { QueryTypes } from "sequelize";

const SQL = `
SELECT
    a.id,
    a.nombre                          AS autor,
    COUNT(DISTINCT l.id)              AS libros_con_resenas,
    COUNT(r.id)                       AS total_resenas,
    ROUND(AVG(r.calificacion), 2)     AS promedio_autor
FROM Autor a
JOIN Libro  l ON l.autorId = a.id
JOIN Resena r ON r.libroId = l.id
GROUP BY a.id, a.nombre
ORDER BY promedio_autor DESC, total_resenas DESC, a.nombre ASC;
`;

(async () => {
  try {
    const rows = await sequelize.query(SQL, { type: QueryTypes.SELECT });
    console.table(rows);
    process.exit(0);
  } catch (e) {
    console.error("Error en query_ranking_autores:", e);
    process.exit(1);
  }
})();
