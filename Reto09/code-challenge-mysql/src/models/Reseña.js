import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Resena = sequelize.define("Resena", {
  comentario: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  puntuacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Resena;