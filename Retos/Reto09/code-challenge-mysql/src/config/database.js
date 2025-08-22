import { Sequelize } from "sequelize";
import colors from "colors";

import dotenv from "dotenv";
dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
  DB_LOGGING,
  DB_TIMEZONE,
  DATABASE_URL,
} = process.env;

const logging = DB_LOGGING === "true" ? console.log : false;

export const sequelize = DATABASE_URL
  ? new Sequelize(DATABASE_URL, {
      logging,
      timezone: DB_TIMEZONE || "+00:00",
      define: { freezeTableName: true },
    })
  : new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      port: Number(DB_PORT || 3306),
      dialect: DB_DIALECT || "mysql",
      logging,
      timezone: DB_TIMEZONE || "+00:00",
      define: { freezeTableName: true },
    });

export const connectDB = async ({ sync = false, alter = false, force = false } = {}) => {
  try {
    await sequelize.authenticate();
    const target = DATABASE_URL || `${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    console.log(colors.bgGreen.black.bold(`MySQL conectado en ${target}`));

    if (sync) {
      if (alter && force) throw new Error("No combines --alter y --force.");
      await sequelize.sync({ alter, force });
      console.log("Sincronización finalizada.");
    }
  } catch (error) {
    console.error("Error de conexión a MySQL:", error?.message || error);
    process.exit(1);
  }
};

export default connectDB;