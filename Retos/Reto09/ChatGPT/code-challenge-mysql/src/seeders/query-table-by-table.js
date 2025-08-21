// src/seeders/query-table-by-table.js
import { sequelize } from "../config/database.js";
import { QueryTypes } from "sequelize";

const QUERIES = {
  autor:   "SELECT * FROM Autor;",
  libro:   "SELECT * FROM Libro;",
  usuario: "SELECT * FROM Usuario;",
  resena:  "SELECT * FROM Resena;",
};

(async () => {
  try {
    for (const [tabla, sql] of Object.entries(QUERIES)) {
      const rows = await sequelize.query(sql, { type: QueryTypes.SELECT });
      console.log(`\n=== ${tabla.toUpperCase()} ===`);
      console.table(rows);
    }
    process.exit(0);
  } catch (e) {
    console.error("Error en query-table-by-table:", e);
    process.exit(1);
  }
})();
