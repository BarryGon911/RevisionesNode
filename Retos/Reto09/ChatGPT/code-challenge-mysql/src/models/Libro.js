import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Libro = sequelize.define(
  "Libro",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: DataTypes.STRING(255), allowNull: false },
    genero: { type: DataTypes.STRING(100), allowNull: true },
    fechaPublicacion: { type: DataTypes.DATEONLY, allowNull: true },
    autorId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "Libro",
    timestamps: false,
  }
);

export default Libro;
