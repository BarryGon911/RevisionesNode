import { sequelize } from "../config/database.js";
import { QueryTypes } from "sequelize";

const SQL = `
SELECT 
    l.titulo,
    a.nombre       AS autor,
    ROUND(AVG(r.calificacion), 2) AS promedio_calificacion,
    COUNT(r.id)    AS cantidad_resenas
FROM Libro l
JOIN Autor a  ON l.autorId = a.id
JOIN Resena r ON r.libroId = l.id
GROUP BY l.id, l.titulo, a.nombre
ORDER BY promedio_calificacion DESC, cantidad_resenas DESC
LIMIT 5;
`;

(async () => {
  try {
    const rows = await sequelize.query(SQL, { type: QueryTypes.SELECT });
    console.table(rows);
    process.exit(0);
  }
  catch (e) {
    console.error("Error en query_top5_libros:", e);
    process.exit(1);
  }
})();