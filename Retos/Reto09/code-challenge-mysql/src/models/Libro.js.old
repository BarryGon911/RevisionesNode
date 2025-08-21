import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Libro = sequelize.define("Libro", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Libro;