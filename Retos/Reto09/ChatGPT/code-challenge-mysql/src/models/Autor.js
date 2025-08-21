import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Autor = sequelize.define(
  "Autor",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(255), allowNull: false },
    nacionalidad: { type: DataTypes.STRING(255), allowNull: false },
    fechaNacimiento: { type: DataTypes.DATEONLY, allowNull: true },
  },
  {
    tableName: "Autor",
    timestamps: false,
  }
);

export default Autor;
