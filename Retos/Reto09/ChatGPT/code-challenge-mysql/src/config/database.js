// src/config/database.js
import { Sequelize } from "sequelize";
import "dotenv/config";

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_DIALECT,
  DB_LOGGING,
  DB_TIMEZONE,
  DATABASE_URL
} = process.env;

export const sequelize = DATABASE_URL
  ? new Sequelize(DATABASE_URL, {
      logging: DB_LOGGING === "true" ? console.log : false,
      timezone: DB_TIMEZONE || "+00:00",
      define: { freezeTableName: true },
    })
  : new Sequelize(DB_NAME, DB_USER, DB_PASS, {
      host: DB_HOST,
      port: Number(DB_PORT || 3306),
      dialect: DB_DIALECT || "mysql",
      logging: DB_LOGGING === "true" ? console.log : false,
      timezone: DB_TIMEZONE || "+00:00",
      define: { freezeTableName: true },
    });
