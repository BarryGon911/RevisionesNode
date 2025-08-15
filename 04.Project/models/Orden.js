import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Orden = db.define('ordenes', {
  total: { type: DataTypes.DECIMAL(10,2), allowNull: false }
})

export default Orden
