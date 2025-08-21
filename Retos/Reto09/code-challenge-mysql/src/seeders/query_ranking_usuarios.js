import { sequelize } from "../config/database.js";
import { QueryTypes } from "sequelize";

const SQL = `
SELECT 
    u.id,
    u.nombre       AS usuario,
    COUNT(r.id)    AS total_resenas,
    ROUND(AVG(r.calificacion), 2) AS promedio_calificacion_dada
FROM Usuario u
LEFT JOIN Resena r ON r.usuarioId = u.id
GROUP BY u.id, u.nombre
ORDER BY total_resenas DESC, promedio_calificacion_dada DESC;
`;

(async () => {
  try {
    const rows = await sequelize.query(SQL, { type: QueryTypes.SELECT });
    console.table(rows);
    process.exit(0);
  } catch (e) {
    console.error("Error en query_ranking_usuarios:", e);
    process.exit(1);
  }
})();