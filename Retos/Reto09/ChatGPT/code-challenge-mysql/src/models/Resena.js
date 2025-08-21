import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Resena = sequelize.define(
  "Resena",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    contenido: { type: DataTypes.TEXT, allowNull: false },
    calificacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    fecha: { type: DataTypes.DATEONLY, allowNull: true },
    libroId: { type: DataTypes.INTEGER, allowNull: false },
    usuarioId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "Resena",
    timestamps: false,
  }
);

export default Resena;
