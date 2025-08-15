import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const OrdenItem = db.define('orden_items', {
  cantidad: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  precioUnitario: { type: DataTypes.DECIMAL(10,2), allowNull: false }
})

export default OrdenItem
