import { Sequelize } from "sequelize";

import "dotenv/config";
dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,       // preferido
  DB_PASSWORD,   // compat: por si tu .env usa esta clave
  DB_DIALECT,
  DB_LOGGING,
  DB_TIMEZONE,
  DATABASE_URL,
} = process.env;

// logging configurable desde .env (DB_LOGGING=true)
const logging = DB_LOGGING === "true" ? console.log : false;

// Instancia �nica de Sequelize (respeta DATABASE_URL O variables separadas)
export const sequelize = DATABASE_URL
  ? new Sequelize(DATABASE_URL, {
      logging,
      timezone: DB_TIMEZONE || "+00:00",
      define: { freezeTableName: true }, // nombres exactos de tablas del SQL
    })
  : new Sequelize(DB_NAME, DB_USER, DB_PASS || DB_PASSWORD, {
      host: DB_HOST,
      port: Number(DB_PORT || 3306),
      dialect: DB_DIALECT || "mysql",
      logging,
      timezone: DB_TIMEZONE || "+00:00",
      define: { freezeTableName: true }, // nombres exactos de tablas del SQL
    });

/**
 * Conecta a la BD. Por defecto NO sincroniza (para no interferir con seeders/SQL).
 * Puedes pasar { sync: true, alter: true } o { sync: true, force: true } en dev.
 */
export const connectDB = async ({ sync = false, alter = false, force = false } = {}) => {
  try {
    await sequelize.authenticate();
    const target = DATABASE_URL || `${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    console.log(`?? MySQL conectado en ${target}`);

    if (sync) {
      if (alter && force) throw new Error("No combines --alter y --force.");
      await sequelize.sync({ alter, force });
      console.log("?? Sincronizaci�n completada.");
    }
  } catch (error) {
    console.error("?? Error de conexi�n MySQL:", error?.message || error);
    process.exit(1);
  }
};

export default connectDB;