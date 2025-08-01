import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js"; // o como se llame tu conexión

const Autor = sequelize.define("Autor", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nacionalidad: {
    type: DataTypes.STRING,
  },
});

export default Autor;